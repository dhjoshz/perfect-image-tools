<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  <a>
</p>


<h1 align="center"> 
  <a href="http://nodejs.org" target="_blank"></a>
  Perfect Image Tools API
</h1>

## Description

Perfect Image Tools API

## Documentation

Swagger documentation in DEV environment

```
http://10.9.1.188:3064/api/
```

## Installation

```bash
$ npm install
```

## Setup Env variables for local development

replace `/src/config/image-tools-local.env` on `/src/config/image-tools.env`
```bash
# start mongoDB
$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
