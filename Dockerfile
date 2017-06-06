FROM clojure:lein-2.7.1

RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json /home/app
COPY yarn.lock /home/app
COPY project.clj /home/app
COPY scripts /home/app/scripts

RUN ./scripts/docker/install-deps.sh && \
  ./scripts/docker/install-node.sh && \
  ./scripts/docker/install-yarn.sh && \
  yarn install && \
  lein deps

COPY . /home/app
