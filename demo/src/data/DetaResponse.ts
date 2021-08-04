import * as D from 'io-ts/Decoder'

const Size = D.struct({
    cols: D.number,
    rows: D.number
})

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Size = D.TypeOf<typeof Size>


export const Response = D.struct({
    id: D.string, // The ID of the spreadsheet
    name: D.string, // title of the Google Spreadsheet
    lastModified: D.number,
    columnNames: D.array(D.string),
    size: Size,
    rows: D.array(D.record(D.string)) // Record<string, string>[]
})


// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Response = D.TypeOf<typeof Response>