**Theory**

**Quizzes**

Problem:
Which of the following is the best definition of High Availability (HA)?

- [X] The capacity to serve operations, even in the event of failures or planned downtime
- The ability to scale a cluster
- The replication of the data to other servers

Problem:
What happens automatically in MongoDB that allows for server maintenance without downtime?

- MongoDB automatically upgrades itself to the latest available version.
- [X] A faulty Primary will be replaced by a new Primary by an automatic election.
- [X] Failed write operations are retried automatically once by the MongoDB drivers.

Problem:
What are the recommended steps to do maintenance on a Primary node without downtime?

- Stop all the nodes in the replica set at the same time.
- Stop the application from interacting with the MongoDB cluster.
- [X] Step down the Primary node and wait for a Secondary node to take over as the new Primary.

Problem:
Which of the following help achieve a no-downtime schema migration with MongoDB?

- [X] The polymorphism aspect of having documents with different shapes within a collection.
- [X] Each document can carry its schema version number.
- Database replication allows us to update one node at the time.

Problem:
Which of the following are tools within MongoDB's data platform ecosystem?

- [X] MongoDB Charts
- [X] MongoDB BI Connector
- RDMBS server
- [X] MongoDB Compass