#!/bin/bash

rm -rf dist
ng build --configuration production
docker rmi mroncatto/itflow
docker rmi mroncatto/itflow:1.0-SNAPSHOT
docker build -t mroncatto/itflow .
docker tag mroncatto/itflow mroncatto/itflow:1.0-SNAPSHOT
docker push mroncatto/itflow:1.0-SNAPSHOT