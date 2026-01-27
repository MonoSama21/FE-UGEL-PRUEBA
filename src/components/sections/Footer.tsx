import { Heart } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gold-900 to-gold-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Heart className="w-12 h-12 mx-auto mb-6 text-gold-300 animate-pulse" />
        
        <h3 className="font-script text-5xl mb-4">Vivian & Dieter</h3>
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gold-300"></div>
          <div className="w-2 h-2 bg-gold-300 rounded-full"></div>
          <div className="h-px w-16 bg-gold-300"></div>
        </div>
        
        <p className="text-gold-100 mb-4 text-lg">
          13 de Febrero, 2027
        </p>
        
        <p className="text-gold-200 italic mb-8">
          "Dos almas, un solo corazón"
        </p>
        
        <div className="border-t border-gold-700 pt-8 mt-8">
          <p className="text-gold-300 text-sm">
            Vivian & Dieter. Con amor - Web desarrollada por DEVQORA💕
          </p>
          <p className="text-gold-300 text-sm mt-3">
            © {new Date().getFullYear()} Web desarrollada por DEVQORA - Yrvin Pachas 944405449
          </p>
        </div>
      </div>
    </footer>
  )
}
