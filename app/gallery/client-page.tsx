"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  alpha,
  Fade,
  Divider,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
} from "@mui/material";
import {
  CloudUpload,
  PhotoLibrary,
  Collections,
  Image as ImageIcon,
  Add,
  Close,
} from "@mui/icons-material";
import MultiImageUpload from "@/components/multi-image-upload";
import ImagePreviewGrid from "@/components/image-preview-grid";
import UploadFab from "@/components/upload-fab";
import { useSearchParams, useRouter } from "next/navigation";

export default function GalleryClientPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const searchParams = useSearchParams();
  const router = useRouter();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Check if the URL has an upload parameter
  useEffect(() => {
    if (searchParams.get("upload") === "true") {
      setShowUploadForm(true);
      // Remove the parameter from the URL
      router.replace("/gallery");
    }
  }, [searchParams, router]);

  const handleUploadComplete = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
    setShowUploadForm(false);
  }, []);

  const handleImageDeleted = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <Container maxWidth='lg' sx={{ py: { xs: 4, md: 6 } }}>
      <Fade in={true} timeout={800}>
        <Box>
          {/* Header Section */}
          <Box
            sx={{
              mb: 6,
              p: { xs: 3, sm: 4 },
              border: "1px solid black",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 25px rgba(0,0,0,0.1)",
              },
            }}
          >
            <Grid
              container
              spacing={4}
              alignItems='center'
              justifyContent='space-between'
            >
              <Grid item xs={12} md={7}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 0, // Square shape
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                      border: "1px solid black",
                    }}
                  >
                    <Collections sx={{ fontSize: 30, color: "#fff" }} />
                  </Box>
                  <Typography
                    variant='h3'
                    component='h1'
                    sx={{
                      fontWeight: 800,
                      letterSpacing: "-0.5px",
                      background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Image Gallery
                  </Typography>
                </Box>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{
                    mt: 2,
                    fontSize: "1.05rem",
                    lineHeight: 1.6,
                    maxWidth: "90%",
                  }}
                >
                  Upload, view, and manage your images in one place. Add
                  captions to your images and view them in a beautiful gallery
                  with a modern, minimalist design.
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 3, flexWrap: "wrap" }}>
                  <Chip
                    icon={<ImageIcon fontSize='small' />}
                    label='Organize Photos'
                    variant='outlined'
                    sx={{
                      borderRadius: 0, // Square shape
                      pl: 0.5,
                      border: "1px solid black",
                    }}
                  />
                  <Chip
                    icon={<Add fontSize='small' />}
                    label='Add Captions'
                    variant='outlined'
                    sx={{
                      borderRadius: 0, // Square shape
                      pl: 0.5,
                      border: "1px solid black",
                    }}
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                  mt: { xs: 2, md: 0 },
                }}
              >
                <Button
                  variant='contained'
                  size='large'
                  startIcon={<CloudUpload />}
                  onClick={() => setShowUploadForm(true)}
                  sx={{
                    px: 4,
                    py: { xs: 1.25, sm: 1.75 },
                    borderRadius: 0, // Square shape
                    textTransform: "none",
                    fontSize: { xs: "0.95rem", sm: "1.1rem" },
                    fontWeight: 600,
                    background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                    border: "1px solid black",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                    },
                  }}
                >
                  Upload Images
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Upload Dialog - Popup modal */}
          <Dialog
            open={showUploadForm}
            onClose={() => setShowUploadForm(false)}
            fullWidth
            maxWidth='md'
            fullScreen={fullScreen}
            PaperProps={{
              elevation: 0,
              sx: {
                borderRadius: 0, // Square shape
                overflow: "hidden",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                border: "1px solid black",
              },
            }}
          >
            <DialogTitle
              sx={{
                p: { xs: 2, sm: 3 },
                pb: { xs: 1, sm: 2 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid black",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CloudUpload sx={{ fontSize: 28, color: "#3b82f6" }} />
                <Box>
                  <Typography
                    variant='h5'
                    component='h2'
                    sx={{ fontWeight: 700 }}
                  >
                    Upload Images
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Select multiple images to upload
                  </Typography>
                </Box>
              </Box>

              <IconButton
                aria-label='close'
                onClick={() => setShowUploadForm(false)}
                sx={{ color: theme.palette.text.secondary }}
              >
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent
              sx={{
                p: { xs: 2, sm: 3 },
                pt: { xs: 2, sm: 3, marginTop: 10 },
              }}
            >
              <MultiImageUpload onUploadComplete={handleUploadComplete} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Button
                  variant='outlined'
                  onClick={() => setShowUploadForm(false)}
                  sx={{
                    borderRadius: 0, // Square shape
                    px: 3,
                    py: 1,
                    border: "1px solid black",
                    color: theme.palette.text.primary,
                    "&:hover": {
                      border: "1px solid black",
                      backgroundColor: "rgba(0,0,0,0.05)",
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

          {/* Image Grid Container */}
          <Box
            sx={{
              mt: 7,
              border: "1px solid black",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              overflow: "hidden",
              transition: "all 0.3s ease-out",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Box
              sx={{
                borderBottom: "1px solid black",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant='h6' sx={{ fontWeight: 600 }}>
                Your Images
              </Typography>
            </Box>

            <Box
              sx={{
                p: { xs: 2, sm: 3 },
                minHeight: "300px",
              }}
            >
              <ImagePreviewGrid
                key={refreshKey}
                onImageDeleted={handleImageDeleted}
              />
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Floating action button for quick upload */}
      <UploadFab
        onUploadClick={() => setShowUploadForm(true)}
        onUploadComplete={handleUploadComplete}
      />
    </Container>
  );
}
