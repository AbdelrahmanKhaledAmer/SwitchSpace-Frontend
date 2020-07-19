# SwitchSpace-frontend application ![Node.js CI](https://github.com/AbdelrahmanKhaledAmer/SwitchSpace-Frontend/workflows/Node.js%20CI/badge.svg)
Items Exchange  Service implemented with React. Backend can be found [here](https://github.com/AbdelrahmanKhaledAmer/SwitchSpace-Backend) This template is based on [sebamaster-movie-frontend](https://github.com/sebischair/sebamaster-movie-frontend/)

## Prerequisites

Both for the front end and the back end check:

* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

 You must have node.js and its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install Dependencies

We get the tools we depend upon via `npm`, the [node package manager](https://www.npmjs.com).

```
npm install
```

### Create a Bundle for the Application

This project use [webpack](https://github.com/webpack/webpack) version 1 for creating a bundle of the application and its dependencies

We have pre-configured `npm` to automatically run `webpack` so we can simply do:

```
npm run build
```

Behind the scenes this will call `webpack --config webpack.config.js `.  After, you should find that you have one new folder in your project.

* `dist` - contains all the files of your application and their dependencies.

### Enviroment variables
```
REACT_APP_STRIPE_KEY
REACT_APP_SERVER_URL
```
### Run the Application

```
REACT_APP_STRIPE_KEY
```
We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.
