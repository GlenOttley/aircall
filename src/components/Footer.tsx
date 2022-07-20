import AppsIcon from '@mui/icons-material/Apps'
import CallIcon from '@mui/icons-material/Call'
import CircleIcon from '@mui/icons-material/Circle'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTheme } from '@mui/material'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { useAppSelector } from '../app/hooks'
import { selectCalls } from '../features/calls/callsSlice'
import Box from '@mui/material/Box'

const Footer = (): JSX.Element => {
  const theme = useTheme()
  const select = useAppSelector

  const callsState = select(selectCalls)
  const { calls } = callsState

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        position: 'sticky',
        bottom: 0,
        marginTop: 'auto',
        zIndex: theme.zIndex.drawer + 1,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid container item xs={2} justifyContent='center'>
            <IconButton>
              <Badge
                badgeContent={
                  calls.filter((call) => call.is_archived === false).length
                }
                color='secondary'
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <CallIcon />
              </Badge>
            </IconButton>
          </Grid>

          <Grid container item xs={2} justifyContent='center'>
            <IconButton>
              <PersonOutlineIcon />
            </IconButton>
          </Grid>

          <Grid container item xs={2} justifyContent='center'>
            <IconButton
              sx={{
                position: 'relative',
                bottom: '20px',
                backgroundColor: theme.palette.primary.main,
                height: '60px',
                width: '60px',
                border: '1px solid',
                borderColor: theme.palette.grey[200],
                padding: '3px',
                backgroundClip: 'content-box',
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <AppsIcon sx={{ color: 'white', fontSize: '3rem' }} />
            </IconButton>
          </Grid>

          <Grid container item xs={2} justifyContent='center'>
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Grid>

          <Grid container item xs={2} justifyContent='center'>
            <IconButton
              sx={{
                border: '1px solid',
                borderColor: theme.palette.grey[200],
                padding: '5px',
                backgroundClip: 'content-box',
              }}
            >
              <CircleIcon color='primary' sx={{ fontSize: '10px' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Footer
