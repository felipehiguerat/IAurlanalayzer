import asyncio
import sys
import os

# Asegurar que podemos importar app
sys.path.append(os.getcwd())

from app.services.scraper_service import ScraperService

async def verify_linkedin_handling():
    url = "https://www.linkedin.com/in/williamhgates"
    print(f"Testing ScraperService with: {url}")
    
    async with ScraperService() as scraper:
        result = await scraper.scrape_url(url)
        
        print("\n--- Resultado del Scraper ---")
        print(result)
        
        if "error" in result:
            print(f"\n✅ CORRECTO: El servicio detectó el error/bloqueo de LinkedIn: {result['error']}")
        else:
            print("\n⚠️  ATENCIÓN: Se obtuvieron datos. ¿Quizás el bloqueo no se activó?")

if __name__ == "__main__":
    asyncio.run(verify_linkedin_handling())
