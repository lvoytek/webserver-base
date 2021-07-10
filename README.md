# Webserver Base

A simple base for a website frontend and database backend using TypeScript, Node.js, Express, and MongoDB

## Setup

1. Download and checkout the website version of the webserver base

```shell
git clone https://github.com/lvoytek/webserver-base.git
cd webserver-base
git submodule update --init --recursive
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

## Setup with Docker

1. Download and checkout the website version of the webserver base

```shell
git clone https://github.com/lvoytek/webserver-base.git
cd webserver-base
git submodule update --init --recursive
```

2. Build the docker image alongside Mongo

```shell
make build
```

## Running with Docker

To run the application with docker, just use

```shell
make start
```

Then, to stop the application, run

```shell
make stop
```

## Repo Information

This repository provides a webserver base with both a website frontend and a NodeJS + MongoDB database on the backend. Database interactions are managed through Mongoose. Meanwhile the frontend uses pages created from Sass and Embedded JS templates. Backend code is written in TypeScript.

For this webserver to run properly, [NPM](https://www.npmjs.com/get-npm) and [MongoDB](https://www.mongodb.com/try/download), or [Docker Compose](https://docs.docker.com/compose/install/) and [Make](https://www.gnu.org/software/make/) must be installed.

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

This folder contains Embedded JavaScript files that translate into visible HTML webpages. It can use other assets such as images and scripts from the [public/](src/public/) folder.

### [public](src/public/)

This folder contains scripts, images, and stylesheets visible to the outside web. They can be utilized by EJS webpages in the [views/](src/views/) folder.
