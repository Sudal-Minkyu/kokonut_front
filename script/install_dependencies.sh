#!/bin/bash

# npm의 경로를 변수로 지정
NPM_PATH=$(which npm)

sudo yum update -y

cd /root/kokonut_frontend

rm -rf node_modules
rm -rf package-lock.json

echo "인스톨시작"

pwd

# 변수를 사용하여 npm install 실행
$NPM_PATH install