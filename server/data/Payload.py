from data.Size import Size
from data.Common import Common
from typing import List
from pydantic import BaseModel

Row = List[str]

# Payload when a sheet uploads data to our app
class Payload(Common):
    rows: List[Row]


