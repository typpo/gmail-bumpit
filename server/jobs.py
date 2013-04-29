#!/usr/bin/env python
# Schedules and runs tasks in redis

import os
import time
import datetime
import json
import redis
import gmail

redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')
redis = redis.from_url(redis_url)

def run():
  # Check if there's anything to do
  unix_now = time.mktime(datetime.datetime.now().timetuple())
  todos = redis.zrangebyscore('gmail_bump_jobs', float('-inf'), unix_now)
  for serialized_todo in todos:
    # Run all tasks that are due
    todo = json.loads(serialized_todo)
    gmail.login_and_mail(todo.subject, todo.message_id)

def add(subject, message_id, when):
  # Schedule a job at a certain time
  job = {
      'subject': subject,
      'message_id': message_id,
      }
  scheduled_for_ts = time.mktime(when.timetuple())
  r.zadd('gmail_bump_jobs', scheduled_for_ts, json.dumps(jobs))

if __name__ == "__main__":
  run()
