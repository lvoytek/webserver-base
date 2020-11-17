# webserver-base: Website Edition
A simple base for a website frontend and backend using TypeScript, Node.js, and Express

## Setup
1. Download and checkout the website version of the webserver base
```shell
git clone https://github.com/lvoytek/webserver-base.git
cd webserver-base
git checkout website
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
## Website Edition Information
This branch provides a webserver base with a simple website homepage and simple REST API capabilities

For this webserver to run properly, [NPM](https://www.npmjs.com/get-npm) must be installed.

## Source Overview
TypeScript source code for the webserver is contained in the [src/](src/) folder. This code is transpiled to JavaScript in the dist/ folder by running the npm build script. This project uses the following layout for source code.

### [index.ts](src/index.ts)
This file simply takes in environment variables defined in [.env](./.env) and starts the express server with those arguments.

### [app.ts](src/app.ts)
This file defines the main Application class. It is used to initialize the webserver and all of its endpoints.

### [routes](src/routes/)
Files in this folder are included by the main App object, and define the webserver's routing. These routes define the location of webpages and REST API endpoints.

### [controllers](src/controllers/)
Files in this folder correspond to files in the [routes](src/routes/) folder, handling the logic of server endpoints. They can serve a webpage or run an API command.

### [views](src/views/)
This folder contains files visible to the outside web. It contains HTML webpages with EJS capabilities along with webpage CSS and JS if desired.