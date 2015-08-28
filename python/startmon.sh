#!/bin/bash

export PATH=$PATH:/opt/epics/base/bin/linux-arm
export EPICS_BASE=/opt/epics/base
export EPICS_HOST_ARCH=linux-arm
export PYEPICS_LIBCA=/opt/epics/base/lib/linux-arm/libca.so

cd /opt/server_activity_tracking/python
/usr/bin/nohup /usr/bin/python server_activity.py 2>&1 /dev/null &
/usr/bin/nohup /usr/bin/python epics_reporter.py 2>&1 /dev/null &
