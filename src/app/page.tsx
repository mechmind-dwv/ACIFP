'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertTriangle, Pill, Search, Plus, X, AlertCircle, Clock, Users, Activity, Shield, ChevronDown, ChevronUp, Filter, Zap, Database, CheckCircle, XCircle, Info, Stethoscope, Heart, Kidney, Brain, Target } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'

interface Medicamento {
  id: string
  nombreGenerico: string
  nombreComercial?: string
  codigoAtc?: string
  grupoTerapeutico?: string
  rutaMetabolica?: string
}

interface Patologia {
  id: string
  nombre: string
  descripcion?: string
  categoria?: string
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
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

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

  // Búsqueda inteligente de medicamentos
  const handleBusquedaMedicamento = useCallback(async (query: string) => {
    setMedicamentoBusqueda(query)
    
    if (query.length > 2) {
      setIsSearching(true)
      try {
        const response = await fetch('/api/medicamentos/busqueda', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, limit: 8 })
        })

        if (response.ok) {
          const data = await response.json()
          setMedicamentosDisponibles(data.medicamentos)
        }
      } catch (error) {
        console.error('Error al buscar medicamentos:', error)
      } finally {
        setIsSearching(false)
      }
    } else {
      setMedicamentosDisponibles([])
    }
  }, [])

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

  const getTipoManejoIcon = (tipo: string) => {
    switch (tipo) {
      case 'EVITAR_ABSOLUTAMENTE':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'AJUSTE_DOSIS':
        return <Activity className="w-4 h-4 text-yellow-600" />
      case 'MONITORIZACION_CERCANA':
        return <Clock className="w-4 h-4 text-orange-600" />
      case 'ESPACIAR_ADMINISTRACION':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'EDUCAR_PACIENTE':
        return <Users className="w-4 h-4 text-green-600" />
      case 'CONSULTAR_ESPECIALISTA':
        return <Stethoscope className="w-4 h-4 text-purple-600" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'URGENTE':
        return 'bg-red-600 text-white'
      case 'IMPORTANTE':
        return 'bg-yellow-600 text-white'
      case 'INFORMATIVO':
        return 'bg-blue-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getPatologiaIcon = (categoria?: string) => {
    switch (categoria?.toLowerCase()) {
      case 'renal':
        return <Kidney className="w-4 h-4 text-blue-600" />
      case 'cardiovascular':
        return <Heart className="w-4 h-4 text-red-600" />
      case 'hepático':
        return <Brain className="w-4 h-4 text-purple-600" />
      default:
        return <Shield className="w-4 h-4 text-gray-600" />
    }
  }

  // Obtener el riesgo más alto para el banner de alerta
  const highestRisk = interacciones.find(i => i.gravedad === 'ALTA_MAYOR')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Banner de Alerta de Riesgo Máximo */}
        {highestRisk && (
          <div className="mb-6 p-4 bg-red-600 text-white rounded-lg shadow-lg border-2 border-red-700 animate-pulse">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">🚨 RIESGO MÁXIMO DETECTADO</h2>
                <p className="text-red-100">
                  {highestRisk.medicamentoA.nombreGenerico} + {highestRisk.medicamentoB.nombreGenerico} - {highestRisk.consecuenciaPotencial}
                </p>
              </div>
            </div>
          </div>
        )}

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
            Sistema de soporte a la decisión clínica con clasificación de gravedad rigurosa y recomendaciones prescriptivas
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel Izquierdo - Entrada de Datos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Análisis de Polifarmacia
              </CardTitle>
              <CardDescription>
                Ingrese los medicamentos y condiciones del paciente para análisis completo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Búsqueda de Medicamentos Mejorada */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  🔍 Búsqueda Inteligente de Medicamentos
                </label>
                <div className="relative">
                  <Input
                    placeholder="Escriba nombre genérico, comercial o código ATC..."
                    value={medicamentoBusqueda}
                    onChange={(e) => handleBusquedaMedicamento(e.target.value)}
                    className="w-full pr-10"
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-blue-600"></div>
                    </div>
                  )}
                  {medicamentosDisponibles.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                      {medicamentosDisponibles.map((med) => (
                        <div
                          key={med.id}
                          onClick={() => agregarMedicamento(med)}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{med.nombreGenerico}</div>
                              {med.nombreComercial && (
                                <div className="text-sm text-gray-500">{med.nombreComercial}</div>
                              )}
                            </div>
                            <div className="text-right">
                              {med.codigoAtc && (
                                <Badge variant="outline" className="text-xs">
                                  {med.codigoAtc}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Medicamentos Seleccionados */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    💊 Medicamentos Seleccionados ({medicamentosSeleccionados.length})
                  </label>
                  {medicamentosSeleccionados.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMedicamentosSeleccionados([])}
                    >
                      Limpiar
                    </Button>
                  )}
                </div>
                {medicamentosSeleccionados.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No hay medicamentos seleccionados</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {medicamentosSeleccionados.map((med) => (
                      <div
                        key={med.id}
                        className="group relative"
                      >
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 pr-1 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                        >
                          {med.nombreGenerico}
                          <button
                            onClick={() => removerMedicamento(med.id)}
                            className="ml-1 hover:bg-blue-300 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Patologías Preexistentes */}
              <div className="space-y-3">
                <Collapsible open={showFilters} onOpenChange={setShowFilters}>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Patologías Preexistentes ({patologiasSeleccionadas.length})
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-3">
                    <div className="grid gap-2">
                      {patologiasDisponibles.map((patologia) => (
                        <div
                          key={patologia.id}
                          onClick={() => {
                            const isSelected = patologiasSeleccionadas.find(p => p.id === patologia.id)
                            if (isSelected) {
                              removerPatologia(patologia.id)
                            } else {
                              agregarPatologia(patologia)
                            }
                          }}
                          className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <Checkbox
                            checked={!!patologiasSeleccionadas.find(p => p.id === patologia.id)}
                            onChange={() => {}}
                          />
                          <div className="flex items-center gap-2 flex-1">
                            {getPatologiaIcon(patologia.categoria)}
                            <div>
                              <div className="font-medium text-gray-900">{patologia.nombre}</div>
                              {patologia.categoria && (
                                <Badge variant="outline" className="text-xs ml-2">
                                  {patologia.categoria}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {patologiasSeleccionadas.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-800 mb-2">
                      Patologías seleccionadas para personalización de riesgo:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {patologiasSeleccionadas.map((patologia) => (
                        <Badge
                          key={patologia.id}
                          variant="secondary"
                          className="flex items-center gap-1 pr-1 bg-blue-100 text-blue-800"
                        >
                          {getPatologiaIcon(patologia.categoria)}
                          {patologia.nombre}
                          <button
                            onClick={() => removerPatologia(patologia.id)}
                            className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botón de Análisis */}
              <Button
                onClick={analizarInteracciones}
                disabled={medicamentosSeleccionados.length < 2 || isLoading}
                className="w-full h-12 text-lg font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-r-2 border-white"></div>
                    Analizando Interacciones...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Analizar Interacciones Farmacológicas
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Panel Derecho - Resumen de Riesgo Priorizado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Resumen de Riesgo
              </CardTitle>
              <CardDescription>
                Interacciones detectadas ordenadas por gravedad clínica
              </CardDescription>
            </CardHeader>
            <CardContent>
              {interacciones.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No hay interacciones para mostrar</p>
                  <p className="text-sm">
                    Seleccione al menos 2 medicamentos y haga clic en "Analizar Interacciones"
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {interacciones.map((interaccion, index) => (
                    <div
                      key={interaccion.id}
                      className={`p-4 rounded-lg border ${getGravedadColor(interaccion.gravedad)} ${
                        index === 0 ? 'ring-2 ring-offset-2 ring-red-500' : ''
                      }`}
                    >
                      {/* Encabezado de la interacción */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getGravedadIcon(interaccion.gravedad)}
                          <div>
                            <div className="font-semibold text-sm">
                              {interaccion.medicamentoA.nombreGenerico} + {interaccion.medicamentoB.nombreGenerico}
                            </div>
                            <div className="text-xs opacity-75">
                              {interaccion.medicamentoA.nombreComercial && `${interaccion.medicamentoA.nombreComercial} + `} + 
                              {interaccion.medicamentoB.nombreComercial && `${interaccion.medicamentoB.nombreComercial}`}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getGravedadLabel(interaccion.gravedad)}
                        </Badge>
                      </div>

                      {/* Información clínica esencial */}
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>⚠️ Consecuencia Clínica:</strong> {interaccion.consecuenciaPotencial}
                        </div>
                        
                        <div>
                          <strong>🔬 Mecanismo:</strong> {interaccion.mecanismoAccion}
                        </div>

                        <div>
                          <strong>💊 Efecto Farmacológico:</strong> {interaccion.accionResultante}
                        </div>

                        {/* Evidencia científica */}
                        {interaccion.nivelEvidencia && (
                          <div className="mt-2 p-2 bg-purple-50 rounded border border-purple-200">
                            <strong className="text-purple-800">📚 Nivel de Evidencia:</strong>
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

                        {/* Patologías correlacionadas */}
                        {interaccion.patologiasCorrelacionadas.length > 0 && (
                          <div className="mt-3 p-2 bg-orange-50 rounded border border-orange-200">
                            <strong className="text-orange-800">🏥 Patología Correlacionada:</strong>
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

                        {/* Recomendaciones clínicas prescriptivas */}
                        {interaccion.recomendaciones.length > 0 && (
                          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                            <strong className="text-blue-800">📋 Recomendaciones Clínicas:</strong>
                            {interaccion.recomendaciones.map((rec, index) => (
                              <div key={index} className="mt-2 p-2 bg-white rounded border border-blue-100">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {getTipoManejoIcon(rec.tipoManejo)}
                                    <span className="text-sm font-medium">
                                      {rec.tipoManejo === 'EVITAR_ABSOLUTAMENTE' ? 'EVITAR ABSOLUTAMENTE' :
                                       rec.tipoManejo === 'AJUSTE_DOSIS' ? 'AJUSTAR DOSIS' :
                                       rec.tipoManejo === 'MONITORIZACION_CERCANA' ? 'MONITORIZAR CERCANAMENTE' :
                                       rec.tipoManejo === 'ESPACIAR_ADMINISTRACION' ? 'ESPACIAR ADMINISTRACIÓN' :
                                       rec.tipoManejo === 'EDUCAR_PACIENTE' ? 'EDUCAR PACIENTE' :
                                       rec.tipoManejo === 'CONSULTAR_ESPECIALISTA' ? 'CONSULTAR ESPECIALISTA' :
                                       'MANEJO CLÍNICO'}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPrioridadColor(rec.prioridad)}`}>
                                      {rec.prioridad === 'URGENTE' ? 'URGENTE' :
                                       rec.prioridad === 'IMPORTANTE' ? 'IMPORTANTE' :
                                       'INFORMATIVO'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {rec.responsable.replace('_', ' ')}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-700 mt-2">
                                  <strong>Acción:</strong> {rec.detalleRecomendacion}
                                </div>
                                {rec.tiempoAccion && (
                                  <div className="text-xs text-blue-600 mt-1">
                                    <em>⏰ Tiempo:</em> {rec.tiempoAccion}
                                  </div>
                                )}
                                {rec.parametrosMonitoreo && (
                                  <div className="text-xs text-green-600 mt-1">
                                    <em>📊 Monitorear:</em> {rec.parametrosMonitoreo}
                                  </div>
                                )}
                                {rec.accionAlternativa && (
                                  <div className="text-xs text-purple-600 mt-1">
                                    <em>🔄 Alternativa:</em> {rec.accionAlternativa}
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
                          {interaccion.referenciaFuente && (
                            <div><em>📚 Fuente:</em> {interaccion.referenciaFuente}</div>
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
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="font-semibold text-red-800">Riesgo ALTO (MAYOR)</span>
              </div>
              <p className="text-xs text-gray-600">
                Potencialmente mortal, daño irreversible. Requiere acción inmediata y hospitalización.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <span className="font-semibold text-yellow-800">Riesgo MODERADO</span>
              </div>
              <p className="text-xs text-gray-600">
                Deterioro significativo pero reversible. Requiere ajuste de dosis o monitoreo cercano.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="font-semibold text-green-800">Riesgo BAJO (MENOR)</span>
              </div>
              <p className="text-xs text-gray-600">
                Efectos mínimos manejables. Generalmente no requiere intervención específica.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}