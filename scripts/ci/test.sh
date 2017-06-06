#!/usr/bin/env bash
set -euox pipefail
IFS=$'\n\t'

function lint() {
  make lint
}

function test() {
  # doo expects phantomjs binary is in PATH
  PATH=$PATH:$(pwd)/node_modules/.bin lein doo phantom test once
}

function format() {
  make format

  if [ -n "$(git status --porcelain)" ]; then
    echo "Found unformatted changes"
    exit 1;
  fi
}

lint
format
test
