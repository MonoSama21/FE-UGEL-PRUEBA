import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Lock, User, LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import type { LoginCredentials } from '../../types'

export const Login = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState(false)

  // Si ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError(null)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login(formData)
      setSuccessMessage(true)
      
      setTimeout(() => {
        navigate('/dashboard', { replace: true })
      }, 500)
      
    } catch (err: any) {
      console.error('Error en login:', err)
      setError(err.message || 'Usuario o contraseña incorrectos')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative" style={{ backgroundImage: "url('/fondo.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Superposición oscura */}
      <div className="absolute inset-0 bg-black bg-opacity-60 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Volver al inicio */}
        <div className="text-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-blue-700 transition-colors duration-300 inline-flex items-center gap-2"
          >
            ← Volver al inicio
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Header institucional UGEL */}
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Logo UGEL" className="mx-auto h-16 w-16 rounded-full bg-white p-2 shadow mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
              Acceso UGEL
            </h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-16 bg-blue-300"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="h-px w-16 bg-blue-300"></div>
            </div>
            <p className="text-gray-600 text-lg">Panel de Monitoreo de Estrategia de Refuerzo Escolar</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3 mb-6">
              <div className="flex-shrink-0">
                <LogIn className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-green-800 font-medium">
                  ¡Bienvenido! Redirigiendo al panel...
                </p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-800 font-medium">
                  Error al iniciar sesión
                </p>
                <p className="text-sm text-red-600 mt-1">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Usuario */}
            <div>
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingrese su usuario UGEL"
                  required
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors bg-gray-50 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors bg-gray-50 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Botón de acceso */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Acceder
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              🔒 Acceso exclusivo para personal UGEL
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
