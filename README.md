# your-service-name


## Docker commands

Some handy commands to work with the container.

**Note**: The Image and the container both have the name `docker-microservice-template`.

### Build the container
`docker build -t docker-microservice-template ./ --no-cache`

### Run the container
`docker run -e NODE_ENV='dev' -dit --name docker-microservice-template docker-microservice-template /bin/bash`

### Connect to the container
`docker exec -ti docker-microservice-template /bin/bash`

## Pull your project form github

1. Add your deplayment or user key to `/docker/secure/`
2. Rename `REPLACE_DEPLOYMENT_KEY` in the Docker file to the name of your key.
3. Use to docker `RUN` command to pull your sources from github

## Publish to AWS Continaer storage

1. Replace the Repository in `docker/scripts/publish-aws.sh`
2. Execute the script
