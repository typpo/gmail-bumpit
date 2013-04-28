#!/usr/bin/env python
import gmail
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
  if message_id and subject:
    print 'Scheduling bump...'
    print '\tsubject:', subject
    print '\tmessage id:', message_id
    gmail.login_and_mail(subject, message_id)

  return jsonify({'success': True})

if __name__ == '__main__':
  app.run(port=6900, debug=True)

