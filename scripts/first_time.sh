#!/bin/bash -e
# Automatic setup script

cd `dirname $0`
cd ..

command -v heroku >/dev/null 2>&1 || { echo >&2 "Heroku toolkit needs to be installed (https://toolbelt.heroku.com/). Aborting."; exit 1; }

heroku login

randomstr=`tr -dc "a-z0-9" < /dev/urandom | head -c 8`
appname="gmail-bumper-$randomstr"

function failed {
  echo "!!! Setup failed.  Please fix and try again."
  echo "Removing the app we created..."
  heroku apps:destroy --app $appname --confirm $appname
  git remote rm heroku >/dev/null 2>&1
  echo "Done."
  exit 1
}

echo "Creating app $appname.."
heroku apps:create $appname
heroku addons:add redistogo || failed
heroku addons:add scheduler:standard || failed
heroku addons:add newrelic:standard || failed  # pings to keep app from idling on heroku's free tier

git push heroku master || failed

heroku ps:scale web=1

echo
echo "Edit your config file"
echo "< ... >"

echo 'Setup succeeded.'
echo
echo "To receive emails, open the heroku scheduler and set it to run 'python server/jobs.py' every 10 minutes."
heroku addons:open scheduler

#heroku open

echo "Done."
