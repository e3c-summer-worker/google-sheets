import React from 'react'
import useFetch from 'react-fetch-hook'
import { Response } from '../data/DetaResponse'
import { Text, Table, Loading, Code, Note } from '@geist-ui/react'
import { DecodeError } from 'io-ts/lib/Decoder'


const Content: React.FC = () => {
    const { isLoading, data, error } = useFetch('https://q77r6a.deta.dev/sheet/1MT2XUN_cMJA-tHjlxt7j_P6RwOZ9j08WIppq6BosKMo?formatRows=true', {
        formatter: async (response) => {
            const json = await response.json()
            const decoded = Response.decode(json)
            console.log(decoded)
            return decoded
        }
    })

    if (error) {
        return <>
            <Text h1 type='error'>HTTP Error!</Text>
            <Text>Code: {error.status}</Text>
            <Text>Message: {error.statusText}</Text>
            <Text>Dump: {JSON.stringify(error, undefined, 4)}</Text>
        </>
    }

    if (isLoading) {
        return <>
            <Loading>Loading Data</Loading>
        </>
    }


    if (data) {
        switch (data._tag) {
            case 'Right':
                return <DisplayContents data={data.right} />
            case 'Left':
                return <DisplayError err={data.left} />
        }
    }


    return <div>
        <Text type='error'>This shouldn't happen!</Text>
    </div>
}

const DisplayContents: React.FC<{ data: Response }> = ({ data }) => (
    <Table data={data.rows}>
        {data.columnNames.map((colName, idx) => <Table.Column prop={colName} label={colName} key={idx} />)}
    </Table>
)

const DisplayError: React.FC<{ err: DecodeError }> = ({ err }) => (
    <>
        <Text h2 type='error'>Decoding Error!</Text>
        <Note type='warning'>This usually happens when either an English cell or Chinese cell is empty</Note>
        <Code block>{JSON.stringify(err, null, 4)}</Code>
    </>
)


export default Content;
