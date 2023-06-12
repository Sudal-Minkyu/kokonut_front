#!/bin/bash
sudo su -
cd /root/kokonut_frontend/

PID=$(pgrep -f npm)
kill $PID

sleep 5

mkdir /root/kokonut_frontend/logs
nohup npm run dev -- --host 0.0.0.0 1>/root/kokonut_frontend/logs/$(date +%Y-%m-%d)_stdout.log 2>/root/kokonut_frontend/logs/$(date +%Y-%m-%d)_stderr.log &

exit
