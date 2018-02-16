
# simple messaging chat app | React | Redux | Express | Node.Js | MongoDB

This project uses the below :

Front End: ReactJS | Redux State management | JS/ES6 | web sockets (socket.io-client)
BackEnd: Node.js | passport | express | socket.io | mongoose
Database: MongoDB
Tools: npm | git | webpack | babel | redux-dev tools

`Please use Google Chrome` This app is tested only in chrome.

The test assignment did not ask for real time updates on messaging, but I have implemented it as there wasn't a restriction on it and it is an add on to showcase skills.

1. The project does not follow the standard folder stucture of create-react-app or other good structures, I have used a custom structure. 
2. I wanted to move the common folder into client as it has all the files related to client side only
3. I wanted to move components to containers but could not do so.
3. I wanted to create sub-folders in components for better seperation
4. I have used inline styles all over the app, I could have moved them into css files and used css classed,
I totally understan the using inline styles is bad and should not be done. 
5. The app is mobile friendly.
6. I build a sign in/ sign out, even though the assignment didn't as me to do that, but It makes the app more usable.
7. Could not get rid of some console errors, but the app works fine.

TODOS: 
1. 'private' property/column in Channel table was intended for private chat window.
2. List of channels is not implemented, it is pending. (Not part of test assignment)
3. Get rid of some console errors
4. Remove Hardcodings, use more constants

## Use Guide

First off, clone the repository and then `cd simple-messaging-app-danish`and `npm install`

### Setting up MongoDB

Note: You need MongoDB set up and running to run the code locally. [Installation instructions](https://docs.mongodb.org/manual/installation/)

Once you've installed MongoDB start up the MongoDB server in a new terminal with the following commands:

```
mkdir db
mongod --dbpath=./db --smallfiles
```

Then open a new terminal and type in `mongo` and type in `use chat_dev`
This is your database interface.  You can query the database for records for example: `db.users.find()` or `db.stats()`.  If you want to remove all channels for example you can type `db.channels.remove({})`.

Now that you've done all that, you can go go ahead and code away!

### Development

```
npm run dev
```
And then point your browser to `localhost:3000`
`Please use Google Chrome` This app is tested only in chrome.

Note:
This program comes with [redux-dev tools](https://github.com/gaearon/redux-devtools)
* To SHOW or HIDE the dev tool panel press ctrl+h
* To change position press ctrl+m

### Production

```
npm run build
npm start
```
And then point your browser to `localhost:3000`

`Please use Google Chrome` This app is tested only in chrome.