export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
        <img src="/logo.png" alt="Logo UGEL" className="h-16 w-16 rounded-full bg-white p-2 shadow mb-2" />
        <h3 className="text-2xl font-bold tracking-wide mb-1">UGEL - Estrategia de Refuerzo Escolar</h3>
        <p className="text-blue-100 text-base mb-1">Monitoreo de Implementación - Nivel Primaria</p>
        <p className="text-blue-200 text-sm mb-2">Etapa 2 | Año 2026</p>
        <div className="border-t border-blue-400 w-full pt-6 mt-4">
          <p className="text-blue-200 text-xs">Esta plataforma es solo informativa y de uso interno institucional.</p>
          <p className="text-blue-300 text-xs mt-2">© {new Date().getFullYear()} Web desarrollada por <span className="font-semibold">DEVQORA</span> - Yrvin Pachas 944405449</p>
        </div>
      </div>
    </footer>
  )
}
