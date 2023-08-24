#!/bin/bash

sudo yum update -y

cd /root/kokonut_frontend

rm -rf node_modules
rm -rf package-lock.json

echo "인스톨시작"
npm install