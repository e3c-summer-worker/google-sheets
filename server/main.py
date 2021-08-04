from data.Response import Response
from data.Payload import Payload
from fastapi import FastAPI, Request
from fastapi.responses import PlainTextResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from deta import Deta
from dotenv import load_dotenv
from typing import List, Dict
import time
import os

load_dotenv()

PROJECT_KEY = os.getenv('PROJECT_KEY')

app = FastAPI()
deta = Deta(PROJECT_KEY)  # configure your Deta project 
sheets_db = deta.Base('sheets')


@app.get("/", response_class=PlainTextResponse)
def render():
    return "Google Sheets server is working!!"


@app.post("/upload")
async def upload_to_db(payload: Payload):
    # basically replace all data with the payload data
    # We put it under the id of the google sheets id
    sheets_db.put({
        'columnNames': payload.columnNames,
        'name': payload.name,
        'lastModified': int(time.time()),
        'size': payload.size.dict(),
        'rows': payload.rows
    }, payload.id)

    return PlainTextResponse(content='Success!')


@app.get("/sheet/{sheet_id}", response_model=Response)
async def retrieve_from_db(sheet_id: str, formatRows: bool = False):
    # retrieve all the data
    result = sheets_db.get(sheet_id)

    if result is not None:
        return_obj = None

        if formatRows:
            return_obj = format_rows(result, sheet_id)
        else:
            return_obj = {**result, 'id': sheet_id}
        
        print(return_obj)
        return JSONResponse(return_obj, 200)
    else:
        return JSONResponse('Sheet id {} doesn\'t exist!'.format(sheet_id), 404)


# format the rows to be a list of objects instead of a list of lists
def format_rows(result: Dict, sheet_id: str):
    # result dict without rows
    without_rows = {k: result[k] for k in set(list(result.keys())) - set('rows')}
    # instead of a 2D grid of cells,
    # we have a list of objects, formatted like so: {header1: cell1, header2: cell2, ...}
    row_objs = [format_objs(row, result['columnNames']) for row in result['rows']]

    # add ID, using python's (**) operator
    # https://how.wtf/spread-operator-in-python.html
    return {**without_rows, 'id': sheet_id, 'rows': row_objs}


def format_objs(row: List[str], headers: List[str]):
    zipped = zip(headers, row)
    return {header: cell for header, cell in zipped}


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    print('TIME:     {}: {}'.format(request.method, process_time))
    response.headers["X-Process-Time"] = str(process_time)
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
