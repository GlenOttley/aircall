import { createTheme } from '@mui/material'
import palette from './palette'
import typography from './typography'

let theme = createTheme({
  palette,
  typography,
})

theme = createTheme(theme, {
  components: {
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-flexContainer': {
            justifyContent: 'end',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.secondary.main,
            height: '4px',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[500],
          fontSize: '1.1rem',
          fontWeight: '600',
          textTransform: 'none',
          minWidth: 'fit-content',
          '&:not(:last-child)': {
            '&::after': {
              display: 'inline-block',
              position: 'absolute',
              height: '40%',
              width: '100%',
              content: '""',
              backgroundImage: `linear-gradient(${theme.palette.grey[500]} 1px, rgba(255,255,255,0) 0%)`,
              backgroundPosition: 'right',
              backgroundSize: '1px 6px',
              backgroundRepeat: 'repeat-y',
            },
          },
          '&.Mui-selected': {
            color: theme.palette.grey[700],
          },
        },
      },
    },
  },

  typography: {
    fontFamily: ['Helvetica', 'arial', 'sans-serif'].join(','),
    htmlFontSize: 10,
    body1: {
      fontSize: '1.3rem',
      fontWeight: '600',
      letterSpacing: '.75px',
      color: theme.palette.grey[700],
    },
    body2: {
      fontSize: '1.1rem',

      color: theme.palette.grey[500],
    },
    overline: {
      fontSize: '1rem',
      letterSpacing: '1px',
      color: theme.palette.grey[500],
    },
  },
})

export default theme
