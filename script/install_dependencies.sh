
#!/bin/bash

# update packages
sudo yum update -y

# install node.js
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# install npm packages
cd /root/kokonut_frontend/
npm install

