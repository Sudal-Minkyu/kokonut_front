#!/bin/bash

# Stop existing process
echo "Stopping existing process..."
pkill -f node

# Change directory to the location of the JAR file
cd /root/kokonut_frontend/

# 10초간 대기합니다.
sleep 10

# 새로운 프로세스를 시작합니다.
#npm run dev
nohup npm run dev &

