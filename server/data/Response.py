from data.Common import Common
from datetime import date
from typing import Dict

class Response(Common):
    rows: Dict[str, str]
    lastModified: int # POSIX time