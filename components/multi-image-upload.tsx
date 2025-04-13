"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  LinearProgress,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Fade,
  useTheme,
  alpha,
  Tooltip,
} from "@mui/material";
import {
  CloudUpload,
  AddPhotoAlternate,
  Edit,
  Save,
  Cancel,
  PhotoLibrary,
  DeleteOutline,
} from "@mui/icons-material";
import Image from "next/image";

interface FileWithPreview extends File {
  preview: string;
  id: string;
  title?: string;
  caption?: string;
  isEditingCaption?: boolean;
  isEditingTitle?: boolean;
}

export default function MultiImageUpload({
  onUploadComplete,
}: {
  onUploadComplete?: () => void;
}) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  // Generate a unique ID for each file
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files);

        // Validate files
        const invalidFiles = selectedFiles.filter(
          (file) => !file.type.match("image.*")
        );
        if (invalidFiles.length > 0) {
          setError("Please select only image files");
          return;
        }

        // Check file sizes (limit to 5MB each)
        const oversizedFiles = selectedFiles.filter(
          (file) => file.size > 5 * 1024 * 1024
        );
        if (oversizedFiles.length > 0) {
          setError("All files must be less than 5MB");
          return;
        }

        const newFiles = selectedFiles.map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
          id: generateUniqueId(),
          title: "",
          caption: "",
          isEditingCaption: false,
          isEditingTitle: false,
        }));

        setFiles((prev) => [...prev, ...newFiles]);
        setError(null);

        // Reset the file input
        if (e.target.value) e.target.value = "";
      }
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);

      // Validate files
      const invalidFiles = droppedFiles.filter(
        (file) => !file.type.match("image.*")
      );
      if (invalidFiles.length > 0) {
        setError("Please select only image files");
        return;
      }

      // Check file sizes (limit to 5MB each)
      const oversizedFiles = droppedFiles.filter(
        (file) => file.size > 5 * 1024 * 1024
      );
      if (oversizedFiles.length > 0) {
        setError("All files must be less than 5MB");
        return;
      }

      const newFiles = droppedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
        id: generateUniqueId(),
        title: "",
        caption: "",
        isEditingCaption: false,
        isEditingTitle: false,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      setError(null);
    }
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((file) => file.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((file) => file.id !== id);
    });
  }, []);

  const handleTitleChange = useCallback((id: string, title: string) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, title } : file))
    );
  }, []);

  const toggleTitleEdit = useCallback((id: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, isEditingTitle: !file.isEditingTitle }
          : file
      )
    );
  }, []);

  const handleCaptionChange = useCallback((id: string, caption: string) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, caption } : file))
    );
  }, []);

  const toggleCaptionEdit = useCallback((id: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, isEditingCaption: !file.isEditingCaption }
          : file
      )
    );
  }, []);

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      setError("Please select at least one image to upload");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Upload each file with progress tracking
      const totalFiles = files.length;
      let completedFiles = 0;
      let failedUploads = 0;

      const uploadPromises = files.map(async (file, index) => {
        try {
          const formData = new FormData();

          // Append the file as a Blob to ensure compatibility
          const blob = new Blob(
            [await fetch(file.preview).then((r) => r.blob())],
            { type: file.type }
          );
          formData.append("file", blob, file.name);
          formData.append("title", file.title || file.name || "");
          formData.append("caption", file.caption || "");

          const response = await fetch("/api/images", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.details || `Failed to upload ${file.name}`
            );
          }

          completedFiles++;
          setUploadProgress((completedFiles / totalFiles) * 100);

          return await response.json();
        } catch (err) {
          console.error(`Error uploading file ${index}:`, err);
          failedUploads++;
          throw err;
        }
      });

      // Wait for all uploads to complete
      await Promise.allSettled(uploadPromises);

      // Clean up previews
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });

      if (failedUploads > 0) {
        setError(
          `Failed to upload ${failedUploads} image(s). Please try again.`
        );
      } else {
        setFiles([]);
        setSuccess(true);

        // Call the callback if provided
        if (onUploadComplete) {
          onUploadComplete();
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload one or more images. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [files, onUploadComplete]);

  const handleBrowseClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSuccess(false);
  }, []);

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          p: 0,
          overflow: "hidden",
          backgroundColor: "background.paper",
          borderRadius: 4,
          boxShadow: theme.shadows[5],
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            p: 4,
            border: "2px dashed",
            borderColor:
              files.length > 0
                ? "transparent"
                : alpha(theme.palette.primary.main, 0.4),
            borderRadius: 4,
            backgroundColor:
              files.length > 0
                ? "transparent"
                : alpha(theme.palette.primary.main, 0.04),
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
            position: "relative",
            "&:hover": {
              backgroundColor:
                files.length > 0
                  ? "transparent"
                  : alpha(theme.palette.primary.main, 0.06),
            },
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Box sx={{ textAlign: "center" }}>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
              multiple
            />

            {files.length > 0 ? (
              <>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant='h4'
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 1,
                    }}
                  >
                    Selected Images ({files.length})
                  </Typography>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{ mb: 3, maxWidth: "600px", mx: "auto", opacity: 0.8 }}
                  >
                    Add titles and captions to your images before uploading. You
                    can add more images or remove selected ones.
                  </Typography>
                  <Button
                    variant='outlined'
                    startIcon={<AddPhotoAlternate />}
                    onClick={handleBrowseClick}
                    sx={{
                      mt: 1,
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      borderWidth: 2,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      "&:hover": {
                        borderWidth: 2,
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.08
                        ),
                      },
                    }}
                  >
                    Add More Images
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  {files.map((file, index) => (
                    <Grid item xs={12} sm={6} md={4} key={file.id}>
                      <Fade
                        in={true}
                        timeout={500}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <Card
                          elevation={3}
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            position: "relative",
                            overflow: "hidden", // Changed from 'visible' to 'hidden' to fix content overflow
                            borderRadius: 3, // Reduced from 4 for more modern look
                            transition: "all 0.3s ease",
                            transform: "translateY(0)",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: theme.shadows[8],
                              "& .image-zoom": {
                                transform: "scale(1.05)", // Subtle zoom effect on hover
                              },
                            },
                            // Simplified the before pseudo-element
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              borderRadius: 3,
                              border: `2px solid ${alpha(
                                theme.palette.primary.main,
                                0.5
                              )}`,
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                              zIndex: 1,
                              pointerEvents: "none", // Ensures interactions pass through to card
                            },
                            "&:hover::before": {
                              opacity: 1,
                            },
                          }}
                        >
                          {/* Delete button with improved positioning and accessibility */}
                          <IconButton
                            size='small'
                            color='error'
                            aria-label='Remove image'
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: alpha("#fff", 0.9),
                              boxShadow: 2,
                              zIndex: 3,
                              width: 30,
                              height: 30,
                              "&:hover": {
                                bgcolor: "#fff",
                                transform: "scale(1.1)",
                              },
                              transition: "all 0.2s ease",
                            }}
                            onClick={() => handleRemoveFile(file.id)}
                          >
                            <DeleteOutline fontSize='small' />
                          </IconButton>

                          <CardMedia
                            sx={{
                              position: "relative",
                              height: 180, // Slightly reduced height for better proportions
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              overflow: "hidden", // Ensures image stays within bounds
                            }}
                          >
                            <Image
                              src={file.preview || "/placeholder.svg"}
                              alt={file.name}
                              fill
                              className='image-zoom'
                              style={{
                                objectFit: "cover",
                                transition: "transform 0.5s ease",
                              }}
                              sizes='(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw'
                            />
                            {/* Gradient overlay with improved opacity for better readability */}
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "70px",
                                background:
                                  "linear-gradient(transparent, rgba(0,0,0,0.7))",
                                zIndex: 1,
                              }}
                            />
                          </CardMedia>

                          <CardContent sx={{ flexGrow: 1, pb: 1, pt: 2 }}>
                            {file.isEditingTitle ? (
                              <TextField
                                fullWidth
                                size='small'
                                placeholder='Enter title...'
                                value={file.title || ""}
                                onChange={(e) =>
                                  handleTitleChange(file.id, e.target.value)
                                }
                                autoFocus
                                variant='outlined'
                                sx={{
                                  mb: 1.5,
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    fontSize: "0.9rem",
                                    backgroundColor: alpha(
                                      theme.palette.background.paper,
                                      0.7
                                    ),
                                    "&.Mui-focused fieldset": {
                                      borderWidth: 2,
                                      borderColor: theme.palette.primary.main,
                                    },
                                  },
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <IconButton
                                      size='small'
                                      color='primary'
                                      onClick={() => toggleTitleEdit(file.id)}
                                      edge='end'
                                    >
                                      <Save fontSize='small' />
                                    </IconButton>
                                  ),
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 1.5,
                                }}
                              >
                                <Typography
                                  variant='subtitle1'
                                  sx={{
                                    fontWeight: 600,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    color: theme.palette.text.primary,
                                    flexGrow: 1,
                                  }}
                                >
                                  {file.title || file.name}
                                </Typography>
                                <Tooltip title='Edit title'>
                                  <IconButton
                                    size='small'
                                    onClick={() => toggleTitleEdit(file.id)}
                                    sx={{
                                      width: 28,
                                      height: 28,
                                      color: theme.palette.text.secondary,
                                      "&:hover": {
                                        backgroundColor: alpha(
                                          theme.palette.primary.main,
                                          0.08
                                        ),
                                        color: theme.palette.primary.main,
                                      },
                                    }}
                                  >
                                    <Edit fontSize='small' />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            )}

                            {file.isEditingCaption ? (
                              <TextField
                                fullWidth
                                size='small'
                                placeholder='Add a caption...'
                                value={file.caption || ""}
                                onChange={(e) =>
                                  handleCaptionChange(file.id, e.target.value)
                                }
                                autoFocus
                                variant='outlined'
                                sx={{
                                  mt: 0.5,
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    fontSize: "0.875rem",
                                    backgroundColor: alpha(
                                      theme.palette.background.paper,
                                      0.7
                                    ),
                                    "&.Mui-focused fieldset": {
                                      borderWidth: 2,
                                      borderColor: theme.palette.primary.main,
                                    },
                                  },
                                }}
                                InputProps={{
                                  endAdornment: (
                                    <IconButton
                                      size='small'
                                      color='primary'
                                      onClick={() => toggleCaptionEdit(file.id)}
                                      edge='end'
                                    >
                                      <Save fontSize='small' />
                                    </IconButton>
                                  ),
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  mt: 0.5,
                                  zIndex: 1,
                                  position: "relative",
                                  backgroundColor: alpha(
                                    theme.palette.background.default,
                                    0.04
                                  ),
                                  p: 1.5,
                                  borderRadius: 2,
                                  border: `1px solid ${alpha(
                                    theme.palette.divider,
                                    0.08
                                  )}`,
                                  minHeight: "56px", // Consistent height whether empty or with text
                                }}
                              >
                                <Typography
                                  variant='body2'
                                  color='text.secondary'
                                  sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    flexGrow: 1,
                                    fontSize: "0.875rem",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {file.caption || (
                                    <span
                                      style={{
                                        fontStyle: "italic",
                                        opacity: 0.7,
                                      }}
                                    >
                                      No caption added yet
                                    </span>
                                  )}
                                </Typography>
                              </Box>
                            )}
                          </CardContent>

                          <CardActions
                            sx={{
                              pt: 0,
                              px: 2,
                              pb: 2,
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              size='small'
                              startIcon={
                                file.isEditingCaption ? (
                                  <Save fontSize='small' />
                                ) : (
                                  <Edit fontSize='small' />
                                )
                              }
                              onClick={() => toggleCaptionEdit(file.id)}
                              sx={{
                                borderRadius: 6,
                                px: 2,
                                py: 0.5,
                                backgroundColor: file.isEditingCaption
                                  ? alpha(theme.palette.primary.main, 0.1)
                                  : alpha(theme.palette.background.paper, 0.6),
                                color: file.isEditingCaption
                                  ? theme.palette.primary.main
                                  : theme.palette.text.secondary,
                                "&:hover": {
                                  backgroundColor: file.isEditingCaption
                                    ? alpha(theme.palette.primary.main, 0.15)
                                    : alpha(theme.palette.primary.main, 0.08),
                                },
                                fontSize: "0.8125rem",
                                fontWeight: 500,
                              }}
                            >
                              {file.isEditingCaption ? "Save" : "Edit Caption"}
                            </Button>
                          </CardActions>
                        </Card>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 5 }}>
                  {uploading && (
                    <Box sx={{ width: "100%", mb: 4 }}>
                      <LinearProgress
                        variant='determinate'
                        value={uploadProgress}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          mb: 1.5,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                            backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            boxShadow: `0 4px 10px ${alpha(
                              theme.palette.primary.main,
                              0.3
                            )}`,
                          },
                        }}
                      />
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        align='center'
                        sx={{ fontWeight: 500 }}
                      >
                        Uploading... {Math.round(uploadProgress)}%
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{ display: "flex", gap: 3, justifyContent: "center" }}
                  >
                    <Button
                      variant='contained'
                      onClick={handleUpload}
                      disabled={uploading}
                      startIcon={
                        uploading ? (
                          <CircularProgress size={20} color='inherit' />
                        ) : (
                          <CloudUpload />
                        )
                      }
                      sx={{
                        px: 5,
                        py: 1.5,
                        fontSize: "1rem",
                        borderRadius: 3,
                        boxShadow: `0 8px 16px ${alpha(
                          theme.palette.primary.main,
                          0.25
                        )}`,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        fontWeight: 600,
                        "&:hover": {
                          boxShadow: `0 10px 20px ${alpha(
                            theme.palette.primary.main,
                            0.35
                          )}`,
                          background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {uploading
                        ? "Uploading..."
                        : `Upload ${files.length} Image${
                            files.length > 1 ? "s" : ""
                          }`}
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => {
                        // Revoke all object URLs
                        files.forEach((file) => {
                          if (file.preview) URL.revokeObjectURL(file.preview);
                        });
                        setFiles([]);
                      }}
                      disabled={uploading}
                      startIcon={<Cancel />}
                      sx={{
                        px: 3,
                        py: 1.5,
                        fontSize: "1rem",
                        borderRadius: 3,
                        borderWidth: 2,
                        fontWeight: 500,
                        "&:hover": {
                          borderWidth: 2,
                          backgroundColor: alpha(
                            theme.palette.error.main,
                            0.08
                          ),
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  py: 8,
                  px: 3,
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    mb: 4,
                    boxShadow: `0 0 0 10px ${alpha(
                      theme.palette.primary.main,
                      0.05
                    )}`,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, transparent, ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )})`,
                    },
                  }}
                >
                  <PhotoLibrary
                    sx={{ fontSize: 45, color: theme.palette.primary.main }}
                  />
                </Box>
                <Typography
                  variant='h4'
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Upload Your Images
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  gutterBottom
                  sx={{
                    maxWidth: "550px",
                    mb: 4,
                    textAlign: "center",
                    fontSize: "1.05rem",
                  }}
                >
                  Drag and drop your images here, or click the button below to
                  browse your files.
                </Typography>
                <Button
                  variant='contained'
                  onClick={handleBrowseClick}
                  startIcon={<CloudUpload />}
                  sx={{
                    px: 5,
                    py: 1.8,
                    fontSize: "1.1rem",
                    borderRadius: 3,
                    boxShadow: `0 8px 16px ${alpha(
                      theme.palette.primary.main,
                      0.25
                    )}`,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    fontWeight: 600,
                    "&:hover": {
                      boxShadow: `0 10px 20px ${alpha(
                        theme.palette.primary.main,
                        0.35
                      )}`,
                      background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Browse Files
                </Button>
                <Box
                  sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.6),
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M12 16V12'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M12 8H12.01'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    Supports multiple images (max 5MB each)
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>

      {error && (
        <Alert
          severity='error'
          sx={{
            mt: 3,
            borderRadius: 3,
            boxShadow: theme.shadows[3],
            p: 1.5,
          }}
        >
          {error}
        </Alert>
      )}

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          variant='filled'
          sx={{
            width: "100%",
            boxShadow: theme.shadows[8],
            borderRadius: 2,
            pl: 2,
            pr: 6,
          }}
          iconMapping={{
            success: (
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999'
                  stroke='currentColor'
                  fill='none'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M22 4L12 14.01L9 11.01'
                  stroke='currentColor'
                  fill='none'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ),
          }}
        >
          Images uploaded successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
