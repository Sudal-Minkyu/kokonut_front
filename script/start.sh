#!/bin/bash

cd /root/kokonut_frontend/

# 프로세스 종료
PID=$(pgrep -f npm)
kill $PID

# 10초간 대기합니다.
sleep 10

npm install @aws-sdk/client-acm
npm install aws-sdk

# 새로운 프로세스를 시작합니다.
nohup npm run dev -- --host 1>node.stdout 2>node.stderr &

exit
