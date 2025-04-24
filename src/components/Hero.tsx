import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles, ChevronDown } from 'lucide-react';

export default function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  // Background neon grid effect
  const BackgroundGrid = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated grid lines */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'linear-gradient(to right, #6C00FF1A 1px, transparent 1px), linear-gradient(to bottom, #00EEFF1A 1px, transparent 1px)', 
        backgroundSize: '80px 80px',
        transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(-10%)',
        maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)'
      }}></div>
      
      {/* Glowing orbs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#6C00FF] rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#00EEFF] rounded-full filter blur-[120px] opacity-20 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FF00B8] rounded-full filter blur-[140px] opacity-10 animate-[pulse_7s_ease-in-out_infinite]"></div>
    </div>
  );

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-24 lg:pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <BackgroundGrid />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-pattern.png')] opacity-10 mix-blend-overlay"></div>
      
      {/* Particle effect */}
      <div className="particles absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00EEFF]"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%', 
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 1 + 0.5
            }}
            animate={{ 
              y: [null, Math.random() * 100 + '%'],
              opacity: [null, Math.random() < 0.5 ? 0 : 0.8]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              repeatType: 'reverse' 
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-10 lg:pt-0">
        <motion.div 
          className="relative z-10 text-center mb-12 lg:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 bg-[#6C00FF]/20 rounded-full border border-[#6C00FF]/30 text-[#00EEFF] text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Redefina o futuro da sua empresa com IA</span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-orbitron font-bold mb-6 leading-none"
          >
            <span className="block">O Futuro Chegou com</span> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C00FF] via-[#9D00FF] to-[#00EEFF] inline-block mt-2">Voonzave</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-2xl sm:text-3xl mb-6 text-gray-300 font-orbitron font-light"
          >
            <span className="text-[#00EEFF]">Automatize.</span> <span className="text-[#FF00B8]">Lucre.</span> <span className="text-[#6C00FF]">Domine.</span>
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg"
          >
            Plataforma de automação impulsionada por inteligência artificial que otimiza seus processos de negócio e maximiza seus resultados sem esforço manual.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <motion.a 
              href="#" 
              className="inline-flex items-center px-8 py-4 rounded-lg text-white text-lg font-bold bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] shadow-lg shadow-[#6C00FF]/30 hover:shadow-[#00EEFF]/50 hover:from-[#00EEFF] hover:to-[#6C00FF] transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="mr-2 h-5 w-5" />
              Comece Agora
            </motion.a>
            
            <motion.a 
              href="#features" 
              className="inline-flex items-center px-8 py-4 rounded-lg text-[#00EEFF] text-lg font-medium bg-[#00EEFF]/5 border border-[#00EEFF]/30 hover:bg-[#00EEFF]/10 transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Saiba Mais
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`inline-block h-10 w-10 rounded-full ring-2 ring-black border-2 border-[#00EEFF]/30 ${
                    ['bg-[#150030]', 'bg-[#1A0045]', 'bg-[#0A242F]', 'bg-[#141414]', 'bg-[#003040]'][i]
                  }`}
                ></div>
              ))}
            </div>
            <span className="text-gray-400 font-medium">+5.200 usuários ativos</span>
            
            <div className="hidden md:flex ml-8 items-center px-4 py-2 bg-[#0A0A0A]/80 rounded-full border border-[#6C00FF]/20">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-ping"></div>
                <span className="text-green-400 text-sm">870</span>
                <span className="text-gray-500 mx-2">•</span>
                <span className="text-gray-400 text-sm">online agora</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 1,
            type: "spring",
            damping: 15
          }}
          className="mt-16 lg:mt-24 flex justify-center mb-8"
        >
          <motion.a 
            href="#features" 
            className="flex flex-col items-center text-gray-400 hover:text-[#00EEFF] transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="mb-2 text-sm">Descubra mais</span>
            <ChevronDown className="h-6 w-6" />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Horizontal line with glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6C00FF] to-transparent opacity-20"></div>
      
      {/* Grid pattern bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10"></div>
    </section>
  );
}
