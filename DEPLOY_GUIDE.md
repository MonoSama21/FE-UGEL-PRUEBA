# 📋 Guía de Configuración Git & Vercel

## 🌿 Configuración de Ramas Git

### 1. Verificar rama actual

```bash
git branch
```

### 2. Crear rama develop (si no existe)

```bash
# Crear y cambiar a la rama develop
git checkout -b develop

# Subir la rama al repositorio remoto
git push -u origin develop
```

### 3. Estructura de ramas

Tu repositorio debe tener dos ramas principales:

- **`main`** → Producción (API: https://tutorial-nine-kappa.vercel.app)
- **`develop`** → Desarrollo (API: https://tutorial-git-develop-monosama21s-projects.vercel.app)

### 4. Workflow de desarrollo

```bash
# Trabajar en develop
git checkout develop
git add .
git commit -m "feat: nueva funcionalidad"
git push origin develop

# Cuando esté listo para producción, hacer merge a main
git checkout main
git merge develop
git push origin main
```

## 🚀 Configuración en Vercel

### Paso 1: Importar Proyecto

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importa tu repositorio desde GitHub/GitLab/Bitbucket
4. Selecciona el repositorio `FRONTDESDECERO`

### Paso 2: Configurar Build Settings

Vercel debería detectar automáticamente que es un proyecto Vite. Verifica:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Paso 3: Configurar Variables de Entorno

#### Para Producción (rama main)

1. Settings → Environment Variables
2. Agrega estas variables y selecciona **Production**:

```
VITE_APP_ENV = production
VITE_API_BASE_URL = https://tutorial-nine-kappa.vercel.app
```

#### Para Desarrollo (rama develop)

1. Agrega las mismas variables pero selecciona **Preview (develop)**:

```
VITE_APP_ENV = development
VITE_API_BASE_URL = https://tutorial-git-develop-monosama21s-projects.vercel.app
```

### Paso 4: Configurar Ramas

1. Settings → Git
2. **Production Branch**: `main`
3. Habilita **Automatic Deployments** para ambas ramas

### Paso 5: Deploy

Una vez configurado, cada push activará un deployment:

- Push a `develop` → Deploy de preview (ambiente desarrollo)
- Push a `main` → Deploy de producción

### URLs de Deploy

Después del primer deploy, tendrás URLs como:

- **Producción**: `https://tu-proyecto.vercel.app`
- **Preview (develop)**: `https://tu-proyecto-git-develop-tu-usuario.vercel.app`

## 🔄 Proceso de Deploy Típico

### Desarrollo

```bash
# 1. Trabajar en develop
git checkout develop

# 2. Hacer cambios
# ... editar archivos ...

# 3. Commit y push
git add .
git commit -m "feat: descripción del cambio"
git push origin develop

# 4. Vercel automáticamente desplegará a preview
# 5. Verifica el deploy en la URL de preview
```

### Producción

```bash
# 1. Asegurarse de estar en develop actualizado
git checkout develop
git pull origin develop

# 2. Cambiar a main
git checkout main
git pull origin main

# 3. Hacer merge de develop
git merge develop

# 4. Subir a producción
git push origin main

# 5. Vercel automáticamente desplegará a producción
```

## ⚙️ Configuración Avanzada

### Ignorar archivos sensibles

Asegúrate de que `.env.development` y `.env.production` estén en `.gitignore`:

```bash
# .gitignore
.env
.env.local
.env.development
.env.production
```

### Redeployar manualmente en Vercel

1. Ve a tu proyecto en Vercel
2. Click en "Deployments"
3. Selecciona un deployment
4. Click en "Redeploy"

### Ver logs de build

1. Deployments → Selecciona un deployment
2. Click en "View Build Logs"
3. Revisa los logs para debugging

## 🔍 Verificar Configuración

### En tu computadora local

```bash
# Ver la configuración actual
npm run dev

# En la consola del navegador deberías ver:
# 🔧 Configuración de API:
#   ambiente: development
#   apiUrl: https://tutorial-git-develop-monosama21s-projects.vercel.app
```

### En Vercel Deploy

1. Abre tu deploy en Vercel
2. Abre la consola del navegador (F12)
3. Deberías ver el log de configuración

## ❗ Troubleshooting

### Problema: Variables de entorno no se aplican

**Solución**: Redeploy después de cambiar variables

```bash
# Forzar un nuevo deploy
git commit --allow-empty -m "chore: trigger redeploy"
git push
```

### Problema: CORS error en producción

**Solución**: Verifica que el backend tenga la URL de Vercel en la whitelist de CORS

### Problema: Build falla en Vercel

**Solución**: 
1. Revisa los logs de build en Vercel
2. Verifica que `package.json` tenga todas las dependencias
3. Asegúrate de que el build funcione localmente: `npm run build`

### Problema: API no responde

**Solución**: Verifica que la URL de la API sea correcta:
1. Settings → Environment Variables
2. Verifica `VITE_API_BASE_URL`
3. Prueba la URL en Postman o el navegador

## 📱 Testing

### Antes de hacer merge a main

1. **Deploy en develop**: Verifica que el deploy de develop funcione
2. **Test funcionalidades**:
   - [ ] Formulario RSVP funciona
   - [ ] Login funciona
   - [ ] Dashboard muestra confirmaciones
   - [ ] Logout funciona
   - [ ] Rutas protegidas funcionan
3. **Verifica en dispositivos móviles**
4. **Check performance con Lighthouse**

### Después de deploy a producción

1. Verifica la URL de producción
2. Realiza pruebas completas
3. Monitorea los logs de Vercel por errores

## 🎯 Checklist Final

Antes de considerar el deploy completo:

- [ ] Ambas ramas (develop y main) existen
- [ ] Variables de entorno configuradas en Vercel
- [ ] Deploy automático activado
- [ ] Primer deploy exitoso en develop
- [ ] Primer deploy exitoso en main (producción)
- [ ] Formulario RSVP funciona correctamente
- [ ] Login y Dashboard funcionan
- [ ] API responde correctamente desde ambos ambientes
- [ ] URLs personalizadas configuradas (opcional)
- [ ] DNS configurado (si aplica)

## 🎉 ¡Listo!

Tu aplicación está ahora configurada con:
✅ Git flow de desarrollo → producción
✅ Deploy automático en Vercel
✅ Ambientes separados (dev/prod)
✅ Variables de entorno correctas

---

**Próximos pasos**: Comparte las URLs con los novios y ¡disfruta la boda! 💕
