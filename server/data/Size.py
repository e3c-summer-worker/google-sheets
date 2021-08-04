from pydantic import BaseModel

class Size(BaseModel):
    cols: int
    rows: int
