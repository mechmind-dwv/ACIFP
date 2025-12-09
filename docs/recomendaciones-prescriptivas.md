# 📋 Estructura de Datos Específica para Recomendaciones Clínicas - ACIFP

## 🎯 **Objetivo de las Recomendaciones Prescriptivas**

Las recomendaciones en ACIFP están diseñadas para ser **claras, específicas y accionables**, proporcionando guía clínica precisa para cada nivel de interacción farmacológica.

---

## 🏗️ **Estructura de Datos Detallada**

### **1. Tipo de Manejo Clínico**
```typescript
enum TipoManejoClinico {
  EVITAR_ABSOLUTAMENTE     // Evitar completamente la combinación
  AJUSTE_DOSIS             // Modificar dosis de uno o ambos fármacos
  MONITORIZACION_CERCANA    // Vigilancia estrecha de parámetros
  ESPACIAR_ADMINISTRACION    // Separar horarios de administración
  EDUCAR_PACIENTE         // Informar al paciente sobre síntomas
  CONSULTAR_ESPECIALISTA    // Derivar a especialista
}
```

### **2. Prioridad de Acción**
```typescript
enum PrioridadRecomendacion {
  URGENTE        // Requiere acción inmediata (ej. hospitalización)
  IMPORTANTE     // Requiere acción pronto (ej. ajuste en 24-48h)
  INFORMATIVO    // Información para conocimiento y prevención
}
```

### **3. Responsable de la Acción**
```typescript
enum ResponsableAccion {
  MEDICO           // Responsabilidad del médico tratante
  FARMACEUTICO     // Responsabilidad del farmacéutico
  PACIENTE         // Responsabilidad del paciente
  SISTEMA_SALUD    // Responsabilidad del sistema de salud
}
```

### **4. Campos de Soporte Clínico**
- **tiempoAccion**: Marco temporal para la acción
- **parametrosMonitoreo**: Parámetros específicos a vigilar
- **accionAlternativa**: Alternativas terapéuticas disponibles

---

## 📊 **Ejemplos de Recomendaciones por Nivel de Gravedad**

### 🔴 **NIVEL ALTO (MAYOR) - Ejemplo: Triple Whammy**

#### **Recomendación 1: EVITAR ABSOLUTAMENTE**
```json
{
  "tipoManejo": "EVITAR_ABSOLUTAMENTE",
  "prioridad": "URGENTE",
  "detalleRecomendacion": "EVITAR COMPLETAMENTE esta combinación. Si es indispensable, hospitalizar para monitoreo renal estricto",
  "responsable": "MEDICO",
  "tiempoAccion": "Inmediato",
  "parametrosMonitoreo": "Creatinina sérica, BUN, electrolitos, diuresis cada 6 horas",
  "accionAlternativa": "Usar paracetamol para analgesia; considerar antagonista de calcio en lugar de IECA"
}
```

#### **Recomendación 2: EDUCAR PACIENTE**
```json
{
  "tipoManejo": "EDUCAR_PACIENTE",
  "prioridad": "URGENTE",
  "detalleRecomendacion": "Educar al paciente sobre síntomas de insuficiencia renal: disminución de orina, edema, dificultad respiratoria",
  "responsable": "MEDICO",
  "tiempoAccion": "Inmediato"
}
```

---

### 🟡 **NIVEL MODERADO - Ejemplo: Miopatía por Estatinas**

#### **Recomendación 1: EVITAR ABSOLUTAMENTE**
```json
{
  "tipoManejo": "EVITAR_ABSOLUTAMENTE",
  "prioridad": "IMPORTANTE",
  "detalleRecomendacion": "Suspender simvastatina durante tratamiento con claritromicina. Reinstaurar 7 días después",
  "responsable": "MEDICO",
  "tiempoAccion": "24-48 horas",
  "parametrosMonitoreo": "CK sérica basal y semanal, síntomas musculares",
  "accionAlternativa": "Usar pravastatina o rosuvastatina (no metabolizadas por CYP3A4)"
}
```

#### **Recomendación 2: MONITORIZACIÓN CERCANA**
```json
{
  "tipoManejo": "MONITORIZACION_CERCANA",
  "prioridad": "IMPORTANTE",
  "detalleRecomendacion": "Monitorear CK y síntomas musculares si no se puede evitar la combinación",
  "responsable": "MEDICO",
  "tiempoAccion": "Semanal",
  "parametrosMonitoreo": "CK, creatinina quinasa, fuerza muscular"
}
```

---

### 🟢 **NIVEL BAJO (MENOR) - Ejemplo: Reducción de Absorción**

#### **Recomendación 1: ESPACIAR ADMINISTRACIÓN**
```json
{
  "tipoManejo": "ESPACIAR_ADMINISTRACION",
  "prioridad": "INFORMATIVO",
  "detalleRecomendacion": "Administrar fluoroquinolona 2 horas antes o 6 horas después del antiácido",
  "responsable": "PACIENTE",
  "tiempoAccion": "Próxima dosis",
  "parametrosMonitoreo": "Respuesta clínica a la infección, resolución de síntomas"
}
```

#### **Recomendación 2: EDUCAR PACIENTE**
```json
{
  "tipoManejo": "EDUCAR_PACIENTE",
  "prioridad": "INFORMATIVO",
  "detalleRecomendacion": "Informar al paciente sobre la importancia del espaciamiento para garantizar eficacia",
  "responsable": "FARMACEUTICO",
  "tiempoAccion": "Al dispensar"
}
```

---

## 🔄 **Algoritmo de Selección de Recomendaciones**

```typescript
function generarRecomendaciones(
  gravedad: GravedadClinica,
  interaccion: InteraccionMaestra
): Recomendacion[] {
  
  const recomendaciones: Recomendacion[] = []
  
  switch (gravedad) {
    case 'ALTA_MAYOR':
      // Siempre incluir EVITAR ABSOLUTAMENTE
      recomendaciones.push({
        tipoManejo: 'EVITAR_ABSOLUTAMENTE',
        prioridad: 'URGENTE',
        responsable: 'MEDICO',
        tiempoAccion: 'Inmediato',
        // ... detalles específicos
      })
      
      // Siempre incluir EDUCAR PACIENTE
      recomendaciones.push({
        tipoManejo: 'EDUCAR_PACIENTE',
        prioridad: 'URGENTE',
        responsable: 'MEDICO',
        tiempoAccion: 'Inmediato',
        // ... detalles de síntomas
      })
      
      // Considerar CONSULTAR ESPECIALISTA
      if (interaccion.consecuenciaPotencial.includes('Cardiaca')) {
        recomendaciones.push({
          tipoManejo: 'CONSULTAR_ESPECIALISTA',
          prioridad: 'URGENTE',
          responsable: 'MEDICO',
          tiempoAccion: 'Inmediato',
          // ... detalles de derivación
        })
      }
      break
      
    case 'MODERADA':
      // Incluir AJUSTE_DOSIS o MONITORIZACIÓN
      if (interaccion.mecanismoAccion.includes('CYP450')) {
        recomendaciones.push({
          tipoManejo: 'AJUSTE_DOSIS',
          prioridad: 'IMPORTANTE',
          responsable: 'MEDICO',
          tiempoAccion: '24-48 horas',
          // ... detalles de ajuste
        })
      } else {
        recomendaciones.push({
          tipoManejo: 'MONITORIZACION_CERCANA',
          prioridad: 'IMPORTANTE',
          responsable: 'MEDICO',
          tiempoAccion: 'Semanal',
          // ... detalles de monitoreo
        })
      }
      break
      
    case 'BAJA_MENOR':
      // Generalmente ESPACIAR o EDUCAR
      if (interaccion.mecanismoAccion.includes('absorción')) {
        recomendaciones.push({
          tipoManejo: 'ESPACIAR_ADMINISTRACION',
          prioridad: 'INFORMATIVO',
          responsable: 'PACIENTE',
          tiempoAccion: 'Próxima dosis',
          // ... detalles de espaciamiento
        })
      } else {
        recomendaciones.push({
          tipoManejo: 'EDUCAR_PACIENTE',
          prioridad: 'INFORMATIVO',
          responsable: 'FARMACEUTICO',
          tiempoAccion: 'Al dispensar',
          // ... información educativa
        })
      }
      break
  }
  
  return recomendaciones
}
```

---

## 📋 **Plantillas de Recomendaciones Estandarizadas**

### **Plantilla 1: EVITAR ABSOLUTAMENTE**
```
EVITAR COMPLETAMENTE esta combinación. 
Si es indispensable, hospitalizar para monitoreo [tipo de monitoreo] estricto.
Alternativa: [alternativa terapéutica específica]
```

### **Plantilla 2: AJUSTE Dosis**
```
Reducir dosis de [medicamento] en [porcentaje]% o ajustar a [nueva dosis].
Monitorear [parámetros] cada [frecuencia] durante [duración].
Considerar alternativa: [alternativa segura]
```

### **Plantilla 3: MONITORIZACIÓN CERCANA**
```
Monitorear [parámetro específico] cada [frecuencia].
Valores de alerta: [rangos de seguridad].
Reportar inmediatamente si: [síntomas de alarma]
```

### **Plantilla 4: ESPACIAR ADMINISTRACIÓN**
```
Administrar [medicamento B] [tiempo] antes o [tiempo] después de [medicamento A].
Alternativamente: [opción de administración alternativa]
Efecto esperado: [resultado del espaciamiento]
```

---

## 🎯 **Métricas de Calidad de Recomendaciones**

### **Indicadores de Prescriptividad:**
- **Claridad**: >90% de usuarios entienden la acción requerida
- **Especificidad**: >85% de recomendaciones son accionables
- **Completitud**: Todas las recomendaciones incluyen qué, cuándo, cómo y quién
- **Alternativas**: >80% incluyen opciones terapéuticas alternativas

### **Validación Clínica:**
- **Revisión por Expertos**: Todas las recomendaciones validadas por clínicos
- **Basadas en Evidencia**: Referenciadas a guías clínicas actualizadas
- **Actualización Trimestral**: Revisión y actualización cada 3 meses
- **Feedback de Usuarios**: Sistema de retroalimentación continua

---

## 🔄 **Proceso de Actualización de Recomendaciones**

1. **Revisión de Literatura**: Trimestral
2. **Validación por Expertos**: Mensual
3. **Pruebas Piloto**: Con médicos voluntarios
4. **Implementación**: Gradual con monitoreo
5. **Retroalimentación**: Sistema continuo de usuarios
6. **Actualización**: Basada en evidencia y experiencia

---

## 📚 **Referencias Clínicas Utilizadas**

- **UpToDate**: Evidencia clínica actualizada
- **Micromedex**: Base de datos de medicamentos
- **FDA Drug Interactions**: Interacciones aprobadas
- **Clinical Pharmacology**: Farmacología clínica
- **Guías locales**: Adaptaciones regionales

---

**Versión:** ACIFP v2.1 - Recomendaciones Prescriptivas  
**Última Actualización:** Diciembre 2024  
**Próxima Revisión:** Marzo 2025