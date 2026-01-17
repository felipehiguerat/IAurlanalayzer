import unittest
from app.services.ml_service import MLService

class TestMLService(unittest.TestCase):
    def setUp(self):
        self.ml_service = MLService()

    def test_classify_hot_lead(self):
        title = "Oferta especial de software empresarial"
        description = "Consulta nuestro precio y solicita una demo de nuestra solución profesional hoy mismo."
        result = self.ml_service.classify_lead(title, description)
        
        self.assertEqual(result["status"], "Hot")
        self.assertGreater(result["score"], 0)
        self.assertIn("precio", result["analysis"]["hot_hits"])
        self.assertIn("demo", result["analysis"]["hot_hits"])

    def test_classify_cold_lead(self):
        title = "Mi hobby personal: Colección de juegos"
        description = "Un blog de noticias y curiosidades sobre entretenimiento gratis."
        result = self.ml_service.classify_lead(title, description)
        
        self.assertEqual(result["status"], "Cold")
        self.assertLess(result["score"], 0)
        self.assertIn("blog", result["analysis"]["cold_hits"])
        self.assertIn("gratis", result["analysis"]["cold_hits"])

    def test_classify_neutral_lead(self):
        title = "Página de prueba"
        description = "Esta es una descripción sin palabras clave específicas."
        result = self.ml_service.classify_lead(title, description)
        
        self.assertEqual(result["status"], "Neutral")
        self.assertEqual(result["score"], 0)

    def test_empty_content(self):
        result = self.ml_service.classify_lead("", "")
        self.assertEqual(result["status"], "Neutral")
        self.assertEqual(result["score"], 0)

if __name__ == "__main__":
    unittest.main()
