import { motion } from 'framer-motion'
import { Image } from 'lucide-react'

export const Gallery = () => {
  // Array de imágenes - Agrega tus fotos en la carpeta public/gallery/
  const images = [
    {
      id: 1,
      src: '/public/ejemplo.jpg',
      alt: 'Nuestro primer encuentro',
    },
    {
      id: 2,
      src: '/public/ejemplo.jpg',
      alt: 'Momentos especiales',
    },
    {
      id: 3,
      src: '/public/ejemplo.jpg',
      alt: 'Viajes inolvidables',
    },
    {
      id: 4,
      src: '/public/ejemplo.jpg',
      alt: 'Celebrando juntos',
    },
    {
      id: 5,
      src: '/public/ejemplo.jpg',
      alt: 'Nuestra historia',
    },
    {
      id: 6,
      src: '/public/ejemplo.jpg',
      alt: 'El día de la propuesta',
    },
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-br from-gold-50 via-white to-gold-100 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full mb-4"></div>
          </div>
          <h2 className="font-script text-6xl md:text-8xl text-gold-600 mb-6 drop-shadow-sm">
            Momentos Especiales
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-serif italic max-w-2xl mx-auto">
            Cada fotografía cuenta una parte de nuestra historia de amor
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold-400"></div>
            <div className="w-3 h-3 bg-gold-500 rounded-full shadow-lg"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold-400"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Marco dorado externo */}
              <div className="absolute -inset-1 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
              
              {/* Contenedor de la imagen */}
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white group-hover:border-gold-100 transition-all duration-500 transform group-hover:scale-[1.02]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                
                {/* Placeholder elegante de respaldo */}
                <div className="hidden w-full h-full bg-gradient-to-br from-gold-200 via-gold-100 to-gold-50 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,163,83,0.1),transparent_50%)]"></div>
                  <Image className="w-24 h-24 text-gold-400/30 group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Overlay con degradado elegante */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Texto descriptivo */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-serif text-lg md:text-xl font-semibold drop-shadow-lg">{image.alt}</p>
                  <div className="w-16 h-1 bg-gold-400 mt-2 rounded-full"></div>
                </div>

                {/* Brillo decorativo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-16 translate-x-16"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border-2 border-gold-400/30">
            <p className="text-gray-700 italic font-serif text-lg">
              💕 Cada momento juntos es un recuerdo especial que atesoramos para siempre 💕
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
