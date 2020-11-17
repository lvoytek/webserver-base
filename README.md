# webserver-base: Database Edition
A simple base for a website frontend and database backend using TypeScript, Node.js, Express, and MongoDB

## Setup
1. Download and checkout the website version of the webserver base
```shell
git clone https://github.com/lvoytek/webserver-base.git
cd webserver-base
git checkout database
```
2. Install Node modules

```shell
npm install
```

## Running
1. Build the Typescript into JavaScript
```shell
npm run build
```
2. Start the server
```shell
npm run start
```

## Database Edition Information
This branch provides webserver base with both a website frontend and a MongoDB backend. Database interactions are managed through Mongoose. Meanwhile the frontend uses Embedded JS templates.

For this webserver to run properly, [NPM](https://www.npmjs.com/get-npm) and [MongoDB](https://www.mongodb.com/try/download) must be installed.

## Source Overview
TypeScript source code for the webserver is contained in the [src/](src/) folder. This code is transpiled to JavaScript in the dist/ folder by running the npm build script. This project uses the following layout for source code.

### [index.ts](src/index.ts)
This file simply takes in environment variables defined in [.env](./.env) and starts the express server with those arguments.

### [app.ts](src/app.ts)
This file defines the main Application class. It is used to initialize the webserver and all of its endpoints, along with the MongoDB server.

### [db.ts](src/db.ts)
This file initializes the MongoDB server at a given URL to be used by controllers and models.

### [routes](src/routes/)
Files in this folder are included by the main App object, and define the webserver's routing. These routes define the location of webpages and REST API endpoints.

### [controllers](src/controllers/)
Files in this folder correspond to files in the [routes](src/routes/) folder, handling the logic of server endpoints. They can serve a webpage, call an API command, or modify MongoDB database entries.

### [models](src/models/)
Each file in this folder defines a schema and object model for a MongoDB dataset. These can be used by controller modules to work with the MongoDB instance.

### [views](src/views/)
This folder contains files visible to the outside web. It contains HTML webpages with EJS capabilities along with webpage CSS and JS if desired.