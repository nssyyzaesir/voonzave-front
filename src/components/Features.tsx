import { motion } from 'framer-motion';
import { 
  Bot, 
  TrendingUp, 
  Gauge, 
  Brain,
  CheckCircle,
  BarChart,
  FolderSync,
  Cpu,
  Rocket
} from 'lucide-react';

export default function Features() {
  const benefits = [
    {
      icon: <Bot className="w-6 h-6 text-[#6C00FF]" />,
      title: 'Automatização de tarefas',
      description: 'Reduza até 95% do trabalho manual da sua equipe com nossa tecnologia preditiva de automação de processos.',
      gradientStart: '#6C00FF',
      gradientEnd: '#9D00FF'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#00EEFF]" />,
      title: 'Lucro passivo',
      description: 'Nossas estratégias de otimização geram receita enquanto você dorme, com algoritmos de alta performance.',
      gradientStart: '#00EEFF',
      gradientEnd: '#00A1FF'
    },
    {
      icon: <Brain className="w-6 h-6 text-[#FF00B8]" />,
      title: 'Integração com IA',
      description: 'Algoritmos de machine learning que evoluem com seu negócio e identificam oportunidades invisíveis.',
      gradientStart: '#FF00B8',
      gradientEnd: '#FF0066'
    }
  ];

  const features = [
    {
      icon: <Gauge className="w-5 h-5 text-[#6C00FF]" />,
      title: 'Painel intuitivo',
      description: 'Interface futurista com visualização de dados em tempo real para tomada de decisões instantâneas.',
    },
    {
      icon: <Rocket className="w-5 h-5 text-[#00EEFF]" />,
      title: 'Escalabilidade',
      description: 'Cresça de 10 para 10.000 operações diárias sem interrupções ou perda de performance.',
    },
    {
      icon: <BarChart className="w-5 h-5 text-[#6C00FF]" />,
      title: 'Analytics avançado',
      description: 'Visualize métricas detalhadas e extraia insights com nosso dashboard personalizado.',
    },
    {
      icon: <FolderSync className="w-5 h-5 text-[#00EEFF]" />,
      title: 'Backup automático',
      description: 'Seus dados são sincronizados e protegidos com criptografia de nível militar.',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="recursos" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div 
          data-aos="fade-up"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Tecnologia <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">Revolutionary</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Descubra os recursos avançados que estão transformando negócios ao redor do mundo</p>
        </div>

        {/* Main benefits cards - horizontal layout */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="flex flex-col md:flex-row lg:flex-col rounded-xl overflow-hidden bg-[#0F0F15] border border-[rgba(108,0,255,0.1)] shadow-xl transform transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2"
            >
              <div 
                className="md:w-1/3 lg:w-full p-6 relative h-48 md:h-auto lg:h-48 flex items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(circle at center, ${benefit.gradientStart}20 0%, transparent 70%)`
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-[#0A0A0A] opacity-60 z-0"></div>
                
                {/* Animated glow */}
                <div 
                  className="absolute w-24 h-24 rounded-full z-0"
                  style={{
                    background: `radial-gradient(circle at center, ${benefit.gradientStart}40 0%, transparent 70%)`,
                    animation: 'pulse 3s infinite alternate ease-in-out'
                  }}
                ></div>
                
                {/* Icon container */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-[#0F0F15] border-2`} style={{
                  borderColor: benefit.gradientStart,
                  boxShadow: `0 0 20px ${benefit.gradientStart}50`
                }}>
                  <div className="w-8 h-8">
                    {benefit.icon}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 md:p-8 relative">
                <h3 className="text-xl font-orbitron font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-400 mb-4">{benefit.description}</p>
                <motion.a 
                  href="#" 
                  className="inline-flex items-center font-medium relative"
                  style={{ color: benefit.gradientStart }}
                  whileHover={{ x: 5 }}
                >
                  Saiba mais
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Secondary features in grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                boxShadow: '0 10px 25px -5px rgba(108, 0, 255, 0.4)'
              }}
              className="p-6 rounded-lg bg-[#121212] border border-[#222] hover:border-[#6C00FF]/30 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#6C00FF]/10 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Advanced section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#1A1A1A]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F15] to-[#151525] z-0"></div>
          
          <div className="relative z-10 grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#6C00FF]/20 text-[#00EEFF] text-xs font-medium mb-4">
                <Cpu className="h-3 w-3 mr-1" />
                TECNOLOGIA PROPRIETÁRIA
              </div>
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold mb-4">Inteligência <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00EEFF] to-[#6C00FF]">Adaptativa</span></h3>
              <p className="text-gray-400 mb-6">Ao contrário de outras soluções, o Voonzave utiliza algoritmos proprietários que evoluem com o uso, adaptando-se às necessidades específicas do seu negócio.</p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Previsão de tendências com 97% de precisão",
                  "Resposta automática a eventos de mercado",
                  "Segurança avançada com proteção quântica"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <div className="h-6 w-6 rounded-full bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.a 
                href="#" 
                className="inline-flex items-center text-[#00EEFF] hover:text-[#6C00FF] transition-colors font-medium"
                whileHover={{ x: 5 }}
              >
                Veja nossa documentação técnica
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
            
            <div className="relative h-64 md:h-auto flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[#0A0A14] bg-opacity-90 z-0"></div>
              
              <svg 
                className="relative z-10 w-full h-full max-w-lg"
                viewBox="0 0 800 600" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="800" height="600" fill="none" />
                
                {/* AI Brain Network Visualization */}
                <g opacity="0.9">
                  <circle cx="400" cy="300" r="150" fill="none" stroke="#6C00FF" strokeWidth="1" strokeOpacity="0.3" />
                  <circle cx="400" cy="300" r="100" fill="none" stroke="#00EEFF" strokeWidth="1" strokeOpacity="0.5" />
                  <circle cx="400" cy="300" r="50" fill="none" stroke="#FF00B8" strokeWidth="1" strokeOpacity="0.7" />
                  
                  {/* Connection points */}
                  {[...Array(20)].map((_, i) => (
                    <g key={i}>
                      <circle 
                        cx={400 + Math.cos(i * Math.PI / 10) * 150} 
                        cy={300 + Math.sin(i * Math.PI / 10) * 150} 
                        r="4" 
                        fill="#6C00FF" 
                      />
                      <circle 
                        cx={400 + Math.cos((i + 2) * Math.PI / 10) * 100} 
                        cy={300 + Math.sin((i + 2) * Math.PI / 10) * 100} 
                        r="3" 
                        fill="#00EEFF" 
                      />
                      <circle 
                        cx={400 + Math.cos((i + 5) * Math.PI / 10) * 50} 
                        cy={300 + Math.sin((i + 5) * Math.PI / 10) * 50} 
                        r="2" 
                        fill="#FF00B8" 
                      />
                    </g>
                  ))}
                  
                  {/* Random connection lines with animation */}
                  {[...Array(30)].map((_, i) => (
                    <line 
                      key={i}
                      x1={400 + Math.cos(i * Math.PI / 15) * (50 + (i % 3) * 50)} 
                      y1={300 + Math.sin(i * Math.PI / 15) * (50 + (i % 3) * 50)}
                      x2={400 + Math.cos((i + 10) * Math.PI / 15) * (50 + ((i + 1) % 3) * 50)} 
                      y2={300 + Math.sin((i + 10) * Math.PI / 15) * (50 + ((i + 1) % 3) * 50)}
                      stroke={i % 3 === 0 ? "#6C00FF" : (i % 3 === 1 ? "#00EEFF" : "#FF00B8")}
                      strokeWidth="1"
                      strokeOpacity="0.6"
                    >
                      <animate 
                        attributeName="strokeOpacity"
                        values="0.2;0.8;0.2"
                        dur={`${3 + i % 5}s`}
                        repeatCount="indefinite" 
                      />
                    </line>
                  ))}
                </g>
                
                {/* Animated Brain Element */}
                <g>
                  <path 
                    d="M400,250 C430,250 450,270 450,300 C450,330 430,350 400,350 C370,350 350,330 350,300 C350,270 370,250 400,250 Z" 
                    fill="none" 
                    stroke="#FFFFFF" 
                    strokeWidth="2" 
                    strokeOpacity="0.7"
                  >
                    <animate 
                      attributeName="d" 
                      values="M400,250 C430,250 450,270 450,300 C450,330 430,350 400,350 C370,350 350,330 350,300 C350,270 370,250 400,250 Z;
                              M400,240 C435,240 460,270 460,300 C460,330 435,360 400,360 C365,360 340,330 340,300 C340,270 365,240 400,240 Z;
                              M400,250 C430,250 450,270 450,300 C450,330 430,350 400,350 C370,350 350,330 350,300 C350,270 370,250 400,250 Z" 
                      dur="8s" 
                      repeatCount="indefinite" 
                    />
                  </path>
                  
                  <path 
                    d="M380,270 L380,330 M420,270 L420,330 M380,300 L420,300" 
                    stroke="#00EEFF" 
                    strokeWidth="2" 
                    strokeOpacity="0.8"
                  >
                    <animate 
                      attributeName="stroke" 
                      values="#00EEFF;#6C00FF;#FF00B8;#00EEFF" 
                      dur="8s" 
                      repeatCount="indefinite" 
                    />
                  </path>
                </g>
                
                {/* Pulse animation */}
                <circle cx="400" cy="300" r="200" fill="none" stroke="#6C00FF" strokeWidth="3" strokeOpacity="0.2">
                  <animate attributeName="r" from="20" to="200" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>
              
              {/* Overlay gradient */}
              <div className="absolute top-0 bottom-0 -right-1 w-20 bg-gradient-to-l from-[#0F0F15] to-transparent z-20"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
