#!/usr/bin/env python
import time
import datetime
from redis import StrictRedis
from flask import Flask, request, url_for, jsonify
app = Flask(__name__)

@app.route('/')
def index():
  return 'Gmail bumpit ready.'

@app.route('/schedule', methods=['GET', 'POST'])
def schedule():
  if request.method == 'GET':
    return jsonify({'success': False})

  message_id = request.form.get('m_id', None)
  subject = request.form.get('subj', None)
  if message_id:
    print 'Scheduling bump...'
    print '\tsubject:', subject
    print '\tmessage id:', message_id

    job = {
        'subject': subject,
        'message_id': message_id,
        }

    r = StrictRedis(host='localhost', port=6379, db=4)
    scheduled_for = datetime.datetime.now() + datetime.timedelta(days=5)  # TODO
    scheduled_for_ts = time.mktime(scheduled_for.timetuple())
    r.zadd('jobs', scheduled_for_ts, json.dumps(jobs))

  return jsonify({'success': True})

if __name__ == '__main__':
  app.run(port=6900, debug=True)

