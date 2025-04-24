import { Star, Quote, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      content: "O Voonzave revolucionou meu negócio. Em apenas 3 meses, consegui automatizar 85% das operações diárias e aumentar minha receita em 43%. A interface é incrivelmente intuitiva e o suporte técnico é excepcional.",
      author: "João Silva",
      role: "Empreendedor Digital",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      highlight: "85% de automação em 3 meses",
      gradient: "from-[#6C00FF] to-[#00EEFF]"
    },
    {
      content: "Como investidora, precisava de insights rápidos e precisos. O Voonzave fornece dados que me permitem tomar decisões com confiança. O retorno sobre investimento foi impressionante, recuperei o valor em apenas 20 dias.",
      author: "Carla Mendes",
      role: "Investidora",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      highlight: "ROI em apenas 20 dias",
      gradient: "from-[#00EEFF] to-[#0088FF]"
    },
    {
      content: "A integração com IA do Voonzave é simplesmente fenomenal. Consigo prever tendências de mercado com precisão surpreendente. Minha produtividade aumentou 300% desde que comecei a usar o sistema.",
      author: "Rafael Gomes",
      role: "CEO, Nextech",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      highlight: "Produtividade 3x maior",
      gradient: "from-[#FF00B8] to-[#6C00FF]"
    }
  ];
  
  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1));
  };

  return (
    <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Gradient overlay background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A14] via-[#0F0F18] to-[#0A0A14] -z-10"></div>
      
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')] opacity-20 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6C00FF] to-transparent opacity-20"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00EEFF] to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div 
          data-aos="fade-up" 
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-[#00EEFF]/10 rounded-full border border-[#00EEFF]/20 text-[#00EEFF] text-sm font-medium mb-6">
            DEPOIMENTOS VERIFICADOS
          </div>
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">O Que Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">Usuários Dizem</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Depoimentos de profissionais que transformaram seus negócios com Voonzave</p>
        </div>

        {/* Desktop layout - Grid */}
        <div 
          data-aos="fade-up"
          data-aos-delay="200"
          className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative bg-[#0F0F18] rounded-xl overflow-hidden p-1 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#6C00FF]/20"
            >
              {/* Border gradient */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-30 rounded-xl" style={{
                background: `linear-gradient(135deg, ${testimonial.gradient.split(' ')[0].replace('from-', '').replace('[', '').replace(']', '')}, ${testimonial.gradient.split(' ')[1].replace('to-', '').replace('[', '').replace(']', '')})`
              }}></div>
              
              <div className="relative bg-[#0F0F18] rounded-lg p-6 h-full flex flex-col">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="w-10 h-10 text-[#00EEFF]" />
                </div>
                
                {/* Rating stars */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="mr-1 h-5 w-5" 
                      fill={i < testimonial.rating ? "#00EEFF" : "none"} 
                      stroke={i < testimonial.rating ? "none" : "#4A5568"}
                    />
                  ))}
                </div>
                
                {/* Highlight */}
                <div className="mb-4 inline-block px-3 py-1 bg-gradient-to-r rounded-full text-xs font-semibold" style={{
                  background: `linear-gradient(90deg, ${testimonial.gradient.split(' ')[0].replace('from-', '').replace('[', '').replace(']', '')}20, ${testimonial.gradient.split(' ')[1].replace('to-', '').replace('[', '').replace(']', '')}10)`,
                  color: testimonial.gradient.split(' ')[1].replace('to-', '').replace('[', '').replace(']', '')
                }}>
                  {testimonial.highlight}
                </div>
                
                {/* Content */}
                <p className="text-gray-300 mb-6 flex-grow">{testimonial.content}</p>
                
                {/* Author */}
                <div className="flex items-center mt-auto">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="h-12 w-12 rounded-full mr-4 border-2" 
                    style={{
                      borderColor: testimonial.gradient.split(' ')[0].replace('from-', '').replace('[', '').replace(']', '')
                    }}
                  />
                  <div>
                    <h4 className="font-medium text-white">{testimonial.author}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile layout - Carousel */}
        <div className="block md:hidden">
          <div className="relative bg-[#0F0F18] rounded-xl overflow-hidden p-1 transition-all duration-300 mb-8">
            {/* Border gradient */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-30 rounded-xl" style={{
              background: `linear-gradient(135deg, ${testimonials[activeIndex].gradient.split(' ')[0].replace('from-', '').replace('[', '').replace(']', '')}, ${testimonials[activeIndex].gradient.split(' ')[1].replace('to-', '').replace('[', '').replace(']', '')})`
            }}></div>
            
            <div className="relative bg-[#0F0F18] rounded-lg p-6 h-full flex flex-col">
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="w-10 h-10 text-[#00EEFF]" />
              </div>
              
              {/* Rating stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="mr-1 h-5 w-5" 
                    fill={i < testimonials[activeIndex].rating ? "#00EEFF" : "none"} 
                    stroke={i < testimonials[activeIndex].rating ? "none" : "#4A5568"}
                  />
                ))}
              </div>
              
              {/* Highlight */}
              <div className="mb-4 inline-block px-3 py-1 bg-gradient-to-r rounded-full text-xs font-semibold" style={{
                background: `linear-gradient(90deg, ${testimonials[activeIndex].gradient.split(' ')[0].replace('from-', '').replace('[', '').replace(']', '')}20, ${testimonials[activeIndex].gradient.split(' ')[1].replace('to-', '').replace('[', '').replace(']', '')}10)`,
                color: testimonials[activeIndex].gradient.split(' ')[1].replace('to-', '').replace('[', '').replace(']', '')
              }}>
                {testimonials[activeIndex].highlight}
              </div>
              
              {/* Content */}
              <p className="text-gray-300 mb-6">{testimonials[activeIndex].content}</p>
              
              {/* Author */}
              <div className="flex items-center">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].author} 
                  className="h-12 w-12 rounded-full mr-4 border-2" 
                  style={{
                    borderColor: testimonials[activeIndex].gradient.split(' ')[0].replace('from-', '').replace('[', '').replace(']', '')
                  }}
                />
                <div>
                  <h4 className="font-medium text-white">{testimonials[activeIndex].author}</h4>
                  <p className="text-sm text-gray-400">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-between items-center">
            <button 
              onClick={handlePrev}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-[#0F0F18] border border-[#6C00FF]/20 text-white hover:bg-[#6C00FF]/10 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? 'w-6 bg-[#00EEFF]' : 'w-2 bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-[#0F0F18] border border-[#00EEFF]/20 text-white hover:bg-[#00EEFF]/10 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div 
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-12 text-center"
        >
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-[#00EEFF] text-base font-medium rounded-md text-[#00EEFF] bg-transparent hover:bg-[#00EEFF]/10 transition-all hover:translate-x-1"
          >
            Ver mais depoimentos
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        
        {/* Trust indicators */}
        <div
          data-aos="fade-up"
          data-aos-delay="800"
          className="mt-16 pt-10 border-t border-gray-800"
        >
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm uppercase tracking-wider">Confiado por empresas líderes de mercado</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {['Google', 'Microsoft', 'Amazon', 'Tesla', 'IBM'].map((company, i) => (
              <div key={i} className="grayscale hover:grayscale-0 transition-all">
                <p className="text-gray-400 font-medium text-lg">{company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
