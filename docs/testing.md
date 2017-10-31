# Testing

## Basics

## Setup

### Database

Run a local postgresql instance:

```Bash
docker pull postgres:10
# start
docker run --name microservice-tests-db -p 5432:5432 -e POSTGRES_USER=microservice_test -e POSTGRES_PASSWORD=test -d postgres:10
```
