#!/bin/bash

export PATH=$PATH:/opt/epics/base/bin/linux-arm
export EPICS_BASE=/opt/epics/base
export EPICS_HOST_ARCH=linux-arm

export ACCESS_KEY=168c84e0c7f51658d9df40b50e9164e2
export SECRET_KEY=793291214907ab398fa3b232d25cad79dd10919eaced6ef0da51e0fbfeb0241a
export NODE_PATH=/opt/node_modules

cd /opt/server_activity_tracking/nodejs
/usr/bin/nohup /usr/bin/nodejs reporter.js 2>&1 /dev/null &
/usr/bin/nohup /usr/bin/nodejs disk.js 2>&1 /dev/null &
/usr/bin/nohup /usr/bin/nodejs network.js 2>&1 /dev/null &
#/usr/bin/nohup /usr/bin/nodejs epics.js 2>&1 /dev/null &
/usr/bin/nohup /usr/bin/nodejs sector7F.js 2>&1 /dev/null &
/usr/bin/nohup /usr/bin/nodejs sector8F.js 2>&1 /dev/null &
