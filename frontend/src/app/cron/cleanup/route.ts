import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 1. Verificación de seguridad de Vercel (Opcional pero recomendado)
  // Vercel envía un header automático para asegurar que solo ellos llamen a esta URL
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Si estás probando localmente, puedes comentar estas 3 líneas de abajo
    // return new Response('Unauthorized', { status: 401 });
  }

  const RENDER_BACKEND_URL = "https://iaurlanalayzer.onrender.com/api/v1/admin/admin/cleanup";

  try {
    const response = await fetch(RENDER_BACKEND_URL, {
      method: 'POST',
      headers: {
        'x-admin-token': process.env.ADMIN_SECRET_KEY || 'secret_key', // La clave que compartes con el backend
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Render cleanup triggered",
      render_response: data
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to reach Render" }, { status: 500 });
  }
}