import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  PaletteColor,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import {
  Menu as MenuIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import { ReactElement } from 'react'

export default function Navbar ({ drawerWidth, handleDrawerOpen, open }: { drawerWidth: number, handleDrawerOpen: () => void, open: boolean }): ReactElement {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const theme = useTheme()

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '30ch',
        '&:focus': {
          width: '35ch'
        }
      }
    }
  }))

  return (
    <AppBar color='transparent' position='static' sx={{ backgroundColor: 'transparent', boxShadow: 'none', padding: '0 0.5rem' }}>
      <Toolbar>
        <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <IconButton
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ color: `${theme.palette.primary['100' as keyof PaletteColor]}`, mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {
            !isMobile &&
            (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Buscar...'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            )
          }
          <IconButton color='inherit'>
            <Avatar src='https://randomuser.me/api/portraits/men/67.jpg' alt='Profile photo' />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
