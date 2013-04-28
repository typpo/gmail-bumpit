from flask import Flask, url_for, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()

@app.route('/')
def index():
  pass

@app.route('/register', methods=['GET', 'POST'])
def register():
  if request.method == 'GET'
    return jsonify({'success': False})

  message_id = request.form.get('m_id', None)
  subject = request.form.get('subj', None)
  if message_id and subject:
    pass
  return jsonify({'success': True})
