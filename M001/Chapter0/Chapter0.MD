**Theory**

show collections

use \<dbname>

db.\<dbname>.find().pretty() 


**Quizzes**

Problem:
What resources are available to help you complete this course?
- [X] An in-class discussion forum where you can ask questions and help your fellow learners
- [X] Teaching assistants to field questions and provide guidance on the course
- Instructor's email address

Problem:
Which of the following count toward your final grade?
- Quizzes
- [X] Labs (also called homework)
- [X] Final exam

Problem:
When connecting to an Atlas cluster using the shell, why do we provide the hostnames for all nodes when we launch mongo? Choose the best answer from the choices below.

- [X] So that if the primary node goes down, the shell can connect to other nodes in the cluster instead 
- So that other nodes in the cluster can contact our client, if necessary
- Because our authentication credentials are not stored on the primary, but on other nodes in our cluster.
- There really isn't a good reason
- To make it possible for all the nodes to communicate with each other