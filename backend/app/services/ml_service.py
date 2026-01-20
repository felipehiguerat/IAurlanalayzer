import re
from typing import Dict, List

class MLService:
    def __init__(self):
        # "Bolsa de palabras" - Palabras clave para clasificación
        self.hot_keywords = {
            # Negocios y Ventas
    "precio", "comprar", "oferta", "demo", "contacto", "venta", "servicio", 
    "solución", "profesional", "cotización", "business", "enterprise", "pricing", 
    "buy", "software", "plataforma", "plattform", "client", "customer", "mantenimiento", 
    "consultoría", "soporte", "support", "b2b", "roi", "leads", "sales", "ventas",
    
    # Tecnología e IA (Tu nicho principal)
    "ai", "ia", "artificial intelligence", "inteligencia artificial", "machine learning", 
    "ml", "cloud", "nube", "saas", "api", "infrastructure", "infraestructura", 
    "automation", "automatización", "data", "analytics", "dashboard", "framework", 
    "engine", "workflow", "scalability", "escalabilidad", "devops", "security", "cybersecurity",
    
    # Intención de Acción
    "get started", "empezar", "probar gratis", "free trial", "book a call", 
    "schedule", "agendar", "demo", "request", "solicitar", "partners", "aliados"
        }
        
        self.cold_keywords = {
           # Informativo / Entretenimiento
    "blog", "noticia", "news", "artículo", "article", "personal", "hobby", "juego", 
    "game", "wiki", "foro", "forum", "curiosidad", "opinión", "vlog", "social",
    "música", "music", "entretenimiento", "entertainment", "gratis", "free", 
    "tutorial", "guía", "guide", "review", "reseña", "receta", "recipe",
    
    # No comerciales / No escalables
    "blog", "fan", "comunidad", "community", "asociación", "foundation", 
    "charity", "donar", "donate", "non-profit", "sin fines de lucro", 
    "bakery", "panadería", "coffee", "cafetería", "travel", "viajes", 
    "lifestyle", "estilo de vida", "vlog", "diario", "podcast", "youtube"
        }

    def _preprocess(self, text: str) -> List[str]:
        """Limpia y tokeniza el texto."""
        if not text:
            return []
        # Convertir a minúsculas y extraer palabras
        text = text.lower()
        tokens = re.findall(r'\b\w+\b', text)
        return tokens

   def classify_lead(self, title: str, description: str) -> Dict[str, any]:
    """
    Clasifica un lead calculando un score normalizado y determinando su estado.
    """
    # 1. Preparación de datos
    text = f"{title or ''} {description or ''}"
    tokens = self._preprocess(text)
    
    # 2. Identificación de señales (conceptos únicos)
    hot_hits = list(set(t for t in tokens if t in self.hot_keywords))
    cold_hits = list(set(t for t in tokens if t in self.cold_keywords))

    # 3. Cálculo de Score (Lógica de Pesos)
    # Empezamos en 0.4 (un Warm base)
    # Cada palabra Hot suma 0.2 | Cada palabra Cold resta 0.15
    base_score = 0.4 
    calculated_score = base_score + (len(hot_hits) * 0.2) - (len(cold_hits) * 0.15)
    
    # Normalizamos el score entre 0.1 y 0.99 para el frontend
    final_score = max(0.1, min(0.99, calculated_score))

    # 4. Determinación de Status basado en el score final
    if final_score >= 0.7:
        status = "hot"
    elif final_score <= 0.3:
        status = "cold"
    else:
        status = "warm"

    return {
        "status": status,
        "ml_score": final_score,
        "ml_analysis": {
            "hot_hits": hot_hits,
            "cold_hits": cold_hits,
            "total_hot": len(hot_hits),
            "total_cold": len(cold_hits),
            "reasoning": f"Score of {final_score:.2f} based on {len(hot_hits)} hot and {len(cold_hits)} cold signals."
        }
    }