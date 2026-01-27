import { motion } from 'framer-motion'
import { Heart, Play, Pause, ChevronDown } from 'lucide-react'
import { useState, useRef } from 'react'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="mt-16 flex flex-col items-center gap-5">
      <audio
        ref={audioRef}
        src="/wedding-song.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="relative group">
        {/* Anillo exterior animado */}
        <div className="absolute -inset-2 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-full opacity-75 group-hover:opacity-100 blur-md animate-pulse"></div>
        
        {/* Marco del botón */}
        <div className="relative bg-gradient-to-br from-white via-gold-50 to-white backdrop-blur-md rounded-full shadow-2xl p-4 border-4 border-gold-400/40 group-hover:border-gold-500/60 transition-all duration-500">
          <button
            onClick={togglePlay}
            className="relative bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 hover:from-gold-600 hover:via-gold-700 hover:to-gold-600 text-white rounded-full p-8 transition-all duration-500 transform group-hover:scale-110 shadow-2xl hover:shadow-gold-500/50 active:scale-95"
            aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 animate-pulse drop-shadow-lg" />
            ) : (
              <Play className="w-10 h-10 ml-1 drop-shadow-lg" />
            )}
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-base md:text-lg text-gray-700 font-serif bg-white/70 backdrop-blur-md px-8 py-3 rounded-full shadow-lg border-2 border-gold-300/30"
      >
        {isPlaying ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-1 h-4 bg-gold-500 animate-pulse"></span>
            <span className="italic">Nuestra canción especial</span>
            <span className="inline-block w-1 h-4 bg-gold-500 animate-pulse"></span>
          </span>
        ) : (
          'Haz clic para escuchar nuestra canción'
        )}
      </motion.p>
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gold-50/30 via-white to-gold-50/50">
      {/* Elementos decorativos de fondo mejorados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gold-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gold-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Patrón decorativo sutil */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(212,163,83,0.8),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto py-20">
{/* Icono superior con anillo decorativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2, type: "spring", bounce: 0.5 }}
          className="mb-10 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-gold-300 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border border-gold-200 rounded-full animate-pulse opacity-30"></div>
          </div>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full blur-xl opacity-40 animate-pulse"></div>
            <Heart className="relative w-20 h-20 mx-auto text-gold-500 fill-gold-500 drop-shadow-xl animate-pulse" />
          </div>
        </motion.div>


        {/* Línea decorativa superior */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold-400 to-gold-500"></div>
          <div className="w-2 h-2 bg-gold-500 rounded-full shadow-lg"></div>
          <div className="h-px w-20 bg-gradient-to-l from-transparent via-gold-400 to-gold-500"></div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl md:text-3xl font-serif text-gold-700 mb-8 tracking-[0.2em] uppercase"
        >
          Celebramos Nuestro Amor
        </motion.h2>

        {/* Nombres principales con efecto más elegante */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7, type: "spring" }}
          className="font-script text-8xl md:text-[10rem] lg:text-[12rem] bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 bg-clip-text text-transparent leading-tight drop-shadow-2xl"
        >
          Vivian & Dieter
        </motion.h1>

        {/* Sección de fecha con diseño mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold-400 to-gold-500"></div>
            <Heart className="w-7 h-7 text-gold-500 fill-gold-500/20" />
            <div className="h-px w-32 bg-gradient-to-l from-transparent via-gold-400 to-gold-500"></div>
          </div>
          
          <div className="inline-block bg-white/80 backdrop-blur-md rounded-3xl px-12 py-8 shadow-2xl border-2 border-gold-400/30">
            <p className="text-3xl md:text-4xl font-serif text-gray-800 font-bold mb-3">
              Nos Casamos
            </p>
            <p className="text-2xl md:text-3xl text-gray-600 font-light tracking-wide">
              Sábado, 13 de Febrero 2027
            </p>
          </div>
          
          {/* Componente de Música con animación mejorada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, type: "spring" }}
          >
            <MusicPlayer />
          </motion.div>
        </motion.div>

        {/* Frase romántica con estilo mejorado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16"
        >
          <div className="inline-block bg-gradient-to-r from-gold-50 via-white to-gold-50 rounded-2xl px-8 py-6 shadow-xl border border-gold-300/30">
            <p className="text-xl md:text-2xl text-gray-700 font-serif italic leading-relaxed">
              "El amor verdadero no tiene final feliz,<br className="hidden md:block" />
              porque el amor verdadero nunca termina"
            </p>
          </div>
        </motion.div>

        {/* Botón CTA mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-20"
        >
          <a
            href="#rsvp"
            className="group relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <span className="relative block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold px-12 py-5 rounded-full text-xl shadow-2xl transform group-hover:scale-105 transition-all duration-300">
              Confirmar Asistencia
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
        </motion.div>
      </div>

    
    </section>
  )
}
