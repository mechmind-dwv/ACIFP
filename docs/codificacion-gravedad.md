# 🏥 Codificación Detallada de Gravedad Clínica - ACIFP

## 📋 Definición de Criterios Clínicos

La clasificación de gravedad en el sistema ACIFP se basa en criterios estandarizados que evalúan el impacto clínico potencial de las interacciones farmacológicas.

---

## 🔴 **NIVEL ALTO (ALTA)**

### **Criterios de Clasificación:**
- **Potencial Mortal**: Interacciones que pueden causar la muerte
- **Daño Irreversible**: Lesiones orgánicas permanentes
- **Hospitalización Obligatoria**: Requiere admisión hospitalaria inmediata
- **Intervención Médica Urgente**: Requiere acción médica inmediata

### **Ejemplos Clínicos:**
- **Hemorragia Mayor por INR Elevado**
  - *Manifestaciones:* Sangrado GI, intracraneal, shock hipovolémico
  - *Intervención:* Reversión con vitamina K, plasma fresco congelado
  - *Mortalidad:* 10-15% si no se trata

- **Intoxicación Digitálica Severa**
  - *Manifestaciones:* Arritmias ventriculares malignas, bloqueo AV completo
  - *Intervención:* Digoxin-specific Fab fragments, monitorización cardíaca
  - *Mortalidad:* 20-30% en intoxicaciones severas

- **Rabdomiólisis con Insuficiencia Renal Aguda**
  - *Manifestaciones:* CK > 10,000 IU/L, mioglobinuria, oliguria
  - *Intervención:* Hidratación agresiva, diálisis emergente
  - *Mortalidad:* 5-10% con tratamiento adecuado

### **Código de Identificación:** `RIESGO_VITAL`

---

## 🟡 **NIVEL MODERADO (MODERADA)**

### **Criterios de Clasificación:**
- **Deterioro Clínico Significativo**: Requiere atención médica pero no urgente
- **Hospitalización Potencial**: Puede requerir admisión
- **Ajuste Terapéutico Necesario**: Requiere modificación de tratamiento
- **Monitoreo Cercano**: Requiere vigilancia clínica

### **Ejemplos Clínicos:**
- **Reducción del Efecto Antihipertensivo**
  - *Manifestaciones:* Aumento de TA 20-30 mmHg, cefalea
  - *Intervención:* Ajuste de dosis, agregar antihipertensivo
  - *Complicaciones:* Crisis hipertensiva si no se trata

- **Aumento Moderado del Efecto Anticoagulante**
  - *Manifestaciones:* INR 3.5-5.0, equimosis leves
  - *Intervención:* Ajuste de dosis, monitorización INR
  - *Complicaciones:* Sangrado mayor si progresa

- **Riesgo de Acidosis Láctica**
  - *Manifestaciones:* pH 7.25-7.30, lactato 2-5 mmol/L
  - *Intervención:* Suspender metformina, hidratación
  - *Complicaciones:* Acidosis severa si continúa exposición

### **Código de Identificación:** `RIESGO_CLINICO`

---

## 🟢 **NIVEL BAJO (BAJA)**

### **Criterios de Clasificación:**
- **Efectos Leves**: Síntomas mínimos o ausentes
- **Manejo Ambulatorio**: No requiere hospitalización
- **Observación**: Vigilancia sin intervención activa
- **Reversible**: Resuelve espontáneamente con ajuste mínimo

### **Ejemplos Clínicos:**
- **Interacción Farmacocinética Menor**
  - *Manifestaciones:* Aumento leve de niveles séricos (<25%)
  - *Intervención:* Monitoreo, posible ajuste de dosis
  - *Complicaciones:* Raras y leves

- **Reducción Leve de la Absorción**
  - *Manifestaciones:* Disminución leve del efecto terapéutico
  - *Intervención:* Ajuste de horario de administración
  - *Complicaciones:* Pérdida de eficacia terapéutica

### **Código de Identificación:** `RIESGO_MINIMO`

---

## 🔄 **Factores de Ajuste de Gravedad**

### **Condiciones que Elevan el Nivel de Riesgo:**

1. **Insuficiencia Renal Crónica (TFG < 30 mL/min)**
   - Eleva MODERADO → ALTO
   - Eleva BAJO → MODERADO

2. **Insuficiencia Hepática (Child-Pugh B-C)**
   - Eleva MODERADO → ALTO
   - Eleva BAJO → MODERADO

3. **Edad Avanzada (>75 años)**
   - Eleva BAJO → MODERADO
   - Considerar elevación de MODERADO

4. **Polifarmacia (>5 medicamentos)**
   - Aumenta complejidad de interacciones
   - Considerar elevación sistemática

5. **Comorbilidades Cardiovasculares**
   - Especialmente relevante para interacciones cardíacas
   - Eleva BAJO → MODERADO en contextos específicos

---

## 📊 **Algoritmo de Clasificación Automática**

```typescript
function calcularGravedadBase(interaccion: Interaccion): Gravedad {
  // Criterios base
  if (interaccion.potencialMortal || interaccion.danoIrreversible) {
    return 'ALTA'
  }
  
  if (interaccion.requiereHospitalizacion || interaccion.requiereIntervencion) {
    return 'MODERADA'
  }
  
  if (interaccion.efectosLeves || interaccion.manejoAmbulatorio) {
    return 'BAJA'
  }
  
  return 'MODERADA' // Default
}

function ajustarGravedadPorPatologias(
  gravedadBase: Gravedad, 
  patologias: Patologia[]
): Gravedad {
  const tieneInsuficienciaRenal = patologias.some(p => 
    p.nombre.includes('Insuficiencia Renal')
  )
  
  const tieneInsuficienciaHepatica = patologias.some(p => 
    p.nombre.includes('Enfermedad Hepática')
  )
  
  const tienePatologiaCardiaca = patologias.some(p => 
    p.nombre.includes('Cardiaca') || p.nombre.includes('Insuficiencia Cardíaca')
  )
  
  // Reglas de ajuste
  if (tieneInsuficienciaRenal || tieneInsuficienciaHepatica) {
    if (gravedadBase === 'BAJA') return 'MODERADA'
    if (gravedadBase === 'MODERADA') return 'ALTA'
  }
  
  if (tienePatologiaCardiaca && interaccion.tipo === 'CARDIACA') {
    if (gravedadBase === 'BAJA') return 'MODERADA'
    if (gravedadBase === 'MODERADA') return 'ALTA'
  }
  
  return gravedadBase
}
```

---

## 🎯 **Niveles de Evidencia**

- **Nivel 1**: Ensayos clínicos controlados aleatorizados
- **Nivel 2**: Estudios de cohorte, casos y controles
- **Nivel 3**: Reportes de casos, series de casos
- **Nivel 4**: Opinión de expertos, consensos

Cada interacción en BD-Int incluye su nivel de evidencia respectivo.

---

## 📈 **Métricas de Evaluación**

### **Indicadores de Calidad del Sistema:**
- **Sensibilidad**: >95% para interacciones de alto riesgo
- **Especificidad**: >90% para evitar falsos positivos
- **Valor Predictivo Positivo**: >85% para alertas clínicamente significativas
- **Tiempo de Respuesta**: <2 segundos para análisis completo

### **Métricas de Impacto Clínico:**
- **Reducción de Eventos Adversos**: Meta 30-40%
- **Mejora en Seguridad del Paciente**: Meta 50%
- **Adopción Clínica**: Meta >70% de profesionales de salud

---

## 🔄 **Actualización Continua**

El sistema ACIFP se actualiza trimestralmente con:
- Nuevas interacciones identificadas
- Revisiones sistemáticas de literatura
- Reportes post-comercialización
- Actualizaciones de guías clínicas
- Retroalimentación de usuarios clínicos

---

**Última Actualización:** Diciembre 2024  
**Versión:** ACIFP v2.1  
**Próxima Revisión:** Marzo 2025