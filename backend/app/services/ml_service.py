import re
from typing import Dict, List

class MLService:
    def __init__(self):
        # "Bolsa de palabras" - Palabras clave para clasificación
        self.hot_keywords = {
            "precio", "comprar", "oferta", "demo", "contacto", "venta", 
            "servicio", "solución", "profesional", "cotización", "business", 
            "enterprise", "pricing", "buy", "software", "plataforma", "cliente",
            "mantenimiento", "consultoría", "soporte"
        }
        
        self.cold_keywords = {
            "blog", "noticia", "artículo", "personal", "hobby", "juego", 
            "wiki", "foro", "curiosidad", "opinión", "vlog", "social",
            "música", "entretenimiento", "gratis"
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
        Clasifica un lead como 'Hot' o 'Cold' usando un enfoque de bolsa de palabras.
        """
        combined_text = f"{title or ''} {description or ''}"
        tokens = self._preprocess(combined_text)
        
        # Enfoque Bag of Words: contar ocurrencias de palabras clave
        hot_matches = [token for token in tokens if token in self.hot_keywords]
        cold_matches = [token for token in tokens if token in self.cold_keywords]
        
        hot_score = len(hot_matches)
        cold_score = len(cold_matches)
        
        # Margen de decisión
        score = hot_score - cold_score
        
        if score > 0:
            prediction = "Hot"
        elif score < 0:
            prediction = "Cold"
        else:
            # Si hay un empate o no hay palabras clave, usamos una lógica por defecto
            # Podríamos expandir esto luego con modelos más complejos
            prediction = "Neutral"
            
        return {
            "status": prediction,
            "score": score,
            "analysis": {
                "hot_hits": list(set(hot_matches)),
                "cold_hits": list(set(cold_matches)),
                "total_hot": hot_score,
                "total_cold": cold_score
            }
        }
