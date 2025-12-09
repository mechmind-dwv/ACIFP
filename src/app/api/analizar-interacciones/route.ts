import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface MedicamentoRequest {
  id: string
  nombreGenerico: string
  nombreComercial?: string
}

interface PatologiaRequest {
  id: string
  nombre: string
  categoria?: string
}

interface InteraccionResponse {
  id: string
  medicamentoA: {
    id: string
    nombreGenerico: string
    nombreComercial?: string
    codigoAtc?: string
    grupoTerapeutico?: string
    rutaMetabolica?: string
  }
  medicamentoB: {
    id: string
    nombreGenerico: string
    nombreComercial?: string
    codigoAtc?: string
    grupoTerapeutico?: string
    rutaMetabolica?: string
  }
  gravedad: 'ALTA_MAYOR' | 'MODERADA' | 'BAJA_MENOR'
  mecanismoAccion: string
  accionResultante: string
  consecuenciaPotencial: string
  referenciaFuente?: string
  nivelEvidencia?: string
  patologiasCorrelacionadas: {
    nombrePatologia: string
    manifestacionClinica?: string
    incidenciaEstimada?: string
  }[]
  recomendaciones: {
    tipoManejo: 'EVITAR_ABSOLUTAMENTE' | 'AJUSTE_DOSIS' | 'MONITORIZACION_CERCANA' | 'ESPACIAR_ADMINISTRACION' | 'EDUCAR_PACIENTE' | 'CONSULTAR_ESPECIALISTA'
    prioridad: 'URGENTE' | 'IMPORTANTE' | 'INFORMATIVO'
    detalleRecomendacion: string
    responsable: 'MEDICO' | 'FARMACEUTICO' | 'PACIENTE' | 'SISTEMA_SALUD'
    tiempoAccion?: string
    parametrosMonitoreo?: string
    accionAlternativa?: string
  }[]
  advertenciaEspecial?: string
}

export async function POST(request: NextRequest) {
  try {
    const { 
      medicamentos, 
      patologias 
    }: { 
      medicamentos: MedicamentoRequest[]
      patologias?: PatologiaRequest[]
    } = await request.json()

    if (!medicamentos || medicamentos.length < 2) {
      return NextResponse.json(
        { error: 'Se requieren al menos 2 medicamentos para analizar interacciones' },
        { status: 400 }
      )
    }

    // Generar todas las combinaciones posibles de pares de medicamentos
    const combinaciones = []
    for (let i = 0; i < medicamentos.length; i++) {
      for (let j = i + 1; j < medicamentos.length; j++) {
        combinaciones.push([medicamentos[i], medicamentos[j]])
      }
    }

    // Buscar interacciones completas usando JOINs complejas
    const interaccionesEncontradas: InteraccionResponse[] = []

    for (const [medA, medB] of combinaciones) {
      // Implementar la consulta JOIN completa como especificaste
      const interacciones = await db.interaccionMaestra.findMany({
        where: {
          OR: [
            {
              AND: [
                { medicamentoPrincipal: { nombreGenerico: medA.nombreGenerico } },
                { medicamentoSecundario: { nombreGenerico: medB.nombreGenerico } }
              ]
            },
            {
              AND: [
                { medicamentoPrincipal: { nombreGenerico: medB.nombreGenerico } },
                { medicamentoSecundario: { nombreGenerico: medA.nombreGenerico } }
              ]
            }
          ]
        },
        include: {
          medicamentoPrincipal: true,
          medicamentoSecundario: true,
          patologiasCorrelacionadas: true,
          recomendaciones: true
        }
      })

      for (const interaccion of interacciones) {
        // Evaluar advertencias especiales basadas en patologías preexistentes
        let advertenciaEspecial = ''
        let gravedadAjustada = interaccion.gravedad

        if (patologias && patologias.length > 0) {
          const nombresPatologias = patologias.map(p => p.nombre.toLowerCase())
          
          // Reglas de ajuste de riesgo basadas en patologías
          for (const patologia of interaccion.patologiasCorrelacionadas) {
            if (patologia.nombrePatologia.toLowerCase().includes('renal') || 
                patologia.nombrePatologia.toLowerCase().includes('riñón')) {
              if (nombresPatologias.some(p => p.includes('renal') || p.includes('insuficiencia renal'))) {
                advertenciaEspecial = '⚠️ RIESGO ELEVADO: Paciente con insuficiencia renal preexistente. Esta interacción puede ser más grave.'
                gravedadAjustada = 'ALTA'
              }
            }

            if (patologia.nombrePatologia.toLowerCase().includes('cardíaco') || 
                patologia.nombrePatologia.toLowerCase().includes('arritmia') ||
                patologia.nombrePatologia.toLowerCase().includes('hipertensión')) {
              if (nombresPatologias.some(p => p.includes('cardíaco') || p.includes('insuficiencia cardíaca') || p.includes('hipertensión'))) {
                advertenciaEspecial = '⚠️ RIESGO ELEVADO: Paciente con patología cardiovascular preexistente. Monitoreo estricto requerido.'
                if (interaccion.gravedad === 'BAJA') gravedadAjustada = 'MODERADA'
                if (interaccion.gravedad === 'MODERADA') gravedadAjustada = 'ALTA'
              }
            }

            if (patologia.nombrePatologia.toLowerCase().includes('hepático') || 
                patologia.nombrePatologia.toLowerCase().includes('hígado')) {
              if (nombresPatologias.some(p => p.includes('hepático') || p.includes('enfermedad hepática'))) {
                advertenciaEspecial = '⚠️ RIESGO ELEVADO: Paciente con enfermedad hepática preexistente. Ajuste de dosis puede ser necesario.'
                if (interaccion.gravedad === 'BAJA') gravedadAjustada = 'MODERADA'
                if (interaccion.gravedad === 'MODERADA') gravedadAjustada = 'ALTA'
              }
            }
          }

          // Casos específicos para diabetes
          if (nombresPatologias.some(p => p.includes('diabetes'))) {
            if (interaccion.medicamentoPrincipal.nombreGenerico.toLowerCase().includes('metformina') ||
                interaccion.medicamentoSecundario.nombreGenerico.toLowerCase().includes('metformina')) {
              advertenciaEspecial = '⚠️ RIESGO ELEVADO: Paciente diabético usando metformina. Riesgo aumentado de acidosis láctica.'
              gravedadAjustada = 'ALTA'
            }
          }
        }

        interaccionesEncontradas.push({
          id: interaccion.id,
          medicamentoA: {
            id: interaccion.medicamentoPrincipal.id,
            nombreGenerico: interaccion.medicamentoPrincipal.nombreGenerico,
            nombreComercial: interaccion.medicamentoPrincipal.nombreComercial || undefined,
            codigoAtc: interaccion.medicamentoPrincipal.codigoAtc || undefined,
            grupoTerapeutico: interaccion.medicamentoPrincipal.grupoTerapeutico || undefined,
            rutaMetabolica: interaccion.medicamentoPrincipal.rutaMetabolica || undefined
          },
          medicamentoB: {
            id: interaccion.medicamentoSecundario.id,
            nombreGenerico: interaccion.medicamentoSecundario.nombreGenerico,
            nombreComercial: interaccion.medicamentoSecundario.nombreComercial || undefined,
            codigoAtc: interaccion.medicamentoSecundario.codigoAtc || undefined,
            grupoTerapeutico: interaccion.medicamentoSecundario.grupoTerapeutico || undefined,
            rutaMetabolica: interaccion.medicamentoSecundario.rutaMetabolica || undefined
          },
          gravedad: gravedadAjustada,
          mecanismoAccion: interaccion.mecanismoAccion,
          accionResultante: interaccion.accionResultante,
          consecuenciaPotencial: interaccion.consecuenciaPotencial,
          referenciaFuente: interaccion.referenciaFuente || undefined,
          nivelEvidencia: interaccion.nivelEvidencia || undefined,
          patologiasCorrelacionadas: interaccion.patologiasCorrelacionadas.map(p => ({
            nombrePatologia: p.nombrePatologia,
            manifestacionClinica: p.manifestacionClinica || undefined,
            incidenciaEstimada: p.incidenciaEstimada || undefined
          })),
          recomendaciones: interaccion.recomendaciones.map(r => ({
            tipoManejo: r.tipoManejo,
            prioridad: r.prioridad,
            detalleRecomendacion: r.detalleRecomendacion,
            responsable: r.responsable,
            tiempoAccion: r.tiempoAccion || undefined,
            parametrosMonitoreo: r.parametrosMonitoreo || undefined,
            accionAlternativa: r.accionAlternativa || undefined
          })),
          advertenciaEspecial: advertenciaEspecial || undefined
        })
      }
    }

    // Ordenar interacciones por gravedad (ALTA_MAYOR primero)
    const gravedadOrder = { 'ALTA_MAYOR': 0, 'MODERADA': 1, 'BAJA_MENOR': 2 }
    interaccionesEncontradas.sort((a, b) => 
      gravedadOrder[a.gravedad] - gravedadOrder[b.gravedad]
    )

    return NextResponse.json({
      interacciones: interaccionesEncontradas,
      total: interaccionesEncontradas.length,
      combinacionesAnalizadas: combinaciones.length
    })

  } catch (error) {
    console.error('Error al analizar interacciones:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor al analizar interacciones' },
      { status: 500 }
    )
  }
}