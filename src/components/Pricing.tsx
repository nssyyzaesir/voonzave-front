import React, { useState } from 'react';
import { Check, X, Calendar, Zap, Shield, BadgeCheck, Sparkles, Clock, Headphones, Cpu } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
    {
      name: 'Grátis',
      description: 'Para iniciantes e experimentação',
      priceMonthly: 'R$0',
      priceAnnual: 'R$0',
      discount: null,
      period: '/mês',
      color: '#94A3B8',
      features: [
        { included: true, highlight: false, text: '1 automação ativa' },
        { included: true, highlight: false, text: 'Até 100 operações/mês' },
        { included: true, highlight: false, text: 'Painel básico de métricas' },
        { included: true, highlight: false, text: 'Suporte via e-mail' },
        { included: false, highlight: false, text: 'Sem acesso à integração IA' },
        { included: false, highlight: false, text: 'Sem suporte prioritário' }
      ],
      cta: 'Começar Grátis',
      ctaStyle: 'border-2 border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300',
      iconBg: 'bg-gray-800',
      icon: <Clock className="h-5 w-5 text-gray-300" />,
      highlight: false
    },
    {
      name: 'Pro',
      description: 'Para profissionais e times pequenos',
      priceMonthly: 'R$97',
      priceAnnual: 'R$77',
      discount: 'Economize 20%',
      period: '/mês',
      color: '#00EEFF',
      features: [
        { included: true, highlight: true, text: '10 automações simultâneas' },
        { included: true, highlight: true, text: 'Operações ilimitadas' },
        { included: true, highlight: false, text: 'Painel completo de análises' },
        { included: true, highlight: false, text: 'Integrações via API' },
        { included: true, highlight: true, text: 'Integração IA básica' },
        { included: true, highlight: false, text: 'Suporte prioritário por chat' }
      ],
      cta: 'Assinar Agora',
      ctaStyle: 'bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] hover:from-[#00EEFF] hover:to-[#6C00FF] text-white',
      iconBg: 'bg-[#00EEFF]',
      icon: <Zap className="h-5 w-5 text-black" />,
      highlight: true
    },
    {
      name: 'Ultra',
      description: 'Para empresas e equipes avançadas',
      priceMonthly: 'R$297',
      priceAnnual: 'R$237',
      discount: 'Economize 20%',
      period: '/mês',
      color: '#FF00B8',
      features: [
        { included: true, highlight: true, text: 'Automações ilimitadas' },
        { included: true, highlight: false, text: 'Operações ilimitadas' },
        { included: true, highlight: false, text: 'Painel personalizado avançado' },
        { included: true, highlight: true, text: 'IA avançada com predição' },
        { included: true, highlight: true, text: 'Acesso antecipado a novos recursos' },
        { included: true, highlight: false, text: 'Suporte dedicado 24/7' }
      ],
      cta: 'Falar com Vendas',
      ctaStyle: 'bg-gradient-to-r from-[#FF00B8] to-[#6C00FF] hover:from-[#6C00FF] hover:to-[#FF00B8] text-white',
      iconBg: 'bg-[#FF00B8]',
      icon: <BadgeCheck className="h-5 w-5 text-white" />,
      highlight: false
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
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
  
  // Table comparison data
  const featureGroups = [
    {
      title: 'Recursos Básicos',
      features: [
        { name: 'Automações', free: '1', pro: '10', ultra: 'Ilimitadas' },
        { name: 'Operações mensais', free: '100', pro: 'Ilimitadas', ultra: 'Ilimitadas' },
        { name: 'Usuários', free: '1', pro: '5', ultra: 'Ilimitados' },
        { name: 'Espaço de armazenamento', free: '500 MB', pro: '50 GB', ultra: '1 TB' },
      ]
    },
    {
      title: 'Inteligência Artificial',
      features: [
        { name: 'Assistente IA', free: '—', pro: 'Básico', ultra: 'Avançado' },
        { name: 'Predição de tendências', free: '—', pro: 'Limitado', ultra: 'Completo' },
        { name: 'Análise de dados', free: 'Básica', pro: 'Avançada', ultra: 'Premium' },
        { name: 'Automação por IA', free: '—', pro: 'Sim', ultra: 'Aprimorada' },
      ]
    },
    {
      title: 'Suporte',
      features: [
        { name: 'Canais de suporte', free: 'E-mail', pro: 'E-mail, Chat', ultra: 'E-mail, Chat, Telefone' },
        { name: 'Tempo de resposta', free: '48h', pro: '24h', ultra: '4h' },
        { name: 'Gerente dedicado', free: '—', pro: '—', ultra: 'Sim' },
        { name: 'Treinamento', free: 'Documentação', pro: 'Webinars', ultra: 'Personalizado' },
      ]
    }
  ];

  return (
    <section id="planos" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] opacity-5"></div>
      <div className="absolute top-0 -right-64 w-96 h-96 bg-[#6C00FF] rounded-full blur-[150px] opacity-20"></div>
      <div className="absolute bottom-0 -left-64 w-96 h-96 bg-[#00EEFF] rounded-full blur-[150px] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          data-aos="fade-up"
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-[#6C00FF]/10 rounded-full border border-[#6C00FF]/20 text-[#6C00FF] text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Planos flexíveis para cada necessidade</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Escolha seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">Plano</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Oferecemos soluções para todos os tamanhos de negócio com preços acessíveis</p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`text-sm mr-3 ${!isAnnual ? 'text-white font-medium' : 'text-gray-400'}`}>Mensal</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 flex items-center bg-[#1A1A1A] rounded-full p-1 cursor-pointer"
            >
              <div 
                className={`absolute bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] w-6 h-6 rounded-full shadow-md transition-transform transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0.5'}`}
              />
            </button>
            <span className={`text-sm ml-3 ${isAnnual ? 'text-white font-medium' : 'text-gray-400'}`}>Anual</span>
            <span className="ml-2 inline-block px-2 py-1 bg-[#6C00FF]/20 text-[#6C00FF] text-xs font-medium rounded">Economize 20%</span>
          </div>
        </div>

        {/* Price Cards */}
        <div 
          data-aos="fade-up"
          data-aos-delay="200"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {plans.map((plan, index) => (
            <div 
              key={index}
              data-aos="fade-up" 
              data-aos-delay={index * 100}
              className={`
                relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2
                ${plan.highlight ? 'bg-gradient-to-b from-[#0F0F18] to-[#0F1124] shadow-xl shadow-[#6C00FF]/10 border border-[#00EEFF]/30 z-10' : 'bg-[#0F0F18] border border-gray-800'}
              `}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 px-6 py-2 bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Mais Popular</span>
                </div>
              )}
              
              <div className={`p-8 ${plan.highlight ? 'pt-12' : ''}`}>
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-lg ${plan.iconBg} flex items-center justify-center mr-3`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-orbitron font-bold" style={{ color: plan.color }}>{plan.name}</h3>
                </div>
                
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-orbitron font-bold">{isAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                  
                  {plan.discount && isAnnual && (
                    <p className="text-green-400 text-sm mt-2">{plan.discount}</p>
                  )}
                </div>
                
                <button 
                  className={`w-full py-3 px-4 text-center font-medium rounded-lg transition-all hover:scale-[1.03] active:scale-[0.98] ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              </div>
              
              <div className="p-6 pt-2 border-t border-gray-800">
                <p className="text-sm text-gray-500 mb-4">Inclui:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5 mr-3`} style={{ 
                          background: `linear-gradient(135deg, ${plan.color}, ${plan.highlight ? '#00EEFF' : plan.color})` 
                        }}>
                          <Check className="h-3 w-3 text-black" />
                        </div>
                      ) : (
                        <X className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5 mr-3" />
                      )}
                      <span className={`text-sm ${feature.highlight ? 'text-white font-medium' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Price comparison table (Desktop) */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="hidden lg:block mb-20 overflow-hidden rounded-xl border border-gray-800"
        >
          <div className="bg-[#0F0F18]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0A0A14]">
                  <th className="p-4 text-left text-gray-400 font-medium border-b border-gray-800">Comparativo completo</th>
                  {plans.map((plan, index) => (
                    <th key={index} className={`p-4 text-center ${plan.highlight ? 'bg-[#0F1124]' : ''} border-b border-gray-800`}>
                      <span className="text-lg font-orbitron font-bold" style={{ color: plan.color }}>{plan.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureGroups.map((group, groupIndex) => {
                  return group.features.map((feature, featureIndex) => {
                    // Header row for each group, only on first feature
                    if (featureIndex === 0) {
                      return (
                        <React.Fragment key={`group-${groupIndex}-${featureIndex}`}>
                          <tr key={`group-header-${groupIndex}`} className="bg-[#0A0A14]">
                            <td colSpan={4} className="p-3 pl-4 font-medium text-gray-300 border-b border-gray-800">
                              {group.title}
                            </td>
                          </tr>
                          <tr key={`feature-${groupIndex}-${featureIndex}`} className={featureIndex % 2 === 0 ? 'bg-[#0F0F18]' : 'bg-[#0A0A14]'}>
                            <td className="p-3 pl-4 text-gray-400 border-b border-gray-800">{feature.name}</td>
                            <td className="p-3 text-center text-gray-400 border-b border-gray-800">
                              {feature.free === '—' ? (
                                <X className="h-5 w-5 text-gray-600 mx-auto" />
                              ) : (
                                <span>{feature.free}</span>
                              )}
                            </td>
                            <td className={`p-3 text-center ${plans[1].highlight ? 'bg-[#0F1124]' : ''} border-b border-gray-800`}>
                              {feature.pro === '—' ? (
                                <X className="h-5 w-5 text-gray-600 mx-auto" />
                              ) : (
                                <span className={feature.pro.includes('Sim') || feature.pro.includes('Avançada') ? 'text-[#00EEFF] font-medium' : 'text-gray-300'}>
                                  {feature.pro}
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-center border-b border-gray-800">
                              {feature.ultra === '—' ? (
                                <X className="h-5 w-5 text-gray-600 mx-auto" />
                              ) : (
                                <span className={feature.ultra.includes('Sim') || feature.ultra.includes('Avançado') || feature.ultra.includes('Premium') || feature.ultra.includes('Ilimitado') ? 'text-[#FF00B8] font-medium' : 'text-gray-300'}>
                                  {feature.ultra}
                                </span>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    }
                    
                    // Regular feature rows
                    return (
                      <tr key={`feature-${groupIndex}-${featureIndex}`} className={featureIndex % 2 === 0 ? 'bg-[#0F0F18]' : 'bg-[#0A0A14]'}>
                        <td className="p-3 pl-4 text-gray-400 border-b border-gray-800">{feature.name}</td>
                        <td className="p-3 text-center text-gray-400 border-b border-gray-800">
                          {feature.free === '—' ? (
                            <X className="h-5 w-5 text-gray-600 mx-auto" />
                          ) : (
                            <span>{feature.free}</span>
                          )}
                        </td>
                        <td className={`p-3 text-center ${plans[1].highlight ? 'bg-[#0F1124]' : ''} border-b border-gray-800`}>
                          {feature.pro === '—' ? (
                            <X className="h-5 w-5 text-gray-600 mx-auto" />
                          ) : (
                            <span className={feature.pro.includes('Sim') || feature.pro.includes('Avançada') ? 'text-[#00EEFF] font-medium' : 'text-gray-300'}>
                              {feature.pro}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-center border-b border-gray-800">
                          {feature.ultra === '—' ? (
                            <X className="h-5 w-5 text-gray-600 mx-auto" />
                          ) : (
                            <span className={feature.ultra.includes('Sim') || feature.ultra.includes('Avançado') || feature.ultra.includes('Premium') || feature.ultra.includes('Ilimitado') ? 'text-[#FF00B8] font-medium' : 'text-gray-300'}>
                              {feature.ultra}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div 
          data-aos="fade-up"
          data-aos-delay="500"
          className="relative rounded-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F18] to-[#0A0A14]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          
          <div className="relative p-8 md:p-12 grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#6C00FF]/20 text-[#6C00FF] text-xs font-medium mb-4">
                <Shield className="h-3 w-3 mr-1" />
                ENTERPRISE
              </div>
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold mb-4">Precisa de um <span className="text-[#FF00B8]">plano personalizado?</span></h3>
              <p className="text-gray-400 mb-6 text-lg">Para empresas com necessidades avançadas, oferecemos soluções customizadas com recursos exclusivos.</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-[#FF00B8] to-[#6C00FF] flex items-center justify-center mr-3 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-300">Integração com sistemas legados da sua empresa</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-[#FF00B8] to-[#6C00FF] flex items-center justify-center mr-3 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-300">Treinamento personalizado para sua equipe</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-[#FF00B8] to-[#6C00FF] flex items-center justify-center mr-3 mt-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-300">SLA garantido e suporte de engenheiros dedicados</span>
                </li>
              </ul>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="inline-flex items-center px-6 py-3 border border-[#6C00FF] text-base font-medium rounded-md text-[#6C00FF] bg-transparent hover:bg-[#6C00FF]/10 hover:scale-105 active:scale-98 transition-all"
                >
                  Falar com Consultores
                  <Headphones className="ml-2 h-5 w-5" />
                </a>
                
                <a 
                  href="#" 
                  className="inline-flex items-center px-6 py-3 border border-[#00EEFF] text-base font-medium rounded-md text-[#00EEFF] bg-transparent hover:bg-[#00EEFF]/10 hover:scale-105 active:scale-98 transition-all"
                >
                  Agendar Demonstração
                  <Calendar className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2 relative">
              <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0A0A14] to-[#121230] p-1">
                <div className="relative w-full h-full bg-[#0A0A14] rounded-lg p-8 flex flex-col items-center justify-center text-center">
                  <Cpu className="h-12 w-12 mb-6 text-[#FF00B8]" />
                  <h4 className="text-xl font-orbitron font-bold mb-3 text-white">Enterprise</h4>
                  <p className="text-gray-400 mb-6">Soluções personalizadas para empresas com necessidades específicas</p>
                  <p className="text-sm text-gray-500">Entre em contato para obter um orçamento personalizado</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-[#FF00B8] rounded-full blur-[60px] opacity-20"></div>
              <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-[#6C00FF] rounded-full blur-[60px] opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
