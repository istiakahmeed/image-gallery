import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import cloudinary from "@/lib/cloudinary"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid image ID" }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db("gallery")

    // Get the image to find the Cloudinary public ID
    const image = await db.collection("images").findOne({
      _id: new ObjectId(id),
    })

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId)

    // Delete from MongoDB
    await db.collection("images").deleteOne({
      _id: new ObjectId(id),
    })

    return NextResponse.json({
      message: "Image deleted successfully",
    })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
