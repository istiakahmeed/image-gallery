import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import cloudinary from "@/lib/cloudinary"
import { Readable } from "stream"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const skip = (page - 1) * limit

  try {
    const client = await clientPromise
    const db = client.db("gallery")

    const images = await db.collection("images").find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    return NextResponse.json({ images })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | Blob
    const title = (formData.get("title") as string) || "Untitled"
    const caption = (formData.get("caption") as string) || ""

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Handle file data based on what's available
    let buffer: Buffer

    if (file instanceof Blob) {
      // For Blob objects (including File objects in some environments)
      const arrayBuffer = await file.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else {
      // Fallback for other cases
      const fileData = await (file as any).text()
      buffer = Buffer.from(fileData, "base64")
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "gallery",
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )

      const stream = Readable.from(buffer)
      stream.pipe(uploadStream)
    })

    // Save to MongoDB
    const client = await clientPromise
    const db = client.db("gallery")

    const result = await db.collection("images").insertOne({
      url: (uploadResult as any).secure_url,
      publicId: (uploadResult as any).public_id,
      title: title || (file instanceof File ? file.name : "Image"),
      caption: caption || "",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageId: result.insertedId,
    })
  } catch (error) {
    console.error("Upload error:", error)
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      {
        error: "Failed to upload image",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
