# Software-QS-Tag-2018
This repository contains all sources of my Talk *Software testing in CI/CD pipelines*
on the Software QS Tag 2018.

## Repository structure

* paas  
  This directory contains everything required to setup the paas infrastructure.
* buzzword-bingo-generator  
  Contains a generator for buzzword bingo games.
* infra  
  Contains the infrastructure configuration to build the sample app.
* src  
  Contains the source code of the sample app
* e2e  
  Contains a Sakuli end-2-end testsuite
  
## Setup
A minishift setup is required on your local machine.
The project setup is mostly automated via the bootsrap.sh script in the *paas* folder.
Please have a look at the script for the manual import of the todo-app repository
into the local gogs setup. After cloning/forking the repository and setting up the paas, 
it may be required to change the repository references in the *infra* configuration files
depending on the user name you've chosen for your gogs installation.
In addition, it may be required to change the ip addresses in the configuration files
depending the ip address that has been assigned to your cluster. I recommend a search and
replace for `192.168.99.101` to the ip delivered by the command `minishift ip`