/**
 * Checks if content sheet is there
 * 
 * @param {Spreadsheet} spreadsheet the active spreadsheet
 * @return {Sheet} content sheet
 * 
 */
const validateSheets = (spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet) => {
    const content = spreadsheet.getSheetByName('Content');

    if (!content) {
        const err = 'Missing Content spreadsheet. Please make sure you have a spreadsheet called \'Content\'';
        throw new Error(err)
    }

    return content
}

/**
 * Validate Headers. We make sure there are no empty cells
 * 
 * @param {Object[]} The headers (first row)
 * @return {string[]} Validated headers
 * 
 */
const validateHeaders = (headers: Object[]): string[] => {
    // empty cells are represented by an empty string
    const newHeaders = headers.filter((value) => value !== '')
    if (newHeaders.length === headers.length) {
        // for typechecking
        return newHeaders.map(header => header.toString())
    } else {
        throw new Error('Headers either has a blank cell or is weird')
    }
}

/**
 * Validate data. We also make sure there are no empty rows.
 * 
 * @param {Object[][]} The data
 * @return {string[][]} Validated data
 * 
 */
const validateData = (data: Object[][]) => {
    const output: string[][] = []
    // empty cells are represented by an empty string
    for (let row of data) {
        const acc: string[] = []
        for (let cell of row) {
            if (cell === '') {
                // empty cell. ABORT!
                throw new Error('Blank cell detected in the data! Please do not include blank cells')
            } else {
                acc.push(cell.toString())
            }
        }
        output.push(acc)
    }

    return output
}

interface Size {
    cols: number,
    rows: number
}

type Row = string[]

interface Payload {
    id: string, // The ID of the spreadsheet
    name: string // title of the Google Spreadsheet
    columnNames: string[]
    size: Size
    rows: Row[]
}

/**
 * Send a post request to Deta
 * 
 * @param {Payload} The data
 * @return {HTTPResponse} The response
 * 
 */
const postToDeta = (payload: Payload) => {
    const url = 'https://q77r6a.deta.dev/upload';
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        payload: JSON.stringify(payload)
    };
    const response = UrlFetchApp.fetch(url, options);
    return response.getContentText()
}

/**
 * Uploads code to deta
 * 
 * @return {null} we hope it works
 * 
 */
const uploadToDeta = () => {
    const ui = SpreadsheetApp.getUi();
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    try {
        const contentSheet = validateSheets(spreadsheet);
        const dataRange = contentSheet.getDataRange();
        const values = dataRange.getValues();

        const [rawHeaders, ...rawData] = values;
        const headers = validateHeaders(rawHeaders)
        const data = validateData(rawData)

        const payload = {
            id: spreadsheet.getId(),
            name: spreadsheet.getName(),
            columnNames: headers,
            size: { cols: headers.length, rows: data.length },
            rows: data
        }
        Logger.log('Payload!' + JSON.stringify(payload))

        const response = postToDeta(payload)
        Logger.log('Response!' + JSON.stringify(response))

        ui.alert('Deployment Success!', 'Data is now updated on the cloud!', ui.ButtonSet.OK);

    } catch (err) {
        Logger.log('Error!' + JSON.stringify(err))
        ui.alert(err);
    }
}

/**
 * Runs when the button is pressed
 * 
 * @return {null} we hope it works
 * 
 */
const reactToButton = () => {
    const ui = SpreadsheetApp.getUi(); // Same variations.

    const result = ui.alert(
        'Confirm Upload Data',
        'Confirm that you want to upload/update the data to the cloud.',
        ui.ButtonSet.YES_NO);

    // Process the user's response.
    if (result == ui.Button.YES) {
        // User clicked "Yes".
        uploadToDeta()
    }
}

