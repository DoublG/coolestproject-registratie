FROM node:14-slim

WORKDIR /usr/src/app
VOLUME /usr/src/app/node_modules

COPY . .

RUN npm i
RUN npm i -g cross-env

EXPOSE 3000
CMD [ "npm", "run dev" ]
