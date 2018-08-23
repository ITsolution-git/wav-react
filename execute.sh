#!/bin/bash

cd src/tests/endtoend/tests
ls
mocha *.js --full-trace --timeout 15000