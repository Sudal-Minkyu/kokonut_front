#!/bin/bash

sudo -i

PORT=5173

PID=$(lsof -i :$PORT -t)

if [ -z "$PID" ]; then
    echo "$PORT번 으로 가동중인 프로젝트가 없습니다."
else
    echo "$PORT번 PID 값: $PID"
    kill -9 $PID
    sleep 5
fi

cd /root/kokonut_frontend/

# 디렉토리 존재 여부 확인
if [ ! -d "/root/kokonut_frontend/logs" ]; then
    mkdir /root/kokonut_frontend/logs
fi

nohup npm run dev -- --host 0.0.0.0 1>/root/kokonut_frontend/logs/$(date +%Y-%m-%d)_stdout.log 3>/root/kokonut_frontend/logs/$(date +%Y-%m-%d)_stderr.log &

exit