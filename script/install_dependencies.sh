#!/bin/bash

# nvm 초기화 및 Node.js 버전 활성화
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # nvm 초기화

# 활성화된 Node.js 버전에 따른 npm의 경로를 변수로 지정
NPM_PATH=$(which npm)

sudo yum update -y

cd /root/kokonut_frontend

rm -rf node_modules
rm -rf package-lock.json

echo "인스톨시작"

pwd

# 변수를 사용하여 npm install 실행
$NPM_PATH install
