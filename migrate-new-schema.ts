import { db } from './src/lib/db'

async function migrateToNewSchema() {
  try {
    console.log('🔄 Iniciando migración al nuevo esquema BD-Int...')

    // Limpiar datos existentes
    await db.recomendacion.deleteMany()
    await db.patologiaCorrelacionada.deleteMany()
    await db.interaccionMaestra.deleteMany()
    await db.medicamento.deleteMany()
    await db.patologiaPreexistente.deleteMany()
    console.log('🧹 Datos existentes eliminados')

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

    const paracetamol = await db.medicamento.create({
      data: {
        nombreGenerico: 'Paracetamol',
        nombreComercial: 'Tylenol',
        codigoAtc: 'N02BE01',
        grupoTerapeutico: 'Analgésico y antipirético',
        rutaMetabolica: 'CYP2E1, Glucuronidación',
        descripcion: 'Analgésico y antipirético no opioide',
        viaAdministracion: 'Oral',
        dosisRecomendada: '500-1000 mg cada 6 horas'
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

    const aspirina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Aspirina',
        nombreComercial: 'Aspirin',
        codigoAtc: 'N02BA01',
        grupoTerapeutico: 'AINES - Antiplaquetario',
        rutaMetabolica: 'CYP2C19',
        descripcion: 'Ácido acetilsalicílico',
        viaAdministracion: 'Oral',
        dosisRecomendada: '81-325 mg/día'
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

    const metformina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Metformina',
        nombreComercial: 'Glucophage',
        codigoAtc: 'A10BA02',
        grupoTerapeutico: 'Antidiabético oral',
        rutaMetabolica: 'Eliminación renal sin metabolismo',
        descripcion: 'Biguanida - hipoglucemiante oral',
        viaAdministracion: 'Oral',
        dosisRecomendada: '500-2000 mg/día'
      }
    })

    const omeprazol = await db.medicamento.create({
      data: {
        nombreGenerico: 'Omeprazol',
        nombreComercial: 'Prilosec',
        codigoAtc: 'A02BC01',
        grupoTerapeutico: 'IBP - Inhibidor de bomba de protones',
        rutaMetabolica: 'CYP2C19, CYP3A4',
        descripcion: 'Inhibidor de la bomba de protones',
        viaAdministracion: 'Oral',
        dosisRecomendada: '20-40 mg/día'
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

    const amlodipino = await db.medicamento.create({
      data: {
        nombreGenerico: 'Amlodipino',
        nombreComercial: 'Norvasc',
        codigoAtc: 'C08CA01',
        grupoTerapeutico: 'Bloqueador de canales de calcio',
        rutaMetabolica: 'CYP3A4',
        descripcion: 'Bloqueador de los canales de calcio dihidropiridínicos',
        viaAdministracion: 'Oral',
        dosisRecomendada: '5-10 mg/día'
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

    console.log('💊 Medicamentos creados con información enriquecida')

    // Crear interacciones maestras con información detallada
    const interacciones = [
      {
        medicamentoPrincipalId: warfarina.id,
        medicamentoSecundarioId: sertralina.id,
        gravedad: 'ALTA' as const,
        mecanismoAccion: 'La sertralina inhibe el CYP2C9 y potencia el efecto anticoagulante de la warfarina mediante efectos en las plaquetas',
        accionResultante: 'Aumento significativo del efecto anticoagulante',
        referenciaFuente: 'FDA Drug Interaction Database'
      },
      {
        medicamentoPrincipalId: warfarina.id,
        medicamentoSecundarioId: ibuprofeno.id,
        gravedad: 'ALTA' as const,
        mecanismoAccion: 'El ibuprofeno inhibe la función plaquetaria y causa daño gástrico, potenciando el efecto anticoagulante',
        accionResultante: 'Sinergia en el aumento del riesgo de sangrado',
        referenciaFuente: 'Clinical Pharmacology'
      },
      {
        medicamentoPrincipalId: warfarina.id,
        medicamentoSecundarioId: aspirina.id,
        gravedad: 'ALTA' as const,
        mecanismoAccion: 'Ambos inhiben la función plaquetaria y aumentan el riesgo de sangrado gastrointestinal',
        accionResultante: 'Efecto anticoagulante aditivo',
        referenciaFuente: 'American Heart Association Guidelines'
      },
      {
        medicamentoPrincipalId: digoxina.id,
        medicamentoSecundarioId: claritromicina.id,
        gravedad: 'ALTA' as const,
        mecanismoAccion: 'La claritromicina inhibe fuertemente el CYP3A4 y la P-glicoproteína, aumentando los niveles de digoxina',
        accionResultante: 'Reducción del aclaramiento de digoxina',
        referenciaFuente: 'DrugBank Interaction Database'
      },
      {
        medicamentoPrincipalId: simvastatina.id,
        medicamentoSecundarioId: claritromicina.id,
        gravedad: 'ALTA' as const,
        mecanismoAccion: 'La claritromicina inhibe fuertemente el CYP3A4, aumentando drásticamente los niveles de simvastatina',
        accionResultante: 'Aumento extremo de concentración de estatina',
        referenciaFuente: 'FDA Drug Safety Communication'
      },
      {
        medicamentoPrincipalId: lisinopril.id,
        medicamentoSecundarioId: ibuprofeno.id,
        gravedad: 'MODERADA' as const,
        mecanismoAccion: 'Los AINEs inhiben la síntesis de prostaglandinas, antagonizando el efecto vasodilatador del IECA',
        accionResultante: 'Reducción del efecto antihipertensivo',
        referenciaFuente: 'Hypertension Guidelines'
      },
      {
        medicamentoPrincipalId: metformina.id,
        medicamentoSecundarioId: ibuprofeno.id,
        gravedad: 'MODERADA' as const,
        mecanismoAccion: 'Los AINEs pueden afectar la función renal, reduciendo la eliminación de metformina',
        accionResultante: 'Riesgo aumentado de acumulación de metformina',
        referenciaFuente: 'Diabetes Care Guidelines'
      },
      {
        medicamentoPrincipalId: amlodipino.id,
        medicamentoSecundarioId: simvastatina.id,
        gravedad: 'MODERADA' as const,
        mecanismoAccion: 'El amlodipino inhibe moderadamente el CYP3A4, aumentando los niveles de simvastatina',
        accionResultante: 'Aumento moderado de concentración de estatina',
        referenciaFuente: 'Clinical Pharmacology'
      },
      {
        medicamentoPrincipalId: paracetamol.id,
        medicamentoSecundarioId: warfarina.id,
        gravedad: 'MODERADA' as const,
        mecanismoAccion: 'El paracetamol a dosis altas puede inhibir el metabolismo de warfarina en el hígado',
        accionResultante: 'Aumento del efecto anticoagulante',
        referenciaFuente: 'Thrombosis Research'
      }
    ]

    const interaccionesCreadas = await Promise.all(
      interacciones.map(inter => db.interaccionMaestra.create({ data: inter }))
    )

    console.log('⚠️ Interacciones maestras creadas')

    // Crear patologías correlacionadas para cada interacción
    const patologiasCorrelacionadas = [
      {
        interaccionId: interaccionesCreadas[0].id, // Warfarina + Sertralina
        nombrePatologia: 'Hemorragia Mayor por INR Elevado',
        manifestacionClinica: 'Sangrado gastrointestinal, hematuria, epistaxis, equimosis, hemorragia intracraneal',
        incidenciaEstimada: 'Común (10-20%)'
      },
      {
        interaccionId: interaccionesCreadas[1].id, // Warfarina + Ibuprofeno
        nombrePatologia: 'Hemorragia Gastrointestinal Severa',
        manifestacionClinica: 'Dolor abdominal, melena, hematemesis, anemia aguda',
        incidenciaEstimada: 'Muy Común (20-30%)'
      },
      {
        interaccionId: interaccionesCreadas[2].id, // Warfarina + Aspirina
        nombrePatologia: 'Síndrome Hemorrágico Generalizado',
        manifestacionClinica: 'Sangrado espontáneo en múltiples sitios, complicaciones quirúrgicas',
        incidenciaEstimada: 'Común (15-25%)'
      },
      {
        interaccionId: interaccionesCreadas[3].id, // Digoxina + Claritromicina
        nombrePatologia: 'Intoxicación Digitálica Severa',
        manifestacionClinica: 'Arritmias ventriculares, náuseas, visión amarilla, confusión, bradicardia',
        incidenciaEstimada: 'Común (5-15%)'
      },
      {
        interaccionId: interaccionesCreadas[4].id, // Simvastatina + Claritromicina
        nombrePatologia: 'Rabdomiólisis Aguda',
        manifestacionClinica: 'Dolor muscular severo, mioglobinuria, insuficiencia renal aguda, CK elevada',
        incidenciaEstimada: 'Común (10-20%)'
      },
      {
        interaccionId: interaccionesCreadas[5].id, // Lisinopril + Ibuprofeno
        nombrePatologia: 'Crisis Hipertensiva y Daño Renal',
        manifestacionClinica: 'Aumento de presión arterial, edema, deterioro de función renal',
        incidenciaEstimada: 'Poco Común (2-5%)'
      },
      {
        interaccionId: interaccionesCreadas[6].id, // Metformina + Ibuprofeno
        nombrePatologia: 'Acidosis Láctica',
        manifestacionClinica: 'Dolor abdominal, náuseas, respiración de Kussmaul, deterioro del estado mental',
        incidenciaEstimada: 'Rara (<1%)'
      },
      {
        interaccionId: interaccionesCreadas[7].id, // Amlodipino + Simvastatina
        nombrePatologia: 'Miopatía Inducida por Estatinas',
        manifestacionClinica: 'Dolor muscular, debilidad, CK moderadamente elevada',
        incidenciaEstimada: 'Poco Común (3-7%)'
      },
      {
        interaccionId: interaccionesCreadas[8].id, // Paracetamol + Warfarina
        nombrePatologia: 'Coagulopatía por Potenciación',
        manifestacionClinica: 'INR elevado, riesgo de sangrado espontáneo',
        incidenciaEstimada: 'Poco Común (2-4%)'
      }
    ]

    await db.patologiaCorrelacionada.createMany({
      data: patologiasCorrelacionadas
    })

    console.log('🏥 Patologías correlacionadas creadas')

    // Crear recomendaciones detalladas para cada interacción
    const recomendaciones = [
      {
        interaccionId: interaccionesCreadas[0].id, // Warfarina + Sertralina
        tipoManejo: 'MONITORIZACION' as const,
        detalleRecomendacion: 'Monitorizar INR diariamente durante la primera semana. Reducir dosis de warfarina en 25-50%. Considerar antidepresivo alternativo.'
      },
      {
        interaccionId: interaccionesCreadas[1].id, // Warfarina + Ibuprofeno
        tipoManejo: 'EVITAR' as const,
        detalleRecomendacion: 'Evitar uso concomitante. Usar paracetamol como alternativa analgésica. Si es indispensable, usar protector gástrico.'
      },
      {
        interaccionId: interaccionesCreadas[2].id, // Warfarina + Aspirina
        tipoManejo: 'MONITORIZACION' as const,
        detalleRecomendacion: 'Usar solo bajo supervisión médica estricta. Monitorizar INR 2 veces por semana. Dosis mínima efectiva de aspirina (81mg).'
      },
      {
        interaccionId: interaccionesCreadas[3].id, // Digoxina + Claritromicina
        tipoManejo: 'AJUSTE_DOSIS' as const,
        detalleRecomendacion: 'Reducir dosis de digoxina 50-70% durante tratamiento con claritromicina. Monitorizar niveles de digoxina y ECG.'
      },
      {
        interaccionId: interaccionesCreadas[4].id, // Simvastatina + Claritromicina
        tipoManejo: 'EVITAR' as const,
        detalleRecomendacion: 'Suspender simvastatina durante tratamiento con claritromicina. Usar estatina no metabolizada por CYP3A4 (pravastatina).'
      },
      {
        interaccionId: interaccionesCreadas[5].id, // Lisinopril + Ibuprofeno
        tipoManejo: 'MONITORIZACION' as const,
        detalleRecomendacion: 'Monitorizar presión arterial y función renal. Usar AINEs por corto período. Considerar analgésico alternativo.'
      },
      {
        interaccionId: interaccionesCreadas[6].id, // Metformina + Ibuprofeno
        tipoManejo: 'MONITORIZACION' as const,
        detalleRecomendacion: 'Monitorizar función renal (creatinina, BUN). Mantener hidratación adecuada. Suspender metformina si deterioro renal.'
      },
      {
        interaccionId: interaccionesCreadas[7].id, // Amlodipino + Simvastatina
        tipoManejo: 'AJUSTE_DOSIS' as const,
        detalleRecomendacion: 'Limitar dosis de simvastatina a 20mg/día. Monitorizar CK y síntomas musculares. Considerar estatina alternativa.'
      },
      {
        interaccionId: interaccionesCreadas[8].id, // Paracetamol + Warfarina
        tipoManejo: 'AJUSTE_DOSIS' as const,
        detalleRecomendacion: 'Limitar dosis de paracetamol a máximo 2g/día. Monitorizar INR semanalmente durante uso prolongado.'
      }
    ]

    await db.recomendacion.createMany({
      data: recomendaciones
    })

    console.log('💡 Recomendaciones clínicas creadas')

    // Crear patologías preexistentes
    await db.patologiaPreexistente.createMany({
      data: [
        {
          nombre: 'Insuficiencia Renal Crónica',
          descripcion: 'Pérdida progresiva y permanente de la función renal',
          categoria: 'Renal'
        },
        {
          nombre: 'Insuficiencia Cardíaca',
          descripcion: 'Incapacidad del corazón para bombear sangre adecuadamente',
          categoria: 'Cardiovascular'
        },
        {
          nombre: 'Enfermedad Hepática Crónica',
          descripcion: 'Deterioro progresivo de la función hepática',
          categoria: 'Hepático'
        },
        {
          nombre: 'Hipertensión Arterial Sistémica',
          descripcion: 'Presión arterial elevada crónicamente',
          categoria: 'Cardiovascular'
        },
        {
          nombre: 'Diabetes Mellitus Tipo 2',
          descripcion: 'Trastorno del metabolismo de la glucosa con resistencia a la insulina',
          categoria: 'Endocrino'
        },
        {
          nombre: 'Enfermedad Coronaria',
          descripcion: 'Obstrucción de las arterias coronarias',
          categoria: 'Cardiovascular'
        },
        {
          nombre: 'Arritmias Cardíacas',
          descripcion: 'Trastornos del ritmo cardíaco',
          categoria: 'Cardiovascular'
        }
      ]
    })

    console.log('🏥 Patologías preexistentes creadas')
    console.log('✅ Migración al nuevo esquema BD-Int completada exitosamente')

  } catch (error) {
    console.error('❌ Error en la migración:', error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

// Ejecutar el script
migrateToNewSchema()
  .then(() => {
    console.log('🎉 Proceso de migración completado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Error en el proceso:', error)
    process.exit(1)
  })