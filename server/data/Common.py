# Common data b/w Payload and Response

from data.Size import Size
from typing import List
from pydantic import BaseModel


# Payload when a sheet uploads data to our app
class Common(BaseModel):
    id: str # The ID of the spreadsheet
    name: str # title of the Google Spreadsheet
    columnNames: List[str]
    size: Size


