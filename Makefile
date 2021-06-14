# This makefile has been created to help developers perform common actions.

# Do not remove this block. It is used by the 'help' rule when
# constructing the help output.
# help:
# help: Makefile help
# help:

# help: help                           - display this makefile's help information
.PHONY: help
help:
	@grep "^# help\:" Makefile | grep -v grep | sed 's/\# help\: //' | sed 's/\# help\://'

# help: install                        - Install necessary dependencies
.PHONY: install
install:
	@rbenv install -s
	@bundle install
	@pre-commit install


# help: update                         - Update necessary dependencies
.PHONY: update
update:
	@pre-commit autoupdate
	@bundle update github-pages

# help: clean                          - clean all files using .gitignore rules
.PHONY: clean
clean:
	@git clean -X -f -d
	@git branch --merged| egrep -v "(^\*|master)" | xargs git branch -d


# help: scrub                          - clean all files, even untracked files
.PHONY: scrub
scrub:
	git clean -x -f -d
	@git branch --merged| egrep -v "(^\*|master)" | xargs git branch -d


# help: pre-commit                     - run pre-commit
.PHONY: pre-commit
pre-commit:
	@pre-commit run

# help: pre-commit-all                 - run full pre-commit on all files
.PHONY: pre-commit-all
pre-commit-all:
	@pre-commit run --all-files


# help: test                           - run tests
.PHONY: test
test:
	@echo "no tests yet :-|"


# help: style                          - perform code format compliance check
.PHONY: style
style:
	@echo "hmm ... not sure yet"


# help: serve                          - serve project html documentation
.PHONY: serve
serve: install
	@jekyll serve &
	@open http://127.0.0.1:4000
	@fg


# Keep these lines at the end of the file to retain nice help
# output formatting.
# help:
