#!/bin/bash
sudo su -

yum update -y

# Change directory to the location of package.json file
cd /root/kokonut_frontend/

# Remove node_modules folder
rm -rf node_modules
rm -rf package-lock.json

# Install dependencies
npm install

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

mkdir /root/kokonut_frontend/logs

nohup npm run dev -- --host 0.0.0.0 1>/root/kokonut_frontend/logs/$(date +%Y-%m-%d)_stdout.log 2>/root/kokonut_frontend/logs/$(date +%Y-%m-%d)_stderr.log &

exit