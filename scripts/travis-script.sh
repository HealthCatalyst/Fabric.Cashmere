#!/bin/bash

# fail immediately when any script fails
set -e

# change to project root
cd $(dirname $0)/..

source scripts/travis-mode.sh

if is_lint; then
    npm run lint
elif is_aot; then
    npm run ci:build
elif is_unit; then
    npm run ci:test
elif is_e2e; then
    npm run e2e
elif is_lib_build; then
    npm run lib:build
fi
