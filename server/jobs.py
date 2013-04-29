#!/usr/bin/env python
# Check to see if there's anything to do - scheduler works at
# half hour granularity

import os
import time
import datetime
import json
import redis
import gmail

redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')

def run():
  redis = redis.from_url(redis_url)

  unix_now = time.mktime(datetime.datetime.now().timetuple())
  todos = redis.zrangebyscore('gmail_bump_jobs', float('-inf'), unix_now)
  for serialized_todo in todos:
    todo = json.loads(serialized_todo)
    gmail.login_and_mail(todo.subject, todo.message_id)

def add(subject, message_id, when):
    redis = redis.from_url(redis_url)
    job = {
        'subject': subject,
        'message_id': message_id,
        }
    scheduled_for_ts = time.mktime(when.timetuple())
    r.zadd('jobs', scheduled_for_ts, json.dumps(jobs))
