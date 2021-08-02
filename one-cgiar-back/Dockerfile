FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --production --silent

COPY . .

EXPOSE 3000

CMD [ "node", "dist/index.js" ]
