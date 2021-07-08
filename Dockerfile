# nodejs LTS
FROM node:14.17.3 as base
WORKDIR /usr/node/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Transpile TypeScript and Scss
COPY . .
ENV NODE_PATH = ./dist
RUN npm run build