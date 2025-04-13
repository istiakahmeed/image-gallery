"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { ArrowOutward } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <Box
      sx={{
        bgcolor: "#FAFAFA",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Abstract design elements */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.06)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.09)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: "12%",
          left: "8%",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.06)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Container maxWidth='xl' sx={{ py: { xs: 10, md: 14 } }}>
        {/* Upper title marker */}
        <Box
          sx={{
            height: "2px",
            width: "60px",
            background: "#000",
            mb: 2,
          }}
        />

        {/* Main content */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 8, md: 12 }}
          alignItems='center'
          justifyContent='space-between'
        >
          {/* Text section */}
          <Box sx={{ maxWidth: { xs: "100%", md: "42%" } }}>
            <Typography
              variant='overline'
              sx={{
                letterSpacing: "0.2em",
                fontSize: "0.875rem",
                color: "#666",
                fontWeight: 500,
                mb: 2,
                display: "block",
              }}
            >
              Visual Storytelling
            </Typography>

            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "4.25rem" },
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontWeight: 300,
                color: "#111",
                mb: 4,
              }}
            >
              Capture.
              <Box
                component='span'
                sx={{
                  color: "#000",
                  fontWeight: 500,
                  display: "block",
                  mt: 1,
                  mb: 1,
                }}
              >
                Curate.
              </Box>
              Showcase.
            </Typography>

            <Divider
              sx={{
                width: "40px",
                borderColor: "#000",
                borderBottomWidth: 2,
                my: 4,
              }}
            />

            <Typography
              sx={{
                fontSize: "1.125rem",
                color: "#555",
                mb: 6,
                lineHeight: 1.6,
                fontWeight: 300,
                maxWidth: "95%",
              }}
            >
              A seamless digital space designed to organize and display your
              photographic collection with clarity and purpose. Where every
              image finds its perfect frame.
            </Typography>

            <Stack direction='row' spacing={3} alignItems='center'>
              <Button
                component={Link}
                href='/gallery'
                variant='outlined'
                size='large'
                endIcon={<ArrowOutward />}
                sx={{
                  color: "#000",
                  borderColor: "#000",
                  borderWidth: "1px",
                  borderRadius: 0,
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontSize: "1rem",
                  letterSpacing: "0.03em",
                  fontWeight: 400,
                  "&:hover": {
                    borderColor: "#000",
                    bgcolor: "#000",
                    color: "#fff",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Explore Gallery
              </Button>
              <Box
                sx={{
                  height: "1px",
                  width: "40px",
                  bgcolor: "rgba(0,0,0,0.2)",
                }}
              />
              <Typography variant='body2' color='text.secondary'>
                01
              </Typography>
            </Stack>
          </Box>

          {/* Image section */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "52%" },
              height: { xs: "50vh", md: "72vh" },
              overflow: "hidden",
            }}
          >
            {/* Decorative corner elements */}
            <Box
              sx={{
                position: "absolute",
                top: "25px",
                left: "25px",
                width: "80px",
                height: "80px",
                borderTop: "2px solid rgba(0,0,0,0.15)",
                borderLeft: "2px solid rgba(0,0,0,0.15)",
                zIndex: 2,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "25px",
                right: "25px",
                width: "80px",
                height: "80px",
                borderBottom: "2px solid rgba(0,0,0,0.15)",
                borderRight: "2px solid rgba(0,0,0,0.15)",
                zIndex: 2,
              }}
            />

            {/* Image */}
            <Box
              sx={{
                position: "relative",
                height: "100%",
                transition: "transform 0.7s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src='https://images.unsplash.com/photo-1741851374655-3911c1b0e95a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='Minimalist Gallery Preview'
                width={600}
                height={500}
                priority
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "grayscale(0.2) contrast(1.05)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </Box>

            {/* Subtle grid overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
                zIndex: 1,
              }}
            />
          </Box>
        </Stack>
      </Container>

      {/* Designer signature at bottom */}
      <Box
        sx={{
          position: "absolute",
          bottom: "25px",
          right: "25px",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{ width: "30px", height: "1px", bgcolor: "rgba(0,0,0,0.3)" }}
        />
        <Typography
          variant='caption'
          sx={{ color: "#999", letterSpacing: "0.1em", fontSize: "0.7rem" }}
        >
          CURATED COLLECTION
        </Typography>
      </Box>
    </Box>
  );
}
