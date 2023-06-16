import Box from '@mui/material/Box'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { ReactElement, useState } from 'react'
import { PaletteColor, useMediaQuery, useTheme } from '@mui/material'

interface Props {
  children: ReactElement
}

export default function Layout (props: Props): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const [open, setOpen] = useState(!isMobile)

  const drawerWidth = 220

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  return (
    <Box
      width='100%'
      minHeight='100vh'
      display={isMobile ? 'block' : 'flex'}
      sx={{ backgroundColor: `${theme.palette.primary['800' as keyof PaletteColor]}`, overflow: 'hidden' }}
    >
      <Sidebar
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
        open={open}
      />
      <Box flexGrow={1}>
        <Navbar
          drawerWidth={drawerWidth}
          handleDrawerOpen={handleDrawerOpen}
          open={open}
        />
        {props.children}
      </Box>
    </Box>
  )
}
