# Funcionalidad de Importación y Exportación CSV

## 📋 Descripción General

Se ha implementado una funcionalidad completa de importación y exportación CSV para gestionar leads de manera masiva en la aplicación de análisis.

## ✨ Características Implementadas

### Backend (FastAPI)

1. **Endpoint de Importación Masiva** (`POST /api/v1/leads/bulk-import`)
   - Procesa múltiples URLs en lotes de 5 para optimizar el rendimiento
   - Utiliza procesamiento asíncrono con `asyncio.gather()`
   - Retorna estadísticas detalladas: total, exitosos, fallidos
   - Incluye lista de errores para debugging

2. **Endpoint de Exportación CSV** (`GET /api/v1/leads/export/csv`)
   - Exporta todos los leads a formato CSV
   - Genera archivo con timestamp automático
   - Incluye campos: _id, url, title, description, status, ml_score, owner_id, created_at
   - Usa `StreamingResponse` para archivos grandes

3. **Schemas Mejorados**
   - `BulkURLExtractRequest`: Modelo para importación masiva
   - `BulkExtractResponse`: Respuesta detallada con resultados y errores
   - `CSVExportResponse`: Modelo para exportación

### Frontend (Next.js/React)

1. **Importación con Preview**
   - Validación de CSV antes de importar
   - Modal de preview mostrando las primeras 10 URLs
   - Contador de URLs válidas encontradas
   - Confirmación antes de procesar

2. **Exportación de Leads**
   - Botón de exportación en la página de analytics
   - Descarga automática del archivo CSV
   - Nombre de archivo con timestamp
   - Deshabilitado cuando no hay leads

3. **Mejoras de UX**
   - Indicadores de progreso durante importación/exportación
   - Toasts informativos con tipos: success, error, warning, info
   - Estados de carga en botones
   - Manejo robusto de errores

## 📁 Formato del CSV

El archivo CSV debe tener al menos una columna llamada `url`:

```csv
url
https://www.example.com
https://www.another-site.com
https://www.company.com
```

Se incluye un archivo de ejemplo: `sample_urls.csv`

## 🚀 Cómo Usar

### Importar URLs desde CSV

1. Ve a la página de Analytics (`/analytics`)
2. Haz clic en el botón "Import CSV"
3. Selecciona tu archivo CSV
4. Revisa el preview de las URLs que se importarán
5. Haz clic en "Confirm Import" para procesar
6. Espera a que se complete la importación
7. Verás un toast con el resultado (exitosos/fallidos)

### Exportar Leads a CSV

1. Ve a la página de Analytics (`/analytics`)
2. Haz clic en el botón "Export CSV"
3. El archivo se descargará automáticamente
4. El nombre del archivo incluirá la fecha: `leads_export_YYYY-MM-DD.csv`

## 🔧 Detalles Técnicos

### Procesamiento por Lotes

El backend procesa las URLs en lotes de 5 para:
- Evitar sobrecarga del servidor
- Mantener tiempos de respuesta razonables
- Permitir mejor manejo de errores
- Optimizar el uso de recursos

### Validación

- **Frontend**: Valida que el CSV tenga columna "url" y URLs válidas
- **Backend**: Valida formato de URLs y maneja errores de scraping
- **ML**: Cada lead se clasifica automáticamente (Hot/Cold/Neutral)

### Manejo de Errores

- Errores individuales no detienen el proceso completo
- Se registran todos los errores con la URL correspondiente
- El usuario recibe un resumen completo al finalizar
- Los errores se muestran en la consola para debugging

## 📊 Campos Exportados

El CSV exportado incluye:
- `_id`: ID único del lead en MongoDB
- `url`: URL del sitio web
- `title`: Título extraído
- `description`: Descripción extraída
- `status`: Clasificación ML (Hot/Cold/Neutral)
- `ml_score`: Puntuación de confianza
- `owner_id`: ID del propietario
- `created_at`: Fecha de creación (ISO format)

## 🎨 Mejoras de UI

1. **Modal de Preview**
   - Diseño moderno con glassmorphism
   - Tabla scrollable para muchas URLs
   - Botones de acción claros
   - Animaciones suaves

2. **Toasts Mejorados**
   - Nuevo tipo "warning" para casos mixtos
   - Colores distintivos por tipo
   - Iconos apropiados
   - Auto-dismiss después de 5 segundos

3. **Estados de Botones**
   - Indicadores de carga
   - Deshabilitado cuando corresponde
   - Feedback visual claro

## 🧪 Testing

Para probar la funcionalidad:

1. Usa el archivo `sample_urls.csv` incluido
2. Importa las URLs de prueba
3. Verifica que se creen los leads en la base de datos
4. Exporta los leads y verifica el CSV generado
5. Compara los datos exportados con los importados

## 🔐 Seguridad

- Validación de tipos en backend con Pydantic
- Sanitización de URLs
- Límites de tamaño implícitos (batch processing)
- Manejo seguro de archivos en memoria

## 📝 Notas

- El procesamiento es asíncrono para mejor rendimiento
- Los leads duplicados no se validan automáticamente
- El ML scoring se aplica a cada lead importado
- La exportación incluye todos los leads del usuario
