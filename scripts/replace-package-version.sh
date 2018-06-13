#!/usr/bin/env bash

# Grab package version set by semantic release
PACKAGE_VERSION=$(cat dist/cashmere/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# Replace package.json version with generated version
sed -i "" -E "s/(\"version\":[[:space:]]*\").+(\")/\1${PACKAGE_VERSION}\2/g" package.json

# Update package-lock.json version also
npm install --package-lock-only
