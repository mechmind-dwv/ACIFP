#!/bin/bash

# Script para hacer push al repositorio ACIFP
# Uso: ./push-to-github.sh <TU_TOKEN_DE_GITHUB>

echo "🚀 ACIFP - Sistema de Interacciones Farmacológicas"
echo "📋 Preparando para hacer push al repositorio..."

# Verificar si se proporcionó un token
if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar tu token de GitHub como parámetro"
    echo "Uso: ./push-to-github.sh <TU_TOKEN_DE_GITHUB>"
    echo ""
    echo "📝 Instrucciones:"
    echo "1. Genera un Personal Access Token en GitHub:"
    echo "   - Ve a Settings > Developer settings > Personal access tokens"
    echo "   - Crea un nuevo token con permisos 'repo' y 'workflow'"
    echo "   - Copia el token generado"
    echo ""
    echo "2. Ejecuta este script con tu token:"
    echo "   ./push-to-github.sh ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    echo ""
    exit 1
fi

# Configurar el remote con el token proporcionado
TOKEN="$1"

if [ -n "$TOKEN" ]; then
    echo "❌ No se proporcionó token de GitHub"
    exit 1
fi

echo "🔧 Configurando autenticación con token..."

# Remover el remote existente si lo hay
git remote remove origin 2>/dev/null || true

# Agregar el remote con el token
git remote add origin https://$TOKEN@github.com/mechmind-dwv/ACIFP.git

echo "✅ Remote configurado con token de GitHub"

# Hacer push de los cambios
echo "📤 Empujando cambios al repositorio..."
git push origin master

if [ $? -eq 0 ]; then
    echo "✅ ¡Push exitoso!"
    echo "🌐 Repositorio ACIFP actualizado en GitHub"
    echo ""
    echo "📋 Commit realizado:"
    echo "feat: Implementar interfaz clínica de usabilidad con clasificación de gravedad rigurosa"
    echo ""
    echo "🔗 URL del repositorio:"
    echo "https://github.com/mechmind-dwv/ACIFP"
else
    echo "❌ Error en el push. Verifica el token y los cambios."
    exit 1
fi