import { db } from './src/lib/db'

async function migrateWithClinicalSeverity() {
  try {
    console.log('🔄 Iniciando migración con clasificación clínica rigurosa...')

    // Crear medicamentos con información enriquecida
    const warfarina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Warfarina',
        nombreComercial: 'Coumadin',
        codigoAtc: 'B01AA03',
        grupoTerapeutico: 'Anticoagulante oral',
        rutaMetabolica: 'CYP2C9, CYP3A4',
        descripcion: 'Antagonista de la vitamina K',
        viaAdministracion: 'Oral',
        dosisRecomendada: '2-10 mg/día'
      }
    })

    const sertralina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Sertralina',
        nombreComercial: 'Zoloft',
        codigoAtc: 'N06AB06',
        grupoTerapeutico: 'ISRS - Antidepresivo',
        rutaMetabolica: 'CYP2C19, CYP2D6',
        descripcion: 'Inhibidor selectivo de la recaptación de serotonina',
        viaAdministracion: 'Oral',
        dosisRecomendada: '25-200 mg/día'
      }
    })

    const ibuprofeno = await db.medicamento.create({
      data: {
        nombreGenerico: 'Ibuprofeno',
        nombreComercial: 'Advil',
        codigoAtc: 'M01AE01',
        grupoTerapeutico: 'AINES - Antiinflamatorio',
        rutaMetabolica: 'CYP2C9',
        descripcion: 'Antiinflamatorio no esteroideo',
        viaAdministracion: 'Oral',
        dosisRecomendada: '200-800 mg cada 6-8 horas'
      }
    })

    const lisinopril = await db.medicamento.create({
      data: {
        nombreGenerico: 'Lisinopril',
        nombreComercial: 'Zestril',
        codigoAtc: 'C09AA03',
        grupoTerapeutico: 'IECA - Antihipertensivo',
        rutaMetabolica: 'Eliminación renal sin metabolismo',
        descripcion: 'Inhibidor de la enzima convertidora de angiotensina',
        viaAdministracion: 'Oral',
        dosisRecomendada: '10-40 mg/día'
      }
    })

    const digoxina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Digoxina',
        nombreComercial: 'Lanoxin',
        codigoAtc: 'C01AA05',
        grupoTerapeutico: 'Glucósido cardíaco',
        rutaMetabolica: 'Eliminación renal sin metabolismo',
        descripcion: 'Glucósido cardíaco digitálico',
        viaAdministracion: 'Oral',
        dosisRecomendada: '0.125-0.5 mg/día'
      }
    })

    const claritromicina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Claritromicina',
        nombreComercial: 'Biaxin',
        codigoAtc: 'J01FA09',
        grupoTerapeutico: 'Macrólido - Antibiótico',
        rutaMetabolica: 'CYP3A4 (inhibidor potente)',
        descripcion: 'Antibiótico macrólido',
        viaAdministracion: 'Oral',
        dosisRecomendada: '250-500 mg cada 12 horas'
      }
    })

    const simvastatina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Simvastatina',
        nombreComercial: 'Zocor',
        codigoAtc: 'C10AA01',
        grupoTerapeutico: 'Estatina - Hipolipemiante',
        rutaMetabolica: 'CYP3A4',
        descripcion: 'Inhibidor de la HMG-CoA reductasa',
        viaAdministracion: 'Oral',
        dosisRecomendada: '20-80 mg/día'
      }
    })

    const diuretico = await db.medicamento.create({
      data: {
        nombreGenerico: 'Furosemida',
        nombreComercial: 'Lasix',
        codigoAtc: 'C03CA01',
        grupoTerapeutico: 'Diurético de asa',
        rutaMetabolica: 'Eliminación renal sin metabolismo',
        descripcion: 'Diurético de asa de alta potencia',
        viaAdministracion: 'Oral, IV',
        dosisRecomendada: '20-80 mg/día'
      }
    })

    const fluoroquinolona = await db.medicamento.create({
      data: {
        nombreGenerico: 'Ciprofloxacino',
        nombreComercial: 'Cipro',
        codigoAtc: 'J01MA02',
        grupoTerapeutico: 'Fluoroquinolona - Antibiótico',
        rutaMetabolica: 'CYP1A2, CYP3A4',
        descripcion: 'Antibiótico fluoroquinolona',
        viaAdministracion: 'Oral',
        dosisRecomendada: '250-750 mg cada 12 horas'
      }
    })

    const antiacido = await db.medicamento.create({
      data: {
        nombreGenerico: 'Hidróxido de Aluminio',
        nombreComercial: 'Maalox',
        codigoAtc: 'A02AB01',
        grupoTerapeutico: 'Antiácido',
        rutaMetabolica: 'Eliminación renal sin metabolismo',
        descripcion: 'Antiácido con aluminio',
        viaAdministracion: 'Oral',
        dosisRecomendada: '320-640 mg cada 6 horas'
      }
    })

    console.log('💊 Medicamentos creados')

    // 🔴 EJEMPLOS CLÍNICOS - NIVEL ALTO (MAYOR)
    
    // Ejemplo 1: Triple Whammy - Insuficiencia Renal Aguda
    const tripleWhammy = await db.interaccionMaestra.create({
      data: {
        medicamentoPrincipalId: lisinopril.id,
        medicamentoSecundarioId: ibuprofeno.id,
        gravedad: 'ALTA_MAYOR',
        mecanismoAccion: 'Triple Whammy: IECA reduce la perfusión renal, AINE inhibe prostaglandinas vasodilatadoras, diurético activa el sistema renina-angiotensina',
        accionResultante: 'Vasoconstricción severa del arteriola aferente con reducción drástica del filtrado glomerular',
        consecuenciaPotencial: 'Insuficiencia Renal Aguda potencialmente irreversible',
        referenciaFuente: 'NEJM Kidney Disease Series, FDA Drug Safety Communication',
        nivelEvidencia: 'ENSAYO_CLINICO'
      }
    })

    await db.patologiaCorrelacionada.create({
      data: {
        interaccionId: tripleWhammy.id,
        nombrePatologia: 'Insuficiencia Renal Aguda',
        manifestacionClinica: 'Oliguria (<400 mL/24h), aumento de creatinina >0.3 mg/dL en 48h, edema pulmonar, hiperpotasemia',
        incidenciaEstimada: 'Común (15-25% en población de riesgo)'
      }
    })

    await db.recomendacion.createMany({
      data: [
        {
          interaccionId: tripleWhammy.id,
          tipoManejo: 'EVITAR_ABSOLUTAMENTE',
          prioridad: 'URGENTE',
          detalleRecomendacion: 'EVITAR COMPLETAMENTE esta combinación. Si es indispensable, hospitalizar para monitoreo renal estricto',
          responsable: 'MEDICO',
          tiempoAccion: 'Inmediato',
          parametrosMonitoreo: 'Creatinina sérica, BUN, electrolitos, diuresis cada 6 horas',
          accionAlternativa: 'Usar paracetamol para analgesia; considerar antagonista de calcio en lugar de IECA'
        },
        {
          interaccionId: tripleWhammy.id,
          tipoManejo: 'EDUCAR_PACIENTE',
          prioridad: 'URGENTE',
          detalleRecomendacion: 'Educar al paciente sobre síntomas de insuficiencia renal: disminución de orina, edema, dificultad respiratoria',
          responsable: 'MEDICO',
          tiempoAccion: 'Inmediato'
        }
      ]
    })

    // Ejemplo 2: Digoxina + Claritromicina - Intoxicación Digitálica Lethal
    const intoxicacionDigitalica = await db.interaccionMaestra.create({
      data: {
        medicamentoPrincipalId: digoxina.id,
        medicamentoSecundarioId: claritromicina.id,
        gravedad: 'ALTA_MAYOR',
        mecanismoAccion: 'Inhibición potente del CYP3A4 y P-glicoproteína intestinal por claritromicina',
        accionResultante: 'Reducción del aclaramiento de digoxina 50-70% con aumento de concentración sérica a niveles tóxicos',
        consecuenciaPotencial: 'Intoxicación Digitálica Severa con arritmias ventriculares malignas',
        referenciaFuente: 'Circulation 2021; FDA Boxed Warning',
        nivelEvidencia: 'ENSAYO_CLINICO'
      }
    })

    await db.patologiaCorrelacionada.create({
      data: {
        interaccionId: intoxicacionDigitalica.id,
        nombrePatologia: 'Intoxicación Digitálica Severa',
        manifestacionClinica: 'Arritmias ventriculares (TV, Torsades), bloqueo AV completo, náuseas, visión amarilla, confusión, bradicardia <50 lpm',
        incidenciaEstimada: 'Común (10-20% en pacientes con función renal comprometida)'
      }
    })

    await db.recomendacion.createMany({
      data: [
        {
          interaccionId: intoxicacionDigitalica.id,
          tipoManejo: 'EVITAR_ABSOLUTAMENTE',
          prioridad: 'URGENTE',
          detalleRecomendacion: 'CONTRAINDICADO ABSOLUTAMENTE. Usar antibiótico alternativo no macrólido (azitromicina sin interacción)',
          responsable: 'MEDICO',
          tiempoAccion: 'Inmediato',
          parametrosMonitoreo: 'Nivel de digoxina, ECG continuo, electrolitos (K+, Mg++)',
          accionAlternativa: 'Usar azitromicina, doxiciclina o amoxicilina'
        },
        {
          interaccionId: intoxicacionDigitalica.id,
          tipoManejo: 'CONSULTAR_ESPECIALISTA',
          prioridad: 'URGENTE',
          detalleRecomendacion: 'Derivación URGENTE a cardiología o toxicología clínica si exposición ocurrió',
          responsable: 'MEDICO',
          tiempoAccion: 'Inmediato'
        }
      ]
    })

    // 🟡 EJEMPLOS CLÍNICOS - NIVEL MODERADO
    
    // Ejemplo 3: Simvastatina + Claritromicina - Miopatía Reversible
    const miopatiaEstatina = await db.interaccionMaestra.create({
      data: {
        medicamentoPrincipalId: simvastatina.id,
        medicamentoSecundarioId: claritromicina.id,
        gravedad: 'MODERADA',
        mecanismoAccion: 'Inhibición fuerte del CYP3A4 por claritromicina aumentando niveles de simvastatina 5-10 veces',
        accionResultante: 'Acumulación de simvastatina con toxicidad muscular',
        consecuenciaPotencial: 'Miopatía/Rabdomiólisis Subaguda Reversible',
        referenciaFuente: 'Lancet 2020; Statin Safety Guidelines',
        nivelEvidencia: 'ESTUDIO_COHORTE'
      }
    })

    await db.patologiaCorrelacionada.create({
      data: {
        interaccionId: miopatiaEstatina.id,
        nombrePatologia: 'Miopatía Inducida por Estatinas',
        manifestacionClinica: 'Dolor muscular difuso, debilidad proximal, CK elevada 2-10x normal, mioglobinuria leve',
        incidenciaEstimada: 'Poco Común (3-7%)'
      }
    })

    await db.recomendacion.createMany({
      data: [
        {
          interaccionId: miopatiaEstatina.id,
          tipoManejo: 'EVITAR_ABSOLUTAMENTE',
          prioridad: 'IMPORTANTE',
          detalleRecomendacion: 'Suspender simvastatina durante tratamiento con claritromicina. Reinstaurar 7 días después',
          responsable: 'MEDICO',
          tiempoAccion: '24-48 horas',
          parametrosMonitoreo: 'CK sérica basal y semanal, síntomas musculares',
          accionAlternativa: 'Usar pravastatina o rosuvastatina (no metabolizadas por CYP3A4)'
        },
        {
          interaccionId: miopatiaEstatina.id,
          tipoManejo: 'MONITORIZACION_CERCANA',
          prioridad: 'IMPORTANTE',
          detalleRecomendacion: 'Monitorear CK y síntomas musculares si no se puede evitar la combinación',
          responsable: 'MEDICO',
          tiempoAccion: 'Semanal',
          parametrosMonitoreo: 'CK, creatinina quinasa, fuerza muscular'
        }
      ]
    })

    // 🟢 EJEMPLOS CLÍNICOS - NIVEL BAJO (MENOR)
    
    // Ejemplo 4: Antiácido + Fluoroquinolona - Reducción de absorción
    const reduccionAbsorcion = await db.interaccionMaestra.create({
      data: {
        medicamentoPrincipalId: antiacido.id,
        medicamentoSecundarioId: fluoroquinolona.id,
        gravedad: 'BAJA_MENOR',
        mecanismoAccion: 'Quelación del fluoroquinolona por iones de aluminio en el tracto gastrointestinal',
        accionResultante: 'Formación de complejos insolubles con reducción de la absorción',
        consecuenciaPotencial: 'Reducción Leve y Manejable de la Eficacia Antibiótica',
        referenciaFuente: 'Clinical Pharmacokinetics 2019',
        nivelEvidencia: 'REPORTE_CASOS'
      }
    })

    await db.patologiaCorrelacionada.create({
      data: {
        interaccionId: reduccionAbsorcion.id,
        nombrePatologia: 'Reducción de Eficacia Antibiótica',
        manifestacionClinica: 'Disminución leve de la respuesta clínica, posible retraso en resolución de infección',
        incidenciaEstimada: 'Rara (<1%)'
      }
    })

    await db.recomendacion.createMany({
      data: [
        {
          interaccionId: reduccionAbsorcion.id,
          tipoManejo: 'ESPACIAR_ADMINISTRACION',
          prioridad: 'INFORMATIVO',
          detalleRecomendacion: 'Administrar fluoroquinolona 2 horas antes o 6 horas después del antiácido',
          responsable: 'PACIENTE',
          tiempoAccion: 'Próxima dosis',
          parametrosMonitoreo: 'Respuesta clínica a la infección, resolución de síntomas'
        },
        {
          interaccionId: reduccionAbsorcion.id,
          tipoManejo: 'EDUCAR_PACIENTE',
          prioridad: 'INFORMATIVO',
          detalleRecomendacion: 'Informar al paciente sobre la importancia del espaciamiento para garantizar eficacia',
          responsable: 'FARMACEUTICO',
          tiempoAccion: 'Al dispensar'
        }
      ]
    })

    console.log('🏥 Ejemplos clínicos creados según clasificación rigurosa')

    // Crear patologías preexistentes
    await db.patologiaPreexistente.createMany({
      data: [
        {
          nombre: 'Insuficiencia Renal Crónica Estadio 4-5',
          descripcion: 'TFG <30 mL/min/1.73m² con daño renal irreversible',
          categoria: 'Renal'
        },
        {
          nombre: 'Insuficiencia Cardíaca NYHA III-IV',
          descripcion: 'Limitación marcada de la actividad física con síntomas en reposo',
          categoria: 'Cardiovascular'
        },
        {
          nombre: 'Enfermedad Hepática Descompensada',
          descripcion: 'Child-Pugh B-C con insuficiencia hepática severa',
          categoria: 'Hepático'
        },
        {
          nombre: 'Diabetes Mellitus Tipo 2 con Complicaciones',
          descripcion: 'Diabetes con afectación renal o cardiovascular',
          categoria: 'Endocrino'
        }
      ]
    })

    console.log('✅ Migración con clasificación clínica rigurosa completada')

  } catch (error) {
    console.error('❌ Error en la migración:', error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

// Ejecutar el script
migrateWithClinicalSeverity()
  .then(() => {
    console.log('🎉 Proceso de migración clínica completado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Error en el proceso:', error)
    process.exit(1)
  })