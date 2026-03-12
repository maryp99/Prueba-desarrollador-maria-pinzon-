# Prueba-desarrollador-maria-pinzon-
# 🗄️ Base de Datos - TeamTasksSample

## Motor de Base de Datos

**SQLite 3** - Base de datos embebida, sin servidor, ideal para desarrollo y portabilidad.

## 📁 Archivos

- `TeamTasksSample.db` - Base de datos SQLite (incluida para facilitar evaluación)
- `DBSetup_TeamTasks_SQLite.sql` - Script de configuración completo
- `verify_data.sql` - Consultas de verificación

## 🚀 Configuración Rápida

### Opción 1: Usar la base de datos incluida (Más rápido)

La base de datos ya está configurada y lista para usar:

`database/TeamTasksSample.db`

Simplemente conéctate desde tu aplicación .NET o abre con SQLite Viewer.

### Opción 2: Recrear desde el script

Si deseas recrear la base de datos desde cero:

#### Usando VS Code con extensión SQLite:

1. Instalar extensión: **SQLite (alexcvzz.vscode-sqlite)**
2. Presionar `Ctrl+Shift+P` → `SQLite: New Query`
3. Crear base de datos: `TeamTasksSample.db`
4. Abrir `DBSetup_TeamTasks_SQLite.sql`
5. Ejecutar: `Ctrl+Shift+Q`

#### Usando terminal (requiere sqlite3):

```bash
cd database
sqlite3 TeamTasksSample.db < DBSetup_TeamTasks_SQLite.sql

## 🔍 Consultas de Verificación y Análisis

El archivo `verify_data.sql` contiene una serie de consultas útiles para validar la integridad de los datos,
obtener resúmenes del estado del proyecto y las tareas, y realizar análisis avanzados como la predicción de riesgo de retraso.

Para ejecutar todas las consultas de verificación:

```bash
sqlite3 TeamTasksSample.db < verify_data.sql


🔌 Connection String para .NET

    
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=database/TeamTasksSample.db"
  }
}
  
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
📐 Diagrama de Relaciones
Developers (1) ──────< (N) Tasks
                           │
                           │
Projects (1) ──────────< (N)
🛠️ Herramientas Recomendadas
VS Code con extensión SQLite
DB Browser for SQLite (https://sqlitebrowser.org/)
DBeaver (https://dbeaver.io/)
📝 Notas Técnicas
AUTOINCREMENT usado para claves primarias
CHECK CONSTRAINTS para validar estados y prioridades
FOREIGN KEYS habilitadas para integridad referencial
Índices creados en columnas frecuentemente consultadas
Fechas almacenadas como TEXT en formato ISO 8601

