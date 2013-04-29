#!/usr/bin/env python
from server.app import app

if __name__ == '__main__':
  app.run(port=6900, debug=True)
