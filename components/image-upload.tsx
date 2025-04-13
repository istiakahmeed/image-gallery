"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Button,
  Box,
  TextField,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Grid,
  IconButton,
} from "@mui/material"
import { CloudUpload, Close, AddPhotoAlternate } from "@mui/icons-material"
import Image from "next/image"

interface FileWithPreview extends File {
  preview?: string
  title?: string
  caption?: string
}

export default function ImageUpload() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)

      // Validate files
      const invalidFiles = selectedFiles.filter((file) => !file.type.match("image.*"))
      if (invalidFiles.length > 0) {
        setError("Please select only image files")
        return
      }

      // Check file sizes (limit to 5MB each)
      const oversizedFiles = selectedFiles.filter((file) => file.size > 5 * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        setError("All files must be less than 5MB")
        return
      }

      const newFiles = selectedFiles.map((file) => {
        return {
          ...file,
          preview: URL.createObjectURL(file),
          title: "",
          caption: "",
        } as FileWithPreview
      })

      setFiles((prev) => [...prev, ...newFiles])
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)

      // Validate files
      const invalidFiles = droppedFiles.filter((file) => !file.type.match("image.*"))
      if (invalidFiles.length > 0) {
        setError("Please select only image files")
        return
      }

      // Check file sizes (limit to 5MB each)
      const oversizedFiles = droppedFiles.filter((file) => file.size > 5 * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        setError("All files must be less than 5MB")
        return
      }

      const newFiles = droppedFiles.map((file) => {
        return {
          ...file,
          preview: URL.createObjectURL(file),
          title: "",
          caption: "",
        } as FileWithPreview
      })

      setFiles((prev) => [...prev, ...newFiles])
      setError(null)
    }
  }

  const handleTitleChange = (index: number, newTitle: string) => {
    setFiles((prev) => prev.map((file, i) => (i === index ? { ...file, title: newTitle } : file)))
  }

  const handleCaptionChange = (index: number, newCaption: string) => {
    setFiles((prev) => prev.map((file, i) => (i === index ? { ...file, caption: newCaption } : file)))
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      // Revoke the object URL to avoid memory leaks
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one image to upload")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Create an array of promises for each file upload
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("title", file.title || "Untitled")
        formData.append("caption", file.caption || "")

        const response = await fetch("/api/images", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        return await response.json()
      })

      // Wait for all uploads to complete
      await Promise.all(uploadPromises)

      // Reset form
      setFiles([])
      setSuccess(true)

      // Refresh the page to show the new images
      window.location.reload()
    } catch (err) {
      console.error("Upload error:", err)
      setError("Failed to upload one or more images. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleCloseSnackbar = () => {
    setSuccess(false)
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: "2px dashed #ccc",
          borderRadius: 2,
          backgroundColor: "background.paper",
          transition: "border-color 0.3s ease",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Box sx={{ textAlign: "center" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
            multiple
          />

          {files.length > 0 ? (
            <>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {files.map((file, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        position: "relative",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 4,
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(255,255,255,0.8)",
                          zIndex: 1,
                        }}
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                      <Box sx={{ position: "relative", height: 140, mb: 2 }}>
                        <Image
                          src={file.preview || "/placeholder.svg"}
                          alt={`Preview ${index}`}
                          fill
                          style={{ objectFit: "cover", borderRadius: "4px" }}
                        />
                      </Box>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Image title"
                        variant="outlined"
                        value={file.title || ""}
                        onChange={(e) => handleTitleChange(index, e.target.value)}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Add a caption (optional)"
                        variant="outlined"
                        value={file.caption || ""}
                        onChange={(e) => handleCaptionChange(index, e.target.value)}
                        sx={{ mt: 1 }}
                      />
                    </Paper>
                  </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dashed",
                      borderColor: "divider",
                      cursor: "pointer",
                      transition: "border-color 0.2s ease",
                      "&:hover": {
                        borderColor: "primary.main",
                      },
                    }}
                    onClick={handleBrowseClick}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <AddPhotoAlternate sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Add more images
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                  sx={{ px: 4 }}
                >
                  {loading ? "Uploading..." : `Upload ${files.length} Image${files.length > 1 ? "s" : ""}`}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    // Revoke all object URLs
                    files.forEach((file) => {
                      if (file.preview) URL.revokeObjectURL(file.preview)
                    })
                    setFiles([])
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 3,
              }}
            >
              <CloudUpload sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drag and drop images here
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                or
              </Typography>
              <Button variant="outlined" onClick={handleBrowseClick} sx={{ mt: 1 }}>
                Browse Files
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                Supports multiple images (max 5MB each)
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Images uploaded successfully!
        </Alert>
      </Snackbar>
    </>
  )
}
