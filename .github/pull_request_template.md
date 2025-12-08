# Pull Request: [Título claro y conciso de la contribución]

## 🎯 Objetivo de este PR

Describa brevemente el propósito de esta solicitud de extracción.
* **Tipo de Cambio:** [ ] Corrección de Bug (Bugfix) | [ ] Nueva Característica (Feature) | [ ] Refactorización | [ ] Documentación | [ ] **Actualización de Datos Farmacológicos (BD-Int)**

---

## 🔬 Cambios Clave

### A. Si es **Código / Feature / Bugfix**
* ¿Qué problema resuelve este PR?
* ¿Qué archivos fueron modificados y por qué?
* ¿Se introdujeron nuevas dependencias?
* **Pruebas:** ¿Se actualizaron o agregaron pruebas unitarias/de integración para cubrir este cambio? (Indique la ruta de las pruebas).

### B. Si es **Actualización de Datos Farmacológicos (BD-Int)**
Este es el apartado CRÍTICO. Debe ser completado para cualquier cambio en la base de datos (`data/seed.sql` o migraciones).

1.  **Medicamentos Involucrados:** (Ej: Metoprolol + Fluoxetina)
2.  **Patología Correlacionada Añadida/Modificada:** (Ej: Bradicardia Severa)
3.  **Gravedad (ACIFP):** **🔴 ALTA** / 🟡 MODERADA / 🟢 BAJA (Indicar la justificación de esta clasificación).
4.  **Mecanismo (Resumen):** (Ej: Ambos son inhibidores de la recaptación de serotonina, sinergia de efectos adversos).
5.  **Recomendación Prescriptiva Principal:** (Ej: AJUSTE DE DOSIS: Reducir dosis de Fluoxetina al 50%).

---

## 📑 Evidencia y Referencias (Obligatorio para Cambios en la BD-Int)

**Por favor, proporcione al menos DOS referencias de alta calidad (peer-reviewed) que soporten la interacción, la gravedad y la recomendación.**

1.  **[Título del Artículo/Monografía - Enlace Directo (DOI o URL)]**
    * *Nivel de Evidencia:* (Ej: Ensayo Clínico Aleatorizado, Monografía FDA, Revisión Sistemática).
2.  **[Título del Artículo/Monografía - Enlace Directo (DOI o URL)]**
    * *Nivel de Evidencia:* (Ej: Reporte de Casos Múltiples, Libro de Texto Farmacológico de Referencia).

---

## ✅ Lista de Verificación (Checklist para el Contribuyente)

* [ ] He revisado mi propio código y he eliminado cualquier código de depuración innecesario.
* [ ] He añadido comentarios a mi código, especialmente en áreas complejas.
* [ ] Mis cambios no introducen *warnings* o *linting errors*.
* [ ] He verificado que la documentación (si aplica) ha sido actualizada.
* [ ] **[Para BD-Int]** He incluido al menos dos referencias válidas que justifican los datos.
* [ ] He realizado una prueba local exitosa usando `npm run dev` y `npm run test`.

---

## 🔍 Revisores Sugeridos

@\[Mencionar a un revisor de código o un experto farmacológico, si se conoce]
