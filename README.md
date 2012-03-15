# CS 160 - Team7 - FD2l
Given a CSV document of students grades, and a set of standardized columns,
this is a toolset for visualizing a given students grades and their standing
in the course. This project is built entirely client side, with a jQuery
request to avoid any complicated server side configuration.

For more information please dont hesitate to reach out to one of the team
members.
## Testing Link
    http://kuncheff.com:82/job/fd2l/ws/test/index.html
    http://kuncheff.com:82/job/fd2l/ws/test/primary.html
    http://kuncheff.com:82/job/fd2l/ws/test/minify.html

## Folder Overview

	./docs/ 		
		- Walkthroughs and overviews of the application.
	./docs/INSTALL 
		- Walk through the details of setting up and the assumptions being 
			made by the application.
	./docs/csv-standards
		- Standards, assumptions, and expectations for the grade CSV file.
	./docs/iteration-history
		- Iteration History to track goals of each iterration.
	./docs/userstories
		- User Stories,duplicatted from bitbucket page.
	./src/  		
		- Source code of the project. Load index.html to begin execution.
	./src/lib/
		- Libraries that are used by this project.
	./src/include/
		- Our source code
	./src/gradesExample.csv
		- Sample grades CSV 
	./src/index.html
		- Sample Application Entry Point
	./src/style.css
		- Sample CSS for Application
	./test/		
		- tests for the source code 
	./test/index.html
		- Entry point for QUnit test execution.
	./test/index-min.html
		- Entry point for QUnit test execution against minified js source.
	./utils/		
		- non mandatory scripts and binaries that are used for regular maintenance. 

	Makefile    - Minifies javascript source for release
	README.md   - You are already here. Read something special

## Entry Point

	:::javascript
		$(requestCSV("gradesExample.csv", fn))

## Important Links

[Jenkins Continuous Integration Tool][1] | [Test Swarm][2] | [#TeamBananas][4]

[Wiki Docs][3] | [User Stories][5]

## Members

**Bob**

* bob.chatman@gmail.com
* TheAdvocateSB (AIM)

**Eric**

* esschroeder@me.com
* eric@sidmis.net (AIM/Gtalk)

**Yulian**

* yulian@kuncheff.com (Email,All Google Products, MSN)
* daegalus (AIM)

**Josh**

* josh.lipps@gmail.com

[1]: http://kuncheff.com:82/job/fd2l/
[2]: http://kuncheff.com:81/testswarm/
[3]: https://bitbucket.org/Daegalus/fd2l/wiki
[4]: irc://irc.freenode.net/TeamBananas
[5]: https://bitbucket.org/Daegalus/fd2l/wiki/User%20Stories
