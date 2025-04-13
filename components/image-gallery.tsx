"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Grid, Card, CardMedia, CardActions, IconButton, Box, CircularProgress, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material"
import ImageModal from "./image-modal"
import DeleteDialog from "./delete-dialog"
import type { ImageType } from "@/lib/types"

export default function ImageGallery() {
  const [images, setImages] = useState<ImageType[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
  const [deleteImage, setDeleteImage] = useState<ImageType | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastImageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  const fetchImages = useCallback(async (pageNum: number) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/images?page=${pageNum}&limit=12`)
      const data = await res.json()

      if (data.images.length === 0) {
        setHasMore(false)
      } else {
        setImages((prev) => (pageNum === 1 ? data.images : [...prev, ...data.images]))
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages(page)
  }, [page, fetchImages])

  const handleOpenModal = (image: ImageType) => {
    setSelectedImage(image)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedImage(null)
  }

  const handleDeleteClick = (image: ImageType, e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleteImage(image)
    setOpenDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteImage) return

    try {
      const res = await fetch(`/api/images/${deleteImage._id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        setImages(images.filter((img) => img._id !== deleteImage._id))
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    } finally {
      setOpenDeleteDialog(false)
      setDeleteImage(null)
    }
  }

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false)
    setDeleteImage(null)
  }

  if (images.length === 0 && !loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No images found. Upload some images to get started!
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={3}>
        {images.map((image, index) => {
          const isLastElement = index === images.length - 1

          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={image._id}
              ref={isLastElement ? lastImageElementRef : undefined}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(image)}
              >
                <CardMedia
                  component="img"
                  image={image.url}
                  alt={image.title || "Gallery image"}
                  sx={{
                    height: 200,
                    objectFit: "cover",
                  }}
                />
                <CardActions sx={{ justifyContent: "space-between", p: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 1 }}>
                    {image.title || `Image ${index + 1}`}
                  </Typography>
                  <IconButton size="small" color="error" onClick={(e) => handleDeleteClick(image, e)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      <ImageModal open={openModal} onClose={handleCloseModal} image={selectedImage} />

      <DeleteDialog open={openDeleteDialog} onClose={handleDeleteCancel} onConfirm={handleDeleteConfirm} />
    </>
  )
}
