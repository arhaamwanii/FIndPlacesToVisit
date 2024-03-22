USE EFFECT

    - side effect:
    - tasks that don't directly impact the current render cycle
    - that direcctly does not do shit at that time

    - location in most react apps

    - you are not allowed to use hooks inside of nested function, if statements and like that -- must be used in the root
    - not every side effect, needs a useEffect one of the 

    - we use useEffect to prevent loops

    DEPENDENCIES 
    these are prop or state values that are used inside of this function

    something inside of the use effect this open in

    MOUNTING PHASE

    When the component mounts for the first time, the normal code inside the useEffect runs.
    If there is a cleanup function returned from the previous effect (in case of a re-render), it will be executed before the normal code runs.

    UPDATE PHASE (Dependency Change):

    If the dependencies specified in the dependency array change on subsequent renders, the cleanup function from the previous effect is executed first.
    Then, the normal code inside the useEffect runs again with the updated dependencies.

    UNMOUNTING PHASE:

    When the component unmounts from the DOM, the cleanup function is executed to perform any necessary cleanup tasks.

    -IF YOU ARE USING A STATE OR A PROP INSIDE OF THE USE-EFFECT -- you should add that as a dependency to the UseEffect 

    -DEPENDENCY IS A FUNCTION
    :funtions in js are object, everytime app.component is rexecuted values are reassigned - i.e this new object is also reexecuted 

    OBJECTS OR WE CAN SAY FUNCTIONS -- if they have all the same things insdie of them i.e all the same code and even the values are same js doesnot consider them equal in anyway

USE-CALLBACK

WHILE USIGN A FUNCTION AS A DEPENDENCY CAN RESULT IN AN IFINFITE LOOP BECAUSE OF THE REASONS GIVEN -- i.e js dosn't recognize them as same thus will rerender 

when passing functions as dependencies to useEffect -- you  should wrap that function in a use callback, because that will prevent the rernder of the fucntion(just the rerender will be considered as a cange by the react ) as now this fucntion is a dependecy to the useEffect it would have caused it to cause another rerender which would have again changed the dependency and on and on and on.. resulting in an infinite loop
- use callback can simply prevent this.
