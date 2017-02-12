BIN := node_modules/.bin
PRETTIER := $(BIN)/prettier

.PHONY: setup
setup:
	yarn install

.PHONY: build
build:
	npm run frontend:build
	lein cljsbuild once min

.PHONY: format
format:
	$(PRETTIER) --single-quote --write 'webpack.config.js' 'src/**/*.js'
	lein cljfmt fix

.PHONY: run
run:
	rlwrap lein figwheel

.PHONY: clean
clean:
	lein clean
	rm -rf resources/public/js/compiled
