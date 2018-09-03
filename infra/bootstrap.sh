#!/bin/bash

oc login -u developer -p whateverYourPasswordWouldBe

oc new-project todo-app-dev
oc new-project todo-app-int
oc new-project todo-app-prod