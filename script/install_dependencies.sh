#!/bin/bash

# update packages
sudo yum update -y

# Change directory to the location of package.json file
cd /root/kokonut_frontend/

# Remove node_modules folder
rm -rf node_modules

# Install dependencies
npm install