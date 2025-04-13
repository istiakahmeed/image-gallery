import type { Metadata } from "next"
import GalleryClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Image Gallery | Browse and Manage Your Images",
  description: "Upload, view, and manage your images in a beautiful responsive gallery",
}

export default function GalleryPage() {
  return <GalleryClientPage />
}
