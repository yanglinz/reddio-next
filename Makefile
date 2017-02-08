.PHONY: build
build:
	lein cljsbuild once min

.PHONY: run
run:
	rlwrap lein figwheel

.PHONY: clean
clean:
	rm -rf resources/public/js/compiled
