import { Gift, CreditCard, Copy, Check } from 'lucide-react'
import { useState } from 'react'

const bankAccounts = [
  {
    bank: 'BCP - Banco de Crédito',
    accountType: 'Cuenta de Ahorros',
    accountNumber: '191-1234567-0-89',
    name: 'Vivian Tasayco & Dieter Pachas'
  },
  {
    bank: 'Interbank',
    accountType: 'Cuenta Corriente',
    accountNumber: '200-3001234567',
    name: 'Vivian Tasayco & Dieter Pachas'
  }
];

export const Gifts = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(id);
      setTimeout(() => setCopiedAccount(null), 2000);
    });
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-white via-gold-50 to-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-gold-500/10 rounded-full p-4 mb-6">
            <Gift className="w-16 h-16 mx-auto text-gold-600" />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-gray-800 mb-6 font-bold">
            Tu Presencia es el Mejor de los Regalos
          </h2>
          <div className="inline-block">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gold-400/20 text-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Sabemos que elegir el obsequio perfecto puede ser difícil,<br className="hidden md:block" />
              así que te traemos la solución
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {bankAccounts.map((account, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gold-50 to-white p-8 rounded-2xl shadow-2xl border-2 border-gold-400/30 hover:border-gold-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-gray-800">
                    {account.bank}
                  </h3>
                  
                  <div className="bg-white/80 rounded-xl p-4 space-y-2">
                    <p className="text-sm text-gray-600 font-medium">{account.accountType}</p>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg md:text-xl font-mono font-bold text-gold-600">
                        {account.accountNumber}
                      </p>
                      <button
                        onClick={() => copyToClipboard(account.accountNumber, `${index}-number`)}
                        className="flex-shrink-0 p-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 transition-colors"
                        aria-label="Copiar número de cuenta"
                      >
                        {copiedAccount === `${index}-number` ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-gold-600" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 font-medium pt-2">{account.name}</p>
                  </div>

                  {copiedAccount === `${index}-number` && (
                    <p className="text-sm text-green-600 font-medium animate-fade-in">
                      ¡Copiado!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gold-500/5 rounded-2xl px-8 py-4 border border-gold-400/20">
            <p className="text-gray-600 italic font-serif text-lg">
              💕 Con tu compañía es más que suficiente, pero si deseas hacernos un regalo, te agradecemos de corazón 💕
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
