import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material'
import theme from './theme'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Grid from '@mui/material/Grid'
import InboxScreen from './screens/CallsScreen'
import { useAppDispatch } from './app/hooks'
import { getCalls } from './features/calls/callsSlice'
import TabPanel from './components/TabPanel'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Footer from './components/Footer'
import Box from '@mui/material/Box'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const App = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    dispatch(getCalls())
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box
          sx={{
            paddingtop: '8px',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndex.drawer + 1,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Container>
            <Grid container alignItems='stretch' justifyContent='space-between'>
              <Grid container item xs={3} alignItems='center'>
                <img
                  src='/assets/images/logo.svg'
                  alt='Aircall'
                  style={{ maxWidth: '86px' }}
                />
              </Grid>
              <Grid item xs={9}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='Inbox' {...a11yProps(0)} />

                  <Tab label='All Calls' {...a11yProps(1)} />

                  <Tab label='Archived' {...a11yProps(2)} />
                </Tabs>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container sx={{ padding: '8px 16px' }}>
          <TabPanel value={value} index={0}>
            <InboxScreen archivedFilter={false} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <InboxScreen archivedFilter={null} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <InboxScreen archivedFilter={true} />
          </TabPanel>
        </Container>

        <Footer />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
