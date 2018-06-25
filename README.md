# ebs-test

Test for EBS-Integrator

Project is splited in 4 parts/packages: `domain`, `data`, `rest-api` and `website`.
Every part has its npm dependencies.

Api documentation: [swagger.yaml](rest-api/swagger.yaml)

Api logs: `rest-api/logs/access.log`

## 1. Clone the repository

`git clone https://github.com/mitica/ebs-test.git`

## 2. Build

In this directory type in terminal: 

`npm run build` or `sh build.sh`

or type `npm run build` in every directory.

### 3. Start apps

Go in folder `rest-api` and type: `npm run start`

Then go in folder `website` and type: `npm run start`

`rest-api` address: `http://localhost:41825`

`website` address: `https://localhost:41826` **HTTPS**!
