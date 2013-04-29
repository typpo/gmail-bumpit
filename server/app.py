#!/usr/bin/env python
# Basic flask app for bump scheduling

import time
import datetime
import jobs
from flask import Flask, request, url_for, jsonify
app = Flask(__name__)

@app.route('/')
def index():
  return 'Your gmail bump server is running.'

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
    scheduled_for = datetime.datetime.now() + datetime.timedelta(days=5)  # TODO
    jobs.add(subject, message_id, scheduled_for)


  return jsonify({'success': True})

if __name__ == '__main__':
  app.run(port=6900, debug=True)

