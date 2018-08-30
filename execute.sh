#!/bin/bash

cd src/tests/endtoend/tests
git clean -fdx
npm install
mocha *.js --full-trace --timeout 20000