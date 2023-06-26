#! /bin/bash

npm install

make create_index

npm run start:dev

tail -f /dev/null
