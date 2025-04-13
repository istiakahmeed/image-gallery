"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Skeleton,
  IconButton,
  Tooltip,
  Fade,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  useTheme,
  alpha,
  Button,
} from "@mui/material";
import {
  Delete,
  Visibility,
  CloudUpload,
  PhotoLibrary,
  CalendarToday,
  Info,
  ArrowDownward,
} from "@mui/icons-material";
import Image from "next/image";
import ImageViewerModal from "./image-viewer-modal";
import DeleteDialog from "./delete-dialog";
import type { ImageType } from "@/lib/types";
import ImageCard from "./image-card";

interface ImagePreviewGridProps {
  onImageDeleted?: () => void;
}

export default function ImagePreviewGrid({
  onImageDeleted,
}: ImagePreviewGridProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [deleteImage, setDeleteImage] = useState<ImageType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const theme = useTheme();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchImages = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/images?page=${pageNum}&limit=12`);

      if (!res.ok) {
        throw new Error(`Failed to fetch images: ${res.status}`);
      }

      const data = await res.json();

      if (data.images.length === 0) {
        setHasMore(false);
      } else {
        setImages((prev) =>
          pageNum === 1 ? data.images : [...prev, ...data.images]
        );
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(page);
  }, [page, fetchImages]);

  const handleOpenModal = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setOpenModal(true);
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImageIndex(null);
  };

  const handleDeleteClick = (image: ImageType, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteImage(image);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteImage) return;

    try {
      const res = await fetch(`/api/images/${deleteImage._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setImages(images.filter((img) => img._id !== deleteImage._id));
        if (onImageDeleted) {
          onImageDeleted();
        }
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setOpenDeleteDialog(false);
      setDeleteImage(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setDeleteImage(null);
  };

  const handleNavigateImage = (direction: "prev" | "next") => {
    if (selectedImageIndex === null) return;

    if (direction === "prev" && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (direction === "next" && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (images.length === 0 && !loading && !initialLoad) {
    return (
      <Paper
        elevation={2}
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: 3,
          bgcolor: "background.paper",
          border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
          backgroundColor: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            mb: 3,
            mx: "auto",
          }}
        >
          <PhotoLibrary
            sx={{ fontSize: 40, color: theme.palette.primary.main }}
          />
        </Box>
        <Typography
          variant='h5'
          color='text.primary'
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          No images found
        </Typography>
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ maxWidth: "500px", mx: "auto", mb: 3 }}
        >
          Your gallery is empty. Upload some images to get started and they will
          appear here.
        </Typography>
        <Button
          variant='contained'
          startIcon={<CloudUpload />}
          href='/gallery?upload=true'
        >
          Upload Images
        </Button>
      </Paper>
    );
  }

  return (
    <>
      <ImageCard
        images={images}
        loading={loading}
        lastImageElementRef={lastImageElementRef}
        handleOpenModal={handleOpenModal}
        handleDeleteClick={handleDeleteClick}
      />
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
            mt: 3,
          }}
        >
          <CircularProgress
            size={48}
            thickness={4}
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              opacity: 0.9,
            }}
          />
          <Typography
            variant='body2'
            sx={{
              mt: 2,
              color: theme.palette.text.secondary,
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            Loading your images...
          </Typography>
        </Box>
      )}
      {hasMore && !loading && images.length > 0 && (
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
            mb: 4,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "80%", sm: "60%", md: "40%" },
              height: 1,
              bgcolor: alpha(theme.palette.divider, 0.3),
              zIndex: 0,
            },
          }}
        >
          <Button
            variant='outlined'
            onClick={handleLoadMore}
            endIcon={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  transition: "all 0.3s ease",
                }}
              >
                <ArrowDownward sx={{ fontSize: 16 }} />
              </Box>
            }
            sx={{
              px: 5,
              py: 1.8,
              borderRadius: 10,
              borderWidth: 2,
              fontSize: "0.95rem",
              fontWeight: 600,
              textTransform: "none",
              letterSpacing: "0.02em",
              borderColor: alpha(theme.palette.primary.main, 0.6),
              backgroundColor: theme.palette.background.paper,
              position: "relative",
              zIndex: 1,
              "&:hover": {
                borderWidth: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? alpha(theme.palette.primary.main, 0.15)
                    : alpha(theme.palette.primary.main, 0.08),
                transform: "translateY(-2px)",
              },
              boxShadow: `0 6px 20px ${alpha(
                theme.palette.primary.main,
                0.15
              )}`,
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            Load More Images
          </Button>
        </Box>
      )}
      {selectedImageIndex !== null && images.length > 0 && (
        <ImageViewerModal
          open={openModal}
          onClose={handleCloseModal}
          images={images}
          currentIndex={selectedImageIndex}
          onNavigate={handleNavigateImage}
        />
      )}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
