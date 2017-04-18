FROM node:6.10.0

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# bundle app source
COPY . /usr/src/app

# install app dependencies
RUN ./scripts/install-yarn.sh
RUN yarn install

EXPOSE 4000
CMD ["yarn", "start"]
