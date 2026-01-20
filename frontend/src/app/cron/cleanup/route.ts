// Este es un "puente" que Vercel sí nos permite ejecutar
export async function GET() {
  const RENDER_URL = "https://iaurlanalayzer.onrender.com/api/v1/admin/cleanup";
  
  try {
    const response = await fetch(RENDER_URL, {
      method: 'POST',
      headers: {
        'x-admin-token': process.env.ADMIN_SECRET_KEY || 'tu_clave_aqui',
      },
    });

    const data = await response.json();
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ success: false, error: "Error llamando a Render" }, { status: 500 });
  }
}