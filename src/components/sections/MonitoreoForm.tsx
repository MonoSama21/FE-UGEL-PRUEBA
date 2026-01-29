import React, { useState } from 'react';

const initialForm = {
  // I. DATOS GENERALES DE LA IE
  nombreIE: '',
  nivel: '',
  codigoModular: Array(7).fill(''),
  region: '',
  ugel: '',
  // II. DATOS DEL DIRECTOR
  directorNombres: '',
  directorApellidos: '',
  directorDni: '',
  directorTelefono: '',
  directorCorreo: '',
  // III. DATOS DEL ESPECIALISTA
  especialistaNombres: '',
  especialistaApellidos: '',
  especialistaDni: '',
  fechaAplicacion: '',
  horaInicio: '',
  horaFin: '',
  // Calificaciones (1-4 estrellas)
  calificaciones: {},
  // Observaciones y compromisos
  observaciones: '',
  compromisoDirector: '',
  compromisoEspecialista: '',
  confirmacionDatos: false,
  confirmacionRecomendaciones: false,
};

const preguntas = [
  {
    id: 'p1',
    texto:
      'El director cuenta con INFORMACIÓN SISTEMATIZADA sobre los niveles de logro de aprendizaje de los estudiantes a partir de la evaluación diagnóstica aplicada por la IE y plantea estrategia para promover el progreso de los estudiantes en el desarrollo de sus competencias.',
  },
  // ...agrega aquí las demás preguntas siguiendo el mismo formato...
];

export const MonitoreoForm = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('codigoModular')) {
      const idx = parseInt(name.replace('codigoModular', ''));
      if (!isNaN(idx) && /^[0-9]?$/.test(value)) {
        setForm((prev) => {
          const nuevoCodigo = [...prev.codigoModular];
          nuevoCodigo[idx] = value;
          return { ...prev, codigoModular: nuevoCodigo };
        });
        // Autoavance si se ingresa un dígito válido
        if (value.length === 1 && idx < 6) {
          const nextInput = document.querySelector(`input[name='codigoModular${idx + 1}']`);
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleCalificacion = (id, value) => {
    setForm((prev) => ({
      ...prev,
      calificaciones: { ...prev.calificaciones, [id]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos
    alert('Formulario enviado (solo frontend)');
  };

  return (
    <div className="relative py-12 px-2 md:px-0">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo.jpg')" }}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-black bg-opacity-60"></div>
      </div>
      <section className="relative z-10 max-w-3xl mx-auto my-10 p-6 bg-white bg-opacity-95 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-tight">Ficha de Monitoreo UGEL</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* I. DATOS GENERALES DE LA IE */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">I. Datos Generales de la IE</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombreIE" className="block text-sm font-medium text-gray-700 mb-1">Número y/o nombre de la Institución Educativa</label>
            <input id="nombreIE" name="nombreIE" value={form.nombreIE} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          
          <div>
            <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
            <select
              id="nivel"
              name="nivel"
              value={form.nivel}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Seleccione el nivel</option>
              <option value="Inicial">Inicial</option>
              <option value="Primaria">Primaria</option>
              <option value="Secundaria">Secundaria</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código Modular (7 dígitos)</label>
            <div className="flex gap-2">
              {form.codigoModular.map((digito, idx) => (
                <input
                  key={idx}
                  name={`codigoModular${idx}`}
                  value={digito}
                  onChange={handleChange}
                  required
                  maxLength={1}
                  pattern="[0-9]"
                  inputMode="numeric"
                  className="border border-gray-300 rounded-lg px-2 py-2 w-10 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Región</label>
            <input id="region" name="region" value={form.region} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="ugel" className="block text-sm font-medium text-gray-700 mb-1">UGEL</label>
            <input id="ugel" name="ugel" value={form.ugel} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        {/* II. DATOS DEL DIRECTOR */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">II. Datos del Director</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="directorNombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres completos</label>
            <input id="directorNombres" name="directorNombres" value={form.directorNombres} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="directorApellidos" className="block text-sm font-medium text-gray-700 mb-1">Apellidos completos</label>
            <input id="directorApellidos" name="directorApellidos" value={form.directorApellidos} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="directorDni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
            <input id="directorDni" name="directorDni" value={form.directorDni} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="directorTelefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input id="directorTelefono" name="directorTelefono" value={form.directorTelefono} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="directorCorreo" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input id="directorCorreo" name="directorCorreo" value={form.directorCorreo} onChange={handleChange} required type="email" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        {/* III. DATOS DEL ESPECIALISTA */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">III. Datos del Especialista</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="especialistaNombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres completos del especialista</label>
            <input id="especialistaNombres" name="especialistaNombres" value={form.especialistaNombres} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="especialistaApellidos" className="block text-sm font-medium text-gray-700 mb-1">Apellidos completos del especialista</label>
            <input id="especialistaApellidos" name="especialistaApellidos" value={form.especialistaApellidos} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="especialistaDni" className="block text-sm font-medium text-gray-700 mb-1">DNI del especialista</label>
            <input id="especialistaDni" name="especialistaDni" value={form.especialistaDni} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="fechaAplicacion" className="block text-sm font-medium text-gray-700 mb-1">Fecha de aplicación</label>
            <input id="fechaAplicacion" name="fechaAplicacion" value={form.fechaAplicacion} onChange={handleChange} required type="date" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700 mb-1">Hora de inicio</label>
            <input id="horaInicio" name="horaInicio" value={form.horaInicio} onChange={handleChange} required type="time" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="horaFin" className="block text-sm font-medium text-gray-700 mb-1">Hora de fin</label>
            <input id="horaFin" name="horaFin" value={form.horaFin} onChange={handleChange} required type="time" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        {/* Calificaciones por estrellas */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">IV. Calificación de Estrategias</h3>
        <div className="space-y-6">
          {preguntas.map((p) => (
            <div key={p.id} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="block mb-2 font-medium text-gray-700">{p.texto}</label>
              <div className="flex gap-2 items-center">
                {[1, 2, 3, 4].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`text-3xl transition ${form.calificaciones[p.id] >= star ? 'text-yellow-400 scale-110' : 'text-gray-300 hover:text-yellow-300'}`}
                    onClick={() => handleCalificacion(p.id, star)}
                    aria-label={`Calificar con ${star} estrellas`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Observaciones y compromisos */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">V. Observaciones/Sugerencias</h3>
        <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">Observaciones o sugerencias</label>
        <textarea id="observaciones" name="observaciones" value={form.observaciones} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" rows={2} />
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">VI. Compromisos</h3>
        <div className="mb-2">
          <label htmlFor="compromisoDirector" className="block text-sm font-medium text-gray-700 mb-1">Compromiso del Director</label>
          <input id="compromisoDirector" name="compromisoDirector" value={form.compromisoDirector} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label htmlFor="compromisoEspecialista" className="block text-sm font-medium text-gray-700 mb-1">Compromiso del Especialista</label>
          <input id="compromisoEspecialista" name="compromisoEspecialista" value={form.compromisoEspecialista} onChange={handleChange} className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        {/* Confirmaciones */}
        <div className="mt-4 space-y-2">
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" name="confirmacionDatos" checked={form.confirmacionDatos} onChange={handleChange} required className="accent-blue-600 w-5 h-5" />
            <span>Tengo conocimiento pleno que los datos reportados y procesados son y/o están precisos a la verdad</span>
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" name="confirmacionRecomendaciones" checked={form.confirmacionRecomendaciones} onChange={handleChange} required className="accent-blue-600 w-5 h-5" />
            <span>Acepto las recomendaciones y/o sugerencias del informe y/o ficha realizada.</span>
          </label>
        </div>
        <button type="submit" className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition">Enviar</button>
      </form>
      </section>
    </div>
  );
};

// Puedes agregar más preguntas al array "preguntas" según el detalle proporcionado en el requerimiento.
// Asegúrate de tener estilos para la clase "input" o usa clases de Tailwind para inputs.
