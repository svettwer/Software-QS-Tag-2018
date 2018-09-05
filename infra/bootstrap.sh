#!/bin/bash

oc login -u developer -p whateverYourPasswordWouldBe

oc new-project todo-app-dev
oc new-project todo-app-int
oc new-project todo-app-prod

oc project todo-app-dev
oc process -f infra/yml/jenkins_template.yml | oc apply -f -

oc policy add-role-to-user edit system:serviceaccount:todo-app-dev:jenkins -n todo-app-int
oc policy add-role-to-user edit system:serviceaccount:todo-app-dev:jenkins -n todo-app-prod