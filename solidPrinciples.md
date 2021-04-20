# SOLID

Regarding the SOLID principles, starting with the Single Responsibility principle, we did our best to separate our code so that we do not have any god classes.
This principle requires a class should only really have one reason to change and should be responsible for one single piece of functionality.

For the most part we didn't violated the Open Close Principle. The Open Closed Principle meaning classes that we created and used should not be modified but rather extended and used from there. Before viewing the SOLID videos, Octavio modified the IPostService interface to include new functions like deletePost() and likePost().
A better way to adhere to the Open Closed Principle would have been to extend the IPostService interface with another interface. This avoids a situation where a working class breaks due to modifying it in the future. By extending from a class/interface, we could over-write and change methods from the new parent class in the child class.

For the Liskov Substitution principle we are ensuring that when we use a class that implements an interface, that it uses all components of it.
I do not believe we violated this anywhere.

The code should meet the requirements of the Interface Segregation Principle, we don’t want the application user to be forced to depend on methods that it is not using;
so we split up the interfaces and then can choose to use multiple interfaces putting smaller pieces together when needed rather than having potentially too many things in one interface.

The Dependency Inversion Principle states that high level modules should not depend on low level ones, and they should both depend on abstractions.
I think we may have violated this partially but in some areas have implemented it.
