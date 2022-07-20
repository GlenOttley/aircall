import { format } from 'date-fns'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

interface ComponentProps {
  created_at: string
}

const CallDate = ({ created_at }: ComponentProps): JSX.Element => {
  return (
    <Grid
      container
      item
      xs={12}
      gap={1}
      justifyContent='space-between'
      alignItems='center'
    >
      <Grid
        item
        xs
        sx={{
          width: '100%',
          height: '1px',
          backgroundImage:
            'linear-gradient(to right, grey 1px, rgba(255,255,255,0) 1px)',
          backgroundPosition: 'bottom',
          backgroundSize: '5px 1px',
          backgroundRepeat: 'repeat-x',
        }}
      ></Grid>
      <Grid item>
        <Typography variant='overline'>
          {format(new Date(created_at), 'MMMM, dd yyyy')}
        </Typography>
      </Grid>
      <Grid
        item
        xs
        sx={{
          width: '100%',
          height: '1px',
          backgroundImage:
            'linear-gradient(to right, grey 1px, rgba(255,255,255,0) 1px)',
          backgroundPosition: 'bottom',
          backgroundSize: '5px 1px',
          backgroundRepeat: 'repeat-x',
        }}
      ></Grid>
    </Grid>
  )
}

export default CallDate
