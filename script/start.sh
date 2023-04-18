#!/bin/bash
BUILD_JAR=$(ls /data/apps/tomcat8.5/webapps/build/*.jar)
JAR_NAME=$(basename $BUILD_JAR)
echo "> build 파일명: $JAR_NAME" >> /data/apps/tomcat8.5/webapps/deploy.log

echo "> build 파일 복사" >> /data/apps/tomcat8.5/webapps/deploy.log
DEPLOY_PATH=/data/apps/tomcat8.5/webapps/
cp $BUILD_JAR $DEPLOY_PATH

echo "> 현재 실행중인 애플리케이션 pid 확인" >> /data/apps/tomcat8.5/webapps/deploy.log
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /data/apps/tomcat8.5/webapps/deploy.log
else
  echo "> kill -15 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

DEPLOY_JAR=$DEPLOY_PATH$JAR_NAME
echo "> DEPLOY_JAR 배포"    >> /data/apps/tomcat8.5/webapps/deploy.log
nohup java -jar $DEPLOY_JAR >> /data/apps/tomcat8.5/webapps/deploy.log 2>/data/apps/tomcat8.5/webapps/deploy_err.log &