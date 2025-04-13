"use client"

import { Dialog, DialogContent, IconButton, Box, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"
import Image from "next/image"
import type { ImageType } from "@/lib/types"

interface ImageModalProps {
  open: boolean
  onClose: () => void
  image: ImageType | null
  index?: number
}

export default function ImageModal({ open, onClose, image, index = 0 }: ImageModalProps) {
  if (!image) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent sx={{ p: 0, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>

        <Box sx={{ position: "relative", width: "100%", height: "80vh" }}>
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.title || "Image preview"}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </Box>

        {image.title && (
          <Box sx={{ p: 2, bgcolor: "background.paper" }}>
            <Typography variant="h6">
              {image.title && image.title !== "Untitled" ? image.title : `Photo ${index + 1}`}
            </Typography>
            {image.createdAt && (
              <Typography variant="body2" color="text.secondary">
                Uploaded on {new Date(image.createdAt).toLocaleDateString()}
              </Typography>
            )}
            {image.caption ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {image.caption}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: "italic" }}>
                No caption available
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}
