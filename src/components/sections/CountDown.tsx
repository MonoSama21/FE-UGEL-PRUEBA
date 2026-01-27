import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string;
}

function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 max-w-5xl mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-white via-gold-50 to-white backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-gold-500/40 border-2 border-gold-400/20 hover:border-gold-500/40">
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 bg-clip-text text-transparent drop-shadow-sm">{value}</div>
            <div className="text-xs md:text-sm text-gray-600 uppercase tracking-widest mt-4 font-semibold">
              {unit === 'days' ? 'Días' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Minutos' : 'Segundos'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Fecha de la boda - Cambia esta fecha a la de tu boda
const weddingDate = '2027-02-13T17:00:00'; // Sábado, 13 de Febrero 2027, 5:00 PM

export const CountDown = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gold-400/10 via-white to-gold-500/10 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gold-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-gold-500/10 rounded-full p-4 mb-6">
            <Clock className="w-16 h-16 mx-auto text-gold-600" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-gray-800 mb-4 font-bold">Cuenta Regresiva</h2>
          <p className="text-xl text-gray-600 font-medium">Faltan muy pocos días para nuestro gran día</p>
          <div className="mt-4 inline-block">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full"></div>
          </div>
        </div>
        <Countdown targetDate={weddingDate} />
      </div>
    </section>
  )
}
