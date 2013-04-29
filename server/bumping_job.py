#!/usr/bin/env python
# Check to see if there's anything to do - scheduler works at
# half hour granularity

from redis import StrictRedis
import time
import datetime

r = StrictRedis(host='localhost', port=6379, db=4)

unix_now = time.mktime(datetime.datetime.now().timetuple())
todos = r.zrangebyscore('jobs', float('-inf'), unix_now)
for todo in todos:
  print todo
  gmail.login_and_mail(subject, message_id)
