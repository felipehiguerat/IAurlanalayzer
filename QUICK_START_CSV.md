# 🚀 Guía Rápida - Funcionalidad CSV

## ⚡ Inicio Rápido

### 1. Importar URLs desde CSV

```bash
# 1. Prepara tu archivo CSV con este formato:
url
https://www.example.com
https://www.company.com

# 2. Ve a http://localhost:3000/analytics

# 3. Click en "Import CSV"

# 4. Selecciona tu archivo

# 5. Revisa el preview

# 6. Click "Confirm Import"

# 7. ¡Listo! Verás tus leads importados
```

### 2. Exportar Leads a CSV

```bash
# 1. Ve a http://localhost:3000/analytics

# 2. Click en "Export CSV"

# 3. El archivo se descargará automáticamente

# 4. Abre el archivo en Excel o Google Sheets
```

## 📋 Formato del CSV

### Mínimo Requerido
```csv
url
https://www.site1.com
https://www.site2.com
```

### Con Columnas Adicionales (ignoradas por ahora)
```csv
url,company,notes
https://www.site1.com,Company A,Important lead
https://www.site2.com,Company B,Follow up
```

## 🎯 Ejemplos de Uso

### Ejemplo 1: Importar 10 URLs
```bash
# Usa el archivo incluido
sample_urls.csv
```

### Ejemplo 2: Crear tu propio CSV

**En Excel:**
1. Columna A, fila 1: escribe "url"
2. Columna A, fila 2+: pega tus URLs
3. Guardar como → CSV (delimitado por comas)

**En Google Sheets:**
1. Columna A, fila 1: escribe "url"
2. Columna A, fila 2+: pega tus URLs
3. Archivo → Descargar → CSV

**En Notepad:**
```
url
https://www.example1.com
https://www.example2.com
https://www.example3.com
```
Guardar como: `mis_urls.csv`

## ⚠️ Errores Comunes

### Error: "No valid URLs found"
**Causa:** El CSV no tiene columna "url" o está vacía
**Solución:** Asegúrate que la primera línea sea "url"

### Error: "Error parsing CSV"
**Causa:** Formato de archivo incorrecto
**Solución:** Guarda como CSV UTF-8

### Error: "Error importing leads"
**Causa:** Backend no está corriendo
**Solución:** Inicia el backend con `uvicorn app.main:app --reload`

## 🔧 Troubleshooting

### El preview no aparece
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que el archivo sea .csv

### La importación se queda cargando
1. Verifica que el backend esté corriendo
2. Revisa los logs del backend
3. Intenta con menos URLs

### El export no descarga
1. Verifica que tengas leads en la base de datos
2. Revisa la consola del navegador
3. Verifica permisos de descarga del navegador

## 📊 Límites y Recomendaciones

| Aspecto | Recomendación | Límite Técnico |
|---------|---------------|----------------|
| URLs por archivo | < 100 | Sin límite |
| Tamaño de archivo | < 1 MB | Sin límite |
| Tiempo de proceso | ~2-3 seg/URL | Depende del sitio |
| Batch size | 5 URLs | Configurable |

## 🎓 Tips Pro

1. **Importaciones grandes**: Divide en archivos de 50 URLs
2. **Validación previa**: Verifica URLs en el preview
3. **Backup**: Exporta antes de hacer cambios masivos
4. **Naming**: Usa nombres descriptivos para tus CSVs
5. **Formato**: Siempre UTF-8 para caracteres especiales

## 🔄 Workflow Recomendado

```
1. Recolectar URLs → 2. Crear CSV → 3. Importar
                                        ↓
                                    4. Revisar
                                        ↓
                                    5. Analizar
                                        ↓
                                    6. Exportar
```

## 📞 Necesitas Ayuda?

1. Lee `CSV_FUNCTIONALITY.md` para detalles técnicos
2. Revisa `IMPLEMENTATION_SUMMARY.md` para arquitectura
3. Usa `sample_urls.csv` para probar
4. Revisa la consola del navegador (F12)
5. Revisa los logs del backend

## ✨ Características Destacadas

- ✅ Preview antes de importar
- ✅ Procesamiento en lotes
- ✅ Reporte de éxitos/fallos
- ✅ Exportación con timestamp
- ✅ Validación automática
- ✅ Manejo de errores robusto
- ✅ UI moderna y responsive
- ✅ Feedback visual constante

---

**¡Disfruta de la funcionalidad CSV! 🎉**
