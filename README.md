# ebs-test

Nodejs Fullstack Test for EBS-Integrator

Project is splitted in 4 parts/packages: `domain`, `data`, `rest-api` and `website`.
Every part has its npm dependencies.

Api documentation: [swagger.yaml](rest-api/swagger.yaml)

Api logs: `rest-api/logs/access.log`

### 1. Clone the repository

`git clone https://github.com/mitica/ebs-test.git`

### 2. Build

In this directory type in terminal: 

`npm run build` or `sh build.sh`

or type `npm run build` in every directory.

### 3. Start apps

Go in folder `rest-api` and type: `npm run start`

Then go in folder `website` and type: `npm run start`

`rest-api` address: `http://localhost:41825`

`website` address: `https://localhost:41826` **HTTPS**!


## Details

Project is written in TypeScript.

`.env` files are published on github.

Database uri: `mongodb://admin:test-admin10@ds261570.mlab.com:61570/ebs-test`

For dashboard I user server site render and Vuejs on client for calling API.
