COMPILE = node_modules/.bin/compile

all: haunted-styles.js index.js web.js
.PHONY: all

haunted-styles.js: src/*.js
	$(COMPILE) -f es -o $@ -e https://unpkg.com/haunted/haunted.js src/haunted-styles.js

index.js: haunted-styles.js
	sed 's/https:\/\/unpkg\.com\/haunted\/haunted\.js/haunted/' $^ > $@

web.js: haunted-styles.js
	cp -f $< $@

clean:
	@rm -f haunted-styles.js index.js web.js
.PHONY: clean
