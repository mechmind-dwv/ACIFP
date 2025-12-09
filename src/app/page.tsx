'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertTriangle, Pill, Search, Plus, X, Heart } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Patologia {
  id: string
  nombre: string
  descripcion?: string
  categoria?: string
}

interface Medicamento {
  id: string
  nombreGenerico: string
  nombreComercial?: string
}

interface Interaccion {
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

export default function Home() {
  const [medicamentosSeleccionados, setMedicamentosSeleccionados] = useState<Medicamento[]>([])
  const [medicamentoBusqueda, setMedicamentoBusqueda] = useState('')
  const [medicamentosDisponibles, setMedicamentosDisponibles] = useState<Medicamento[]>([])
  const [interacciones, setInteracciones] = useState<Interaccion[]>([])
  const [patologiasSeleccionadas, setPatologiasSeleccionadas] = useState<Patologia[]>([])
  const [patologiasDisponibles, setPatologiasDisponibles] = useState<Patologia[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const medicamentosEjemplo: Medicamento[] = [
    { id: '1', nombreGenerico: 'Warfarina', nombreComercial: 'Coumadin' },
    { id: '2', nombreGenerico: 'Sertralina', nombreComercial: 'Zoloft' },
    { id: '3', nombreGenerico: 'Paracetamol', nombreComercial: 'Tylenol' },
    { id: '4', nombreGenerico: 'Ibuprofeno', nombreComercial: 'Advil' },
    { id: '5', nombreGenerico: 'Aspirina', nombreComercial: 'Aspirin' },
    { id: '6', nombreGenerico: 'Lisinopril', nombreComercial: 'Zestril' },
    { id: '7', nombreGenerico: 'Metformina', nombreComercial: 'Glucophage' },
    { id: '8', nombreGenerico: 'Omeprazol', nombreComercial: 'Prilosec' },
    { id: '9', nombreGenerico: 'Simvastatina', nombreComercial: 'Zocor' },
    { id: '10', nombreGenerico: 'Amlodipino', nombreComercial: 'Norvasc' }
  ]

  // Cargar patologías disponibles al montar el componente
  useEffect(() => {
    const cargarPatologias = async () => {
      try {
        const response = await fetch('/api/patologias')
        if (response.ok) {
          const data = await response.json()
          setPatologiasDisponibles(data.patologias)
        }
      } catch (error) {
        console.error('Error al cargar patologías:', error)
      }
    }
    cargarPatologias()
  }, [])

  const handleBusquedaMedicamento = (query: string) => {
    setMedicamentoBusqueda(query)
    if (query.length > 2) {
      const filtrados = medicamentosEjemplo.filter(med => 
        med.nombreGenerico.toLowerCase().includes(query.toLowerCase()) ||
        med.nombreComercial?.toLowerCase().includes(query.toLowerCase())
      )
      setMedicamentosDisponibles(filtrados)
    } else {
      setMedicamentosDisponibles([])
    }
  }

  const agregarMedicamento = (medicamento: Medicamento) => {
    if (!medicamentosSeleccionados.find(m => m.id === medicamento.id)) {
      setMedicamentosSeleccionados([...medicamentosSeleccionados, medicamento])
    }
    setMedicamentoBusqueda('')
    setMedicamentosDisponibles([])
  }

  const removerMedicamento = (id: string) => {
    setMedicamentosSeleccionados(medicamentosSeleccionados.filter(m => m.id !== id))
  }

  const agregarPatologia = (patologia: Patologia) => {
    if (!patologiasSeleccionadas.find(p => p.id === patologia.id)) {
      setPatologiasSeleccionadas([...patologiasSeleccionadas, patologia])
    }
  }

  const removerPatologia = (id: string) => {
    setPatologiasSeleccionadas(patologiasSeleccionadas.filter(p => p.id !== id))
  }

  const analizarInteracciones = async () => {
    if (medicamentosSeleccionados.length < 2) {
      alert('Por favor, seleccione al menos 2 medicamentos para analizar interacciones')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/analizar-interacciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          medicamentos: medicamentosSeleccionados,
          patologias: patologiasSeleccionadas
        })
      })

      if (response.ok) {
        const data = await response.json()
        setInteracciones(data.interacciones)
      } else {
        console.error('Error al analizar interacciones')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getGravedadColor = (gravedad: string) => {
    switch (gravedad) {
      case 'ALTA_MAYOR':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'MODERADA':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'BAJA_MENOR':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getGravedadIcon = (gravedad: string) => {
    switch (gravedad) {
      case 'ALTA_MAYOR':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'MODERADA':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'BAJA_MENOR':
        return <AlertTriangle className="w-4 h-4 text-green-600" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getGravedadLabel = (gravedad: string) => {
    switch (gravedad) {
      case 'ALTA_MAYOR':
        return '🔴 ALTA (MAYOR)'
      case 'MODERADA':
        return '🟡 MODERADA'
      case 'BAJA_MENOR':
        return '🟢 BAJA (MENOR)'
      default:
        return gravedad
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="ACIFP Logo"
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-4xl font-bold text-gray-900">ACIFP</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">
            Artefacto Web de Correlación de Interacciones Farmacológicas y Patologías
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Sistema de soporte a la decisión clínica para alertar sobre riesgos de desarrollar patologías 
            específicas resultantes de la mezcla de medicamentos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Panel Izquierdo - Entrada de Datos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Análisis de Medicamentos
              </CardTitle>
              <CardDescription>
                Ingrese los medicamentos que el paciente está tomando
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Búsqueda de Medicamentos */}
              <div className="relative">
                <Input
                  placeholder="Buscar medicamento (ej: Warfarina, Paracetamol)..."
                  value={medicamentoBusqueda}
                  onChange={(e) => handleBusquedaMedicamento(e.target.value)}
                  className="w-full"
                />
                {medicamentosDisponibles.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {medicamentosDisponibles.map((med) => (
                      <div
                        key={med.id}
                        onClick={() => agregarMedicamento(med)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium">{med.nombreGenerico}</div>
                        {med.nombreComercial && (
                          <div className="text-sm text-gray-500">{med.nombreComercial}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Medicamentos Seleccionados */}
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-700">Medicamentos Seleccionados:</h3>
                {medicamentosSeleccionados.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No hay medicamentos seleccionados</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {medicamentosSeleccionados.map((med) => (
                      <Badge
                        key={med.id}
                        variant="secondary"
                        className="flex items-center gap-1 pr-1"
                      >
                        {med.nombreGenerico}
                        <button
                          onClick={() => removerMedicamento(med.id)}
                          className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Botón de Análisis */}
              <Button
                onClick={analizarInteracciones}
                disabled={medicamentosSeleccionados.length < 2 || isLoading}
                className="w-full"
              >
                {isLoading ? 'Analizando...' : 'Analizar Interacciones'}
              </Button>
            </CardContent>
          </Card>

          {/* Sección de Patologías Preexistentes */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Patologías Preexistentes
              </CardTitle>
              <CardDescription>
                Seleccione condiciones médicas preexistentes para personalizar el análisis de riesgo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {patologiasDisponibles.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Cargando patologías disponibles...</p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patologiasDisponibles.map((patologia) => (
                    <div
                      key={patologia.id}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        const isSelected = patologiasSeleccionadas.find(p => p.id === patologia.id)
                        if (isSelected) {
                          removerPatologia(patologia.id)
                        } else {
                          agregarPatologia(patologia)
                        }
                      }}
                    >
                      <Checkbox
                        checked={!!patologiasSeleccionadas.find(p => p.id === patologia.id)}
                        onChange={() => {}}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{patologia.nombre}</div>
                        {patologia.categoria && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {patologia.categoria}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {patologiasSeleccionadas.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">
                    Patologías seleccionadas ({patologiasSeleccionadas.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {patologiasSeleccionadas.map((patologia) => (
                      <Badge
                        key={patologia.id}
                        variant="secondary"
                        className="flex items-center gap-1 pr-1 bg-blue-100 text-blue-800"
                      >
                        {patologia.nombre}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removerPatologia(patologia.id)
                          }}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Panel Derecho - Resultados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Resultados del Análisis
              </CardTitle>
              <CardDescription>
                Interacciones farmacológicas detectadas y sus correlaciones patológicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {interacciones.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay interacciones para mostrar</p>
                  <p className="text-sm">Seleccione al menos 2 medicamentos y haga clic en "Analizar Interacciones"</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {interacciones.map((interaccion) => (
                    <div
                      key={interaccion.id}
                      className={`p-4 rounded-lg border ${getGravedadColor(interaccion.gravedad)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getGravedadIcon(interaccion.gravedad)}
                          <span className="font-semibold text-sm">
                            {interaccion.medicamentoA.nombreGenerico} + {interaccion.medicamentoB.nombreGenerico}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getGravedadLabel(interaccion.gravedad)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Consecuencia Clínica:</strong> {interaccion.consecuenciaPotencial}
                        </div>
                        
                        <div>
                          <strong>Mecanismo:</strong> {interaccion.mecanismoAccion}
                        </div>

                        <div>
                          <strong>Efecto Farmacológico:</strong> {interaccion.accionResultante}
                        </div>

                        {/* Evidencia Científica */}
                        {interaccion.nivelEvidencia && (
                          <div className="mt-2 p-2 bg-purple-50 rounded border border-purple-200">
                            <strong className="text-purple-800">Nivel de Evidencia:</strong>
                            <div className="text-xs mt-1">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                interaccion.nivelEvidencia === 'ENSAYO_CLINICO' ? 'bg-purple-600 text-white' :
                                interaccion.nivelEvidencia === 'ESTUDIO_COHORTE' ? 'bg-purple-500 text-white' :
                                interaccion.nivelEvidencia === 'REPORTE_CASOS' ? 'bg-purple-400 text-white' :
                                'bg-purple-300 text-white'
                              }`}>
                                {interaccion.nivelEvidencia === 'ENSAYO_CLINICO' ? 'Ensayo Clínico' :
                                 interaccion.nivelEvidencia === 'ESTUDIO_COHORTE' ? 'Estudio de Cohorte' :
                                 interaccion.nivelEvidencia === 'REPORTE_CASOS' ? 'Reporte de Casos' :
                                 'Opinión de Expertos'}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Patologías Correlacionadas */}
                        {interaccion.patologiasCorrelacionadas.length > 0 && (
                          <div className="mt-3 p-2 bg-orange-50 rounded border border-orange-200">
                            <strong className="text-orange-800">Patología Correlacionada:</strong>
                            {interaccion.patologiasCorrelacionadas.map((patologia, index) => (
                              <div key={index} className="mt-1 text-xs">
                                <div className="font-medium text-orange-700">{patologia.nombrePatologia}</div>
                                {patologia.manifestacionClinica && (
                                  <div className="text-gray-600 mt-0.5">
                                    <em>Síntomas:</em> {patologia.manifestacionClinica}
                                  </div>
                                )}
                                {patologia.incidenciaEstimada && (
                                  <div className="text-gray-600">
                                    <em>Incidencia:</em> {patologia.incidenciaEstimada}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Recomendaciones Clínicas Prescriptivas */}
                        {interaccion.recomendaciones.length > 0 && (
                          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                            <strong className="text-blue-800">Recomendaciones Clínicas:</strong>
                            {interaccion.recomendaciones.map((rec, index) => (
                              <div key={index} className="mt-2 p-2 bg-white rounded border border-blue-100">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      rec.tipoManejo === 'EVITAR_ABSOLUTAMENTE' ? 'bg-red-100 text-red-700' :
                                      rec.tipoManejo === 'AJUSTE_DOSIS' ? 'bg-yellow-100 text-yellow-700' :
                                      rec.tipoManejo === 'MONITORIZACION_CERCANA' ? 'bg-orange-100 text-orange-700' :
                                      rec.tipoManejo === 'ESPACIAR_ADMINISTRACION' ? 'bg-blue-100 text-blue-700' :
                                      rec.tipoManejo === 'EDUCAR_PACIENTE' ? 'bg-green-100 text-green-700' :
                                      'bg-purple-100 text-purple-700'
                                    }`}>
                                      {rec.tipoManejo === 'EVITAR_ABSOLUTAMENTE' ? 'EVITAR ABSOLUTAMENTE' :
                                       rec.tipoManejo === 'AJUSTE_DOSIS' ? 'AJUSTAR DOSIS' :
                                       rec.tipoManejo === 'MONITORIZACION_CERCANA' ? 'MONITORIZAR CERCANAMENTE' :
                                       rec.tipoManejo === 'ESPACIAR_ADMINISTRACION' ? 'ESPACIAR ADMINISTRACIÓN' :
                                       rec.tipoManejo === 'EDUCAR_PACIENTE' ? 'EDUCAR PACIENTE' :
                                       'CONSULTAR ESPECIALISTA'}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      rec.prioridad === 'URGENTE' ? 'bg-red-600 text-white' :
                                      rec.prioridad === 'IMPORTANTE' ? 'bg-yellow-600 text-white' :
                                      'bg-gray-600 text-white'
                                    }`}>
                                      {rec.prioridad === 'URGENTE' ? 'URGENTE' :
                                       rec.prioridad === 'IMPORTANTE' ? 'IMPORTANTE' :
                                       'INFORMATIVO'}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    Responsable: {rec.responsable.replace('_', ' ')}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-700 mt-2">
                                  <strong>Acción:</strong> {rec.detalleRecomendacion}
                                </div>
                                {rec.tiempoAccion && (
                                  <div className="text-xs text-blue-600 mt-1">
                                    <em>Tiempo:</em> {rec.tiempoAccion}
                                  </div>
                                )}
                                {rec.parametrosMonitoreo && (
                                  <div className="text-xs text-green-600 mt-1">
                                    <em>Monitorear:</em> {rec.parametrosMonitoreo}
                                  </div>
                                )}
                                {rec.accionAlternativa && (
                                  <div className="text-xs text-purple-600 mt-1">
                                    <em>Alternativa:</em> {rec.accionAlternativa}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Información adicional */}
                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                          {interaccion.medicamentoA.codigoAtc && (
                            <div><em>ATC A:</em> {interaccion.medicamentoA.codigoAtc}</div>
                          )}
                          {interaccion.medicamentoB.codigoAtc && (
                            <div><em>ATC B:</em> {interaccion.medicamentoB.codigoAtc}</div>
                          )}
                          {interaccion.medicamentoA.grupoTerapeutico && (
                            <div><em>Grupo A:</em> {interaccion.medicamentoA.grupoTerapeutico}</div>
                          )}
                          {interaccion.medicamentoB.grupoTerapeutico && (
                            <div><em>Grupo B:</em> {interaccion.medicamentoB.grupoTerapeutico}</div>
                          )}
                          {interaccion.medicamentoA.rutaMetabolica && (
                            <div><em>Metabolismo A:</em> {interaccion.medicamentoA.rutaMetabolica}</div>
                          )}
                          {interaccion.medicamentoB.rutaMetabolica && (
                            <div><em>Metabolismo B:</em> {interaccion.medicamentoB.rutaMetabolica}</div>
                          )}
                          {interaccion.referenciaFuente && (
                            <div><em>Fuente:</em> {interaccion.referenciaFuente}</div>
                          )}
                        </div>
                        
                        {interaccion.advertenciaEspecial && (
                          <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-xs text-red-800">
                            <strong>⚠️ Advertencia Especial:</strong> {interaccion.advertenciaEspecial}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Información Adicional */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-semibold text-sm">Riesgo ALTO</span>
              </div>
              <p className="text-xs text-gray-600">
                Interacciones que pueden causar daño grave o potencialmente mortal. Requiere atención médica inmediata.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-semibold text-sm">Riesgo MODERADO</span>
              </div>
              <p className="text-xs text-gray-600">
                Interacciones que pueden requerir monitoreo o ajuste de dosis. Consultar con profesional de salud.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-sm">Riesgo BAJO</span>
              </div>
              <p className="text-xs text-gray-600">
                Interacciones leves con efectos clínicos mínimos. Generalmente no requieren intervención.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}