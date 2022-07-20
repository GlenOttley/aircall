import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import CallDetails from '../components/CallDetails'
import CallPreview from '../components/CallPreview'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getCall } from '../features/calls/callSlice'
import {
  archiveAll,
  unarchiveAll,
  selectCalls,
  successArchiveAllReset,
  successUnarchiveAllReset,
  clearCalls,
} from '../features/calls/callsSlice'
import ArchiveIcon from '@mui/icons-material/Archive'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import { useTheme } from '@mui/material'
import CallDate from '../components/CallDate'
import {
  selectFilteredCalls,
  setArchivedFilter,
} from '../features/filters/filtersSlice'
import CustomButton from '../components/CustomButton'

interface ComponentProps {
  archivedFilter: boolean | null
}

const InboxScreen = ({ archivedFilter }: ComponentProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const select = useAppSelector
  const theme = useTheme()

  const callsState = select(selectCalls)
  const { loading, error, successArchiveAll, successUnarchiveAll } = callsState

  const filteredCalls = select(selectFilteredCalls)

  const [showCallDetails, setShowCallDetails] = useState<boolean>(false)

  function handleClick(id: number) {
    dispatch(getCall(id))
    setShowCallDetails(true)
  }

  function handleArchiveAll() {
    dispatch(archiveAll())
  }

  function handleUnarchiveAll() {
    dispatch(unarchiveAll())
  }

  useEffect(() => {
    dispatch(setArchivedFilter(archivedFilter))
  }, [archivedFilter, dispatch])

  useEffect(() => {
    if (successArchiveAll) {
      dispatch(clearCalls())
      dispatch(successArchiveAllReset())
    }
    if (successUnarchiveAll) {
      dispatch(clearCalls())
      dispatch(successUnarchiveAllReset())
    }
  })

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Grid container direction='column'>
          {archivedFilter === false ? (
            <CustomButton
              startIcon={<ArchiveIcon />}
              onClick={handleArchiveAll}
              disabled={filteredCalls.length === 0}
            >
              Archive all calls
            </CustomButton>
          ) : archivedFilter === true ? (
            <CustomButton
              startIcon={<UnarchiveIcon />}
              onClick={handleUnarchiveAll}
              disabled={filteredCalls.length === 0}
            >
              Unarchive all calls
            </CustomButton>
          ) : null}

          {filteredCalls.map((call) => (
            <Box maxHeight='75px' key={call.id}>
              <CallDate created_at={call.created_at} />
              <Box
                onClick={() => handleClick(call.id)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <CallPreview call={call} />
              </Box>
            </Box>
          ))}
        </Grid>
      )}

      <Drawer
        open={showCallDetails}
        onClose={() => setShowCallDetails(false)}
        anchor='left'
        PaperProps={{
          sx: {
            width: '100%',
            backgroundColor: theme.palette.grey[100],
            [theme.breakpoints.up('sm')]: {
              width: '300px',
            },
          },
        }}
      >
        <CallDetails setShowCallDetails={setShowCallDetails} />
      </Drawer>
    </Box>
  )
}

export default InboxScreen
