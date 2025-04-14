# 📸 Image Gallery App

A modern, responsive image gallery application built with Next.js, TypeScript, and Material UI.

## 🚀 Features

- **📤 Image Upload**: Upload single or multiple images via Cloudinary
- **🖼️ Responsive Gallery**: Display images in a clean, responsive grid layout
- **👁️ Image Preview**: Click on images to view them in a larger modal
- **🗑️ Delete Functionality**: Remove images with a confirmation popup
- **🔄 Pagination/Infinite Scroll**: Browse through your image collection seamlessly
- **🔍 Search**: Filter images by title or tags
- **🧑‍💻 Mobile-Friendly**: Fully responsive across all device sizes

## 🛠️ Tech Stack

- **[Next.js](https://nextjs.org/)**: React framework for production
- **[TypeScript](https://www.typescriptlang.org/)**: Static type checking
- **[Material UI](https://mui.com/)**: Component library for modern UI
- **[Cloudinary](https://cloudinary.com/)**: Cloud-based image management
- **State Management**: Optional integration with Zustand or Context API

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or pnpm

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/image-gallery.git
cd image-gallery

# Install dependencies
pnpm install
# or
npm install
```

### Environment Variables

```
NEXT_PUBLIC_API_URL=your_api_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the App

```bash# Start the development server
pnpm dev
# or
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.
You should see the image gallery app running.

### Building for Production

```bash
# Build the app for production
pnpm build
# or
npm run build
```
