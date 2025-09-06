import { type NextRequest, NextResponse } from "next/server"

// Mock user data store (in a real app, this would be a database)
let userData = {
  id: "1",
  username: "johndoe",
  email: "john@example.com",
  fullName: "John Doe",
  bio: "Passionate about sustainable living and finding unique second-hand treasures. Selling quality items to give them a new life!",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  avatar: "",
  joinDate: "March 2024",
  verified: true,
}

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: userData })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.fullName || !body.email || !body.username) {
      return NextResponse.json(
        { success: false, error: "Full name, email, and username are required" },
        { status: 400 },
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address" }, { status: 400 })
    }

    // Update user data (in a real app, this would update the database)
    userData = { ...userData, ...body }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: userData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update profile" }, { status: 500 })
  }
}
