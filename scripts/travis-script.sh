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
elif is_build; then
    npm run build
elif is_publish_github; then
    npm run publish:github
fi
