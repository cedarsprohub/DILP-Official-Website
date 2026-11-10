"""Vercel maps this file to /api/healthz.

Open it in a browser after deploying: it reports whether the mail settings
are complete, without printing any of them.
"""

import os
import sys

sys.path.append(os.path.dirname(__file__))

from _service import app  # noqa: E402

__all__ = ["app"]
