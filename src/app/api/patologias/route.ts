import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const patologias = await db.patologiaPreexistente.findMany({
      orderBy: [
        { categoria: 'asc' },
        { nombre: 'asc' }
      ]
    })

    return NextResponse.json({
      patologias: patologias,
      total: patologias.length
    })

  } catch (error) {
    console.error('Error al obtener patologías:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener patologías' },
      { status: 500 }
    )
  }
}