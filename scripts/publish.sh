#!/bin/bash

# fail immediately when any script fails
set -e

# change to project root
cd $(dirname $0)/..

# Build project
npm run build

# Publish code coverage to Coveralls
cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

# Copy redirection error page for Github Pages
cp dist/user-guide/index.html dist/user-guide/404.html

# Redirect Cashmere Url to CNAME file
echo $CASHMERE_URL > dist/user-guide/CNAME
