// M102 Fall 2012
// a.js 
// see also: a.sh

function ourinit() {
    // note: never use "localhost", or aliases for it, for production.  but for a 1 machine dev test it is ok.
    var x = rs.initiate(                                                                                    
        { _id:'z',                                                                                              
          members:[                                                                                             
            { _id:1, host:'localhost:27001' },                                                                   
            { _id:2, host:'localhost:27002', "arbiterOnly" : true },                                                                   
            { _id:3, host:'localhost:27003' }                                                                    
          ]                                                                                             
        }
    );                                                                                                     
    printjson(x);                                                                                           
    print('waiting for set to initiate...');                                                                    
    while( 1 ) {                                                                                            
        sleep(2000);                                                                                          
        x = db.isMaster();                                                                                    
        printjson(x);                                                                                         
        if( x.ismaster || x.secondary ) {                                    
            print("ok, this member is online now; that doesn't mean all members are ");
            print("ready yet though.");
            break;                                                                                              
        }                                                                                                     
    }                                                                                                       
}

p="priority";

function go() { printjson( db.isMaster() );
  print();
  print("things to run for the final:");
  print("  ourinit()            Initiates the replica set for you");
  print("  part4()              Used in problem #4");
  print(); 
}
go();

function part4(){ if( !db.isMaster().ismaster && !db.isMaster().secondary ) throw "something is wrong the set isn't healthy"; var z=db.getSisterDB("local").system.replset.find()[0].members; var n = 0; for( var i in z ) { if( z[i][p] != 0 ) n++; if( z[i].slaveDelay != 0 ) n+=77;} return ""+n+z.length+rs.status().members.length;}
