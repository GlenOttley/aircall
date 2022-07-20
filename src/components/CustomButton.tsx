import { styled, Button, ButtonProps } from '@mui/material'

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  '&.MuiButton-root': {
    border: '1px solid',
    borderColor: theme.palette.grey[300],
    borderRadius: '8px',
    backgroundColor: theme.palette.grey[50],
    justifyContent: 'start',
    padding: '8px 16px',
    textTransform: 'none',
    color: theme.palette.grey[600],
    fontWeight: '600',
    fontSize: '1.1rem',
    '&:hover': {
      borderColor: theme.palette.secondary.main,
    },
  },
}))

export default CustomButton
