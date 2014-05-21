#!/bin/sh
work_path="`pwd`"
NLS=$1;
BASE=$2;

echo ${work_path}
echo ${NLS}
echo ${BASE}

npm i
bower install

rm -rf ${work_path}/usb-guide
grunt build:$NLS:$BASE

