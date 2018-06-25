#!/bin/bash

cd ./domain
npm run build
cd ../data
npm run build
cd ../rest-api
npm run build
cd ../website
npm run build
