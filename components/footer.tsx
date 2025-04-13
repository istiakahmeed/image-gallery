"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  IconButton,
  Divider,
  InputBase,
  Button,
  Paper,
} from "@mui/material";
import {
  GitHub,
  Twitter,
  Instagram,
  LinkedIn,
  Send,
  KeyboardArrowUp,
} from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement subscription logic here
    console.log("Subscribing email:", email);
    // Reset form
    setEmail("");
  };

  return (
    <Box
      component='footer'
      sx={{
        bgcolor: "background.paper",
        py: { xs: 6, md: 8 },
        mt: "auto",
        borderTop: 1,
        borderColor: "divider",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -25,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <IconButton
          onClick={handleScrollToTop}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            boxShadow: 2,
            width: 50,
            height: 50,
          }}
          aria-label='Scroll to top'
        >
          <KeyboardArrowUp />
        </IconButton>
      </Box>

      <Container maxWidth='lg'>
        <Grid container spacing={4} justifyContent='space-between'>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant='h5'
              fontWeight='bold'
              color='text.primary'
              gutterBottom
            >
              Image Gallery
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ mb: 3, maxWidth: 300 }}
            >
              A modern, responsive image gallery application built with Next.js,
              TypeScript, and Material UI.
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <IconButton
                color='primary'
                aria-label='GitHub'
                component='a'
                href='#'
                target='_blank'
                sx={{
                  border: 1,
                  borderColor: "divider",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                color='primary'
                aria-label='Twitter'
                component='a'
                href='#'
                target='_blank'
                sx={{
                  border: 1,
                  borderColor: "divider",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                color='primary'
                aria-label='Instagram'
                component='a'
                href='#'
                target='_blank'
                sx={{
                  border: 1,
                  borderColor: "divider",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                color='primary'
                aria-label='LinkedIn'
                component='a'
                href='#'
                target='_blank'
                sx={{
                  border: 1,
                  borderColor: "divider",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant='h6'
              color='text.primary'
              gutterBottom
              fontWeight='medium'
            >
              Quick Links
            </Typography>
            <Box component='ul' sx={{ p: 0, listStyle: "none" }}>
              <Box component='li' sx={{ mb: 1.5 }}>
                <MuiLink
                  component={Link}
                  href='/'
                  color='inherit'
                  underline='hover'
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": { pl: 0.5 },
                    transition: "padding 0.2s",
                  }}
                >
                  Home
                </MuiLink>
              </Box>
              <Box component='li' sx={{ mb: 1.5 }}>
                <MuiLink
                  component={Link}
                  href='/gallery'
                  color='inherit'
                  underline='hover'
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": { pl: 0.5 },
                    transition: "padding 0.2s",
                  }}
                >
                  Gallery
                </MuiLink>
              </Box>
              <Box component='li' sx={{ mb: 1.5 }}>
                <MuiLink
                  component={Link}
                  href='/about'
                  color='inherit'
                  underline='hover'
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": { pl: 0.5 },
                    transition: "padding 0.2s",
                  }}
                >
                  About
                </MuiLink>
              </Box>
              <Box component='li' sx={{ mb: 1.5 }}>
                <MuiLink
                  component={Link}
                  href='#'
                  color='inherit'
                  underline='hover'
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": { pl: 0.5 },
                    transition: "padding 0.2s",
                  }}
                >
                  Contact
                </MuiLink>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant='h6'
              color='text.primary'
              gutterBottom
              fontWeight='medium'
            >
              Contact
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              paragraph
              sx={{ mb: 2 }}
            >
              Have questions or feedback? Reach out to us.
            </Typography>
            <MuiLink
              href='mailto:contact@example.com'
              color='primary'
              underline='hover'
              sx={{ display: "block", mb: 1 }}
            >
              contact@example.com
            </MuiLink>
            <MuiLink href='tel:+11234567890' color='primary' underline='hover'>
              +1 (123) 456-7890
            </MuiLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant='h6'
              color='text.primary'
              gutterBottom
              fontWeight='medium'
            >
              Subscribe
            </Typography>
            <Typography variant='body2' color='text.secondary' paragraph>
              Join our newsletter to get the latest updates.
            </Typography>
            <Paper
              component='form'
              onSubmit={handleSubscribe}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                maxWidth: 300,
                border: 1,
                borderColor: "divider",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Your email'
                inputProps={{ "aria-label": "subscribe to newsletter" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type='email'
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
              <IconButton
                color='primary'
                sx={{ p: "10px" }}
                aria-label='subscribe'
                type='submit'
              >
                <Send />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            © {currentYear} Image Gallery. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <MuiLink
              component={Link}
              href='#'
              color='inherit'
              underline='hover'
              variant='body2'
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={Link}
              href='#'
              color='inherit'
              underline='hover'
              variant='body2'
            >
              Terms of Service
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
