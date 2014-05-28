#!/bin/sh
work_path="`pwd`"
NLS=$1;

echo ${work_path}
echo ${NLS}

npm i
bower install

rm -rf ${work_path}/usb-guide
grunt build:$NLS

