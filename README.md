# CHAT APP

## Requirements
- Node.js v20.10.0
- Docker

## Installation
- Install npm dependencies
```bash
npm install
```
- Pull docker image for mysql
```bash
docker pull mysql
```

## Run
- Set [.env](./.env) properties for server and database
- Set database properties in [docker-compose file](./docker-compose.yml)
- Run docker container  
```bash
docker-compose up
```
- Start the application
```bash
node server.js
```
