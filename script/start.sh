#!/bin/bash
sudo su -
cd /root/kokonut_frontend/

PORT=5173

PID=$(lsof -i :$PORT -t)

if [ -z "$PID" ]; then
    echo "$PORT번 으로 가동중인 프로젝트가 없습니다."
else
    echo "$PORT번 PID 값: $PID"
    kill -9 $PID
    sleep 5
fi

mkdir /root/kokonut_frontend/logs
nohup npm run dev 1>/root/kokonut_frontend/logs/$(date +%Y-%m-%d)_stdout.log 2>/root/kokonut_frontend/logs/$(date +%Y-%m-%d)_stderr.log &

exit