#!/bin/bash

MINISHIFT_VM_DRIVER=virtualbox
MINISHIFT_MEMORY=8GB
MINISHIFT_DISK_SIZE=40GB

OPENSHIFT_VERSION=3.10.0


minishift profiles set software-qs-tag
minishift start \
        --vm-driver=${MINISHIFT_VM_DRIVER} \
        --memory=${MINISHIFT_MEMORY} \
        --openshift-version ${OPENSHIFT_VERSION} \
        --disk-size=${MINISHIFT_DISK_SIZE}
oc login -u system:admin

#Setup gogs repository
oc new-project gogs
oc new-app -f http://bit.ly/openshift-gogs-template --param=HOSTNAME=gogs.$(minishift ip).nip.io
#First registered user is admin
#Manual import of the infra code required https://github.com/svettwer/Software-QS-Tag-2018

#Setup offline s2i build
oc project openshift
oc process -f $(git rev-parse --show-toplevel)/paas/yml/s2i_spring_offline_build_template.yml | oc apply -f -
oc start-build spring-offline-s2i

oc process -f $(git rev-parse --show-toplevel)/paas/yml/s2i_sakuli_build_template.yml \
           -p SOURCE_REPOSITORY_URL=https://github.com/svettwer/Software-QS-Tag-2018.git \
           -p SOURCE_DOCKER_CONTEXT_DIR=paas/docker \
           -p SOURCE_DOCKERFILE=sakuli_s2i_dockerfile| oc apply -f -
oc start-build sakuli-s2i