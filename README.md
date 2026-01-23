# 💍 Invitación de Boda - Diter & Vivian

> Aplicación web moderna para invitación de boda con sistema de confirmación de asistencia (RSVP) y panel administrativo.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Status](https://img.shields.io/badge/Status-Production-green)

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

La aplicación estará disponible en `http://localhost:5173`

## 📖 Documentación

- 📘 **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** - Guía de inicio rápido
- 📙 **[DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)** - Guía de deployment en Vercel
- 🔧 **[ENV_CONFIG.md](./ENV_CONFIG.md)** - Configuración de variables de entorno

## ✨ Características

### Para Invitados
- 💌 Formulario de confirmación de asistencia (RSVP)
- ✅ Confirmación de asistencia Sí/No
- 👥 Indicar número de invitados
- 🎵 Sugerir canciones favoritas
- 💬 Dejar mensajes para los novios
- 📱 Diseño completamente responsive

### Para Novios (Dashboard)
- 🔐 Acceso seguro con autenticación JWT
- 📊 Dashboard con estadísticas en tiempo real
- 📋 Lista completa de confirmaciones
- 🔍 Búsqueda y filtros avanzados
- 👁️ Ver detalles completos de cada confirmación
- 📈 Contadores de asistentes

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styles**: Tailwind CSS (si está configurado)
- **Backend**: Node.js + Express (repositorio separado)

## 🔑 Credenciales

### Dashboard de Novios
```
URL: /login
Usuario: diter-vivian
Contraseña: BodaDyV2026!
```

## 🌐 API Endpoints

- **Desarrollo**: https://tutorial-git-develop-monosama21s-projects.vercel.app
- **Producción**: https://tutorial-nine-kappa.vercel.app

### Endpoints Disponibles
- `POST /boda/asistencia` - Crear confirmación (público)
- `POST /auth/login` - Iniciar sesión
- `GET /boda/asistencia` - Obtener confirmaciones (protegido)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── pages/              # Páginas principales
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── sections/           # Secciones de la página
│   │   └── RSVPForm.tsx
│   └── auth/               # Componentes de autenticación
│       └── ProtectedRoute.tsx
├── services/               # Servicios de API
│   ├── apiClient.ts
│   ├── authService.ts
│   └── confirmacionesService.ts
├── context/                # Context API
│   └── AuthContext.tsx
├── types/                  # TypeScript types
│   └── index.ts
└── config/                 # Configuración
    └── api.config.js
```

## 🚀 Deploy en Vercel

### ⚠️ Configuración Obligatoria: Variables de Entorno

**IMPORTANTE:** Este proyecto NO tiene URLs hardcodeadas. Todo se configura mediante archivos `.env`.

**Debes definir estas variables de entorno en Vercel:**

**Rama develop:**
```env
VITE_APP_ENV=development
VITE_API_BASE_URL=https://tutorial-git-develop-monosama21s-projects.vercel.app
```

**Rama main (producción):**
```env
VITE_APP_ENV=production
VITE_API_BASE_URL=https://tutorial-nine-kappa.vercel.app
```

**Para desarrollo local:**
- Copia `.env.example` a `.env.development`
- Modifica las URLs según tu entorno

Para más detalles, consulta [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)

## 🧪 Testing

```bash
npm run build     # Build de prueba
npm run preview   # Preview de producción local
```

## 🔒 Seguridad

- ✅ Autenticación JWT
- ✅ Rutas protegidas con ProtectedRoute
- ✅ Variables de entorno (sin URLs hardcodeadas)
- ✅ Interceptores de Axios para manejo de tokens

## 📝 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo (http://localhost:5173)
npm run build     # Build de producción
npm run preview   # Preview del build local
```

## 🐛 Troubleshooting

**Error: "VITE_API_BASE_URL no está definida"**
- Verifica que `.env.development` o `.env.production` exista
- Consulta [ENV_CONFIG.md](./ENV_CONFIG.md)

**Error de CORS:**
- Verifica que el backend tenga CORS configurado

**Cambios en .env no funcionan:**
- Reinicia el servidor de desarrollo (`Ctrl+C` → `npm run dev`)

---

**Hecho con ❤️ para Diter & Vivian** 💕
