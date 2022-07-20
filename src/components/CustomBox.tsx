import { styled, Box, BoxProps } from '@mui/material'

const CustomBox = styled(Box)<BoxProps>(({ theme }) => ({
  '&.MuiBox-root': {
    border: '1px solid',
    borderColor: theme.palette.grey[300],
    borderRadius: '8px',
    backgroundColor: theme.palette.grey[50],
    '&:hover': {
      borderColor: theme.palette.secondary.main,
    },
  },
}))

export default CustomBox
