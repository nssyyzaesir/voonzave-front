import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqs: FAQItem[] = [
    {
      question: "O que é o Voonzave e como ele pode ajudar meu negócio?",
      answer: "Voonzave é uma plataforma de automação impulsionada por inteligência artificial que otimiza processos de negócio. Ela reduz trabalho manual, automatiza tarefas repetitivas e utiliza algoritmos avançados para identificar oportunidades de crescimento que seriam invisíveis para análises tradicionais."
    },
    {
      question: "Quanto tempo leva para implementar o Voonzave?",
      answer: "A implementação do Voonzave é rápida e simples. Usuários do plano gratuito podem começar imediatamente. Para planos Pro e Ultra, nosso processo de onboarding leva de 24 a 72 horas, incluindo a configuração personalizada e treinamento inicial da sua equipe."
    },
    {
      question: "Como funciona a integração com outros sistemas?",
      answer: "O Voonzave oferece APIs robustas e conectores pré-construídos para as principais plataformas de mercado. Nossos planos Pro e Ultra incluem integrações com serviços como Salesforce, SAP, Google Analytics, e muitos outros. Nossa equipe técnica pode auxiliar com integrações específicas para seu negócio."
    },
    {
      question: "O Voonzave é seguro? Como meus dados são protegidos?",
      answer: "A segurança é nossa prioridade. Utilizamos criptografia de ponta a ponta, seguimos os padrões GDPR e SOC2, e realizamos auditorias de segurança regulares. Todos os dados são armazenados em servidores com certificação de segurança de nível militar, e você mantém total propriedade sobre seus dados."
    },
    {
      question: "Posso migrar facilmente de outros sistemas para o Voonzave?",
      answer: "Sim! Desenvolvemos ferramentas de migração que facilitam a transição de outros sistemas. Nossa equipe de suporte guiará você em cada etapa do processo, garantindo que todos os seus dados sejam transferidos com segurança e precisão, minimizando qualquer interrupção no seu negócio."
    },
    {
      question: "Como é o suporte técnico oferecido?",
      answer: "Oferecemos diferentes níveis de suporte conforme seu plano. Usuários gratuitos têm acesso à documentação e fórum da comunidade. O plano Pro inclui suporte por e-mail e chat com tempo de resposta de 24h. O plano Ultra oferece suporte prioritário 24/7 por e-mail, chat e telefone, com tempo de resposta garantido de 4 horas."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] opacity-5"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6C00FF] rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00EEFF] rounded-full filter blur-3xl opacity-10"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-[#00EEFF]/10 rounded-full border border-[#00EEFF]/20 text-[#00EEFF] text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Respostas para suas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">Dúvidas</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Tudo o que você precisa saber sobre o Voonzave</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`bg-[#0F0F18] rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 ${
                activeIndex === index ? 'shadow-lg' : ''
              }`}
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-medium text-left text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ml-4 p-1 rounded-full ${
                    activeIndex === index 
                      ? 'bg-[#6C00FF]/20 text-[#6C00FF]' 
                      : 'bg-gray-800/50 text-gray-400'
                  }`}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 text-gray-400">
                  <div className="h-px w-full bg-gray-800 mb-5"></div>
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Ainda tem dúvidas? Entre em contato com nosso suporte</p>
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-[#6C00FF] text-base font-medium rounded-md text-[#6C00FF] bg-transparent hover:bg-[#6C00FF]/10 transition-all"
          >
            Falar com especialista
          </a>
        </motion.div>
      </div>
    </section>
  );
}