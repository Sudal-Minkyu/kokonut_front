#!/bin/bash
sudo su -

yum update -y

cd /root/kokonut_frontend

rm -rf node_modules
rm -rf package-lock.json

npm install
echo "인스톨시작"

PORT=5173
echo "프로세스 종료용 포트조회 : $PORT"

PID=$(lsof -i :$PORT -t)

if [ -z "$PID" ]; then
    echo "종료할 프로세스가 없습니다. $PORT"
else
    echo "해당 프로세스를 종료합니다. $PORT is: $PID"
    kill -9 $PID
    sleep 5
fi

pwd

nohup npm run dev &