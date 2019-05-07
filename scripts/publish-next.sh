#!/bin/bash

# fail immediately when any script fails
set -e

# change to project root
cd $(dirname $0)/..

# Build project
npm run build

# Go to Cashmere build output directory
cd $(dirname $0)/../dist/cashmere

# Make it possible to install this version using `npm i -S @healthcatalyst/cashmere@next`
npm config set tag next

# Set version to timestamped beta version
npm version 0.0.0-beta.$(date +"%Y%m%d%H%M%S") --git-tag-version false

# Publish the package
npm publish
