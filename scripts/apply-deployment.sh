#!/usr/bin/env bash
set -euox pipefail
IFS=$'\n\t'

mkdir -p deployment/.generated

for file in deployment/*.yaml
do
  envsubst < "$file" > "./deployment/.generated/$(basename "$file")"
done

kubectl apply -n "$KUBE_NAMESPACE" -f deployment/.generated/
