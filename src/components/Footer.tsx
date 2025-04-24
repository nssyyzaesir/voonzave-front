import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import VisitCounter from './VisitCounter';

export default function Footer() {
  const links = {
    product: ['Recursos', 'Preços', 'Exemplos', 'Documentação'],
    support: ['Central de Ajuda', 'Suporte Técnico', 'Status', 'Contato'],
    company: ['Sobre', 'Blog', 'Carreiras', 'Imprensa']
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800" data-aos="fade-up" data-aos-delay="200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <h1 className="text-2xl font-orbitron font-bold gradient-text mb-4">VOONZAVE</h1>
            <p className="text-gray-400 mb-6">Automatizando o futuro, uma tarefa por vez.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#00EEFF] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00EEFF] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00EEFF] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00EEFF] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Produto</h3>
            <ul className="space-y-2">
              {links.product.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-[#00EEFF] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Suporte</h3>
            <ul className="space-y-2">
              {links.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-[#00EEFF] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Empresa</h3>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-[#00EEFF] transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contador de visitas */}
        <div className="border-b border-gray-800 pb-6 mb-6">
          <VisitCounter />
        </div>
        
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">&copy; {currentYear} Voonzave. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Termos de Serviço</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Política de Privacidade</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
