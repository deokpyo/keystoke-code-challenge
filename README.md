# Keystoke Code Challenge
This is a MERN stack web application built using **ReactJS**, **Redux**, **Semantic UI React**, **NodeJS**, **ExpressJS**, and **MongoDB**.
- Check out the live demo at https://keystoke-jimmy.herokuapp.com

## Requirements
1. As a user I should be able to view a dashboard with your name, a profile picture and a description of yourself
2. As a user I should be able to update the following:
    * Name
    * Description of yourself
    * Profile Picture
3. As a user I should be able to save the changes that I made to the above listed items.
4. As a user, I should be able to view the profiles of anyone that has submitted/created a profile through the app. The backend should reflect changes that can be made.

- - - -

## Instruction for local development
### Requirements: Webpack, Node.js, MongoDB
After cloning into repo, cd to project root directory and run npm install:

```
$ npm install
```

Set up .env file in the project root directiory then fill out the three items as shown in .env-sample file:

```
$ touch .env
```

Bundle the app using webpack:

```
$ webpack
```

Then run the node server and the app should be running at http://localhost:3000

```
$ node app.js
```
