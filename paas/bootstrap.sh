#!/bin/bash

MINISHIFT_VM_DRIVER=virtualbox
MINISHIFT_MEMORY=8GB

OPENSHIFT_VERSION=3.10.0


minishift profiles set software-qs-tag
minishift start --vm-driver=${MINISHIFT_VM_DRIVER} --memory=${MINISHIFT_MEMORY} --openshift-version ${OPENSHIFT_VERSION}
oc login -u system:admin

oc new-project gogs
oc new-app -f http://bit.ly/openshift-gogs-template --param=HOSTNAME=gogs.$(minishift ip).nip.io