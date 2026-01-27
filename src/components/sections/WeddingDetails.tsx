import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Church } from 'lucide-react'

export const WeddingDetails = () => {
  const details = [
    {
      icon: Church,
      title: 'Ceremonia',
      content: 'Parroquia San Pedro de Grocio Prado',
      time: '5:00 PM',
      address: 'Frente a la plaza de Grocio Prado',
    },
    {
      icon: MapPin,
      title: 'Recepción',
      content: 'Salón de recepciones "El Rinconcito Escondido"',
      time: '7:00 PM',
      address: ' C. La Unión Nº 100, 11703 - Grocio Prado',
    },
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-6xl md:text-7xl text-gold-600 mb-4">
            Detalles del Evento
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-20 bg-gold-400"></div>
            <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
            <div className="h-px w-20 bg-gold-400"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gold-50 to-gold-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <detail.icon className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-serif text-2xl text-gray-800 mb-3">{detail.title}</h3>
              <p className="text-gray-700 font-medium mb-2">{detail.content}</p>
              <p className="text-gold-600 font-semibold mb-1">{detail.time}</p>
              <p className="text-gray-600 text-sm">{detail.address}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-gold-100 via-white to-gold-100 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h3 className="font-serif text-3xl text-gray-800 mb-4">Código de Vestimenta</h3>
            <p className="text-xl text-gray-700 mb-2">Formal / Etiqueta</p>
            <p className="text-gray-600">
              Por favor, vístete elegantemente para celebrar este día especial con nosotros
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
