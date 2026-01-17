import httpx
from bs4 import BeautifulSoup
from datetime import datetime
from typing import Dict, Any, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ScraperService:
    def __init__(self):
        self.client = httpx.AsyncClient(
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Cache-Control": "max-age=0",
            },
            timeout=15.0,
            follow_redirects=True
        )

    async def scrape_url(self, url: str) -> Dict[str, Any]:
        """
        Extrae información básica de una URL. Maneja URLs sin protocolo automáticamente.
        """
        url = url.strip()
        
        # Bloqueo de auto-scraping para evitar errores recursivos
        if "localhost" in url or "127.0.0.1" in url or "0.0.0.0" in url:
            return {
                "error": "No se permite scrapear el propio servidor para evitar errores recursivos. Por favor, ingresa una URL externa (ej: google.com)",
                "url": url
            }

        if not url.startswith(("http://", "https://")):
            url = f"https://{url}"

        try:
            response = await self.client.get(url)
            
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extraer datos básicos (Casting a str para evitar problemas de serialización de BeautifulSoup)
            title = "No title"
            if soup.title and soup.title.string:
                title = str(soup.title.string).strip()

            description = ""
            desc_tag = soup.find("meta", attrs={"name": "description"})
            if desc_tag and desc_tag.get("content"):
                description = str(desc_tag.get("content")).strip()
            
            h1s = [str(h1.get_text(strip=True)) for h1 in soup.find_all("h1")]
            
            logger.info(f"Scraping exitoso para: {url}")
            
            return {
                "url": str(url),
                "title": title,
                "description": description,
                "h1s": h1s,
                "status_code": int(response.status_code),
                "scraped_at": datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error al scrapear {url}: {str(e)}")
            return {"error": str(e), "url": url}

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.aclose()
