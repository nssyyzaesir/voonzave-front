import { motion } from 'framer-motion';
import { useState } from 'react';
import { MailCheck, Send, ArrowRight } from 'lucide-react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsLoading(true);
    // Simulando envio para um servidor
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14] via-[#0F0F18] to-[#0A0A14]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')] opacity-10"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6C00FF] to-transparent opacity-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00EEFF] to-transparent opacity-20"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Fique por dentro das <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">novidades</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Assine nossa newsletter e receba em primeira mão dicas exclusivas, novos recursos e promoções especiais.
          </motion.p>
        </motion.div>

        <motion.div 
          className="bg-[#0F0F18] border border-gray-800 rounded-2xl p-8 md:p-10 shadow-xl max-w-3xl mx-auto relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C00FF] rounded-full filter blur-[100px] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00EEFF] rounded-full filter blur-[100px] opacity-10"></div>
          
          {isSubmitted ? (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
                <MailCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold mb-4">Inscrição confirmada!</h3>
              <p className="text-gray-400 mb-6">Obrigado por se inscrever. Enviamos um e-mail de confirmação para <span className="text-white">{email}</span></p>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center font-medium text-[#00EEFF]"
              >
                Voltar para o site
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-[#6C00FF]/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <Send className="h-5 w-5 text-[#6C00FF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Receba acesso exclusivo</h3>
                  <p className="text-gray-400 text-sm">Junte-se a mais de 5.000 profissionais</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-400 text-sm font-medium">
                    Seu melhor e-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@empresa.com"
                    required
                    className="w-full px-4 py-3 bg-[#0A0A14] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C00FF] focus:border-transparent placeholder-gray-600 text-white"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
                    isLoading 
                      ? 'bg-[#6C00FF]/50' 
                      : 'bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] hover:from-[#00EEFF] hover:to-[#6C00FF]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </>
                  ) : (
                    'Receber acesso'
                  )}
                </motion.button>
              </form>
              
              <p className="text-gray-500 text-xs mt-4 text-center">
                Ao se inscrever, você concorda com nossos Termos de Serviço e Política de Privacidade.
              </p>
            </>
          )}
        </motion.div>
        
        {/* Trust badges */}
        <motion.div 
          className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-400 text-sm">Dados protegidos</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-400 text-sm">Cancelamento a qualquer momento</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-gray-400 text-sm">Não enviamos spam</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}