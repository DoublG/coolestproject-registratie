FROM node:18-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm i

VOLUME /usr/src/app/node_modules

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]
