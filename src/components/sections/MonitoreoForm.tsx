import { maxGeneratorDuration } from 'framer-motion';
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




const aspectos = [
  {
    titulo: 'ASPECTO 01: Desarrollo integral de las y los estudiantes',
    preguntas: [
      {
        id: 'p1',
        texto: 'El director cuenta con INFORMACIÓN SISTEMATIZADA sobre los niveles de logro de aprendizaje de los estudiantes a partir de la evaluación diagnóstica aplicada por la IE y plantea estrategia para promover el progreso de los estudiantes en el desarrollo de sus competencias.',
        tipo: 'estrellas',
        max: 4,
      },
    ],
  },
  {
    titulo: 'ASPECTO 02: Gestión de las condiciones operativas',
    preguntas: [
      {
        id: 'a2p1',
        texto: 'El director de la IE ha constituido el Comité de gestión de condiciones operativas debidamente reconocido por R.D',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Actas de reunión para conformación de comités de gestión escolar.',
          'RD de conformación de comités de gestión escolar.',
          'Cargo de entrega a UGEL de RD.',
        ],
      },
      {
        id: 'a2p2',
        texto: 'Elaboración, difusión y seguimiento de la calendarización y prevención de eventos que afecten su cumplimiento. El Director o equipo directivo ha organizado el tiempo anual de la IE: semanas de gestión (8) y semanas lectivas (36)',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Calendarización de las semanas lectivas y de gestión.',
          'Evidencia de difusión de la calendarización mediante medios virtuales o comunicados.',
        ],
      },
      {
        id: 'a2p3',
        texto: 'El Director o equipo directivo ha propuesto actividades a realizar durante las semanas de gestión: según sus demandas o necesidades institucionales',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Programación de actividades de los bloques de semanas de gestión, incluidos en el Plan Anual de Trabajo.',
          'Actas del desarrollo de las semanas de gestión.',
          'Registro de asistencia de las semanas de gestión',
        ],
      },
      {
        id: 'a2p4',
        texto: 'El Director o equipo directivo ha previsto la reprogramación y recuperación del tiempo lectivo y de gestión que se suspendan por fuerza mayor.',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Cronograma de recuperación ante posible suspensión de actividades de gestión y lectivas RM N° 501- 2025 MINEDU',
        ],
      },
    ],
  },
  {
    titulo: 'ASPECTO 03: Gestión oportuna y sin condicionamientos de la matrícula (acceso y continuidad de estudios)',
    preguntas: [
      {
        id: 'a3p1',
        texto: 'El Director o equipo directivo ha organizado el proceso de matrícula escolar teniendo en cuenta el proceso regular',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Plan de matrícula o cronograma de matrícula regular y excepcional, incorporado al PAT.',
          'Comunicados de difusión de vacantes, gratuidad y sin condicionamientos. RM N° 010-2026-MINEDU.',
        ]
      },
      {
        id: 'a3p2',
        texto: 'El Director o equipo directivo emite los documentos asociados a la trayectoria educativa: certificados de estudio SIAGIE, Constancia de Logros de Aprendizaje (CLA), informes de progreso, otros.',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Nóminas de matrícula año 2025 aprobadas y registradas en el SIAGIE.',
          'Archivo de documentos emitidos por el SIAGIE (Nominas y Actas) y cargo de documentos emitidos por SIAGIE',
          'Cronograma de entrega y/o comunicados de informe de logros de progreso de los estudiantes a las familias.',
        ],
      },
    ],
  },
  {
    titulo: 'ASPECTO 04: Seguimiento a la asistencia y puntualidad de las y los estudiantes y del personal de la IE asegurando el cumplimiento del tiempo lectivo y de gestión.',
    preguntas: [
      {
        id: 'a4p1',
        texto: 'El Director o equipo directivo ha organizado la jornada laboral del personal de la IE: Directivo, docente, auxiliar, personal administrativo y otros',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Horario del personal de la IE incorporado al RI y publicado en lugar visible de la IE de acuerdo con la normatividad.',
          'RI.',
        ],
      },
      {
        id: 'a4p2',
        texto: 'El Director o equipo directivo, ha establecido el mecanismo para el control de la asistencia del personal de la IE e informa a la UGEL en plazo establecido',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Número de expediente del reporte de asistencia de docentes y personal administrativo a la UGEL de cada mes.',
          'Estrategias implementadas para la mejora de la asistencia del personal, el cumplimiento de la calendarización, las horas efectivas de clase.',
          'Registro de asistencia de estudiantes',
          'Estrategias que asume la IE frente a la inasistencia de docentes.',
          'Estrategias que asume la IE frente a la inasistencia de estudiantes.',
        ],
      },
    ],
  },
  {
    titulo: 'ASPECTO 05: Mantenimiento de espacios salubres, seguros y accesibles que garanticen la salud e integridad física de la comunidad educativa, incluyendo la gestión del riesgo, emergencias y desastres, teniendo en cuenta las diferentes modalidades y turnos de la IE.',
    preguntas: [
      {
        id: 'a5p1',
        texto: 'El Director o equipo directivo, junto a su Comité de Gestión de Condiciones Operativas ha elaborado e implementado el Plan de Gestión del Riesgo de Desastres y los simulacros sectoriales:',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Plan de GRD y conformación de Brigadas',
        ],
      },
      {
        id: 'a5p2',
        texto: 'El Director o equipo directivo ha identificado peligros y vulnerabilidades que afecten y/o expongan a la IE ante emergencia y/o desastre, así como las necesidades según la normativa vigente, que han reportado a al UGEL.',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Cuadro de vulnerabilidades y peligros 2026',
          'Alarmas en buen estado.',
          'Señalización de rutas de evacuación y de zonas de peligro.',
          'Mapa de evacuación.',
          'EdA o unidades didácticas que evidencien la cultura de prevención de GRD.',
          'Implementación de una cultura de gestión de riesgo frente a los peligros o amenazas que se hayan detectado en la IE o el entorno.',
        ],
      },
      {
        id: 'a5p3',
        texto: 'El Director o equipo directivo ha organizado proceso de contrato de adjudicación de quioscos, cafeterías y comedores escolares y cuenta con un cronograma de supervisión de los quioscos, cafeterías y comedores escolares.',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Contrato de adjudicación y registro manual de concesionario de Quioscos escolares.',
          'Cronograma de supervisión.',
          'Conformación del CAE.',
        ],
      },
    ],
  },
  {
    titulo: 'ASPECTO 06: Entrega oportuna y promoción del uso de materiales y recursos educativos',
    preguntas: [
      {
        id: 'a6p1',
        texto: 'El Director o equipo directivo ha organizado la gestión de los recursos y materiales educativos de la IE, para su entrega oportuna: recepción y asignación en el SIAGIE.',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Conformación del Comité de CO y/o personal de apoyo de recepción de materiales educativos en periodo vacacional e informado a la UGEL',
          'Acta de entrega de materiales y recursos educativos a estudiantes y docentes.',
          'Evidencia de recepción y asignación de material educativo en SIAGIE.',
        ],
      },
      {
        id: 'a6p2',
        texto: 'El Director o equipo directivo promueve el uso pedagógico de los recursos y materiales educativos.',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Ficha de observación del desempeño docente que evidencie el monitoreo de materiales y recursos empleados.',
          'Acta con número o porcentaje de docentes y estudiantes y/o familias que cuentan con materiales educativos, considerar material excedente y faltante.',
          'Estrategias adoptadas para entrega oportuna de los materiales educativos a docentes, estudiantes y/o familias.',
          'Ruta o planificación de acciones para promover el uso pedagógico de los recursos y materiales educativos; como su cuidado.',
        ],
      },
    ],
  },
  {
    titulo: 'ASPECTO 07: Gestión y mantenimiento de la infraestructura, equipamiento y mobiliario.',
    preguntas: [
      {
        id: 'a7p1',
        texto: 'El Director o equipo directivo ha identificado el Diagnóstico de necesidades de infraestructura del local educativo y ejecución del mantenimiento o acondicionamiento:',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Cuadro o diagnóstico de necesidades de infraestructura del local educativo y ejecución de mantenimiento',
          'Informe a la UGEL de gastos de mantenimiento de la IE, con partida asignada para el presente año lectivo.',
          'Informe de los gastos de mantenimiento de la IE, con partida asignada para el presente año lectivo.',
          'Ficha del mantenimiento de la infraestructura del local escolar aprobada por la plataforma “Mi Mantenimiento” y declaración de gastos del proceso de mantenimiento.',
          'Reporte de mantenimiento a la UGEL, según plazo establecido por la plataforma “Mi Mantenimiento”.',
        ],
      },
    ],
  },
  {
    titulo: 'ASPECTO 08: Práctica transversal: Gestión de recursos propios y de talento humano.',
    preguntas: [
      {
        id: 'a8p1',
        texto: 'El Director o equipo directivo cuenta con su Plan La gestión de recursos propios y actividades productivas y empresariales de la IE, de acuerdo a la normatividad vigente.',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Plan de Gestión de Recursos Propios',
          'Presentación de libro caja legalizado (recursos propios).',
          'Libro de caja actualizado.',
        ],
      },
      {
        id: 'a8p2',
        texto: 'El Director o equipo directivo ha organizado la rendición de cuentas sobre los recursos obtenidos o asignados a la IE y sus resultados de gestión:',
        tipo: 'estrellas',
        max: 4,
        evidencias: [
          'Socialización de los gastos realizados con el presupuesto asignado para el mantenimiento del local escolar, a docentes y familias',
          'Reporte a la UGEL de informe de gastos',
        ],
      },
    ],
  },
];



export const MonitoreoForm = () => {
  const [form, setForm] = useState({
    ...initialForm,
    respuestas: {}, // { p1: { opcion: '', observacion: '' }, ... }
  });
  const [errores, setErrores] = useState({});
  const [horaError, setHoraError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Validación de hora
    if (name === "horaInicio" || name === "horaFin") {
      let nuevaHoraInicio = name === "horaInicio" ? value : form.horaInicio;
      let nuevaHoraFin = name === "horaFin" ? value : form.horaFin;
      setHoraError("");
      // Validar rango permitido
      if ((name === "horaInicio" && (value < "07:00" || value > "20:00")) ||
          (name === "horaFin" && (value < "07:00" || value > "20:00"))) {
        setHoraError("Las horas deben estar entre 07:00 y 20:00");
      } else if (nuevaHoraInicio && nuevaHoraFin && nuevaHoraFin <= nuevaHoraInicio) {
        setHoraError("La hora de fin debe ser mayor a la hora de inicio");
      }
    }
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
    // Validar horas
    if (
      !form.horaInicio ||
      !form.horaFin ||
      form.horaInicio < "07:00" ||
      form.horaInicio > "20:00" ||
      form.horaFin < "07:00" ||
      form.horaFin > "20:00" ||
      form.horaFin <= form.horaInicio
    ) {
      setHoraError(
        !form.horaInicio || !form.horaFin
          ? "Debe ingresar ambas horas"
          : form.horaInicio < "07:00" || form.horaInicio > "20:00" || form.horaFin < "07:00" || form.horaFin > "20:00"
          ? "Las horas deben estar entre 07:00 y 20:00"
          : "La hora de fin debe ser mayor a la hora de inicio"
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Validar que todas las preguntas tengan respuesta
    let nuevosErrores = {};
    aspectos.forEach((aspecto) => {
      aspecto.preguntas.forEach((p) => {
        if (!form.respuestas?.[p.id]?.opcion) {
          nuevosErrores[p.id] = 'Esta pregunta es obligatoria';
        }
      });
    });
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      alert('Por favor, responde todas las preguntas obligatorias.');
      return;
    }
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
      <section className="relative z-10 max-w-5xl mx-auto my-12 p-10 bg-white bg-opacity-95 rounded-3xl shadow-2xl border border-blue-200 backdrop-blur-md">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight">FICHA DE MONITOREO UGEL</h2>
        <form onSubmit={handleSubmit} className="space-y-8 text-base md:text-lg">
        {/* I. DATOS GENERALES DE LA IE */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">I. DATOS GENERALES DE LA INSTITUCIÓN EDUCATIVA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombreIE" className="block text-sm font-medium text-gray-700 mb-1">Número y/o nombre de la Institución Educativa <span className="text-red-500">*</span> </label>
            {/* Combo-box con buscador para Institución Educativa */}
            {(() => {
              const instituciones = [
                { codigo: "1357805", nombre: "22772" },
                { codigo: "1363332", nombre: "22773" },
                { codigo: "0752303", nombre: "22774" },
                { codigo: "0608240", nombre: "22230 ELADIO SARAVIA TASAYCO" },
                { codigo: "1062918", nombre: "22233 PAULINO REATEGUI AGUILAR" },
                { codigo: "1357821", nombre: "22236 MAGDALENA BARBETTA AGUILAR" },
                { codigo: "1560606", nombre: "22237 AURELIO MOISES FLORES GONZALES" },
                { codigo: "1393420", nombre: "22238 SAN MARTIN DE PORRES" },
                { codigo: "1388941", nombre: "22240 FRANCISCO CORBETTO ROCCA" },
                { codigo: "1378868", nombre: "22252 ANSELMO ABAD DE LA CRUZ" },
                { codigo: "1062934", nombre: "22255 ROLANDO ALZAMORA PAREDES" },
                { codigo: "1062959", nombre: "22256 SAN ANTONIO DE PADUA" },
              ];
              const [busquedaIE, setBusquedaIE] = React.useState("");
              const [desplegarIE, setDesplegarIE] = React.useState(false);
              const opcionesFiltradas = instituciones.filter(
                (ie) =>
                  `${ie.codigo} ${ie.nombre}`.toLowerCase().includes(busquedaIE.toLowerCase())
              );
              React.useEffect(() => {
                if (form.nombreIE) {
                  setBusquedaIE(form.nombreIE);
                }
              }, [form.nombreIE]);
              return (
                <div className="relative">
                  <input
                    type="text"
                    id="nombreIE"
                    name="nombreIE"
                    autoComplete="off"
                    value={busquedaIE}
                    onChange={e => {
                      setBusquedaIE(e.target.value);
                      setForm(prev => ({ ...prev, nombreIE: "" }));
                      setDesplegarIE(true);
                    }}
                    onFocus={() => setDesplegarIE(true)}
                    onBlur={() => setTimeout(() => setDesplegarIE(false), 150)}
                    required
                    placeholder="Escriba o seleccione la Institución Educativa"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {desplegarIE && (
                    <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
                      {opcionesFiltradas.length === 0 ? (
                        <li className="px-4 py-2 text-gray-500">No se encontraron coincidencias</li>
                      ) : (
                        opcionesFiltradas.map((ie) => (
                          <li
                            key={ie.codigo}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${form.nombreIE === `${ie.codigo} ${ie.nombre}` ? "bg-blue-200" : ""}`}
                            onMouseDown={() => {
                              setForm(prev => ({ ...prev, nombreIE: `${ie.codigo} ${ie.nombre}` }));
                              setBusquedaIE(`${ie.codigo} ${ie.nombre}`);
                              setDesplegarIE(false);
                            }}
                          >
                            {ie.codigo} - {ie.nombre}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              );
            })()}
          </div>

          <div>
            <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">Nivel <span className="text-red-500">*</span></label>
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
            <label htmlFor="tipoIE" className="block text-sm font-medium text-gray-700 mb-1">Tipo de I.E <span className="text-red-500">*</span></label>
            <select
              id="tipoIE"
              name="tipoIE"
              value={form.tipoIE}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>Seleccione el tipo de I.E</option>
              <option value="Inicial">Unidocente</option>
              <option value="Primaria">Multigrado</option>
              <option value="Secundaria">Polidocente</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Región</label>
            <input
              id="region"
              name="region"
              value={form.region || "Ica"}
              readOnly
              className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-not-allowed"
              style={{ opacity: 0.8 }}
            />
          </div>
          <div>
            <label htmlFor="ugel" className="block text-sm font-medium text-gray-700 mb-1">UGEL</label>
            <input
              id="ugel"
              name="ugel"
              value={form.ugel || "Chincha"}
              readOnly
              className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-not-allowed"
              style={{ opacity: 0.8 }}
            />
          </div>
        </div>
        {/* II. DATOS DEL DIRECTOR */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">II. DATOS DEL DIRECTOR</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="directorNombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres completos <span className="text-red-500">*</span></label>
            <input id="directorNombres" name="directorNombres" value={form.directorNombres} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Yrvin Alexis'/>
          </div>
          <div>
            <label htmlFor="directorApellidos" className="block text-sm font-medium text-gray-700 mb-1">Apellidos completos <span className="text-red-500">*</span></label>
            <input id="directorApellidos" name="directorApellidos" value={form.directorApellidos} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Pachas Saravia'/>
          </div>
          <div>
            <label htmlFor="directorDni" className="block text-sm font-medium text-gray-700 mb-1">DNI <span className="text-red-500">*</span></label>
            <input id="directorDni" name="directorDni" value={form.directorDni} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='72490012'/>
          </div>
          <div>
            <label htmlFor="directorTelefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono <span className="text-red-500">*</span></label>
            <input id="directorTelefono" name="directorTelefono" value={form.directorTelefono} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='944405449' />
          </div>
          <div>
            <label htmlFor="directorCorreo" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input id="directorCorreo" name="directorCorreo" value={form.directorCorreo} onChange={handleChange} type="email" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='yrvin21pachas2004@gmail.com' />
          </div>
        </div>
        {/* III. DATOS DEL ESPECIALISTA */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">III. DATOS DEL ESPECIALISTA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="especialistaNombres" className="block text-sm font-medium text-gray-700 mb-1">Nombres completos del especialista <span className="text-red-500">*</span></label>
            <input id="especialistaNombres" name="especialistaNombres" value={form.especialistaNombres} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Sebastían Daniel'/>
          </div>
          <div>
            <label htmlFor="especialistaApellidos" className="block text-sm font-medium text-gray-700 mb-1">Apellidos completos del especialista <span className="text-red-500">*</span></label>
            <input id="especialistaApellidos" name="especialistaApellidos" value={form.especialistaApellidos} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='Ramiréz Prado'/>
          </div>
          <div>
            <label htmlFor="especialistaDni" className="block text-sm font-medium text-gray-700 mb-1">DNI del especialista <span className="text-red-500">*</span></label>
            <input id="especialistaDni" name="especialistaDni" value={form.especialistaDni} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder='845325788'/>
          </div>
          <div>
            <label htmlFor="fechaAplicacion" className="block text-sm font-medium text-gray-700 mb-1">Fecha de aplicación <span className="text-red-500">*</span></label>
            <input id="fechaAplicacion" name="fechaAplicacion" value={form.fechaAplicacion} onChange={handleChange} required type="date" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700 mb-1">Hora de inicio <span className="text-red-500">*</span></label>
            <input
              id="horaInicio"
              name="horaInicio"
              value={form.horaInicio}
              onChange={handleChange}
              required
              type="time"
              min="07:00"
              max="20:00"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label htmlFor="horaFin" className="block text-sm font-medium text-gray-700 mb-1">Hora de fin <span className="text-red-500">*</span></label>
            <input
              id="horaFin"
              name="horaFin"
              value={form.horaFin}
              onChange={handleChange}
              required
              type="time"
              min="07:00"
              max="20:00"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {horaError && (
            <div className="col-span-2 text-red-500 text-sm font-semibold mt-1">{horaError}</div>
          )}
        </div>
        {/* Calificaciones por estrellas */}
        {/* Render dinámico de aspectos y preguntas */}
        {aspectos.map((aspecto, idxA) => (
          <div key={aspecto.titulo} className="mb-8">
            <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">{aspecto.titulo}</h3>
            <div className="space-y-6">
              {aspecto.preguntas.map((p, i) => (
                <div key={p.id} className="mb-4 p-4 bg-white/80 rounded-xl border border-blue-200 shadow-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="font-bold text-blue-700 text-lg min-w-[2rem]">{i + 1}.</span>
                    <label className="block font-medium text-gray-800 text-base leading-snug">{p.texto} <span className="text-red-500">*</span></label>
                  </div>
                  {p.evidencias && (
                    <ul className="mb-2 ml-6 list-disc text-gray-600 text-sm">
                      {p.evidencias.map((ev, idx) => (
                        <li key={idx}>{ev}</li>
                      ))}
                    </ul>
                  )}
                  {p.tipo === 'estrellas' ? (
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="flex justify-center gap-8">
                        {[1,2,3,4].map((star) => (
                          <button
                            key={star}
                            type="button"
                            aria-label={`Puntuar ${star} estrella${star === 1 ? '' : 's'}`}
                            className={`text-4xl md:text-5xl focus:outline-none transition-all duration-150 transform hover:scale-125 cursor-pointer drop-shadow-lg ${star <= (form.respuestas?.[p.id]?.opcion || 0) ? 'text-yellow-400' : 'text-gray-300'} ${errores[p.id] ? 'animate-shake' : ''}`}
                            style={{ filter: star <= (form.respuestas?.[p.id]?.opcion || 0) ? 'drop-shadow(0 0 6px #facc15)' : 'none' }}
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                respuestas: {
                                  ...prev.respuestas,
                                  [p.id]: {
                                    ...(prev.respuestas?.[p.id] || {}),
                                    opcion: star,
                                  },
                                },
                              }));
                              setErrores(prev => ({ ...prev, [p.id]: undefined }));
                            }}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Seleccione una puntuación de 1 a 4 estrellas <span className="text-red-500">*</span></div>
                      {errores[p.id] && (
                        <div className="text-red-500 text-xs mt-1">{errores[p.id]}</div>
                      )}
                    </div>
                  ) : (
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
                              setErrores(prev => ({ ...prev, [p.id]: undefined }));
                            }}
                            className="accent-blue-600 w-5 h-5"
                          />
                          <span className="text-gray-800 text-sm font-medium break-words">{op}</span>
                        </label>
                      ))}
                      {errores[p.id] && (
                        <div className="text-red-500 text-xs mt-1">{errores[p.id]}</div>
                      )}
                    </div>
                  )}
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
          </div>
        ))}

        {/* Observaciones y compromisos */}
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">V. OBSERVACIONES/SUGERENCIAS</h3>
        <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">Describa brevemente sus observaciones y/o sugerencias <span className="text-red-500">*</span></label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={form.observaciones}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={2}
          maxLength={500}
          required
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {form.observaciones.length}/500 caracteres
        </div>
        <h3 className="font-semibold mt-4 mb-2 text-lg text-blue-600">VI. COMPROMISOS</h3>
        <div className="mb-2">
          <label htmlFor="compromisoDirector" className="block text-sm font-medium text-gray-700 mb-1">Compromiso del Director <span className="text-red-500">*</span></label>
          <textarea
            id="compromisoDirector"
            name="compromisoDirector"
            value={form.compromisoDirector}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            maxLength={500}
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {form.compromisoDirector.length}/500 caracteres
          </div>
        </div>
        <div>
          <label htmlFor="compromisoEspecialista" className="block text-sm font-medium text-gray-700 mb-1">Compromiso del Especialista <span className="text-red-500">*</span></label>
          <textarea
            id="compromisoEspecialista"
            name="compromisoEspecialista"
            value={form.compromisoEspecialista}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            maxLength={500}
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {form.compromisoEspecialista.length}/500 caracteres
          </div>
        </div>
        
        <button type="submit" className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition">Enviar</button>
      </form>
      </section>
    </div>
  );
};

// Puedes agregar más preguntas al array "preguntas" según el detalle proporcionado en el requerimiento.
// Asegúrate de tener estilos para la clase "input" o usa clases de Tailwind para inputs.
