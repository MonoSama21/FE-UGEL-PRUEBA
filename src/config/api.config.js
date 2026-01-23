/**
 * Configuración de API para múltiples ambientes
 * 
 * NOTA IMPORTANTE: 
 * - En producción (rama main), Vercel automáticamente usa MODE=production
 * - Para desarrollo (rama develop), configurar variable de entorno VITE_APP_ENV=development
 * - Las URLs de API se detectan automáticamente según el ambiente
 */

// Detectar ambiente basado en variables de Vite
const isDevelopment = import.meta.env.DEV || import.meta.env.VITE_APP_ENV === 'development';
const isProduction = import.meta.env.PROD || import.meta.env.VITE_APP_ENV === 'production';

// URLs de API según documentación
const API_URLS = {
  development: 'https://tutorial-git-develop-monosama21s-projects.vercel.app',
  production: 'https://tutorial-nine-kappa.vercel.app',
  local: 'http://localhost:3000'
};

// Función para obtener la URL de API correcta
const getApiBaseUrl = () => {
  // Si hay una URL personalizada en variables de entorno, usar esa
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Si estamos en desarrollo local (npm run dev)
  if (isDevelopment && import.meta.env.DEV) {
    return API_URLS.development;
  }

  // Si estamos en producción (build)
  if (isProduction) {
    return API_URLS.production;
  }

  // Por defecto, development
  return API_URLS.development;
};

// Determinar el ambiente actual
const getCurrentEnvironment = () => {
  if (import.meta.env.VITE_APP_ENV) {
    return import.meta.env.VITE_APP_ENV;
  }
  return isProduction ? 'production' : 'development';
};

const config = {
  // URL base de la API (se detecta automáticamente)
  apiBaseUrl: getApiBaseUrl(),
  
  // Ambiente actual
  environment: getCurrentEnvironment(),
  
  // Clave para almacenar el token JWT en localStorage
  tokenKey: 'boda_diter_vivian_token',
  
  // Tiempo de expiración del token
  tokenExpiration: '24h',
  
  // Endpoints de la API
  endpoints: {
    // Autenticación
    login: '/auth/login',
    
    // Confirmaciones de asistencia
    confirmaciones: '/boda/asistencia',
    
    // Información de la API
    root: '/'
  },

  // Configuración de axios
  axiosConfig: {
    timeout: 10000, // 10 segundos
    headers: {
      'Content-Type': 'application/json',
    }
  }
};

// Log de configuración en desarrollo (útil para debugging)
if (isDevelopment) {
  console.log('🔧 Configuración de API:', {
    ambiente: config.environment,
    apiUrl: config.apiBaseUrl,
    isDev: isDevelopment,
    isProd: isProduction
  });
}

export default config;