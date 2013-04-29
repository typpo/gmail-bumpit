#!/bin/bash -e
# Automatic setup script

cd `dirname $0`
cd ..

command -v heroku >/dev/null 2>&1 || { echo >&2 "Heroku toolkit needs to be installed (https://toolbelt.heroku.com/). Aborting."; exit 1; }

heroku login
heroku addons:add redistogo
heroku addons:add scheduler:standard
heroku addons:add newrelic:standard   # pings to keep app from idling on heroku's free tier

randomstr=`tr -dc "[:alpha:]" < /dev/urandom | head -c 8`
heroku apps:create "gmail-bumper-$randomstr"
git push heroku master

heroku ps:scale web=1

echo 'Setup succeeded.'
echo 'Opening the Heroku scheduler. To receive emails, you need to set python scripts/cron.sh to run every half hour or so.'
heroku addons:open scheduler

#heroku open

echo "Done."
