"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
  alpha,
  useTheme,
} from "@mui/material"
import { Warning, DeleteForever } from "@mui/icons-material"

interface DeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteDialog({ open, onClose, onConfirm }: DeleteDialogProps) {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxWidth: 400,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(theme.palette.error.main, 0.1),
            }}
          >
            <Warning color="error" />
          </Box>
          <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
            Delete Image
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "text.primary", mb: 2 }}>
          Are you sure you want to delete this image?
        </DialogContentText>
        <DialogContentText color="text.secondary">
          This action cannot be undone and the image will be permanently removed from your gallery.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          color="inherit"
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          startIcon={<DeleteForever />}
          sx={{
            borderRadius: 2,
            px: 3,
            background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
