export async function GET() {
  console.log("Iniciando tarea de limpieza Cron..."); // Esto aparecerá en los logs de Vercel
  
  try {
    const response = await fetch("https://iaurlanalayzer.onrender.com/api/v1/admin/admin/cleanup", { 
        method: 'POST',
        headers: { 'x-admin-token': process.env.ADMIN_SECRET_KEY || 'secret_key' }
    });
    
    const data = await response.json();
    console.log("Respuesta de Render:", data); // Esto te dirá cuántos borró
    return Response.json(data);
  } catch (error) {
    console.error("Error en el puente Cron:", error);
    return Response.json({ error: "Fallo" }, { status: 500 });
  }
}