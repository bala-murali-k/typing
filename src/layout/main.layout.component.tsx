// Required imports
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Tooltip, IconButton, Icon, useTheme, Drawer } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from './../context/theme/theme.context.component.tsx'
// Icons imports
import GitHubIcon from '@mui/icons-material/GitHub'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

export default function MainLayout() {
  const themeContext = useContext(ThemeContext)

  if (!themeContext) {
    throw new Error('MainLayout must be used within a ThemeContextComponent')
  }

  const { currentTheme, setCurrentTheme } = themeContext
  const muiTheme = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Simplified nav — only what matters for a personal dev typing tool
  const navItems = [
    { label: 'Test', path: '/test' },
    { label: 'Practice', path: '/practice' },
    { label: 'Custom', path: '/custom' },
  ]

  // Simple light/dark toggle only — no high contrast needed for personal use
  const isDark = currentTheme === 'dark'

  const getNavBackground = () =>
    isDark
      ? 'rgba(13, 13, 15, 0.85)'
      : 'rgba(255, 255, 255, 0.80)'

  const getBrandStyles = () => ({
    background: `linear-gradient(135deg, ${muiTheme.palette.primary.main}, #f5c842)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: muiTheme.typography.fontFamily,
      }}
    >
      {/* ── Sticky Navbar ── */}
      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          background: getNavBackground(),
          borderBottom: '1px solid',
          borderColor: 'divider',
          px: { xs: '1.2rem', md: '2.5rem' },
          py: '0.75rem',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                fontWeight: 800,
                fontSize: '1.4rem',
                letterSpacing: '-0.03em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: muiTheme.typography.fontFamily,
                ...getBrandStyles(),
              }}
            >
              <span style={{ WebkitTextFillColor: 'initial' }}>⌨️</span>
              TypeForge
            </Box>
          </Link>

          {/* Desktop Nav */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: '0.25rem',
              alignItems: 'center',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              borderRadius: '40px',
              padding: '4px',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    px: '1.1rem',
                    py: '0.4rem',
                    borderRadius: '40px',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    color: muiTheme.palette.text.primary,
                    fontFamily: muiTheme.typography.fontFamily,
                    transition: 'background 0.15s, color 0.15s',
                    '&:hover': {
                      background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                      color: muiTheme.palette.primary.main,
                    },
                  }}
                >
                  {item.label}
                </Box>
              </Link>
            ))}
          </Box>

          {/* Right — Theme Toggle + Custom CTA */}
          <Box sx={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Light / Dark toggle */}
            <Tooltip title={isDark ? 'Switch to light' : 'Switch to dark'}>
              <IconButton
                onClick={() => setCurrentTheme(isDark ? 'light' : 'dark')}
                size="small"
                sx={{
                  width: '2.25rem',
                  height: '2.25rem',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '50%',
                  color: muiTheme.palette.text.secondary,
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: muiTheme.palette.primary.main,
                    color: muiTheme.palette.primary.main,
                    background: 'transparent',
                  },
                }}
              >
                {/* wb_sunny for light mode, dark_mode for dark mode */}
                <Icon baseClassName="material-symbols-outlined" sx={{ fontSize: '1.1rem' }}>
                  {isDark ? 'wb_sunny' : 'dark_mode'}
                </Icon>
              </IconButton>
            </Tooltip>

            {/* Custom Practice CTA */}
            <Box
              component={Link}
              to="/custom"
              sx={{
                background: muiTheme.palette.primary.main,
                color: '#fff',
                px: '1.2rem',
                py: '0.5rem',
                borderRadius: '40px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                textDecoration: 'none',
                display: { xs: 'none', sm: 'inline-block' },
                fontFamily: muiTheme.typography.fontFamily,
                letterSpacing: '-0.01em',
                transition: 'opacity 0.15s, transform 0.15s',
                '&:hover': {
                  opacity: 0.88,
                  transform: 'scale(1.02)',
                },
              }}
            >
              Custom Practice
            </Box>

            {/* Mobile hamburger */}
            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: muiTheme.palette.text.primary,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            background: muiTheme.palette.background.paper,
            borderBottom: '1px solid',
            borderColor: 'divider',
            borderRadius: '0 0 20px 20px',
            pt: '70px',
          },
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={() => setMobileMenuOpen(false)} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{ textDecoration: 'none' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Box
                sx={{
                  color: muiTheme.palette.text.primary,
                  fontWeight: 500,
                  fontSize: '1.05rem',
                  py: '0.65rem',
                  px: '0.5rem',
                  borderRadius: '8px',
                  fontFamily: muiTheme.typography.fontFamily,
                  transition: 'background 0.15s',
                  '&:hover': {
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    color: muiTheme.palette.primary.main,
                  },
                }}
              >
                {item.label}
              </Box>
            </Link>
          ))}

          <Box
            component={Link}
            to="/custom"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              mt: 1,
              background: muiTheme.palette.primary.main,
              color: '#fff',
              py: '0.6rem',
              borderRadius: '40px',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              textAlign: 'center',
              fontFamily: muiTheme.typography.fontFamily,
            }}
          >
            Custom Practice
          </Box>
        </Box>
      </Drawer>

      {/* ── Main Content ── */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: '1.2rem', md: '2.5rem' },
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>

        {/* ── Footer ── */}
        <Box
          component="footer"
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            py: '2rem',
            mt: '4rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Brand */}
          <Box
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              fontFamily: muiTheme.typography.fontFamily,
              letterSpacing: '-0.02em',
              ...getBrandStyles(),
            }}
          >
            ⌨️ TypeForge
          </Box>

          {/* Footer links */}
          <Box sx={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                style={{
                  color: muiTheme.palette.text.secondary,
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontFamily: muiTheme.typography.fontFamily,
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>

          {/* Copyright + GitHub */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Box
              sx={{
                color: muiTheme.palette.text.secondary,
                fontSize: '0.82rem',
                fontFamily: muiTheme.typography.fontFamily,
              }}
            >
              © {new Date().getFullYear()} TypeForge
            </Box>
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: muiTheme.palette.text.secondary,
                  '&:hover': { color: muiTheme.palette.primary.main },
                }}
              >
                <GitHubIcon sx={{ fontSize: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}