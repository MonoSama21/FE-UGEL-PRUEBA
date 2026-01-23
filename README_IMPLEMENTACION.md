# 🎉 Aplicación de Invitación de Boda - Diter & Vivian

Aplicación web moderna para invitación de boda con confirmación de asistencia (RSVP) y panel de administración para los novios.

## ✨ Características

- 📱 **Diseño Responsive** - Funciona perfectamente en móviles, tablets y desktop
- 💌 **Formulario RSVP** - Los invitados pueden confirmar su asistencia fácilmente
- 🔐 **Panel de Administración** - Los novios pueden ver todas las confirmaciones
- 🎨 **Interfaz Elegante** - Diseño hermoso con Tailwind CSS
- 🚀 **Alto Rendimiento** - Construido con React + Vite
- 🔒 **Autenticación Segura** - Sistema de login con JWT
- 🌍 **Multi-Ambiente** - Configuración automática para desarrollo y producción

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router DOM
- **Estilos**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Iconos**: Lucide React
- **Backend API**: Node.js + Express (repositorio separado)

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx      # Componente de ruta protegida
│   ├── pages/
│   │   ├── Home.tsx                # Página principal con invitación
│   │   ├── Login.tsx               # Página de login para novios
│   │   └── Dashboard.tsx           # Dashboard de confirmaciones
│   └── sections/
│       ├── Hero.tsx                # Sección hero
│       ├── RSVPForm.tsx            # Formulario de confirmación
│       ├── WeddingDetails.tsx      # Detalles de la boda
│       └── ...                     # Otras secciones
├── context/
│   └── AuthContext.tsx             # Contexto de autenticación
├── services/
│   ├── apiClient.ts                # Cliente HTTP configurado
│   ├── authService.ts              # Servicio de autenticación
│   └── confirmacionesService.ts    # Servicio de confirmaciones
├── types/
│   └── index.ts                    # TypeScript types e interfaces
├── config/
│   └── api.config.js               # Configuración de API multi-ambiente
├── App.jsx                         # Componente principal
└── main.jsx                        # Punto de entrada
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd FRONTDESDECERO
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.example .env.development
```

Edita `.env.development`:

```env
VITE_APP_ENV=development
VITE_API_BASE_URL=https://tutorial-git-develop-monosama21s-projects.vercel.app
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 5. Construir para producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

## 🌐 Deployment en Vercel

### Configuración para Múltiples Ambientes

Este proyecto está configurado para trabajar con dos ramas:

- **`develop`** → API de desarrollo
- **`main`** → API de producción

### Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes variables:

**Para rama `develop`:**
```
VITE_APP_ENV = development
VITE_API_BASE_URL = https://tutorial-git-develop-monosama21s-projects.vercel.app
```

**Para rama `main` (producción):**
```
VITE_APP_ENV = production
VITE_API_BASE_URL = https://tutorial-nine-kappa.vercel.app
```

### Deploy Automático

1. Conecta tu repositorio con Vercel
2. Configura las ramas:
   - Production Branch: `main`
   - Preview Branches: `develop` y todas las demás
3. Cada push a `develop` o `main` desplegará automáticamente

## 🔑 Credenciales de Acceso

### Panel de Administración

Para acceder al dashboard de confirmaciones, usa:

```
URL: /login
Usuario: diter-vivian
Contraseña: BodaDyV2026!
```

**IMPORTANTE**: Estas credenciales están configuradas en el backend. No las cambies aquí.

## 📡 API Endpoints

La aplicación consume los siguientes endpoints:

### Público

- `POST /boda/asistencia` - Crear confirmación de asistencia

### Protegido (requiere autenticación)

- `POST /auth/login` - Iniciar sesión
- `GET /boda/asistencia` - Obtener todas las confirmaciones

## 🎨 Personalización

### Cambiar Colores

Edita el archivo `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      rose: {
        // Colores personalizados
      }
    }
  }
}
```

### Modificar Contenido

Los textos y contenido están en los componentes de `src/components/sections/`

## 📱 Funcionalidades

### Para Invitados

1. Ver información de la boda
2. Confirmar asistencia mediante formulario
3. Indicar número de invitados
4. Sugerir canciones favoritas
5. Dejar mensajes para los novios

### Para Novios (Dashboard)

1. Ver lista completa de confirmaciones
2. Filtrar por asistencia (sí/no)
3. Buscar por nombre, email o teléfono
4. Ver estadísticas en tiempo real:
   - Total de confirmaciones
   - Número de asistentes
   - Número de no asistentes
   - Total de invitados
5. Ver detalles completos de cada confirmación

## 🔒 Seguridad

- Autenticación JWT
- Rutas protegidas con `ProtectedRoute`
- Token almacenado en localStorage
- Interceptores de Axios para manejo automático de tokens
- Redirección automática en caso de token expirado

## 🐛 Debugging

### Ver configuración actual

Abre la consola del navegador. En desarrollo, verás logs como:

```
🔧 Configuración de API:
  ambiente: development
  apiUrl: https://tutorial-git-develop-monosama21s-projects.vercel.app
  isDev: true
  isProd: false
```

### Problemas comunes

#### 1. Error de CORS

Asegúrate de que el backend tenga CORS configurado correctamente.

#### 2. Token expirado

El token JWT expira después de 24 horas. Cierra sesión y vuelve a iniciar.

#### 3. API no responde

Verifica que la URL de la API sea correcta en tu archivo `.env`

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de la build de producción
npm run preview

# Lint
npm run lint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y está bajo licencia MIT.

## 👥 Autores

- **Desarrollo Frontend** - Tu Nombre
- **Diseño** - Tu Nombre

## 🎊 Agradecimientos

¡Felicidades a Diter y Vivian por su boda! 💕

---

Hecho con ❤️ para una ocasión especial
