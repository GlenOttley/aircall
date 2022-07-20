import ICall from '../interfaces/callInterface'
import Grid from '@mui/material/Grid'
import MissedCallIcon from './MissedCallIcon'
import AnsweredCallIcon from './AnsweredCallIcon'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CustomBox from './CustomBox'

interface ComponentProps {
  call: ICall
}

const CallPreview = ({ call }: ComponentProps): JSX.Element => {
  return (
    <CustomBox>
      <Grid container padding='0 8px' alignItems='center'>
        <Grid item>
          {call.call_type === 'answered' ? (
            <AnsweredCallIcon />
          ) : (
            <MissedCallIcon />
          )}
        </Grid>

        <Grid
          container
          item
          xs={6}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent={{ sm: 'space-between' }}
        >
          <Typography variant='body1'>{call.from}</Typography>
          <Typography variant='body2'>tried to call on {call.via}</Typography>
        </Grid>

        <Grid container item xs justifyContent='end' alignItems='center'>
          <Grid item>
            <MoreVertIcon
              sx={{
                fontSize: '16px',
                color: 'grey.400',
              }}
            />
          </Grid>

          <Grid item>
            <Typography variant='body2'>
              {format(new Date(call.created_at), 'hh:mm aa')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </CustomBox>
  )
}

export default CallPreview
