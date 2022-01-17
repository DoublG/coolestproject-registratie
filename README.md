# Coderdojo

> registration procedure

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org). Keep it cool!

## Build Setup for production
Please note that we are using NODE_ENV === production to decide to use the proxy or not  
``` bash
# set following enviroment vars
$ export API_URL = https://coolestjury.azurewebsites.net/
$ export API_PREFIX = false
$ npm run generate
```
