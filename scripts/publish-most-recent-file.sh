#!/usr/bin/env bash

parent_dir="$(dirname "$0")"
node ./scripts/open-newest-file.js | node ./scripts/publish-file.js