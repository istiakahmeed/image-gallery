import type { Metadata } from "next";
import GalleryClientPage from "./client-page";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Image Gallery | Browse and Manage Your Images",
  description:
    "Upload, view, and manage your images in a beautiful responsive gallery",
};

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      }
    >
      <GalleryClientPage />
    </Suspense>
  );
}
