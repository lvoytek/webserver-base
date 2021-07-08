# nodejs LTS
FROM node:14.17.3 as base
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Transpile TypeScript and Scss
COPY . .
FROM base as production
ENV NODE_PATH = ./dist
RUN npm run build

EXPOSE 3000
CMD [ "node", "." ]
