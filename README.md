# ⚠️ ACIFP: Artefacto Web de Correlación de Interacciones Farmacológicas y Patologías

## 💊 Introducción

El **ACIFP** es una herramienta de soporte a la decisión clínica diseñada para alertar a profesionales de la salud sobre el riesgo de desarrollar **patologías específicas (enfermedades o condiciones adversas)** resultantes de la mezcla de medicamentos.

Reconocemos que el cuerpo humano es un **sistema biológico complejo**, no un simple tubo de ensayo. Por lo tanto, el sistema correlaciona las interacciones farmacocinéticas y farmacodinámicas con sus potenciales resultados clínicos graves.

---

## ✨ Características Principales

* **Análisis Dinámico de Polifarmacia:** Permite ingresar múltiples medicamentos simultáneamente para verificar todas las interacciones binarias posibles.
* **Correlación Patológica:** No solo identifica la interacción (Ej: Aumento de concentración), sino la **enfermedad potencial** (Ej: Arritmia por QT prolongado, Hemorragia Gastrointestinal, Rabdomiólisis).
* **Clasificación de Gravedad:** Utiliza un sistema codificado por colores para clasificar el riesgo: **ALTA (Roja)**, **MODERADA (Amarilla)**, **BAJA (Verde)**.
* **Mecanismo de Acción:** Proporciona el fundamento científico de la interacción (Ej: Inhibición o Inducción de la enzima CYP450).

---

## 🚀 Cómo Empezar

### 1. Requisitos

Para clonar y ejecutar el proyecto localmente, necesitarás:

* Node.js (versión 18+)
* Una base de datos relacional (PostgreSQL o MySQL)
* Acceso a una API de datos farmacológicos (o la Base de Datos BD-Int poblada)

### 2. Instalación Local

```bash
# 1. Clonar el repositorio
git clone [https://github.com/tu-usuario/ACIFP.git](https://github.com/tu-usuario/ACIFP.git)
cd ACIFP

# 2. Instalar dependencias del front-end y back-end
npm install

# 3. Configurar variables de entorno
# Crear un archivo .env en la raíz del proyecto
cp .env.example .env

# 4. Iniciar la base de datos (BD-Int)
# Asegúrate de que tu servicio de base de datos esté corriendo
npm run db:setup
npm run db:seed  # Esto carga los datos iniciales de interacciones

# 5. Iniciar la aplicación
npm run dev

La aplicación estará disponible en http://localhost:3000.
👩‍🔬 Guía de Uso Rápido
 * En la página principal, busca e ingresa el nombre genérico de cada medicamento que el paciente esté tomando.
 * Haz clic en el botón "Analizar Interacciones".
 * Revisa la tabla de resultados. Presta especial atención a las filas marcadas como ALTA.
 * Expande la interacción para ver el Mecanismo de Acción y las Recomendaciones Clínicas (Ej: Reducir dosis, monitorizar parámetros de laboratorio).
🏗️ Estructura del Proyecto
 * src/: Contiene el código fuente de la aplicación.
   * src/components/: Componentes de la interfaz de usuario (Front-end).
   * src/api/: Lógica de comunicación con el Back-end y APIs externas.
   * src/db/: Esquemas y scripts de migración para la BD-Int.
 * data/: Archivos iniciales para la siembra de la base de datos (BD-Int).
 * tests/: Pruebas unitarias y de integración.
🤝 Contribuciones
Agradecemos enormemente cualquier contribución, ya que la precisión de esta herramienta es crucial.
 * Haz un Fork del proyecto.
 * Crea una rama para tu característica (git checkout -b feature/nueva-interaccion).
 * Commitea tus cambios (git commit -m 'feat: Añade soporte para interacción X').
 * Sube la rama (git push origin feature/nueva-interaccion).
 * Abre un Pull Request.
📄 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
📧 Contacto
Para consultas o sugerencias, contacta con [Tu Nombre/Equipo] a través de [Tu Correo Electrónico].
¡La seguridad del paciente es nuestra prioridad!
# ACIFP
