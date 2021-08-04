import { Link, Text, Grid } from '@geist-ui/react';

interface Props { }

const SpreadsheetInfo: React.FC<Props> = () => (
    <Grid.Container>
        <Grid xs={24} justify='center'>
            <Text h4 style={{ textAlign: 'center' }}>
                Edit the spreadsheet in the link below to see live changes!
            </Text>
        </Grid>
        <Grid xs={24} justify='center'>
            <Link href="https://docs.google.com/spreadsheets/d/1MT2XUN_cMJA-tHjlxt7j_P6RwOZ9j08WIppq6BosKMo/edit?usp=sharing" block>
                Spreadsheet Link
            </Link>
        </Grid>
    </Grid.Container>
)

export default SpreadsheetInfo