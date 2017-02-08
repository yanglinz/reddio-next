.PHONY: setup
setup:
	yarn install

.PHONY: build
build:
	npm run build
	lein cljsbuild once min

.PHONY: run
run:
	rlwrap lein figwheel

.PHONY: clean
clean:
	rm -rf resources/public/js/compiled
