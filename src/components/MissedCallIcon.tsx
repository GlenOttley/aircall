import Grid from '@mui/material/Grid'
import CallIcon from '@mui/icons-material/Call'
import CallMissedIcon from '@mui/icons-material/CallMissed'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

const MissedCallIcon = (): JSX.Element => {
  return (
    <Grid
      container
      item
      xs={2}
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <IconButton>
        <Badge
          badgeContent={
            <CallMissedIcon
              color='secondary'
              sx={{
                fontSize: '12px',
                position: 'relative',
                top: '5px',
                right: '7px',
              }}
            />
          }
          color='default'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <CallIcon sx={{ color: 'grey.400' }} />
        </Badge>
      </IconButton>
    </Grid>
  )
}
export default MissedCallIcon
