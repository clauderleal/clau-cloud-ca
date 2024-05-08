#!/usr/bin/env bash
# Check if there is instance running with the image name we are deploying
CURRENT_INSTANCE=$(sudo docker ps -a -q --filter ancestor="$IMAGE_NAME" --format="{{.ID}}")

# If an instance does exist stop the instance
if [ "$CURRENT_INSTANCE" ]
then
    sudo docker rm $(sudo docker stop $CURRENT_INSTANCE)
fi

# Pull down the instance from dockerhub
sudo docker pull $IMAGE_NAME

# Check if a docker container exists with the name of $CONTAINER_NAME if it does, remove the container
CONTAINER_EXISTS=$(sudo docker ps -a | grep $CONTAINER_NAME)
if [ "$CONTAINER_EXISTS" ]
then
    sudo docker rm $CONTAINER_NAME
fi

echo "$PRIVATE_KEY" > privatekey.pem
echo "$SERVER" > server.crt

sudo docker run -p 3000:3000 -d --name $CONTAINER_NAME \
    --network host \
    -v /home/ubuntu/privatekey.pem:/rails/config/ssl/privatekey.pem \
    -v /home/ubuntu/server.crt:/rails/config/ssl/server.crt \
    $IMAGE_NAME