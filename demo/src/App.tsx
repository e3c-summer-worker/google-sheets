import React from 'react'
import { Text, Page, Grid, Link, Spacer } from '@geist-ui/react'
import Content from './components/Content'
import SpreadsheetInfo from './components/SpreadsheetInfo'
import { GithubIcon, ReactIcon, TSIcon } from './components/icons';
import './App.css'


const App: React.FC = () => (
    <Page id='page'>
        <Page.Header center>
            <Text h1 style={{ textAlign: 'center' }}>Google Sheets API Demo - v2</Text>
        </Page.Header>
        <Page.Content>
            <SpreadsheetInfo />
            <Spacer h={3} />
            <Content />
        </Page.Content>
        <Page.Footer id='footer'>
            <Footer />
        </Page.Footer>
    </Page >
)

const Footer = () => (
    <Grid.Container gap={1} >
        <Grid xs={24} justify='center'>
            <Text small>Made by <Link href='https://github.com/joshuanianji' underline color>Joshua Ji</Link></Text>
        </Grid>
        <Grid xs={24} justify='center'>
            <Text small style={{ textAlign: 'center' }}>Created with</Text>
            <Spacer w={0.33} />
            <ReactIcon size={20} />
            <Text small style={{ margin: '0px 8px' }}>+</Text>
            <TSIcon size={20} />
        </Grid>
        <Grid xs={24} justify='center'>
            <Link href='https://github.com/e3c-summer-worker/google-sheets/tree/main/demo' color block>
                <GithubIcon size={20} />
            </Link>
        </Grid>
    </Grid.Container>
)


export default App;
