"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Chip,
  Tooltip,
  alpha,
  Button,
} from "@mui/material";
import {
  Close,
  ArrowBackIosNew,
  ArrowForwardIos,
  Info,
  InfoOutlined,
  CalendarToday,
  FullscreenExit,
  Fullscreen,
  Download,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import Image from "next/image";
import type { ImageType } from "@/lib/types";

interface ImageViewerModalProps {
  open: boolean;
  onClose: () => void;
  images: ImageType[];
  currentIndex: number;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function ImageViewerModal({
  open,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: ImageViewerModalProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const image = images[currentIndex];

  // Reset info panel when changing images
  useEffect(() => {
    setShowInfo(false);
    setIsLiked(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowLeft") {
        onNavigate("prev");
      } else if (e.key === "ArrowRight") {
        onNavigate("next");
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "f") {
        toggleFullscreen();
      } else if (e.key === "i") {
        setShowInfo(!showInfo);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onNavigate, onClose, showInfo]);

  if (!image) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // If the swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left, go to next image
        onNavigate("next");
      } else {
        // Swiped right, go to previous image
        onNavigate("prev");
      }
    }

    setTouchStart(null);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDownload = () => {
    if (!image.url) return;

    const link = document.createElement("a");
    link.href = image.url;
    link.download = image.title || "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xl'
      fullWidth
      fullScreen={isFullscreen || fullScreen}
      TransitionComponent={Fade}
      transitionDuration={300}
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
          backgroundImage: "none",
          boxShadow: isFullscreen ? 0 : "0 4px 30px rgba(0,0,0,0.3)",
          position: "relative",
          overflow: "hidden",
          height: fullScreen ? "100%" : "90vh",
          maxHeight: "90vh",
          m: isFullscreen ? 0 : undefined,
          borderRadius: 0, // Square corners
          border: isFullscreen ? "none" : "1px solid black",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          "&:first-of-type": { p: 0 },
        }}
      >
        {/* Top bar with essential controls */}
        <Fade in={true}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              p: { xs: 1.5, sm: 2 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(8px)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                sx={{
                  color: "white",
                  fontSize: { xs: "0.95rem", sm: "1.1rem" },
                  fontWeight: 500,
                  maxWidth: { xs: 200, md: 400 },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {image.title || `Image ${currentIndex + 1}`}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
              <Chip
                label={`${currentIndex + 1} / ${images.length}`}
                size='small'
                sx={{
                  mr: { xs: 1, sm: 2 },
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  height: 26,
                  fontSize: "0.75rem",
                  borderRadius: 0, // Square shape
                  border: "1px solid white",
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />

              <Tooltip title={isLiked ? "Unlike" : "Like"}>
                <IconButton
                  onClick={toggleLike}
                  size='small'
                  sx={{
                    color: isLiked ? "#ff4d6d" : "white",
                    padding: 1,
                  }}
                  aria-label={isLiked ? "Unlike image" : "Like image"}
                >
                  {isLiked ? (
                    <Favorite fontSize='small' />
                  ) : (
                    <FavoriteBorder fontSize='small' />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title='Download'>
                <IconButton
                  onClick={handleDownload}
                  size='small'
                  sx={{
                    color: "white",
                    padding: 1,
                  }}
                  aria-label='Download image'
                >
                  <Download fontSize='small' />
                </IconButton>
              </Tooltip>

              <Tooltip title={showInfo ? "Hide info" : "Show info"}>
                <IconButton
                  onClick={() => setShowInfo(!showInfo)}
                  size='small'
                  sx={{
                    color: showInfo ? "#8b5cf6" : "white",
                    padding: 1,
                  }}
                  aria-label='Toggle image information'
                >
                  {showInfo ? (
                    <Info fontSize='small' />
                  ) : (
                    <InfoOutlined fontSize='small' />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
                <IconButton
                  onClick={toggleFullscreen}
                  size='small'
                  sx={{
                    color: "white",
                    padding: 1,
                  }}
                  aria-label='Toggle fullscreen'
                >
                  {isFullscreen ? (
                    <FullscreenExit fontSize='small' />
                  ) : (
                    <Fullscreen fontSize='small' />
                  )}
                </IconButton>
              </Tooltip>

              <IconButton
                onClick={onClose}
                size='small'
                sx={{
                  color: "white",
                  padding: 1,
                }}
                aria-label='Close'
              >
                <Close fontSize='small' />
              </IconButton>
            </Box>
          </Box>
        </Fade>

        {/* Image container */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            flexGrow: 1,
            bgcolor: "#0a0a0a", // Dark background for image container
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.title || "Image preview"}
            fill
            style={{
              objectFit: "contain",
              transition: "transform 0.4s ease",
            }}
            sizes='100vw'
            priority
            quality={95}
            onError={(e) => {
              console.error("Image failed to load:", image.url);
              e.currentTarget.src = "/placeholder.svg?height=800&width=1200";
            }}
          />

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <IconButton
              onClick={() => onNavigate("prev")}
              sx={{
                position: "absolute",
                left: { xs: 8, sm: 16 },
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
                width: { xs: 36, sm: 44 },
                height: { xs: 36, sm: 44 },
                borderRadius: 0, // Square shape
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              aria-label='Previous image'
            >
              <ArrowBackIosNew
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" }, ml: 1 }}
              />
            </IconButton>
          )}

          {currentIndex < images.length - 1 && (
            <IconButton
              onClick={() => onNavigate("next")}
              sx={{
                position: "absolute",
                right: { xs: 8, sm: 16 },
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                bgcolor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
                width: { xs: 36, sm: 44 },
                height: { xs: 36, sm: 44 },
                borderRadius: 0, // Square shape
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              aria-label='Next image'
            >
              <ArrowForwardIos
                sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
              />
            </IconButton>
          )}
        </Box>

        {/* Info panel */}
        <Slide direction='up' in={showInfo} mountOnEnter unmountOnExit>
          <Paper
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: { xs: 2, sm: 3 },
              borderRadius: 0, // Square shape
              maxHeight: "40%",
              overflowY: "auto",
              zIndex: 5,
              backdropFilter: "blur(16px)",
              bgcolor: alpha(theme.palette.background.paper, 0.7),
              borderTop: "1px solid black",
            }}
            elevation={0}
          >
            <Box
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                {image.title || `Image ${currentIndex + 1}`}
              </Typography>

              <Chip
                icon={<CalendarToday fontSize='small' />}
                label={formatDate(image.createdAt)}
                size='small'
                variant='outlined'
                sx={{
                  fontSize: "0.75rem",
                  height: 26,
                  borderRadius: 0, // Square shape
                  border: "1px solid black",
                }}
              />
            </Box>

            {image.caption && (
              <Typography variant='body2' sx={{ mb: 2, lineHeight: 1.6 }}>
                {image.caption}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 2,
              }}
            >
              <Button
                variant='outlined'
                size='small'
                startIcon={
                  isLiked ? (
                    <Favorite sx={{ color: "#ff4d6d" }} />
                  ) : (
                    <FavoriteBorder />
                  )
                }
                onClick={toggleLike}
                sx={{
                  borderRadius: 0, // Square shape
                  textTransform: "none",
                  border: "1px solid black",
                  color: isLiked ? "#ff4d6d" : undefined,
                  "&:hover": {
                    border: "1px solid black",
                    backgroundColor: "rgba(0,0,0,0.03)",
                  },
                }}
              >
                {isLiked ? "Liked" : "Like"}
              </Button>

              <Button
                variant='contained'
                size='small'
                startIcon={<Download />}
                onClick={handleDownload}
                sx={{
                  borderRadius: 0, // Square shape
                  textTransform: "none",
                  boxShadow: 0,
                  background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                  border: "1px solid black",
                }}
              >
                Download
              </Button>
            </Box>
          </Paper>
        </Slide>
      </DialogContent>
    </Dialog>
  );
}
