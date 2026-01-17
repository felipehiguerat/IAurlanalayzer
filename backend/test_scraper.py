import asyncio
import httpx
from bs4 import BeautifulSoup

async def run_test():
    url = "https://www.linkedin.com/in/williamhgates"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
    }
    
    async with httpx.AsyncClient(headers=headers, follow_redirects=True, timeout=20.0) as client:
        try:
            print(f"Probando scraping de: {url}")
            response = await client.get(url)
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                print(f"Title: {soup.title.string if soup.title else 'No title'}")
                # Buscar algo que confirme que es un perfil
                if "LinkedIn" in response.text:
                    print("Contenido parece ser de LinkedIn")
                else:
                    print("Contenido NO parece ser de LinkedIn (posible bloqueo)")
            else:
                print(f"Error: {response.text[:200]}")
        except Exception as e:
            print(f"Excepción: {str(e)}")

if __name__ == "__main__":
    asyncio.run(run_test())
