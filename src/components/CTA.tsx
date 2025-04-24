import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6C00FF] rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00EEFF] rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#121212] to-[#0A0A0A] p-8 md:p-12 rounded-2xl border border-opacity-20 border-[#00EEFF] shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Pronto para o <span className="gradient-text">Futuro?</span></h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Transforme seu negócio hoje mesmo com o poder da tecnologia Voonzave. Comece de graça e escale conforme seu crescimento.</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#" className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-md text-white bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] hover:from-[#6C00FF] hover:to-[#6C00FF] glow-on-hover transition-all shadow-lg w-full sm:w-auto justify-center">
              Iniciar Gratuitamente
              <Rocket className="ml-2 h-5 w-5" />
            </a>
            <a href="#" className="inline-flex items-center px-8 py-4 border border-[#00EEFF] text-base font-medium rounded-md text-[#00EEFF] bg-transparent hover:bg-[#00EEFF] hover:bg-opacity-10 blue-glow-on-hover transition-all w-full sm:w-auto justify-center">
              Agendar uma Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
