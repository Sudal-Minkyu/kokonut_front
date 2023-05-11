#!/bin/bash

cd /root/kokonut_frontend/

PID=$(pgrep -f npm)
kill $PID

sleep 5

nohup npm run dev -- --host 0.0.0.0 1>node.stdout 2>node.stderr &

exit

