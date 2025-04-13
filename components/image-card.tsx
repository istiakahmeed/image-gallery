"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Fade,
  useTheme,
  alpha,
  Skeleton,
  Chip,
  Badge,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Delete,
  Visibility,
  CalendarToday,
  PhotoLibrary,
  Search,
  FilterAlt,
  Clear,
} from "@mui/icons-material";
import Image from "next/image";
import type { ImageType } from "@/lib/types";

// For random image heights in masonry layout
const getRandomHeight = (): number => {
  const heights = [200, 240, 280, 320];
  return heights[Math.floor(Math.random() * heights.length)];
};

interface ImageCardProps {
  images: ImageType[];
  loading: boolean;
  lastImageElementRef: (node: HTMLDivElement | null) => void;
  handleOpenModal: (index: number) => void;
  handleDeleteClick: (image: ImageType, e: React.MouseEvent) => void;
}

export default function ImageCard({
  images,
  loading,
  lastImageElementRef,
  handleOpenModal,
  handleDeleteClick,
}: ImageCardProps) {
  const theme = useTheme();
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});
  const masonryRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter images based on search term
  const filteredImages = images.filter((image) =>
    (image.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate random heights for each image
  useEffect(() => {
    const heights: Record<string, number> = {};
    images.forEach((image) => {
      if (!imageHeights[image._id]) {
        heights[image._id] = getRandomHeight();
      }
    });

    if (Object.keys(heights).length > 0) {
      setImageHeights((prev) => ({ ...prev, ...heights }));
    }
  }, [images, imageHeights]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      {/* Title section with search and photo count */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          mb: 3,
          pb: 2,
          gap: { xs: 2, sm: 0 },
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              position: "relative",
              "&:after": {
                content: '""',
                position: "absolute",
                bottom: -5,
                left: 0,
                width: 40,
                height: 3,
                borderRadius: 1.5,
                bgcolor: theme.palette.primary.main,
              },
            }}
          >
            Photo Gallery
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {/* Search field */}
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Filter by title...'
            size='small'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search fontSize='small' color='action' />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position='end'>
                  <IconButton size='small' onClick={clearSearch} edge='end'>
                    <Clear fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: 2,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
                "&:hover, &.Mui-focused": {
                  bgcolor: alpha(theme.palette.background.paper, 0.8),
                },
                transition: "all 0.2s",
                fontSize: "0.9rem",
              },
            }}
            sx={{
              minWidth: { xs: "100%", sm: 200 },
              maxWidth: 300,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: alpha(theme.palette.divider, 0.2),
                },
                "&:hover fieldset": {
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />

          {/* Photos count badge */}
          <Badge
            badgeContent={filteredImages.length}
            color='primary'
            showZero
            max={999}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontWeight: 500,
                fontSize: "0.75rem",
                px: 1,
                height: 20,
                minWidth: 20,
              },
            }}
          >
            <Chip
              icon={<PhotoLibrary fontSize='small' />}
              label={searchTerm ? "Filtered" : "Photos"}
              variant='outlined'
              color={searchTerm ? "primary" : "default"}
              sx={{
                px: 0.5,
                borderColor: alpha(
                  theme.palette.primary.main,
                  searchTerm ? 0.5 : 0.3
                ),
                "& .MuiChip-label": { px: 1, pr: 1.5 },
                "& .MuiChip-icon": {
                  color: searchTerm
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                },
              }}
            />
          </Badge>
        </Box>
      </Box>

      {/* Search results messaging */}
      {searchTerm && (
        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <FilterAlt fontSize='small' color='primary' />
          <Typography variant='body2' color='text.secondary'>
            <Typography component='span' color='primary.main' fontWeight={600}>
              {filteredImages.length}
            </Typography>{" "}
            {filteredImages.length === 1 ? "image" : "images"} found for "
            <Typography component='span' fontWeight={500}>
              {searchTerm}
            </Typography>
            "
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            label='Clear filter'
            size='small'
            onClick={clearSearch}
            onDelete={clearSearch}
            sx={{
              height: 24,
              fontSize: "0.75rem",
              "& .MuiChip-deleteIcon": {
                fontSize: "0.9rem",
              },
            }}
          />
        </Box>
      )}

      {/* Empty state when no results */}
      {searchTerm && filteredImages.length === 0 && !loading && (
        <Box
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 4,
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`,
          }}
        >
          <SearchIcon
            sx={{
              fontSize: 48,
              color: alpha(theme.palette.text.primary, 0.3),
              mb: 2,
            }}
          />
          <Typography variant='h6' gutterBottom>
            No matching images found
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mb: 2, maxWidth: 500 }}
          >
            We couldn't find any images matching "{searchTerm}". Try adjusting
            your search term or clear the filter to see all images.
          </Typography>
          <Chip
            label='Clear filter'
            color='primary'
            onClick={clearSearch}
            variant='outlined'
          />
        </Box>
      )}

      {/* Pinterest grid */}
      <Box
        ref={masonryRef}
        sx={{
          columnCount: { xs: 1, sm: 2, md: 3, lg: 4 },
          columnGap: 2,
          pb: 4,
          opacity: searchTerm && filteredImages.length === 0 ? 0 : 1,
          height: searchTerm && filteredImages.length === 0 ? 0 : "auto",
          overflow: "hidden",
        }}
      >
        {filteredImages.map((image, index) => {
          const isLastElement = index === filteredImages.length - 1;
          const height = imageHeights[image._id] || 240;
          const originalIndex = images.findIndex(
            (img) => img._id === image._id
          );

          return (
            <Fade
              key={image._id}
              in={true}
              timeout={600}
              style={{
                transitionDelay: `${(index % 20) * 50}ms`,
                display: "inline-block",
                width: "100%",
                breakInside: "avoid",
                marginBottom: "16px",
              }}
            >
              <Box
                ref={isLastElement ? lastImageElementRef : null}
                sx={{
                  position: "relative",
                  borderRadius: 3,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: `0 2px 10px ${alpha(
                    theme.palette.common.black,
                    0.08
                  )}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: `0 12px 25px ${alpha(
                      theme.palette.common.black,
                      0.15
                    )}`,
                    "& .image-overlay": {
                      opacity: 1,
                    },
                    "& .image-zoom": {
                      transform: "scale(1.05)",
                    },
                  },
                }}
                onClick={() => handleOpenModal(originalIndex)}
              >
                <Box
                  sx={{
                    position: "relative",
                    height,
                    overflow: "hidden",
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={image.title || "Gallery image"}
                    fill
                    sizes='(max-width: 600px) 100vw, (max-width: 960px) 50vw, 25vw'
                    className='image-zoom'
                    style={{
                      objectFit: "cover",
                      transition:
                        "transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)",
                    }}
                    placeholder='blur'
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQvhwAAAABJRU5ErkJggg=='
                  />

                  <Box
                    className='image-overlay'
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      p: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Image number with search highlight if needed */}
                      <Typography
                        variant='caption'
                        sx={{
                          color: "#fff",
                          bgcolor:
                            searchTerm &&
                            image.title
                              ?.toLowerCase()
                              .includes(searchTerm.toLowerCase())
                              ? alpha(theme.palette.primary.main, 0.8)
                              : alpha(theme.palette.common.black, 0.5),
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontWeight: 600,
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        #{originalIndex + 1}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title='View image' placement='bottom' arrow>
                          <IconButton
                            size='small'
                            sx={{
                              bgcolor: alpha(
                                theme.palette.background.paper,
                                0.7
                              ),
                              backdropFilter: "blur(4px)",
                              color: "#fff",
                              width: 32,
                              height: 32,
                              "&:hover": {
                                bgcolor: alpha(
                                  theme.palette.background.paper,
                                  0.9
                                ),
                                color: theme.palette.primary.main,
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(originalIndex);
                            }}
                          >
                            <Visibility fontSize='small' />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title='Delete image' placement='bottom' arrow>
                          <IconButton
                            size='small'
                            sx={{
                              bgcolor: alpha(
                                theme.palette.background.paper,
                                0.7
                              ),
                              backdropFilter: "blur(4px)",
                              color: "#fff",
                              width: 32,
                              height: 32,
                              "&:hover": {
                                bgcolor: alpha(theme.palette.error.main, 0.9),
                                color: "#fff",
                              },
                            }}
                            onClick={(e) => handleDeleteClick(image, e)}
                          >
                            <Delete fontSize='small' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant='subtitle1'
                        sx={{
                          color: "#fff",
                          fontWeight: 600,
                          textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                          fontSize: "0.95rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {image.title && image.title !== "Untitled"
                          ? image.title
                          : `Photo ${originalIndex + 1}`}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 0.5,
                        }}
                      >
                        <Typography
                          variant='caption'
                          sx={{
                            color: alpha("#fff", 0.95),
                            display: "block",
                            textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "70%",
                          }}
                        >
                          {image.caption || "Tap to view details"}
                        </Typography>

                        <Chip
                          icon={
                            <CalendarToday
                              sx={{ fontSize: "0.65rem", color: "#fff" }}
                            />
                          }
                          label={
                            image.createdAt
                              ? new Date(image.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  }
                                )
                              : "Unknown"
                          }
                          size='small'
                          sx={{
                            height: 20,
                            borderRadius: 4,
                            backgroundColor: alpha("#000", 0.4),
                            backdropFilter: "blur(4px)",
                            color: "#fff",
                            fontSize: "0.65rem",
                            "& .MuiChip-label": { px: 1 },
                            "& .MuiChip-icon": { mr: 0.3 },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Fade>
          );
        })}

        {/* Pinterest-style skeleton loaders */}
        {loading &&
          Array.from(new Array(8)).map((_, index) => {
            const height = getRandomHeight();

            return (
              <Box
                key={`skeleton-${index}`}
                sx={{
                  mb: 2,
                  width: "100%",
                  display: "inline-block",
                  breakInside: "avoid",
                }}
              >
                <Skeleton
                  variant='rounded'
                  height={height}
                  animation='wave'
                  sx={{
                    borderRadius: 3,
                    bgcolor: alpha(
                      theme.palette.primary.main,
                      theme.palette.mode === "dark" ? 0.05 : 0.03
                    ),
                    transform: "scale(1, 1)",
                  }}
                />
              </Box>
            );
          })}
      </Box>
    </>
  );
}

// Custom Search icon component for empty state
const SearchIcon = ({ sx }: { sx?: any }) => (
  <Box
    component='svg'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    sx={sx}
    fill='currentColor'
  >
    <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
  </Box>
);
