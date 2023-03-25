# light-chat-flow

## Overview:
  The light chat flow was created with the idea of having a chat bot that can work with any plataform in any application.

![messenget-bot-video-example](https://user-images.githubusercontent.com/74437735/227744004-73ced843-3284-4600-bf29-a7647b5b8838.gif)

## Features:
* You can use it in the CLI, in a API or anything you want, doesn't matter where. **Seriously, it doesn't!**
* Create a chat flow easily, full customizable with lots of options for the user to choose.
* You don't need to setup a connection or anything, just import it and create the flow.

<br>
<br>

## How to use it:
### 1. Creating a flow
- First, you'll need to instantiate a `new Flow()`, passing as parameter a object with two values:
  + **defaultStateId:** is the default, obviously, and first state that the bot will start.
  + **defaultMatchFunction:** is the function that will get the response e validate it so that the chat can go a way or other.
  ```
   const flow = new Flow({
        defaultStateId: "start",
        defaultMatchFunction: labelEqualsTextOrNumber
    });
  ```

<br>

### 2. Creating the first state
 - You'll need to create a object of type `NewFlowStateParams`, and set the `defaultState` properties:
   + **id:** a unique key for the state.
   + **message:** the message the bot will send to the user.
   + **catchMessage:** if the user send a invalid response, this will be sent and restart the state.
   + **createStateCallback:** a funtion that will receive the state and here you will create you other states, so the chat can continue.
   ```
   const newFlowStateParams: NewFlowStateParams = {
        id: "start",
        message: "Hi, this is the Messenger Bot.",
        catchMessage: "Sorry, didn't understand you!",
        createStateCallback: (newState) => { }
   }
   ```
 
<br>

### 3. Creating multiple branches
  - In the `createStateCallback` property, you'll create a function that receive a `newState`, and with it you can create multiple states.
    + Create a `const`, give it the name of the state, and then, use the `newState` param to call the `branch` function, that receives the message it will send to the user.
    + Right after that, call a `state` function which you'll pass a new state object, and it will return a `State`;
  - Now, that you have your branch and state created, you can use it to create other branch for possible response of the user;
    + Each of the new states that you create with you `const`, you can make'em a `const` also, and continue to add more to your message flow.
    + Your consts will be options that the user will have to choose, so that he'll follow that branch, until it's over.
    
    ```
    const newFlowStateParams: NewFlowStateParams = {
        id: "start",
        message: "Hi, this is the Messenger Bot.",
        catchMessage: "Sorry, didn't understand you!",
        createStateCallback: (newState) => {
            const state1 = newState.branch("This one")
                .state({
                    id: "state1",
                    message: "I'm glad you're a gentleman!",
                    catchMessage: "Didn't understood you friend!",
                    matchFunction: labelEqualsTextOrNumber
                });

                    state1.branch("How are you?")
                        .state({
                            id: "state11",
                            message: "gooooooooooooood!! bye",
                            catchMessage: "Didn't catch it, try again!",
                            matchFunction: labelEqualsTextOrNumber
                        });

                        state1.branch("What if...")
                            .state({
                                id: "state12",
                                message: "some message",
                                catchMessage: "some catch message",
                                matchFunction: labelEqualsTextOrNumber
                            });

                        state1.branch("Another branch!")
                            .state({
                                id: "state13",
                                message: "some message",
                                catchMessage: "some catch message",
                                matchFunction: labelEqualsTextOrNumber
                            });
    }};
    ```

    
  - To let you know:
    + Each choice the user make, will be saved in a string that will have the state id separate by a |, will be like this: **"id1 | id4 | id5"**;
    + You can, then, if the flow get error at any point, you'll know where it happen.
