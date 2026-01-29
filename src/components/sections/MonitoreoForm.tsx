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
    texto: '¿La I.E ha incluido en el PAT las acciones para implementar RE en el presente año?',
    tipo: 'radio',
    opciones: ['Sí', 'No'],
  },
  {
    id: 'p2',
    texto: '¿La I.E ha establecido el horario para implementar las acciones del RE?',
    tipo: 'radio',
    opciones: ['Sí', 'No'],
  },
  {
    id: 'p3',
    texto: 'Con relación al establecimiento de horarios destinados para RE, la mayoría de las veces, ¿En qué momento se desarrollan las actividades de RE con los estudiantes?',
    tipo: 'radio',
    opciones: ['Dentro del horario regular', 'Fuera del horario regular'],
  },
  {
    id: 'p4',
    texto: '¿Cuál de las siguientes acciones caracterizan la aplicación de las sesiones de refuerzo escolar a cargo de los docentes de las áreas de comunicación y matemática? NOTA: Puede marcar más de una opción',
    tipo: 'checkbox',
    opciones: [
      'Participación de los estudiantes en acciones de retroalimentación',
      'Desarrollo de trabajos colaborativos o de estudio independiente de los estudiantes',
      'Desarrollo de actividades organizadas en un portafolio físico o virtual del estudiante',
      'Otro(s)',
    ],
  },
  {
    id: 'p5',
    texto: '¿La I.E ha recibido acciones de fortalecimiento en el marco de RE?',
    tipo: 'radio',
    opciones: ['Sí', 'No'],
  },
  {
    id: 'p6',
    texto: 'En el último mes: ¿Qué acciones de fortalecimiento ha recibo en relación a refuerzo escolar? NOTA: puede marcar más de una opción',
    tipo: 'checkbox',
    opciones: [
      'Talleres o jornadas técnicas',
      'Reuniones de trabajado colegiado',
      'Visitas de asesoría',
      'Grupos de Interaprendizaje',
      'Otro(s)'
    ],
  },
  {
    id: 'p7',
    texto: '¿Quién o quiénes le han brindado las acciones de fortalecimiento? NOTA: Puede marcar más de una opción',
    tipo: 'checkbox',
    opciones: [
      'Especialista Minedu (Webinar)',
      'Especialista DRE/UGEL',
      'Asesor pedagógico',
      'Otro(s)',
    ],
  },
  {
    id: 'p8',
    texto: '¿La I.E ha realizado acciones de fortalecimiento a sus docentes en el marco de RE?',
    tipo: 'radio',
    opciones: ['Sí', 'No'],
  },
  {
    id: 'p9',
    texto: 'En el último mes ¿Qué acciones de fortalecimiento ha realizado a sus docentes en relación a RE? NOTA: puede marcar más de una opción',
    tipo: 'checkbox',
    opciones: [
      'Talleres o jornadas técnicas',
      'Reuniones de trabajo colegiado',
      'Visitas de asesoría',
      'Grupos de Interaprendizaje',
      'Otro(s)'
    ],
  },
  {
    id: 'p10',
    texto: '¿Quién o quiénes han realizado las acciones de fortalecimiento, en el marco de RE? NOTA: Puede marcar más de una opción',
    tipo: 'checkbox',
    opciones: [
      'Director',
      'Subdirector',
      'Coordinador',
      'Docente que hace las veces de asesor pedagógico',
      'Otro(s)',
    ],
  },
];



export const MonitoreoForm = () => {
  const [form, setForm] = useState({
    ...initialForm,
    respuestas: {}, // { p1: { opcion: '', observacion: '' }, ... }
  });

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
        if (value.length === 1 && idx < 6) {
          const nextInput = document.querySelector(`input[name='codigoModular${idx + 1}']`);
          if (nextInput) {
            nextInput.focus();
          }
        }
      }
    } else if (name.startsWith('opcion-')) {
      const pid = name.replace('opcion-', '');
      const pregunta = preguntas.find(q => q.id === pid);
      if (pregunta?.tipo === 'checkbox') {
        setForm((prev) => {
          const prevSeleccion = prev.respuestas?.[pid]?.opcion || [];
          let nuevaSeleccion = [];
          if (checked) {
            nuevaSeleccion = [...prevSeleccion, value];
          } else {
            nuevaSeleccion = prevSeleccion.filter((v) => v !== value);
          }
          return {
            ...prev,
            respuestas: {
              ...prev.respuestas,
              [pid]: {
                ...(prev.respuestas?.[pid] || {}),
                opcion: nuevaSeleccion,
              },
            },
          };
        });
      } else {
        setForm((prev) => ({
          ...prev,
          respuestas: {
            ...prev.respuestas,
            [pid]: {
              ...(prev.respuestas?.[pid] || {}),
              opcion: value,
            },
          },
        }));
      }
    } else if (name.startsWith('obs-')) {
      const pid = name.replace('obs-', '');
      setForm((prev) => ({
        ...prev,
        respuestas: {
          ...prev.respuestas,
          [pid]: {
            ...(prev.respuestas?.[pid] || {}),
            observacion: value,
          },
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // ...existing code...

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos
    alert('Formulario enviado (solo frontend)');
  };

  return (
    <div className="relative py-12 px-2 md:px-0">
      <div
        className="absolute inset-0  bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo.jpg')" }}
        aria-hidden="true"
      >
        <div className="w-full h-full bg-black bg-opacity-60"></div>
      </div>
      <section className="relative z-10 max-w-3xl mx-auto my-10 p-6 bg-white bg-opacity-95 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700 tracking-tight">FICHA DE MONITOREO UGEL</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        {/* I. DATOS GENERALES DE LA IE */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">I. DATOS GENERALES DE LA INSTITUCIÓN EDUCATIVA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombreIE" className="block text-sm font-medium text-gray-700 mb-1">Número y/o nombre de la Institución Educativa</label>
            <input id="nombreIE" name="nombreIE" value={form.nombreIE} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='.I.E.P 2253 José Antonio Encinas'/>
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
            <input id="region" name="region" value={form.region} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Ica'/>
          </div>
          <div>
            <label htmlFor="ugel" className="block text-sm font-medium text-gray-700 mb-1">UGEL</label>
            <input id="ugel" name="ugel" value={form.ugel} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Chincha'/>
          </div>
        </div>
        {/* II. DATOS DEL DIRECTOR */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">II. DATOS DEL DIRECTOR</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="directorNombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres completos</label>
            <input id="directorNombres" name="directorNombres" value={form.directorNombres} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Yrvin Alexis'/>
          </div>
          <div>
            <label htmlFor="directorApellidos" className="block text-sm font-medium text-gray-700 mb-1">Apellidos completos</label>
            <input id="directorApellidos" name="directorApellidos" value={form.directorApellidos} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Pachas Saravia'/>
          </div>
          <div>
            <label htmlFor="directorDni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
            <input id="directorDni" name="directorDni" value={form.directorDni} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='72490012'/>
          </div>
          <div>
            <label htmlFor="directorTelefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input id="directorTelefono" name="directorTelefono" value={form.directorTelefono} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='944405449' />
          </div>
          <div>
            <label htmlFor="directorCorreo" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input id="directorCorreo" name="directorCorreo" value={form.directorCorreo} onChange={handleChange} required type="email" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='yrvin21pachas2004@gmail.com' />
          </div>
        </div>
        {/* III. DATOS DEL ESPECIALISTA */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">III. DATOS DEL ESPECIALISTA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="especialistaNombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres completos del especialista</label>
            <input id="especialistaNombres" name="especialistaNombres" value={form.especialistaNombres} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Sebastían Daniel'/>
          </div>
          <div>
            <label htmlFor="especialistaApellidos" className="block text-sm font-medium text-gray-700 mb-1">Apellidos completos del especialista</label>
            <input id="especialistaApellidos" name="especialistaApellidos" value={form.especialistaApellidos} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Ramiréz Prado'/>
          </div>
          <div>
            <label htmlFor="especialistaDni" className="block text-sm font-medium text-gray-700 mb-1">DNI del especialista</label>
            <input id="especialistaDni" name="especialistaDni" value={form.especialistaDni} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='845325788'/>
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
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">IV. ASPECTO: Planificación, desarrollo y acompañamiento a la estrategia de RE</h3>
        <div className="space-y-6">
          {preguntas.map((p, i) => (
            <div key={p.id} className="mb-4 p-4 bg-white/80 rounded-xl border border-blue-200 shadow-sm">
              <div className="flex items-start gap-2 mb-2">
                <span className="font-bold text-blue-700 text-lg min-w-[2rem]">{i + 1}.</span>
                <label className="block font-medium text-gray-800 text-base leading-snug">{p.texto}</label>
              </div>
              <div className="flex flex-col gap-2 mb-3">
                {p.opciones.map((op, idx) => (
                  <label
                    key={op}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 hover:bg-blue-50 cursor-pointer transition-all shadow-sm"
                    style={{ minWidth: 0 }}
                  >
                    <input
                      type={p.tipo === 'checkbox' ? 'checkbox' : 'radio'}
                      name={`opcion-${p.id}` + (p.tipo === 'checkbox' ? `-${idx}` : '')}
                      value={op}
                      checked={
                        p.tipo === 'checkbox'
                          ? (form.respuestas?.[p.id]?.opcion || []).includes(op)
                          : form.respuestas?.[p.id]?.opcion === op
                      }
                      onChange={e => {
                        if (p.tipo === 'checkbox') {
                          handleChange({
                            target: {
                              name: `opcion-${p.id}`,
                              value: op,
                              type: 'checkbox',
                              checked: e.target.checked,
                            },
                          });
                        } else {
                          handleChange(e);
                        }
                      }}
                      className="accent-blue-600 w-5 h-5"
                    />
                    <span className="text-gray-800 text-sm font-medium break-words">{op}</span>
                  </label>
                ))}
              </div>
              <input
                type="text"
                name={`obs-${p.id}`}
                value={form.respuestas?.[p.id]?.observacion || ''}
                onChange={handleChange}
                placeholder="Observaciones (opcional)"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
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
