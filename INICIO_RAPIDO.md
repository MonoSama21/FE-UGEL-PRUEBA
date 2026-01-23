# 🚀 INICIO RÁPIDO - Invitación de Boda Diter & Vivian

## ⚡ Comandos Rápidos

### Primera vez (Setup inicial)

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

### Uso diario

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🌐 URLs Importantes

### Desarrollo Local
- **Home**: http://localhost:5173
- **Login**: http://localhost:5173/login
- **Dashboard**: http://localhost:5173/dashboard

### API Endpoints
- **Desarrollo**: https://tutorial-git-develop-monosama21s-projects.vercel.app
- **Producción**: https://tutorial-nine-kappa.vercel.app

## 🔑 Credenciales de Prueba

### Dashboard de Novios
```
Usuario: diter-vivian
Contraseña: BodaDyV2026!
```

## 📱 Flujo de Usuario

### 1. Invitado visita la página
```
/ → Invitación de boda → Scroll a formulario RSVP → Confirma asistencia
```

### 2. Novios revisan confirmaciones
```
/login → Inicia sesión → /dashboard → Ve lista de confirmaciones
```

## 🛠️ Estructura del Proyecto

```
src/
├── components/
│   ├── pages/
│   │   ├── Home.tsx          # Página principal
│   │   ├── Login.tsx         # Login de novios
│   │   └── Dashboard.tsx     # Dashboard de confirmaciones
│   ├── sections/
│   │   └── RSVPForm.tsx      # Formulario de confirmación
│   └── auth/
│       └── ProtectedRoute.tsx # Protección de rutas
├── services/
│   ├── authService.ts        # Servicio de autenticación
│   └── confirmacionesService.ts # Servicio de confirmaciones
├── context/
│   └── AuthContext.tsx       # Estado global de auth
└── types/
    └── index.ts              # Tipos TypeScript
```

## 🔧 Configuración Rápida

### Variables de Entorno

Crear archivo `.env.development`:

```env
VITE_APP_ENV=development
VITE_API_BASE_URL=https://tutorial-git-develop-monosama21s-projects.vercel.app
```

## 📦 Deploy en Vercel

### Setup Rápido

1. **Conectar repositorio a Vercel**
   - Ve a vercel.com
   - Importa tu repositorio
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

2. **Configurar variables de entorno en Vercel**
   
   **Para develop:**
   ```
   VITE_APP_ENV = development
   VITE_API_BASE_URL = https://tutorial-git-develop-monosama21s-projects.vercel.app
   ```
   
   **Para main (producción):**
   ```
   VITE_APP_ENV = production
   VITE_API_BASE_URL = https://tutorial-nine-kappa.vercel.app
   ```

3. **Deploy**
   ```bash
   git push origin develop  # Deploy preview
   git push origin main     # Deploy producción
   ```

## 🐛 Troubleshooting Rápido

### Error: "Module not found"
```bash
npm install
```

### Error: "Cannot find axios"
```bash
npm install axios lucide-react
```

### Error de CORS
- Verifica que el backend esté corriendo
- Verifica la URL de API en `.env.development`

### Token expirado
- Cierra sesión y vuelve a iniciar
- El token expira después de 24 horas

## ✅ Checklist de Funcionalidades

### Página Principal (/)
- [ ] Se muestra la invitación
- [ ] Formulario RSVP funciona
- [ ] Se pueden enviar confirmaciones
- [ ] Validación de campos funciona

### Login (/login)
- [ ] Se puede iniciar sesión
- [ ] Credenciales incorrectas muestran error
- [ ] Redirecciona a dashboard después de login

### Dashboard (/dashboard)
- [ ] Muestra todas las confirmaciones
- [ ] Estadísticas son correctas
- [ ] Búsqueda funciona
- [ ] Filtros funcionan
- [ ] Modal de detalles funciona
- [ ] Logout funciona

## 🎯 Testing Rápido

```bash
# 1. Iniciar desarrollo
npm run dev

# 2. Abrir navegador en http://localhost:5173

# 3. Probar formulario RSVP
- Ir a la página principal
- Llenar formulario
- Verificar que se envía correctamente

# 4. Probar login
- Ir a /login
- Usuario: diter-vivian
- Contraseña: BodaDyV2026!
- Verificar que redirecciona a dashboard

# 5. Probar dashboard
- Verificar que se muestran las confirmaciones
- Probar búsqueda
- Probar filtros
- Ver detalles de una confirmación
- Cerrar sesión
```

## 📚 Documentación Completa

- **README_IMPLEMENTACION.md** - Documentación técnica completa
- **DEPLOY_GUIDE.md** - Guía de deployment en Vercel
- **RESUMEN_IMPLEMENTACION.md** - Resumen de lo implementado

## 🆘 Ayuda Rápida

### Ver logs en desarrollo
Abre la consola del navegador (F12) y verás:
```
🔧 Configuración de API:
  ambiente: development
  apiUrl: https://tutorial-git-develop-monosama21s-projects.vercel.app
```

### Verificar build
```bash
npm run build
```

### Limpiar y reinstalar
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎊 ¡Listo para usar!

Tu aplicación está lista con:
- ✅ Frontend completo
- ✅ Integración con API
- ✅ Autenticación JWT
- ✅ Dashboard de confirmaciones
- ✅ Multi-ambiente (dev/prod)

**¡Disfruta la boda de Diter y Vivian!** 💕

---

💡 **Tip**: Para más detalles, consulta los otros archivos de documentación en la raíz del proyecto.
