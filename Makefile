# This Makefile is for quick minification of fd2l's javascript sources, along
#   with generating tests for minified source which reside in src/include for
#   testing and release.
#
# Eric Schroeder 2012-03-08
# Team Bananas, CS160 sjsu.edu

SHELL = /bin/sh
.PHONY: all minify gentest clean

JSSOURCEDIR := src/include
JSSOURCE := $(filter-out %-min.js,$(wildcard $(JSSOURCEDIR)/*.js))
JSMINSOURCE := $(JSSOURCE:%.js=%-min.js)

# CPAN seems to think this minifier will work well all the way back to Perl 5.8,
#   so I'm not too worried about compatibility at this time.
MINIFIER := utils/jsMinifier.pl

# Default target: Minifies all .js source in src/include
all : minify gentest

# Minifies all our js code in src/include
minify : $(JSMINSOURCE)

# Using `make src/include/filename.js` will minify only a single target.
#   This rule expands to include every target in src/include.
$(JSMINSOURCE) :
	$(MINIFIER) $(@:%-min.js=%.js) $@

# Generates test/minify.html qunit test from primary.html to test minified js
gentest :
	sed -r 's/include\/(.*)\.js/include\/\1-min.js/g' \
	  test/primary.html > test/minify.html 
	
# Removes all files ending in "-min.js" in src/include and test/minify.html
clean :
	-rm test/minify.html $(JSMINSOURCE)
