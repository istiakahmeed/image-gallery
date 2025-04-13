"use client";

import { useState } from "react";
import {
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Zoom,
  alpha,
  Divider,
} from "@mui/material";
import { Add, Close, CloudUpload } from "@mui/icons-material";
import MultiImageUpload from "./multi-image-upload";

interface UploadFabProps {
  onUploadComplete?: () => void;
  onUploadClick?: () => void;
}

export default function UploadFab({
  onUploadComplete,
  onUploadClick,
}: UploadFabProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleFabClick = () => {
    if (onUploadClick) {
      // If parent wants to handle the upload click, delegate to it
      onUploadClick();
    } else {
      // Otherwise handle locally
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadComplete = () => {
    setOpen(false);
    if (onUploadComplete) {
      onUploadComplete();
    }
  };

  return (
    <>
      <Zoom in={true}>
        <Fab
          color='primary'
          aria-label='upload'
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
            width: 64,
            height: 64,
            boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
            "&:hover": {
              boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`,
              transform: "translateY(-2px)",
            },
            transition: "all 0.2s ease-in-out",
          }}
          onClick={handleFabClick}
        >
          <Add sx={{ fontSize: 32 }} />
        </Fab>
      </Zoom>

      {/* Only show this dialog if we're not using parent component's dialog */}
      {!onUploadClick && (
        <Dialog
          open={open}
          onClose={handleClose}
          fullScreen={fullScreen}
          fullWidth
          maxWidth='md'
          PaperProps={{
            elevation: 8,
            sx: {
              borderRadius: fullScreen ? 0 : 3,
              overflow: "hidden",
              backgroundImage:
                theme.palette.mode === "dark"
                  ? `linear-gradient(to bottom right, ${alpha(
                      theme.palette.background.paper,
                      0.8
                    )}, ${alpha(theme.palette.background.paper, 0.9)})`
                  : `linear-gradient(to bottom right, ${alpha(
                      "#fff",
                      0.9
                    )}, ${alpha("#f5f5f5", 0.95)})`,
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <DialogTitle
            sx={{
              p: { xs: 2, sm: 3 },
              pb: { xs: 1, sm: 2 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                }}
              >
                <CloudUpload />
              </Box>
              <Box>
                <Typography variant='h5' sx={{ fontWeight: 600 }}>
                  Upload Images
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Select multiple images to upload
                </Typography>
              </Box>
            </Box>
            <IconButton
              edge='end'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
              sx={{
                bgcolor: theme.palette.grey[100],
                "&:hover": {
                  bgcolor: theme.palette.grey[200],
                },
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <Divider sx={{ opacity: 0.6 }} />

          <DialogContent sx={{ p: 3 }}>
            <MultiImageUpload onUploadComplete={handleUploadComplete} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
