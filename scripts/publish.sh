#!/bin/bash

# fail immediately when any script fails
set -e

# change to project root
cd $(dirname $0)/..

# Build project
npm run build

#Generating code coverage
npm run test:unit

# Publish code coverage to Coveralls
cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

# Publishing to NPM
npx semantic-release

# Copy redirection error page for Github Pages
cp dist/user-guide/index.html dist/user-guide/404.html
