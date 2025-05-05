#!/bin/bash


#git branch -D gh-pages
##git checkout -b gh-pages
#git push origin gh-pages --force

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/bradronto/bradronto.github.io.git
git push -u origin main
