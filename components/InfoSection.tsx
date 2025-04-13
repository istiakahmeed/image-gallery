"use client";

import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  useTheme,
  ImageList,
  ImageListItem,
} from "@mui/material";
import Link from "next/link";
import ImageIcon from "@mui/icons-material/Image";
import Image from "next/image";

// Sample gallery images for preview
const previewImages = [
  {
    src: "https://images.unsplash.com/reserve/QGSbW0lOQiGXi0uZRhJm_PR_00803_retina.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Mountain landscape",
    cols: 2,
    rows: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1493134799591-2c9eed26201a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "City skyline",
    cols: 1,
    rows: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1460627390041-532a28402358?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Beach sunset",
    cols: 1,
    rows: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1518022525094-218670c9b745?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Beach sunset",
    cols: 1,
    rows: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1616790876844-97c0c6057364?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Portrait photography",
    cols: 1,
    rows: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1621139261252-27d1a67449f4?q=80&w=1940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Wildlife photography",
    cols: 2,
    rows: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1545327229-a4b759c9d448?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Wildlife photography",
    cols: 2,
    rows: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1727341555918-df1d76cbdbe0?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Portrait photography",
    cols: 1,
    rows: 2,
  },
];

export default function InfoSection() {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, bgcolor: "background.default" }}>
      <Container maxWidth='md'>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 0,
            textAlign: "center",
            border: "1px solid black",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.8)",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease-out",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
            },
          }}
        >
          {/* Gallery Preview Section */}
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: { xs: 220, sm: 280, md: 320 },
              overflow: "hidden",
              borderBottom: "1px solid black",
            }}
          >
            <ImageList
              sx={{
                width: "100%",
                height: "100%",
                m: 0,
                overflow: "hidden",
              }}
              variant='quilted'
              cols={4}
              rowHeight={80}
            >
              {previewImages.map((item, index) => (
                <ImageListItem
                  key={index}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                  sx={{
                    overflow: "hidden",
                    "& img": {
                      transition: "transform 0.5s ease",
                    },
                    "&:hover img": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <img
                    src={`${item.src}`}
                    alt={item.alt}
                    loading='lazy'
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>

            {/* Overlay with gradient */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "50%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Typography
                variant='h6'
                sx={{
                  color: "white",
                  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                  fontWeight: 600,
                }}
              >
                Featured Gallery
              </Typography>
            </Box>
          </Box>

          {/* Content Section */}
          <Box
            sx={{
              p: { xs: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant='h4'
              component='h2'
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 3,
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Start Your Visual Journey Today
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              paragraph
              sx={{
                mb: 5,
                fontSize: { xs: "1rem", md: "1.125rem" },
                lineHeight: 1.7,
                maxWidth: "700px",
                mx: "auto",
              }}
            >
              Our gallery provides a seamless platform for photographers,
              artists, and creators to showcase their work with
              professional-grade display options and powerful organization
              tools.
            </Typography>
            <Link href='/gallery' passHref style={{ textDecoration: "none" }}>
              <Button
                variant='contained'
                size='large'
                startIcon={<ImageIcon />}
                sx={{
                  borderRadius: 0,
                  py: 1.5,
                  px: 4,
                  background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                  boxShadow: "0 3px 5px 2px rgba(139, 92, 246, 0.3)",
                  alignSelf: "center",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Explore Gallery
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
