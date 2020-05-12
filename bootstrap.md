---
permalink: /bootstrap
---
#!/usr/bin/env bash

set -e

xcode-select --install

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

brew install git

mkdir ~/github

cd ~/github

git clone https://github.com/seekayel/laptop-install.git

echo "Now just run ./laptop-install/init.sh"
