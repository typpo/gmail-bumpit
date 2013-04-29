#!/bin/bash
# Automatic setup script

command -v heroku >/dev/null 2>&1 || { echo >&2 "Heroku toolkit needs to be installed (https://toolbelt.heroku.com/). Aborting."; exit 1; }

heroku login
heroku addons:add redistogo
