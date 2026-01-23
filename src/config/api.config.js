/**
 * Configuración de API para múltiples ambientes
 * 
 * IMPORTANTE: 
 * - Todas las URLs se definen en archivos .env
 * - No hay URLs hardcodeadas en el código
 * - Define VITE_API_BASE_URL en .env.development o .env.production
 * - Define VITE_APP_ENV en .env para especificar el ambiente
 */

// Obtener la URL de la API desde variables de entorno
// OBLIGATORIO: Debe estar definida en .env.development o .env.production
const getApiBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (!apiUrl) {
    console.error('❌ ERROR: VITE_API_BASE_URL no está definida en las variables de entorno');
    console.error('Por favor, define VITE_API_BASE_URL en tu archivo .env');
    throw new Error('VITE_API_BASE_URL no está definida. Verifica tu archivo .env');
  }
  
  return apiUrl;
};

// Determinar el ambiente actual desde variables de entorno
const getCurrentEnvironment = () => {
  return import.meta.env.VITE_APP_ENV || import.meta.env.MODE || 'development';
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

// Detectar si estamos en desarrollo
const isDevelopment = getCurrentEnvironment() === 'development' || import.meta.env.DEV;

// Log de configuración en desarrollo (útil para debugging)
if (isDevelopment) {
  console.log('🔧 Configuración de API:', {
    ambiente: config.environment,
    apiUrl: config.apiBaseUrl,
    source: 'Variables de entorno (.env)'
  });
}

export default config;