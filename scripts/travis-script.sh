#!/bin/bash

# fail immediately when any script fails
set -e

# change to project root
cd $(dirname $0)/..

source scripts/travis-mode.sh

if is_lint; then
    npm run lint && commitlint-travis
elif is_unit; then
    npm run test:unit
elif is_build; then
    npm run build
elif is_publish; then
    ./scripts/publish.sh
elif is_publish_dev; then
    ./scripts/publish-next.sh
fi
