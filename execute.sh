#!/bin/bash

cd src/tests/endtoend/tests
npm install
npm install mocha -g
mocha *.js --full-trace --timeout 15000