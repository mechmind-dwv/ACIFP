# 🤝 Guía para Contribuir al ACIFP

¡Agradecemos tu interés en contribuir a mejorar la seguridad del paciente con el ACIFP!

Dado que este proyecto es una herramienta de soporte a la decisión clínica, **la precisión de los datos es la prioridad absoluta.**

## 💡 ¿Cómo Contribuir?

### 1. Reporte de Fallos (Bugs)

Utiliza las [Plantillas de Issues](#plantillas-de-issues) y:
* Describe el error con claridad (ej. Un medicamento no se autocompleta).
* Si es un error de lógica, incluye los pasos para reproducirlo.
* Incluye la versión de tu navegador y del sistema operativo.

### 2. Contribuciones de Código (Features)

Para nuevas funcionalidades (ej. filtros, mejoras de UX):
1.  Haz *fork* y clona el repositorio.
2.  Crea una rama para tu contribución: `git checkout -b feature/mi-nueva-caracteristica`.
3.  Asegúrate de que el código pasa el *linting* y las pruebas (`npm test`).
4.  Crea un *Pull Request* (PR) utilizando la [Plantilla de PR](#plantillas-de-pull-request).

### 3. Contribuciones de Datos Farmacológicos (¡Crítico!)

La base de datos (BD-Int) solo acepta datos **verificados por pares (peer-reviewed)**.

**Para añadir una nueva interacción o patología (BD-Int):**
* **Requerimiento Esencial:** Debes proporcionar **al menos dos referencias bibliográficas de alta calidad** (ej. ensayos clínicos, revisiones sistemáticas, monografías oficiales de la FDA/EMA/AEMPS) para respaldar la interacción, su gravedad y las recomendaciones.
* Utiliza la [Plantilla de Issues](#plantillas-de-issues) para **"Propuesta de Interacción Farmacológica"**.
* Indica claramente la **Gravedad (ALTA, MODERADA, BAJA)** según los criterios clínicos del proyecto.

## ⚙️ Configuración Local

Sigue los pasos en el `README.md`.

## 📌 Plantillas

Utiliza las siguientes plantillas para mantener la claridad y eficiencia del proceso de revisión:

* **Plantillas de Issues:** (Se deben configurar en `.github/ISSUE_TEMPLATE/`)
    * Bug Report (Reporte de Error)
    * Feature Request (Solicitud de Característica)
    * **Propuesta de Interacción Farmacológica** (Para la BD-Int)
* **Plantillas de Pull Request:** (Se deben configurar en `.github/pull_request_template.md`)

---
