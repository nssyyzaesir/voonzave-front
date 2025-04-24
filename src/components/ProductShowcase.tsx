import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Heart, Zap } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  
  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  
  const products = [
    {
      id: 1,
      name: "AutoBot Pro",
      description: "Automatização avançada para e-commerce",
      price: "R$ 1.299",
      image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.8,
      reviews: 124,
      badge: "Mais vendido",
      badgeColor: "#6C00FF"
    },
    {
      id: 2,
      name: "Analyzer X",
      description: "Dashboard de análise preditiva",
      price: "R$ 899",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.6,
      reviews: 89,
      badge: "Novo",
      badgeColor: "#00EEFF"
    },
    {
      id: 3,
      name: "DataSync Ultra",
      description: "Sincronização de dados em tempo real",
      price: "R$ 1.599",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.9,
      reviews: 76,
      badge: "Premium",
      badgeColor: "#FF00B8"
    },
    {
      id: 4,
      name: "AI Assistant",
      description: "Assistente virtual com IA avançada",
      price: "R$ 799",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.7,
      reviews: 52,
      badge: null,
      badgeColor: null
    },
    {
      id: 5,
      name: "MarketTracker",
      description: "Monitoramento de tendências de mercado",
      price: "R$ 1.199",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&h=300&auto=format&fit=crop",
      rating: 4.5,
      reviews: 38,
      badge: "Promoção",
      badgeColor: "#00D084"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#6C00FF] rounded-full filter blur-[100px] opacity-10"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00EEFF] rounded-full filter blur-[100px] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          data-aos="fade-up"
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-[#6C00FF]/10 rounded-full border border-[#6C00FF]/20 text-[#6C00FF] text-sm font-medium mb-6">
            <ShoppingCart className="h-4 w-4 mr-2" />
            <span>Produtos em Destaque</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C00FF] to-[#00EEFF]">Linha Premium</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Descubra nossa coleção de produtos de automação e análise de dados</p>
        </div>
        
        <div className="relative">
          {/* Carousel navigation buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0F0F18]/80 border border-gray-800 rounded-full p-2 text-white -ml-4 hidden md:block hover:scale-110 active:scale-95 transition-transform"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#0F0F18]/80 border border-gray-800 rounded-full p-2 text-white -mr-4 hidden md:block hover:scale-110 active:scale-95 transition-transform"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Embla carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-4"
                >
                  <div className="bg-[#0F0F18] rounded-xl overflow-hidden border border-gray-800 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#6C00FF]/10 hover:border-[#6C00FF]/30">
                    <div className="relative h-48">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                      
                      {product.badge && (
                        <div 
                          className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-bold text-white"
                          style={{ backgroundColor: product.badgeColor }}
                        >
                          {product.badge}
                        </div>
                      )}
                      
                      <button className="absolute top-3 right-3 p-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-yellow-500 text-sm font-medium ml-1">{product.rating}</span>
                        <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-bold text-white">{product.price}</span>
                          <div className="flex items-center text-sm text-[#00EEFF]">
                            <Zap className="h-4 w-4 mr-1" />
                            <span>Acesso imediato</span>
                          </div>
                        </div>
                        
                        <button
                          className="w-full py-2.5 px-4 rounded-lg bg-[#6C00FF]/10 border border-[#6C00FF]/30 text-[#6C00FF] hover:bg-[#6C00FF]/20 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Comprar agora
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-6 bg-[#6C00FF]' : 'bg-gray-600'
                }`}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
              />
            ))}
          </div>
        </div>
        
        <div 
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center font-medium text-[#00EEFF] hover:translate-x-1 transition-transform"
          >
            Ver todos os produtos
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}