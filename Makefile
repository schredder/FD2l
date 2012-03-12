# This Makefile is for quick minification of fd2l's javascript sources which 
#   reside in src/include for testing and release.
#
# Eric Schroeder 2012-03-08
# Team Bananas, CS160 sjsu.edu

SHELL = /bin/sh
.PHONY: all clean

JSSOURCEDIR := src/include
JSSOURCE := $(filter-out %-min.js,$(wildcard $(JSSOURCEDIR)/*.js))
JSMINSOURCE := $(JSSOURCE:%.js=%-min.js)
TESTGENERATE := cp test/primary.html test/minify.html && sed -i 's/jRequest.js/jRequest-min.js/g' && sed -i 's/gradeStats.js/gradeStates-min.js/g' && sed -i 's/grades.js/grades-min.js/g'


# CPAN seems to think this minifier will work well all the way back to Perl 5.8,
#   so I'm not too worried about compatibility at this time.
MINIFY := utils/jsMinifier.pl


# Default target: Minifies all .js source in src/include
all : $(JSMINSOURCE)
minify : $(all)


# Expands to every target. (That is, you can minify a single js source in
#   src/include by specifying the relative path of the desired "-min.js" file.
$(JSMINSOURCE) :
	$(MINIFY) $(@:%-min.js=%.js) $@


# Removes all files ending in "-min.js" in src/include
gentest: $(TESTGENERATE)
	
clean :
	-rm $(JSMINSOURCE)
	-rm test/minify.html
