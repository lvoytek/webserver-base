#!/bin/bash

MONGOURL="https://repo.mongodb.org/apt/ubuntu/dists/focal/mongodb-org/4.4/multiverse/binary-amd64/mongodb-org-server_4.4.1_amd64.deb"

# Install MongoDB server on Ubuntu
curl $MONGOURL > mongodb.deb
sudo apt install ./mongodb.deb

rm mongodb.deb

# Activate the MongoDB daemon
sudo systemctl daemon-reload
sudo systemctl start mongod
sudo systemctl enable mongod