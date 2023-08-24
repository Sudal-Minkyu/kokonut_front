#!/bin/bash
sudo su -

# npm의 경로를 변수로 지정
NPM_PATH=$(which npm)

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

cd /root/kokonut_frontend

pwd

nohup $NPM_PATH run dev &

exit