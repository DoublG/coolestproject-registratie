FROM node:14-slim

WORKDIR /usr/src/app
VOLUME /usr/src/app/node_modules

COPY . .

RUN npm i

EXPOSE 3000
CMD [ "npm", "run dev" ]
