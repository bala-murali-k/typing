// Required imports
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Tooltip, IconButton, Icon, useTheme, Drawer } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from './../context/theme/theme.context.component.tsx'
// Icons imports
import GitHubIcon from '@mui/icons-material/GitHub'
import CodeIcon from '@mui/icons-material/Code'
import MenuIcon from '@mui/icons-material/Menu'
import TwitterIcon from '@mui/icons-material/Twitter'

export default function MainLayout() {
  // Fix Issue 1: Handle null context
  const themeContext = useContext(ThemeContext)
  
  // Throw error if context is null (should never happen if used within provider)
  if (!themeContext) {
    throw new Error('MainLayout must be used within a ThemeContextComponent')
  }
  
  const { currentTheme, setCurrentTheme } = themeContext
  const muiTheme = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Navigation items
  const navItems = ['Home', 'Features', 'Practice', 'About']
  
  // Get theme icon based on current theme
  const getThemeIcon = () => {
    if (currentTheme === 'dark') {
      return 'dark_mode'
    } else if (currentTheme === 'highcontrast') {
      return 'contrast'
    } else {
      return 'light_mode'
    }
  }
  
  // Helper function to get background based on theme
  const getNavBackground = () => {
    if (currentTheme === 'dark') {
      return 'rgba(30, 41, 59, 0.85)'
    } else if (currentTheme === 'highcontrast') {
      return 'rgba(0, 0, 0, 0.9)'
    } else {
      return 'rgba(255, 255, 255, 0.75)'
    }
  }
  
  // Helper function for gradient text
  const getBrandStyles = () => {
    if (currentTheme === 'highcontrast') {
      return {
        background: 'none',
        WebkitBackgroundClip: 'unset',
        WebkitTextFillColor: 'unset',
        color: '#ffff00',
      }
    }
    return {
      background: `linear-gradient(135deg, ${muiTheme.palette.primary.main}, #c084fc)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'inherit',
    }
  }
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      transition: 'background-color 0.3s ease, border-color 0.2s, color 0.2s',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: muiTheme.typography.fontFamily,
    }}>
      {/* Sticky Navbar with Glassmorphism */}
      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(12px)',
          background: getNavBackground(),
          borderBottom: '1px solid',
          borderColor: 'divider',
          padding: '0.8rem 2rem',
          maxWidth: 'calc(100vw - 2rem)',
        }}
      >
        <Box
          sx={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: muiTheme.typography.h1?.letterSpacing || '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontFamily: muiTheme.typography.fontFamily,
              ...getBrandStyles(),
            }}
          >
            <span style={{ fontFamily: muiTheme.typography.fontFamily }}>⌨️</span> Practice Typing
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                style={{
                  textDecoration: 'none',
                  color: muiTheme.palette.text.primary,
                  fontWeight: 500,
                  transition: 'color 0.2s',
                  fontFamily: muiTheme.typography.fontFamily,
                  fontSize: '0.95rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = muiTheme.palette.primary.main;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = muiTheme.palette.text.primary;
                }}
              >
                {item}
              </Link>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Tooltip title="Toggle theme">
              <IconButton
                onClick={() => {
                  if (currentTheme === 'light') setCurrentTheme('dark')
                  else if (currentTheme === 'dark') setCurrentTheme('highcontrast')
                  else setCurrentTheme('light')
                }}
                sx={{
                  background: currentTheme === 'highcontrast' 
                    ? muiTheme.palette.surface?.main || muiTheme.palette.background.paper
                    : muiTheme.palette.background.paper,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '40px',
                  width: '2.5rem',
                  height: '2.5rem',
                  boxShadow: currentTheme === 'highcontrast'
                    ? 'none'
                    : '0 20px 30px -10px rgba(0, 0, 0, 0.05), 0 8px 15px -6px rgba(0, 0, 0, 0.02)',
                  color: muiTheme.palette.text.primary,
                  '&:hover': {
                    background: currentTheme === 'highcontrast'
                      ? muiTheme.palette.surface?.main || muiTheme.palette.background.paper
                      : muiTheme.palette.background.paper,
                  }
                }}
              >
                <Icon baseClassName="material-symbols-outlined">
                  {getThemeIcon()}
                </Icon>
              </IconButton>
            </Tooltip>

            <Box
              component={Link}
              to="/practice"
              sx={{
                background: muiTheme.palette.primary.main,
                color: currentTheme === 'highcontrast' ? '#000' : '#ffffff',
                border: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '40px',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: `0 4px 10px -3px ${muiTheme.palette.primary.main}20`,
                transition: 'transform 0.15s, box-shadow 0.2s',
                textDecoration: 'none',
                display: { xs: 'none', sm: 'inline-block' },
                fontFamily: muiTheme.typography.fontFamily,
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: `0 10px 20px -7px ${muiTheme.palette.primary.main}`,
                },
              }}
            >
              Start Typing
            </Box>

            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                fontSize: '1.8rem',
                color: muiTheme.palette.text.primary,
              }}
            >
              <MenuIcon sx={{ fontFamily: muiTheme.typography.fontFamily }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            background: muiTheme.palette.background.paper,
            borderBottom: '1px solid',
            borderColor: 'divider',
            borderRadius: '0 0 24px 24px',
            mt: '70px', // Below navbar
          }
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              style={{
                textDecoration: 'none',
                color: muiTheme.palette.text.primary,
                fontWeight: 500,
                fontSize: '1.1rem',
                padding: '0.5rem 0',
                fontFamily: muiTheme.typography.fontFamily,
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Box
            component={Link}
            to="/practice"
            sx={{
              background: 'transparent',
              color: muiTheme.palette.text.primary,
              border: '1px solid',
              borderColor: 'divider',
              padding: '0.6rem 1.4rem',
              borderRadius: '40px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              textAlign: 'center',
              mt: 1,
              fontFamily: muiTheme.typography.fontFamily,
              '&:hover': {
                borderColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.primary.main,
              },
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Typing
          </Box>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ 
        width: 'calc(100% - 4.3rem)',
        maxWidth: '1400px',
        margin: '0 auto',
        px: '2.16rem', 
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1
      }}>
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            padding: '3rem 2rem 1.5rem',
            marginTop: '4rem',
            background: muiTheme.palette.background.paper,
          }}
        >
          {/* Footer Content */}
          <Box
            sx={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            {/* Brand Section */}
            <Box>
              <Box
                component="h4"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: muiTheme.palette.text.primary,
                  marginBottom: '0.5rem',
                  fontFamily: muiTheme.typography.fontFamily,
                  letterSpacing: 'normal',
                }}
              >
                Practice Typing
              </Box>
              <Box
                component="p"
                sx={{
                  color: muiTheme.palette.text.secondary,
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  fontFamily: muiTheme.typography.fontFamily,
                  lineHeight: 1.6,
                  m: 0,
                }}
              >
                Minimalist typing, maximum flow.
              </Box>
            </Box>

            {/* Links Section */}
            <Box>
              <Box
                component="h4"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: muiTheme.palette.text.primary,
                  marginBottom: '0.5rem',
                  fontFamily: muiTheme.typography.fontFamily,
                  letterSpacing: 'normal',
                }}
              >
                Links
              </Box>
              <Box sx={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Link
                  to="/"
                  style={{
                    color: muiTheme.palette.text.secondary,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    fontFamily: muiTheme.typography.fontFamily,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = muiTheme.palette.primary.main;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = muiTheme.palette.text.secondary;
                  }}
                >
                  Home
                </Link>
                <Box component="span" sx={{ 
                  color: muiTheme.palette.text.secondary,
                  fontFamily: muiTheme.typography.fontFamily,
                }}>·</Box>
                <Link
                  to="/features"
                  style={{
                    color: muiTheme.palette.text.secondary,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    fontFamily: muiTheme.typography.fontFamily,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = muiTheme.palette.primary.main;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = muiTheme.palette.text.secondary;
                  }}
                >
                  Features
                </Link>
                <Box component="span" sx={{ 
                  color: muiTheme.palette.text.secondary,
                  fontFamily: muiTheme.typography.fontFamily,
                }}>·</Box>
                <Link
                  to="/privacy"
                  style={{
                    color: muiTheme.palette.text.secondary,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 400,
                    fontFamily: muiTheme.typography.fontFamily,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = muiTheme.palette.primary.main;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = muiTheme.palette.text.secondary;
                  }}
                >
                  Privacy
                </Link>
              </Box>
            </Box>

            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip title="Twitter">
                <IconButton
                  component="a"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    fontSize: '1.5rem',
                    padding: 0,
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  <TwitterIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="GitHub">
                <IconButton
                  component="a"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    fontSize: '1.5rem',
                    padding: 0,
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Discord">
                <IconButton
                  component="a"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: muiTheme.palette.text.secondary,
                    fontSize: '1.5rem',
                    padding: 0,
                    '&:hover': {
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  <CodeIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Copyright */}
          <Box
            sx={{
              textAlign: 'center',
              marginTop: '3rem',
              color: muiTheme.palette.text.secondary,
              fontSize: '0.9rem',
              fontWeight: 400,
              fontFamily: muiTheme.typography.fontFamily,
              letterSpacing: 'normal',
            }}
          >
            © 2025 Practice Typing — all rights reserved
          </Box>
        </Box>
      </Box>
    </Box>
  )
}