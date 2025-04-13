"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Photo,
  Collections,
  Info,
  Home,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: <Home fontSize='small' /> },
  { name: "Gallery", href: "/gallery", icon: <Collections fontSize='small' /> },
  { name: "About", href: "/about", icon: <Info fontSize='small' /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link href='/' style={{ textDecoration: "none" }}>
          <Photo sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant='h6' component='div' sx={{ fontWeight: 700 }}>
            Image Gallery
          </Typography>
        </Link>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                textAlign: "center",
                "&.Mui-selected": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.08)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
                <ListItemText primary={item.name} sx={{ ml: 1 }} />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position='sticky'
        color='default'
        elevation={1}
        sx={{ bgcolor: "background.paper" }}
      >
        <Container maxWidth='lg'>
          <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Photo sx={{ mr: 1, color: "primary.main" }} />
              <Link href='/' style={{ textDecoration: "none" }}>
                <Typography
                  variant='h6'
                  component='div'
                  sx={{
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Image Gallery
                </Typography>
              </Link>
            </Box>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  href={item.href}
                  sx={{
                    mx: 1,
                    color: "text.primary",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: pathname === item.href ? "100%" : "0%",
                      height: "2px",
                      bottom: 0,
                      left: 0,
                      backgroundColor: "primary.main",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='end'
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
