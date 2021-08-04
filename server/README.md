# Sheets API

Google Sheets API middleware with Deta, written in FastAPI.

## Get Started:

```bash
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Deta Details

```bash
{
    "name": "main_micro",
    "runtime": "python3.7",
    "endpoint": "https://q77r6a.deta.dev",
    "visor": "enabled",
    "http_auth": "disabled"
}
```

## Test

Here is some sample data:

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"id": "14byB3NwMWaruVI6PTG4WuLFV7om1zefLb84JQQLycfE", "columnNames":["Display","Url"],"size":{"cols":2,"rows":6},"rows":[["HOME","https://eccchurch.ca/kids/"],["ECCC KIDS CHURCH ONLINE","https://eccchurch.ca/kids/church-online"],["PROGRAMS","https://eccchurch.ca/kids/programs"],["AWANA (K - GR. 2)","https://eccchurch.ca/kids/awana"],["KAIO (GR. 3-6)","https://eccchurch.ca/kids/kaio"],["UPDATES","https://eccchurch.ca/kids/updates"]]}' \
    http://localhost:8000/post
```
