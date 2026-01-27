/**
 * Formulario de confirmación de asistencia (RSVP)
 * Permite a los invitados confirmar su asistencia a la boda
 */

import { useState } from 'react';
import { Music, Send, UserCheck, CheckCircle, AlertCircle } from 'lucide-react';
import { confirmacionesService } from '../../services/confirmacionesService';
import type { ConfirmacionInput } from '../../types';

export const RSVPForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<ConfirmacionInput>({
    nombre_completo: '',
    correo_electronico: '',
    telefono: '',
    asistira: true,
    numero_invitados: 1,
    cancion_favorita: '',
    mensaje: ''
  });

  /**
   * Manejar cambios en los inputs
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
    
    // Limpiar mensajes al escribir
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  /**
   * Manejar cambio en el radio de asistencia
   */
  const handleAttendanceChange = (willAttend: boolean) => {
    setFormData(prev => ({
      ...prev,
      asistira: willAttend,
      // Si no asiste, poner número de invitados en 0
      numero_invitados: willAttend ? prev.numero_invitados || 1 : 0
    }));
  };

  /**
   * Validar formulario
   */
  const validateForm = (): string | null => {
    if (!formData.nombre_completo.trim()) {
      return 'El nombre completo es requerido';
    }
    if (formData.nombre_completo.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres';
    }
    if (!formData.correo_electronico.trim()) {
      return 'El correo electrónico es requerido';
    }
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo_electronico)) {
      return 'El formato del correo electrónico no es válido';
    }
    if (formData.asistira && formData.numero_invitados < 1) {
      return 'Debe haber al menos 1 invitado si asistes';
    }
    return null;
  };

  /**
   * Manejar submit del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validar formulario
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos para enviar (sin campos vacíos opcionales)
      const dataToSend: ConfirmacionInput = {
        nombre_completo: formData.nombre_completo.trim(),
        correo_electronico: formData.correo_electronico.trim(),
        asistira: formData.asistira,
        numero_invitados: formData.numero_invitados,
      };

      // Agregar campos opcionales solo si tienen valor
      if (formData.telefono?.trim()) {
        dataToSend.telefono = formData.telefono.trim();
      }
      if (formData.cancion_favorita?.trim()) {
        dataToSend.cancion_favorita = formData.cancion_favorita.trim();
      }
      if (formData.mensaje?.trim()) {
        dataToSend.mensaje = formData.mensaje.trim();
      }

      const response = await confirmacionesService.crearConfirmacion(dataToSend);

      if (response.success) {
        setSuccess(true);
        // Resetear formulario
        setFormData({
          nombre_completo: '',
          correo_electronico: '',
          telefono: '',
          asistira: true,
          numero_invitados: 1,
          cancion_favorita: '',
          mensaje: ''
        });
        
        // Scroll al mensaje de éxito
        setTimeout(() => {
          document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        setError('message' in response ? response.message : 'Error al enviar la confirmación');
      }
    } catch (err: any) {
      console.error('Error al enviar confirmación:', err);
      setError('Error al enviar la confirmación. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <UserCheck className="w-16 h-16 mx-auto text-gold-500 mb-6" />
          <h2 className="text-5xl md:text-6xl font-bold text-gold-600 mb-4">
            Confirma tu Asistencia
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6 mb-8">
            <div className="h-px w-20 bg-gold-300"></div>
            <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
            <div className="h-px w-20 bg-gold-300"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu presencia es el mejor regalo. Por favor confirma tu asistencia antes del 1 de Mayo de 2026
          </p>
        </div>

        {/* Mensaje de éxito */}
        {success && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  ¡Confirmación enviada exitosamente!
                </h3>
                <p className="text-green-800">
                  Gracias por confirmar tu asistencia. {formData.asistira 
                    ? '¡Nos vemos en la boda! 💕' 
                    : 'Lamentamos que no puedas asistir. ¡Te extrañaremos!'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8 animate-fade-in">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-2">
                  Error al enviar confirmación
                </h3>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gold-50 to-gold-100 p-8 md:p-12 rounded-3xl shadow-2xl"
        >
          <div className="space-y-6">
            {/* Nombre Completo */}
            <div>
              <label htmlFor="nombre_completo" className="block text-gray-700 font-semibold mb-2">
                Nombre Completo <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                id="nombre_completo"
                name="nombre_completo"
                value={formData.nombre_completo}
                onChange={handleChange}
                placeholder="Juan Pérez García"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors bg-white disabled:opacity-50"
              />
            </div>

            {/* Email y Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="correo_electronico" className="block text-gray-700 font-semibold mb-2">
                  Correo Electrónico <span className="text-gold-500">*</span>
                </label>
                <input
                  type="email"
                  id="correo_electronico"
                  name="correo_electronico"
                  value={formData.correo_electronico}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors bg-white disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-gray-700 font-semibold mb-2">
                  Teléfono <span className="text-gray-400">(Opcional)</span>
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono || ''}
                  onChange={handleChange}
                  placeholder="+51 987 654 321"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors bg-white disabled:opacity-50"
                />
              </div>
            </div>

            {/* ¿Asistirás? */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                ¿Asistirás a nuestra boda? <span className="text-gold-500">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleAttendanceChange(true)}
                  disabled={isSubmitting}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                    formData.asistira
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-400'
                  } disabled:opacity-50`}
                >
                  ✓ Sí, asistiré
                </button>
                <button
                  type="button"
                  onClick={() => handleAttendanceChange(false)}
                  disabled={isSubmitting}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                    !formData.asistira
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-400'
                  } disabled:opacity-50`}
                >
                  ✗ No podré asistir
                </button>
              </div>
            </div>

            {/* Número de Invitados (solo si asiste) */}
            {formData.asistira && (
              <div>
                <label htmlFor="numero_invitados" className="block text-gray-700 font-semibold mb-2">
                  Número de Personas (Incluyéndote) <span className="text-gold-500">*</span>
                </label>
                <input
                  type="number"
                  id="numero_invitados"
                  name="numero_invitados"
                  value={formData.numero_invitados}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors bg-white disabled:opacity-50"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Por favor indica cuántas personas asistirán en total (tú + acompañantes)
                </p>
              </div>
            )}

            {/* Canción Favorita (solo si asiste) */}
            {formData.asistira && (
              <div>
                <label htmlFor="cancion_favorita" className="block text-gray-700 font-semibold mb-2">
                  Canción Favorita <span className="text-gray-400">(Opcional)</span>
                </label>
                <input
                  type="text"
                  id="cancion_favorita"
                  name="cancion_favorita"
                  value={formData.cancion_favorita || ''}
                  onChange={handleChange}
                  placeholder="Bailando - Enrique Iglesias"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors bg-white disabled:opacity-50"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Comparte tu canción favorita y la incluiremos en la fiesta 🎵
                </p>
              </div>
            )}

            {/* Mensaje */}
            <div>
              <label htmlFor="mensaje" className="block text-gray-700 font-semibold mb-2">
                Mensaje para los Novios <span className="text-gray-400">(Opcional)</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje || ''}
                onChange={handleChange}
                placeholder="Escribe tus felicitaciones o un mensaje especial..."
                rows={4}
                maxLength={500}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none transition-colors bg-white resize-none disabled:opacity-50"
              />
              <p className="mt-2 text-sm text-gray-600 text-right">
                {formData.mensaje?.length || 0} / 500 caracteres
              </p>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando Confirmación...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Confirmación
                </>
              )}
            </button>
          </div>
        </form>

        {/* Nota al pie */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Tus datos están protegidos y solo serán usados para la organización de la boda
        </p>
      </div>
    </section>
  );
};
