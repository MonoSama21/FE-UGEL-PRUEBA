# 🔧 Configuración de Variables de Entorno

## 📋 Resumen

Este proyecto está configurado para que **TODAS las URLs y configuraciones se definan únicamente en archivos `.env`**. No hay URLs hardcodeadas en el código fuente.

## ⚠️ Importante

La variable `VITE_API_BASE_URL` es **OBLIGATORIA**. Si no está definida, la aplicación mostrará un error y no funcionará.

## 📁 Archivos de Entorno

### Para Desarrollo Local

1. **`.env.development`** - Usado por defecto cuando ejecutas `npm run dev`
   ```env
   VITE_API_BASE_URL=https://tutorial-git-develop-monosama21s-projects.vercel.app
   VITE_APP_ENV=development
   ```

2. **`.env.local`** (opcional) - Para backend local
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_APP_ENV=development
   ```
   > **Nota:** `.env.local` tiene prioridad sobre `.env.development`

### Para Producción

**`.env.production`** - Usado cuando ejecutas `npm run build`
```env
VITE_API_BASE_URL=https://tutorial-nine-kappa.vercel.app
VITE_APP_ENV=production
```

## 🚀 Para Vercel

Las variables se configuran en dos lugares:

### 1. En `vercel.json` (Recomendado)
```json
{
  "env": {
    "VITE_API_BASE_URL": "https://tutorial-nine-kappa.vercel.app",
    "VITE_APP_ENV": "production"
  },
  "build": {
    "env": {
      "VITE_API_BASE_URL": "https://tutorial-git-develop-monosama21s-projects.vercel.app",
      "VITE_APP_ENV": "development"
    }
  }
}
```

### 2. En el Dashboard de Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las variables y selecciona la rama correspondiente:
   - Para `main`: usa las URLs de producción
   - Para `develop`: usa las URLs de desarrollo

## 🔄 Orden de Prioridad

Vite carga las variables en este orden (mayor prioridad primero):

1. `.env.local` (siempre, excepto en test)
2. `.env.development` o `.env.production` (según el modo)
3. `.env`

## 🛠️ Cómo Cambiar las URLs

### Cambio Temporal (Solo tu máquina)
```bash
# Crea un archivo .env.local
cp .env.local.example .env.local

# Edita .env.local con tus URLs
VITE_API_BASE_URL=http://localhost:3000
```

### Cambio Permanente para Todos
1. **Código fuente:** Edita `.env.development` y `.env.production`
2. **Vercel:** Edita `vercel.json` o las variables en el dashboard
3. Haz commit y push

## 🔍 Verificar la Configuración

Al ejecutar `npm run dev`, verás en la consola del navegador:
```
🔧 Configuración de API:
  ambiente: development
  apiUrl: https://tutorial-git-develop-monosama21s-projects.vercel.app
  source: Variables de entorno (.env)
```

## ❌ Errores Comunes

### Error: "VITE_API_BASE_URL no está definida"
**Solución:** Verifica que tengas el archivo `.env.development` o `.env.production` con la variable definida.

### La API no responde
**Solución:** Verifica que la URL en tu `.env` sea correcta y que el backend esté funcionando.

### Cambios en .env no se reflejan
**Solución:** 
1. Detén el servidor (`Ctrl+C`)
2. Ejecuta nuevamente `npm run dev`
3. Vite no recarga automáticamente los cambios en archivos `.env`

## 📚 Más Información

- [Documentación de Vite sobre variables de entorno](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
