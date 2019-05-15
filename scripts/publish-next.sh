#!/bin/bash

# fail immediately when any script fails
set -e

# change to project root
cd $(dirname $0)/..

# restore NPM dependencies
npm ci

# Build project
npm run build

# Go to Cashmere build output directory
cd $(dirname $0)/../dist/cashmere

# Make it possible to install this version using `npm i -S @healthcatalyst/cashmere@next`
npm config set tag next

# get current published version
currentVersion=$(npm info @healthcatalyst/cashmere@latest version)

# break down the version number into its components
regex="([0-9]+).([0-9]+).([0-9]+)"
[[ $currentVersion =~ $regex ]]
major="${BASH_REMATCH[1]}"
minor="${BASH_REMATCH[2]}"
patch="${BASH_REMATCH[3]}"

# increment the patch portion
patch=$((patch + 1))

# assemble the version number
version="${major}.${minor}.${patch}"

# tag it with dev and a timestamp
fullVersion=$version-dev.$(date +"%Y%m%d%H%M%S")

echo Publishing $fullVersion

# Set version to timestamped dev version
npm version $fullVersion --git-tag-version false

# Publish the package
npm publish
