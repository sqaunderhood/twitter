#!/bin/bash
set -e

echo "set git environment"
git config user.email "igrekde@gmail.com"
git config user.name "Travis Egor Tolstoy"
git remote rm origin
git remote add origin https://etolstoy:${GITHUB_TOKEN}@github.com/etolstoy/mobileunderhood.git
git checkout master

echo "run update"
babel-node update

echo "save dump"
git add --all dump
git commit -m $'save dump\n\n[ci skip]'
git push origin master &>/dev/null

echo "build'n'deploy"
npm run deploy
