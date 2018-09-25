#!/bin/bash

oc run sakuli-s2i-testsuite \
    --image=172.30.1.1:5000/todo-app-int/sakuli-s2i-testsuite:latest \
    --attach=true \
    --rm \
    --restart=Never \
    -l application=sakuli-s2i-testsuite \
    -n todo-app-int
