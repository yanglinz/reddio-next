FROM clojure:lein-2.7.1

RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app

RUN ./scripts/docker/install-deps.sh && \
  ./scripts/docker/install-node.sh && \
  ./scripts/docker/install-yarn.sh && \
  yarn install && \
  lein deps
