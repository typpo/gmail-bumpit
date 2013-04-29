#!/usr/bin/env python
#
# PoC for auto-bumped emails.
# Probably needs to switch to oauth (XOAuth) so everyone can use it.

import smtplib
import os
if 'GMAIL_BUMPER_EMAIL' in os.environ and 'GMAIL_BUMPER_PASSWORD' in os.environ:
  account_email = os.environ['GMAIL_BUMPER_EMAIL']
  account_pass = os.environ['GMAIL_BUMPER_PASSWORD']
else:
  from credentials import email as account_email
  from credentials import password as account_pass


BUMP_MESSAGE = """This email was bumped automatically.
"""

account_email = credentials.email
account_pass = credentials.password
def login_and_mail(subject, message_id):
  print 'Logging in and mailing...'
  session = smtplib.SMTP('smtp.gmail.com', 587)
  session.ehlo()
  session.starttls()

  print session.login(account_email, account_pass)

  headers = ["from: " + account_email,
             "subject: %s" % subject,
             "to: " + account_email,
             "In-Reply-To: <%s>" % message_id,
             "mime-version: 1.0",
             "content-type: text/html"]
  headers = "\r\n".join(headers)
  session.sendmail(account_email, account_email, \
      headers + "\r\n\r\n" + BUMP_MESSAGE)
  print 'Bumped "%s" successfully' % (subject)

if __name__ == "__main__":
  login_and_mail('test subj', '')

