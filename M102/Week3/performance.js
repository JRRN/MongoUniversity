// performance.js
// M102 course
// run: 
//   mongo --shell localhost/performance performance.js

var homework = { };
if( "performance" != db ) { 
    print("performance.js: want db to be 'performance' when the shell starts. terminating.");
    throw "use performance db before running script";
}
homework.init = function () {

    var t = db.sensor_readings;

    if( t.count() ) {
        print("performance.sensor_readings will drop and reload...");
        t.drop();
    }

    var a = 0;
    for( var m = 0; m < 20000; m++ ) {

        var ts = new Date(2012,m%12,m%27+1);

        t.insert( { _id : m, tstamp : ts, active : (a%77==0), x : 99 } );

        a += 3;
    }

    printjson( db.getLastErrorObj() );

    print("still working...");
    t.update({},{$set:{str:"this is a test"}},false,true);
    printjson( db.getLastErrorObj() );

    print( "count: " + t.count() );
}
homework.a = function() { 
    var version = Number(db.version().substr(0, 3));
    if (version < 2.8) {
        var e = db.sensor_readings.find( {   tstamp : {      $gte : ISODate("2012-08-01"),      $lte :  ISODate("2012-09-01")    },   active : true } ).limit(3).explain();
        if( !e ) {
            print("something isn't right? try again?");
            return;    }
        if( e.n != 3 ) { 
            print("expected 3 results for the test query yet got: " + e.n);
            print("try again?");
            print("db.sensor_readings.count(): " + db.sensor_readings.count() + " (should be 20000)");
            return;    }
        if( e.nscanned > 500 ) { 
            print("quite a few keys or documents were scanned, need a better index try something else / try again.");
            return; }
        if( e.nscanned > 10 ) { 
            print("that's a big improvement over table scan -- " + e.nscanned + " keys scanned,");
            print("but we can do better, try something else / try again.");
            return; }
    } else {
        var exp = db.sensor_readings.explain("executionStats");
        var e = exp.find( {   tstamp : {      $gte : ISODate("2012-08-01"),      $lte :  ISODate("2012-09-01")    },   active : true } ).limit(3).next().executionStats;
        if( e.nReturned != 3 ) { 
            print("expected 3 results for the test query yet got: " + e.nReturned);
            print("try again?");
            print("db.sensor_readings.count(): " + db.sensor_readings.count() + " (should be 20000)");
            return;    }
        if( e.totalDocsExamined > 500 ) { 
            print("quite a few keys or documents were scanned, need a better index try something else / try again.");
            return; }
        if( e.totalDocsExamined > 10 ) { 
            print("that's a big improvement over table scan -- " + e. totalDocsExamined + " documents examined,");
            print("but we can do better, try something else / try again.");
            return; }
    }
    var b=new BinData(0,"abcdefgh"); return b.length()+b.subtype();
}
homework.c = function() { 
    var long = false;
    var y = 0;
    var ip;
    var i = 0;
    var k = false;
    for( ; i < 100; i++ ) { 
        ip=db.currentOp().inprog;
        ip.forEach(function (x){if(x.op=='update')k++;});
        if( k ) break;
        sleep(1);
    }
    if(!k){print("not seeing the expected activity, is homework.b() really running in a separate shell? try again.");return;}
    ip.forEach(function (x){if(x.op=='update'&&x.secs_running>3)y+=x.secs_running;});
    return  y^0xc;
}
homework.d = function() { 
    assert(db.sensor_readings.count()==20000);
    var t = db.sensor_readings;
    var s = t.stats(); return Math.round((s.size+s.indexSizes._id_)/100000);
}
homework.b = function() { 
    print("simulating a workload in this shell. after completing this homework, you can ");
    print("stop this shell with ctrl-c. let it run in the meantime...");
    print("(you will want to open another mongo shell to do your work in.)");
    print("\nnote: this function changes the indexes on db.sensor_readings. so if you go ");
    print(  "      back to the previous homework, drop and recreate indexes (or run homework.init() again)");
    print();
    var ipl = db.currentOp().inprog.length;
    if( ipl ) { 
        print();
        print("info: " + ipl + " operations were in progress when homework.b() begins.");
        print("      if you have a replica set more than zero is normal as the replicas will");
        print("      query the primary.");
        print();
    }
    var t = db.sensor_readings;
    if( t.count() != 20000 ) { 
        print("error, expected db.sensor_readings to have 20000 documents. ?");
        return;
    }
    var conn2 = (new Mongo()).getDB('performance');
    var t2 = conn2.sensor_readings;
    assert( t2.count() == 20000 );
    var conn3 = (new Mongo()).getDB('performance');
    var t3 = conn3.sensor_readings;
    assert( t3.count() == 20000 );
    t3.update({$where:"function(){sleep(500);return false;}"},{$set:{name:'fran'}},false,true); 
    var i = 0;
    print("looping...");
    while( 1 ) {
        i++;
        {
            t.update({},{$set:{z:1}});
            t.update({},{$inc:{z:1}});
            if( i % 5 == 0 ) { 
                db.getLastError();
            }
        }
        t2.find().limit(4).toArray();
    }
}
