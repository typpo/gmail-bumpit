#!/bin/bash

echo "Setting up config.."
echo "It's strongly recommended that you use 2-factor auth and use an application-specific password for this application."
read -p "Enter your full gmail address: " email
read -s -p "Enter your password: " password

echo

heroku config:set GMAIL_BUMPER_EMAIL=$email >/dev/null &2>1
heroku config:set GMAIL_BUMPER_PASSWORD=$password >/dev/null &2>1
