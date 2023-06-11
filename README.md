# Serverless RESTful Web APIs with Cloud Functions, Firestore, Express and TypeScript

### Author: 
Luis Fernando Vallejo Aguilar 
### Project: 
Serverless  🚀
### Technologies: 
Cloud Functions / Firebase / Node.js / Typescript  


### Technical Challenge
This is a simple API that saves tasks.

[https://app-yjgxdaikrq-uc.a.run.app/api/todo](https://app-yjgxdaikrq-uc.a.run.app/api/todo)

### Requirements

[NodeJS](https://nodejs.org/en/)

You will need a Firebase project and firebase tools cli

```
npm install -g firebase-tools
```

### Clone this repository

```
git clone https://github.com/ivallejo/todo-typescript-api.git .
```

You need to change the firebase project name in *.firebaserc* file.

After that, you can log in to firebase in the terminal 

```
firebase login
```


### Deploy

For the first time, you have deploy the hosting and functions together

```
cd functions/
npm run deploy
```


### Locally

In order to test the tasks function locally, run the following command:

```
cd functions/
npm run serve
```


### Test

Run the following command:

```
cd functions/
npm run test
```


## API Reference


####  Get All Todos

```http
  GET /api/todo
```

#### Get Todo By Id

```http
  GET  /api/todo/:id
```
#### Create Todo

```http
  POST /api/todo
```
#### Update Todo

```http
  PUT /api/todo:/:id
```
#### Delete Todo

```http
  DELETE /api/todo/:id
```

## Trouble shooting 

If you cannot do it, please "".firebaserc" has to be deleted and "firebase init" need to be run again."