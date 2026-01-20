import { NextResponse } from 'next/server';

export async function GET() {
  // USA LA URL QUE TE FUNCIONÓ EN POSTMAN (Incluso si tiene doble "admin")
  const RENDER_URL = "https://iaurlanalayzer.onrender.com/api/v1/admin/admin/cleanup";
  
  const secret = process.env.ADMIN_SECRET_KEY || "secret_key";

  console.log("Intentando llamar a Render...");

  try {
    const response = await fetch(RENDER_URL, {
      method: 'POST',
      headers: {
        'x-admin-token': secret,
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();
    return NextResponse.json({ success: true, from_render: data });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      tip: "Revisa que la URL de Render sea accesible" 
    }, { status: 500 });
  }
}