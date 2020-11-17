# webserver-base: Database Edition
A simple base for a website frontend and backend using TypeScript, Node.js, and Express

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