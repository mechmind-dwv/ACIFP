import { db } from './src/lib/db'

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando siembra de datos...')

    // Limpiar datos existentes
    await db.interaccion.deleteMany()
    await db.medicamento.deleteMany()
    await db.patologia.deleteMany()
    console.log('🧹 Datos existentes eliminados')

    // Crear medicamentos
    const warfarina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Warfarina',
        nombreComercial: 'Coumadin',
        descripcion: 'Anticoagulante oral',
        viaAdministracion: 'Oral',
        dosisRecomendada: '2-10 mg/día'
      }
    })

    const sertralina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Sertralina',
        nombreComercial: 'Zoloft',
        descripcion: 'ISRS - Antidepresivo',
        viaAdministracion: 'Oral',
        dosisRecomendada: '25-200 mg/día'
      }
    })

    const paracetamol = await db.medicamento.create({
      data: {
        nombreGenerico: 'Paracetamol',
        nombreComercial: 'Tylenol',
        descripcion: 'Analgésico y antipirético',
        viaAdministracion: 'Oral',
        dosisRecomendada: '500-1000 mg cada 6 horas'
      }
    })

    const ibuprofeno = await db.medicamento.create({
      data: {
        nombreGenerico: 'Ibuprofeno',
        nombreComercial: 'Advil',
        descripcion: 'AINES - Antiinflamatorio',
        viaAdministracion: 'Oral',
        dosisRecomendada: '200-800 mg cada 6-8 horas'
      }
    })

    const aspirina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Aspirina',
        nombreComercial: 'Aspirin',
        descripcion: 'AINES - Antiplaquetario',
        viaAdministracion: 'Oral',
        dosisRecomendada: '81-325 mg/día'
      }
    })

    const lisinopril = await db.medicamento.create({
      data: {
        nombreGenerico: 'Lisinopril',
        nombreComercial: 'Zestril',
        descripcion: 'IECA - Antihipertensivo',
        viaAdministracion: 'Oral',
        dosisRecomendada: '10-40 mg/día'
      }
    })

    const metformina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Metformina',
        nombreComercial: 'Glucophage',
        descripcion: 'Antidiabético oral',
        viaAdministracion: 'Oral',
        dosisRecomendada: '500-2000 mg/día'
      }
    })

    const omeprazol = await db.medicamento.create({
      data: {
        nombreGenerico: 'Omeprazol',
        nombreComercial: 'Prilosec',
        descripcion: 'IBP - Inhibidor de bomba de protones',
        viaAdministracion: 'Oral',
        dosisRecomendada: '20-40 mg/día'
      }
    })

    const simvastatina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Simvastatina',
        nombreComercial: 'Zocor',
        descripcion: 'Estatina - Hipolipemiante',
        viaAdministracion: 'Oral',
        dosisRecomendada: '20-80 mg/día'
      }
    })

    const amlodipino = await db.medicamento.create({
      data: {
        nombreGenerico: 'Amlodipino',
        nombreComercial: 'Norvasc',
        descripcion: 'Bloqueador de canales de calcio',
        viaAdministracion: 'Oral',
        dosisRecomendada: '5-10 mg/día'
      }
    })

    const digoxina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Digoxina',
        nombreComercial: 'Lanoxin',
        descripcion: 'Glucósido cardíaco',
        viaAdministracion: 'Oral',
        dosisRecomendada: '0.125-0.5 mg/día'
      }
    })

    const claritromicina = await db.medicamento.create({
      data: {
        nombreGenerico: 'Claritromicina',
        nombreComercial: 'Biaxin',
        descripcion: 'Macrólido - Antibiótico',
        viaAdministracion: 'Oral',
        dosisRecomendada: '250-500 mg cada 12 horas'
      }
    })

    console.log('💊 Medicamentos creados')

    // Crear interacciones peligrosas
    await db.interaccion.createMany({
      data: [
        {
          medicamentoAId: warfarina.id,
          medicamentoBId: sertralina.id,
          tipoInteraccion: 'Metabólica',
          gravedad: 'ALTA',
          efectoCorrelacionado: 'Riesgo de Hemorragia Mayor (INR elevado)',
          mecanismoAccion: 'La Sertralina potencia el efecto anticoagulante de la Warfarina debido a efectos en las plaquetas e inhibición del CYP2C9',
          recomendacion: 'Monitorizar INR diariamente durante la primera semana; Considerar ajuste de dosis de Warfarina.'
        },
        {
          medicamentoAId: warfarina.id,
          medicamentoBId: ibuprofeno.id,
          tipoInteraccion: 'Sinérgica',
          gravedad: 'ALTA',
          efectoCorrelacionado: 'Riesgo de Hemorragia Gastrointestinal Severa',
          mecanismoAccion: 'El Ibuprofeno inhibe la función plaquetaria y causa daño gástrico, potenciando el efecto anticoagulante',
          recomendacion: 'Evitar uso concomitante; Usar paracetamol como alternativa analgésica.'
        },
        {
          medicamentoAId: warfarina.id,
          medicamentoBId: aspirina.id,
          tipoInteraccion: 'Sinérgica',
          gravedad: 'ALTA',
          efectoCorrelacionado: 'Riesgo de Hemorragia Mayor',
          mecanismoAccion: 'Ambos inhiben la función plaquetaria y aumentan el riesgo de sangrado',
          recomendacion: 'Usar solo bajo supervisión médica estricta; Monitorizar INR frecuentemente.'
        },
        {
          medicamentoAId: paracetamol.id,
          medicamentoBId: warfarina.id,
          tipoInteraccion: 'Metabólica',
          gravedad: 'MODERADA',
          efectoCorrelacionado: 'Aumento de Anticoagulación',
          mecanismoAccion: 'El paracetamol a dosis altas puede inhibir el metabolismo de warfarina',
          recomendacion: 'Limitar dosis de paracetamol a no más de 2g/día; Monitorizar INR.'
        },
        {
          medicamentoAId: digoxina.id,
          medicamentoBId: claritromicina.id,
          tipoInteraccion: 'Metabólica',
          gravedad: 'ALTA',
          efectoCorrelacionado: 'Intoxicación Digitálica (Arritmias severas)',
          mecanismoAccion: 'La claritromicina inhibe el CYP3A4, aumentando los niveles de digoxina',
          recomendacion: 'Monitorizar niveles de digoxina; Reducir dosis 50-70% o usar antibiótico alternativo.'
        },
        {
          medicamentoAId: simvastatina.id,
          medicamentoBId: claritromicina.id,
          tipoInteraccion: 'Metabólica',
          gravedad: 'ALTA',
          efectoCorrelacionado: 'Rabdomiólisis',
          mecanismoAccion: 'La claritromicina inhibe fuertemente el CYP3A4, aumentando niveles de simvastatina',
          recomendacion: 'Suspender simvastatina durante tratamiento con claritromicina; Usar estatina alternativa.'
        },
        {
          medicamentoAId: lisinopril.id,
          medicamentoBId: ibuprofeno.id,
          tipoInteraccion: 'Antagónica',
          gravedad: 'MODERADA',
          efectoCorrelacionado: 'Reducción del efecto antihipertensivo y riesgo de daño renal',
          mecanismoAccion: 'Los AINEs inhiben la síntesis de prostaglandinas, antagonizando el efecto del IECA',
          recomendacion: 'Evitar uso crónico; Monitorizar presión arterial y función renal.'
        },
        {
          medicamentoAId: lisinopril.id,
          medicamentoBId: aspirina.id,
          tipoInteraccion: 'Antagónica',
          gravedad: 'MODERADA',
          efectoCorrelacionado: 'Reducción del efecto antihipertensivo',
          mecanismoAccion: 'La aspirina a dosis altas puede reducir el efecto del IECA',
          recomendacion: 'Usar dosis bajas de aspirina (81mg) si es necesario; Monitorizar presión arterial.'
        },
        {
          medicamentoAId: metformina.id,
          medicamentoBId: ibuprofeno.id,
          tipoInteraccion: 'Metabólica',
          gravedad: 'MODERADA',
          efectoCorrelacionado: 'Riesgo de Acidosis Láctica',
          mecanismoAccion: 'Los AINEs pueden afectar la función renal, aumentando niveles de metformina',
          recomendacion: 'Monitorizar función renal; Usar con precaución en pacientes con enfermedad renal.'
        },
        {
          medicamentoAId: amlodipino.id,
          medicamentoBId: simvastatina.id,
          tipoInteraccion: 'Metabólica',
          gravedad: 'MODERADA',
          efectoCorrelacionado: 'Aumento del riesgo de miopatía',
          mecanismoAccion: 'El amlodipino inhibe el CYP3A4, aumentando niveles de simvastatina',
          recomendacion: 'Limitar dosis de simvastatina a 20mg/día; Considerar estatina alternativa.'
        },
        {
          medicamentoAId: aspirina.id,
          medicamentoBId: ibuprofeno.id,
          tipoInteraccion: 'Antagónica',
          gravedad: 'MODERADA',
          efectoCorrelacionado: 'Reducción del efecto cardioprotector de la aspirina',
          mecanismoAccion: 'El ibuprofeno compite por el sitio de unión de la COX-1',
          recomendacion: 'Administrar aspirina 30 minutos antes que ibuprofeno; Usar alternativa.'
        }
      ]
    })

    console.log('⚠️ Interacciones creadas')

    // Crear patologías
    await db.patologia.createMany({
      data: [
        {
          nombre: 'Insuficiencia Renal Crónica',
          descripcion: 'Pérdida progresiva de la función renal',
          categoria: 'Renal'
        },
        {
          nombre: 'Insuficiencia Cardíaca',
          descripcion: 'Incapacidad del corazón para bombear sangre adecuadamente',
          categoria: 'Cardiovascular'
        },
        {
          nombre: 'Enfermedad Hepática',
          descripcion: 'Deterioro de la función hepática',
          categoria: 'Hepático'
        },
        {
          nombre: 'Hipertensión Arterial',
          descripcion: 'Presión arterial elevada crónicamente',
          categoria: 'Cardiovascular'
        },
        {
          nombre: 'Diabetes Mellitus',
          descripcion: 'Trastorno del metabolismo de la glucosa',
          categoria: 'Endocrino'
        }
      ]
    })

    console.log('🏥 Patologías creadas')
    console.log('✅ Base de datos poblada exitosamente')

  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

// Ejecutar el script
seedDatabase()
  .then(() => {
    console.log('🎉 Proceso completado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Error en el proceso:', error)
    process.exit(1)
  })