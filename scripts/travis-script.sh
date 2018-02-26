#!/bin/bash

# fail immediately when any script fails
set -e

# change to project root
cd $(dirname $0)/..

source scripts/travis-mode.sh

if is_lint; then
    npm run lint
elif is_unit; then
    npm run test:unit
elif is_build_lib; then
    npm run build:lib
elif is_build_demo; then
    npm run build:demo
fi
