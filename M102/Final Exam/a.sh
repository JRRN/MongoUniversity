# make a test replica set

# if you need to start over try:
#  rm -rf data/*
#  (careful that deletes that everything under data/ recursively!)
#

# we expect nothi to be running.  you might have a mongo shell running which is ok...but 
# no mongod or mongos
echo "Already running mongo* processes (this is fyi, should be none probably):"
ps -A | grep mongo
echo

echo make / reset dirs
mkdir data
mkdir data/z1
mkdir data/z2
mkdir data/z3

echo
echo running mongod processes...

mongod --fork --logpath a.log --smallfiles --oplogSize 50 --port 27001 --dbpath data/z1 --replSet z
mongod --fork --logpath b.log --smallfiles --oplogSize 50 --port 27002 --dbpath data/z2 --replSet z
mongod --fork --logpath c.log --smallfiles --oplogSize 50 --port 27003 --dbpath data/z3 --replSet z

echo

# give them time to start. note this might not be enough time!
sleep 1

ps -A | grep mongo
echo 
echo "Now run:"
echo
echo "  mongo --shell --port 27003 a.js"
echo

