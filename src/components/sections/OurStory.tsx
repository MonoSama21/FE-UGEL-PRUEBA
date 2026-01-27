import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

export const OurStory = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gold-50 via-white to-gold-100">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-6xl md:text-7xl text-gold-600 mb-4">
            Nuestra Historia
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gold-400"></div>
            <Heart className="w-5 h-5 text-gold-500" />
            <div className="h-px w-20 bg-gold-400"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl"
        >
          <div className="prose prose-lg max-w-none">
            <div className="flex items-start gap-4 mb-8">
              <Sparkles className="w-8 h-8 text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-4">El Comienzo</h3>
                <p className="text-gray-700 leading-relaxed">
                  Todo comenzó en un día ordinario que se convirtió en extraordinario.
                  Nuestros caminos se cruzaron y desde ese momento supimos que habíamos
                  encontrado algo especial. Lo que comenzó como una amistad se transformó
                  en un amor profundo y verdadero.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <Heart className="w-8 h-8 text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-4">Nuestro Amor</h3>
                <p className="text-gray-700 leading-relaxed">
                  A través de los años, hemos compartido risas, sueños y momentos
                  inolvidables. Hemos crecido juntos, apoyándonos en cada paso del camino.
                  Nuestro amor se ha fortalecido con cada desafío superado y cada alegría
                  compartida.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-serif text-3xl text-gray-800 mb-4">El Futuro</h3>
                <p className="text-gray-700 leading-relaxed">
                  Ahora estamos listos para dar el siguiente paso en nuestra historia de
                  amor. Queremos compartir este momento especial contigo, rodeados de
                  nuestros seres queridos. Juntos comenzaremos un nuevo capítulo lleno de
                  amor, esperanza y felicidad.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="font-script text-4xl text-gold-600">
              Y así, dos corazones se convierten en uno
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
