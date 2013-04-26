#!/usr/bin/env python
#
# PoC for auto-bumped emails.
# Probably needs to switch to oauth (XOAuth) so everyone can use it.

import smtplib

BUMP_MESSAGE = """This email was bumped automatically.
"""

def login_and_mail(account_email, account_pass):
  session = smtplib.SMTP('smtp.gmail.com', 587)
  session.ehlo()
  session.starttls()

  print session.login(account_email, account_pass)

  headers = ["from: " + account_email,
             "subject: RE: Teste mail",
             "to: " + account_email,
             "In-Reply-To: <CABHM1-p9=yNM4Sw-_zt-GgDj5MeLz_b0Nm_SC23juqHQA_V+Pw@mail.gmail.com>",
             "mime-version: 1.0",
             "content-type: text/html"]
  headers = "\r\n".join(headers)
  session.sendmail(account_email, account_email, \
      headers + "\r\n\r\n" + BUMP_MESSAGE)
  print 'bumpit success!'

if __name__ == "__main__":
  # 2-factor auth?  Get a password from
  # https://accounts.google.com/b/0/IssuedAuthSubTokens?hide_authsub=1
  login_and_mail('emailaddress@gmail.com', 'password')

