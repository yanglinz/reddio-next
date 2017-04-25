BIN := node_modules/.bin
PRETTIER := $(BIN)/prettier
CONCURRENTLY := $(BIN)/concurrently

.PHONY: setup
setup:
	yarn install
	lein deps

.PHONY: build
build:
	npm run -s frontend:build
	lein cljsbuild once min

.PHONY: format
format:
	$(PRETTIER) --single-quote --write 'webpack.config.js' 'config.js' 'src/**/*.js'
	lein cljfmt fix

.PHONY: lint
lint:
	lein kibit
	lein eastwood

.PHONY: run
run:
	rlwrap lein figwheel

.PHONY: watch
watch:
	$(CONCURRENTLY) 'npm run -s frontend:watch' 'npm run -s server:watch'

.PHONY: clean
clean:
	lein clean
	rm -rf resources/public/js/compiled
