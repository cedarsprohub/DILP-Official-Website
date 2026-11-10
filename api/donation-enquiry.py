"""Vercel maps this file to /api/donation-enquiry.

All of the work is in _service.py; files beginning with an underscore are not
turned into routes, so the logic can be shared without being exposed twice.
"""

import os
import sys

sys.path.append(os.path.dirname(__file__))

from _service import app  # noqa: E402  (path has to be set first)

__all__ = ["app"]
