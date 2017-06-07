BIN := node_modules/.bin
PRETTIER := $(BIN)/prettier
CONCURRENTLY := $(BIN)/concurrently
TSLINT := $(BIN)/tslint

.PHONY: setup
setup:
	@yarn install
	@lein deps

.PHONY: build
build:
	@NODE_ENV=production npm run -s frontend:build
	@lein cljsbuild once min

.PHONY: test
test: clean
	@lein doo chrome test once

.PHONY: test-watch
test-watch:
	@lein doo chrome test

.PHONY: format
format:
	@$(PRETTIER) --write '*.js'
	@$(PRETTIER) --write '{src,test}/**/*.{js,css,scss,ts,tsx}'
	@lein cljfmt fix
	@$(TSLINT) --fix src/reddio_server/**/*.ts

.PHONY: lint
lint:
	@lein kibit
	@lein eastwood
	@$(TSLINT) src/reddio_server/**/*.ts

.PHONY: watch
watch:
	@$(CONCURRENTLY) --kill-others \
		'npm run -s tsc:watch' \
		'npm run -s server:watch' \
		'npm run -s frontend:watch'

.PHONY: up
up:
	sudo nginx -p "$(shell pwd)" -c $(shell pwd)/etc/nginx/nginx.conf

.PHONY: down
down:
	sudo nginx -s quit

.PHONY: clean
clean:
	@lein clean
	@rm -rf resources/public/js/compiled
