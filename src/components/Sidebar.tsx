import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, PaletteColor, Typography, useTheme } from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'
import DrawerHeader from './DrawerHeader'
import { pages, salesPages } from '../utils/sidebarPages'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  ReactElement,
  useEffect,
  useState
} from 'react'

export default function Sidebar ({ drawerWidth, handleDrawerClose, open }: { drawerWidth: number, handleDrawerClose: () => void, open: boolean }): ReactElement {
  const theme = useTheme()
  const router = useRouter()
  const [active, setActive] = useState('')

  useEffect(() => {
    if (router.pathname.substring(1).includes('-')) {
      setActive(router.pathname.substring(1).split('-').join(' '))
    } else {
      setActive(router.pathname.substring(1))
    }
  }, [router.pathname])
  return (
    <Box
      component='nav'
    >
      {
        open && (
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: `${theme.palette.primary['80' as keyof PaletteColor]}`
              }
            }}
            variant='persistent'
            anchor='left'
            open={open}
          >
            <DrawerHeader>
              <Box p='0 0.5rem' sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Avatar src='/logo-pipi.png' alt='Logo Pipi' />
                <Typography component='h1' fontWeight='bold' color={`${theme.palette.secondary['300' as keyof PaletteColor]}`}>Pipi Bakery</Typography>
              </Box>
              <IconButton onClick={handleDrawerClose} sx={{ color: 'primary.contrastText' }}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider color={`${theme.palette.primary['700' as keyof PaletteColor]}`} />
            <Link
              style={{
                textDecoration: 'none',
                backgroundColor: active === 'dashboard' ? theme.palette.primary['60' as keyof PaletteColor] : 'transparent'
              }}
              href='/'
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: 'secondary.light' }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Dashboard' sx={{ color: 'primary.contrastText' }} />
              </ListItemButton>
            </Link>
            <Typography color='primary.contrastText' p='0.5rem 1rem 0.25rem'>Información</Typography>
            <Divider />
            <List>
              {pages.map(page => (
                <ListItem
                  key={page.name}
                  disablePadding
                  sx={() => (
                    active === page.name.toLowerCase()
                      ? { backgroundColor: `${theme.palette.primary['60' as keyof PaletteColor]}` }
                      : {}
                  )}
                >
                  <Link
                    style={{
                      textDecoration: 'none',
                      width: '100%'
                    }}
                    href={`/${page.url}`}
                  >
                    <ListItemButton>
                      <ListItemIcon sx={{ color: 'secondary.light' }}>
                        {page.icon}
                      </ListItemIcon>
                      <ListItemText primary={page.name} sx={{ color: 'primary.contrastText' }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
            {/* <Divider /> */}
            <Typography color='primary.contrastText' p='0.5rem 1rem 0.25rem'>Estadísticas</Typography>
            <Divider />
            <List>
              {
                salesPages.map(page => (
                  <ListItem
                    key={page.name}
                    disablePadding
                    sx={() => (
                      active === page.name.toLowerCase()
                        ? { backgroundColor: `${theme.palette.primary['60' as keyof PaletteColor]}` }
                        : {}
                    )}
                  >
                    <a
                      style={{
                        textDecoration: 'none',
                        width: '100%'
                      }}
                      href={`/${page.url}`}
                    >
                      <ListItemButton>
                        <ListItemIcon sx={{ color: 'secondary.light' }}>
                          {page.icon}
                        </ListItemIcon>
                        <ListItemText primary={page.name} sx={{ color: 'primary.contrastText' }} />
                      </ListItemButton>
                    </a>
                  </ListItem>
                ))
              }
            </List>
            <Box>
              <IconButton
                color='inherit'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '1rem',
                  gap: '0.75rem',
                  padding: '0 1rem'
                }}
              >
                <Avatar src='https://randomuser.me/api/portraits/men/67.jpg' alt='Profile photo' />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem 0'
                  }}
                >
                  <Typography fontSize='16px' fontWeight='bold'>Jack Daniels</Typography>
                  <Typography fontSize='14px' textAlign='start'>superadmin</Typography>
                </Box>
                <SettingsIcon />
              </IconButton>
            </Box>
          </Drawer>
        )
      }
    </Box>
  )
}
