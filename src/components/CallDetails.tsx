import { SetStateAction, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {
  selectCall,
  updateCall,
  successUpdateReset,
} from '../features/calls/callSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Loader from './Loader'
import Message from './Message'
import { format } from 'date-fns'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ArchiveIcon from '@mui/icons-material/Archive'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import { getCalls } from '../features/calls/callsSlice'
import CustomButton from './CustomButton'

interface ComponentProps {
  setShowCallDetails: React.Dispatch<SetStateAction<boolean>>
}

const CallDetails = ({ setShowCallDetails }: ComponentProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const select = useAppSelector

  const callState = select(selectCall)
  const { loading, error, call, successUpdate } = callState

  function handleCallUpdate() {
    dispatch(updateCall(!call.is_archived))
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch(successUpdateReset())
      dispatch(getCalls())
      setShowCallDetails(false)
    }
  })

  return (
    <Container sx={{ paddingTop: '56px' }}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <CustomButton
            onClick={() => setShowCallDetails(false)}
            startIcon={
              <KeyboardArrowLeftIcon
                color='secondary'
                sx={{
                  fontSize: '15px',
                }}
              />
            }
          >
            Go Back
          </CustomButton>
        </Grid>

        <Grid item>
          {call && call.is_archived ? (
            <CustomButton
              startIcon={<UnarchiveIcon />}
              onClick={handleCallUpdate}
            >
              Unarchive
            </CustomButton>
          ) : (
            <CustomButton
              startIcon={<ArchiveIcon />}
              onClick={handleCallUpdate}
            >
              Archive
            </CustomButton>
          )}
        </Grid>
      </Grid>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Grid container direction='column' gap={1}>
          <Grid item>
            <Typography variant='overline'>To:</Typography>
            <Typography variant='body1'>{call.to}</Typography>
          </Grid>

          <Grid item>
            <Typography variant='overline'>From:</Typography>
            <Typography variant='body1'>{call.from}</Typography>
          </Grid>

          <Grid item>
            <Typography variant='overline'>Date:</Typography>
            <Typography variant='body1'>
              {format(new Date(call.created_at), 'MMMM, dd yyyy')}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant='overline'>Time:</Typography>
            <Typography variant='body1'>
              {' '}
              {format(new Date(call.created_at), 'hh:mm aa')}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant='overline'>Via:</Typography>
            <Typography variant='body1'>{call.via}</Typography>
          </Grid>

          <Grid item>
            <Typography variant='overline'>Duration:</Typography>
            <Typography variant='body1'>{call.duration} minutes</Typography>
          </Grid>

          <Grid item>
            <Typography variant='overline'>Status:</Typography>
            <Typography variant='body1'>{call.call_type}</Typography>
          </Grid>

          <Grid item></Grid>
        </Grid>
      )}
    </Container>
  )
}

export default CallDetails
