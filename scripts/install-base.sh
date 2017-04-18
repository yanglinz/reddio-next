#!/usr/bin/env bash
set -euox pipefail
IFS=$'\n\t'

apt-get update && apt-get install -y apt-transport-https curl lsb-release gettext
