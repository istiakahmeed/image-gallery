import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  useTheme,
} from "@mui/material";
import Image from "next/image";

export default function AboutPage() {
  return (
    <Container maxWidth='lg' sx={{ py: { xs: 4, md: 8 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          mb: { xs: 5, md: 8 },
          textAlign: "center",
          position: "relative",
          py: 5,
        }}
      >
        <Typography
          variant='h2'
          component='h1'
          gutterBottom
          sx={{
            fontWeight: 800,
            background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 3,
          }}
        >
          About Image Gallery
        </Typography>

        <Typography
          variant='h6'
          color='text.secondary'
          sx={{
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.7,
            mb: 4,
          }}
        >
          Learn more about our image gallery application, its features, and the
          technology behind it.
        </Typography>

        <Box
          sx={{
            width: { xs: 80, sm: 120 },
            height: { xs: 4, sm: 6 },
            mx: "auto",
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Mission Statement */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          mb: 6,
          borderRadius: 0,
          border: "1px solid black",
          position: "relative",
        }}
      >
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Our Mission
        </Typography>

        <Typography
          variant='body1'
          paragraph
          sx={{
            fontSize: "1.1rem",
            lineHeight: 1.8,
            maxWidth: 900,
          }}
        >
          Our mission is to provide a simple, elegant, and powerful platform for
          users to showcase their images. Whether you're a photographer,
          designer, or just someone who loves to share visual content, our
          gallery application offers the perfect solution.
        </Typography>

        <Typography
          variant='body1'
          sx={{
            fontSize: "1.1rem",
            lineHeight: 1.8,
            maxWidth: 900,
          }}
        >
          We believe in creating tools that are not only functional but also
          beautiful and intuitive. Our gallery application is designed with user
          experience in mind, making it easy for anyone to upload, organize, and
          share their images.
        </Typography>
      </Paper>

      <Box sx={{ mb: 2 }}>
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Technology Stack
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mb: 8,
        }}
      >
        {/* Frontend Stack (Left on desktop) */}
        <Box sx={{ flex: 1, width: { xs: "100%", md: "50%" } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              height: "100%",
              borderRadius: 0,
              border: "1px solid black",
            }}
          >
            <Typography
              variant='h5'
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Frontend
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box component='ul' sx={{ pl: 2, mt: 2 }}>
              <Box component='li' sx={{ mb: 2 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Next.js:</strong> React framework for server-rendered
                  applications
                </Typography>
              </Box>
              <Box component='li' sx={{ mb: 2 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>TypeScript:</strong> Typed superset of JavaScript for
                  better code quality
                </Typography>
              </Box>
              <Box component='li' sx={{ mb: 2 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Material UI:</strong> React component library for
                  modern, responsive design
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Backend Stack (Right on desktop) */}
        <Box sx={{ flex: 1, width: { xs: "100%", md: "50%" } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              height: "100%",
              borderRadius: 0,
              border: "1px solid black",
            }}
          >
            <Typography
              variant='h5'
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Backend
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box component='ul' sx={{ pl: 2, mt: 2 }}>
              <Box component='li' sx={{ mb: 2 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>MongoDB:</strong> NoSQL database for storing image
                  metadata
                </Typography>
              </Box>
              <Box component='li' sx={{ mb: 2 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Cloudinary:</strong> Cloud-based image management
                  service
                </Typography>
              </Box>
              <Box component='li' sx={{ mb: 2 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Next.js API Routes:</strong> Serverless functions for
                  backend operations
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Features Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 0,
          border: "1px solid black",
        }}
      >
        <Typography
          variant='h4'
          component='h2'
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Features
        </Typography>

        <Typography
          variant='body1'
          paragraph
          sx={{
            fontSize: "1.1rem",
            mb: 4,
          }}
        >
          Our image gallery application offers a range of features to help you
          manage and showcase your images:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box component='ul' sx={{ pl: 2 }}>
              <Box component='li' sx={{ mb: 3 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Multiple Image Uploads:</strong> Upload multiple
                  images simultaneously with drag-and-drop functionality
                </Typography>
              </Box>
              <Box component='li' sx={{ mb: 3 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Responsive Gallery:</strong> View your images in a
                  beautiful, responsive grid layout that adapts to any screen
                  size
                </Typography>
              </Box>
              <Box component='li' sx={{ mb: 3 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Image Preview:</strong> Click on any image to view it
                  in full size with detailed information
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box component='ul' sx={{ pl: 2 }}>
              <Box component='li' sx={{ mb: 3 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Image Management:</strong> Add titles and captions,
                  organize images into collections, and delete with confirmation
                </Typography>
              </Box>
              <Box component='li' sx={{ mb: 3 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Infinite Scroll:</strong> Load more images as you
                  scroll down for a seamless browsing experience
                </Typography>
              </Box>
              <Box component='li' sx={{ mb: 3 }}>
                <Typography variant='body1' sx={{ fontSize: "1.05rem" }}>
                  <strong>Fast Performance:</strong> Optimized image loading
                  with lazy loading and responsive sizing
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
