# Webserver Base

<p align="center">
  <img src="https://img.shields.io/badge/Maintained%3F-Yes-green?style=flat-square">
  <img src="https://img.shields.io/github/license/lvoytek/webserver-base?style=flat-square">
  <img src="https://img.shields.io/github/issues/lvoytek/webserver-base?color=violet&style=flat-square">
</p>

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

## Configuration

To configure the server for your website, modify the [.env](.env) file. The variables contained here will be used for building the Docker images and for running the server on NodeJS. Variable meanings are shown below.

#### WEBSERVERNAME

This will control the backend naming scheme of your webserver, such as the name of the main Docker image

#### PORT

The backend network port in which the server runs on. If Nginx is used then it will convert this to port 80 or 443 externally. If you are running multiple webservers on one system make sure this port is unique.

#### MONGOURL

This contains the URL of the MongoDB server for the project. If using a local Mongo server with Docker, make sure the name starts with mongodb://mongodb/. The name after that refers to the database to use for the webserver. Make sure this is also unique on a per-webserver basis.

#### TOKENSECRET

This is used for encrypting user data such as email, username, and full name, (not passwords, those are irreversably hashed). <b> Change this value before deploying your server.</b> 'authsecretstring' is <b>NOT</b> a good secret token.

#### DOMAIN

This variable contains the base URL for your website. Users will enter this into their web browser to access your site.

#### USINGHTTPS

This variable is a boolean. Set it to <b>true</b> to use HTTPS and port 443 on your site (recommended). Running the build with Docker will set up your Nginx configuration for it automatically. Leave it set to <b>false</b> to run on port 80 with HTTP (not secure).

#### USINGEMAILAUTH

This variable is a boolean. Set it to <b>true</b> to require a user to verify their email after signing up before they become a full user. This requires your own email to send out the authentication link. Leave it on <b>false</b> if a user does not need to verify their email before becoming a full user.

#### AUTHENTICATIONEMAIL

If USINGEMAILAUTH is <b>true</b> then this will be the email that the authentication links will be automatically sent from. This must be an email you own and can sign into.

#### AUTHENTICATIONEMAILPASSWORD

If USINGEMAILAUTH is <b>true</b> then this is the password normally used to access the authentication sender email address.

#### MAILSERVICE

If USINGEMAILAUTH is <b>true</b> then this is the name of the email service that the authentication sender email address is associated with. For example, if your email uses G-suite with Google then the service is "gmail". For a list of well known email services to add here, see [NodeMailer services](https://nodemailer.com/smtp/well-known/).
