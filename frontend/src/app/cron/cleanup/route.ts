import { NextResponse } from 'next/server';

export async function GET() {
  // Reemplaza con tu URL real de Render
  const RENDER_URL = "https://iaurlanalayzer.onrender.com/api/v1/admin/cleanup";
  
  try {
    const response = await fetch(RENDER_URL, {
      method: 'POST',
      headers: {
        // Usa la clave que tienes en el .env de tu backend
        'x-admin-token': process.env.ADMIN_SECRET_KEY || 'secret_key',
      },
    });

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error calling Render" }, { status: 500 });
  }
}