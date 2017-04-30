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
	@npm run -s frontend:build
	@lein cljsbuild once min

.PHONY: format
format:
	@$(PRETTIER) --single-quote --write 'webpack.config.js' 'config.js' 'src/**/*.js'
	@lein cljfmt fix
	@$(TSLINT) --fix src/reddio_server/**/*.ts

.PHONY: lint
lint:
	@lein kibit
	@lein eastwood
	@$(TSLINT) src/reddio_server/**/*.ts

.PHONY: run
run:
	@rlwrap lein figwheel

.PHONY: watch
watch:
	@$(CONCURRENTLY) --kill-others \
		'npm run -s tsc:watch' \
		'npm run -s server:watch' \
		'npm run -s frontend:watch'

.PHONY: clean
clean:
	@lein clean
	@rm -rf resources/public/js/compiled
