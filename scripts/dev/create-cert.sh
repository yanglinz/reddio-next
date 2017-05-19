#!/usr/bin/env bash
set -euox pipefail
IFS=$'\n\t'

cat > openssl.cnf <<-EOF
  [req]
  distinguished_name = req_distinguished_name
  x509_extensions = v3_req
  prompt = no
  [req_distinguished_name]
  CN = *.reddio.test
  [v3_req]
  keyUsage = keyEncipherment, dataEncipherment
  extendedKeyUsage = serverAuth
  subjectAltName = @alt_names
  [alt_names]
  DNS.1 = *.reddio.test
  DNS.2 = reddio.test
EOF

openssl req \
  -new \
  -newkey rsa:2048 \
  -sha1 \
  -days 3650 \
  -nodes \
  -x509 \
  -keyout ./etc/nginx/ssl/selfsigned.key \
  -out ./etc/nginx/ssl/selfsigned.crt \
  -config openssl.cnf

rm openssl.cnf
