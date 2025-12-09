import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface BusquedaRequest {
  query: string
  limit?: number
}

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 10 }: BusquedaRequest = await request.json()

    if (!query || query.length < 2) {
      return NextResponse.json({
        medicamentos: [],
        total: 0
      })
    }

    const medicamentos = await db.medicamento.findMany({
      where: {
        OR: [
          { nombreGenerico: { contains: query, mode: 'insensitive' } },
          { nombreComercial: { contains: query, mode: 'insensitive' } },
          { codigoAtc: { contains: query, mode: 'insensitive' } },
          { grupoTerapeutico: { contains: query, mode: 'insensitive' } }
        ]
      },
      take: Math.min(limit, 20),
      orderBy: [
        { nombreGenerico: 'asc' }
      ]
    })

    return NextResponse.json({
      medicamentos: medicamentos,
      total: medicamentos.length
    })

  } catch (error) {
    console.error('Error al buscar medicamentos:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor al buscar medicamentos' },
      { status: 500 }
    )
  }
}