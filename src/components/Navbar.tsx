import { useState, useEffect } from 'react';
import { Menu, X, LogIn, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser } = useAuth();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Links do menu com rota relativa
  const menuLinks = [
    { name: 'Recursos', href: '/#recursos' },
    { name: 'Depoimentos', href: '/#depoimentos' },
    { name: 'Planos', href: '/#planos' },
    { name: 'FAQ', href: '/#faq' },
  ];
  
  // Adicionando um tratamento especial para o botão de login/dashboard
  const authButton = currentUser ? (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to="/dashboard" 
        className="bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] hover:from-[#00EEFF] hover:to-[#6C00FF] text-white px-5 py-2 rounded-md font-medium transition-all duration-300 shadow-lg shadow-[#6C00FF]/20 hover:shadow-[#00EEFF]/30 flex items-center"
      >
        <UserIcon className="h-4 w-4 mr-1" />
        Dashboard
      </Link>
    </motion.div>
  ) : (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Link 
        to="/login" 
        className="bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] hover:from-[#00EEFF] hover:to-[#6C00FF] text-white px-5 py-2 rounded-md font-medium transition-all duration-300 shadow-lg shadow-[#6C00FF]/20 hover:shadow-[#00EEFF]/30 flex items-center"
      >
        <LogIn className="h-4 w-4 mr-1" />
        Entrar
      </Link>
    </motion.div>
  );

  // Versão mobile do botão de autenticação
  const mobileAuthButton = currentUser ? (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Link 
        to="/dashboard" 
        className="block px-3 py-3 text-white bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] rounded-md my-3 font-medium flex items-center"
        onClick={() => setMobileMenuOpen(false)}
      >
        <UserIcon className="h-4 w-4 mr-2" />
        Dashboard
      </Link>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Link 
        to="/login" 
        className="block px-3 py-3 text-white bg-gradient-to-r from-[#6C00FF] to-[#00EEFF] rounded-md my-3 font-medium flex items-center"
        onClick={() => setMobileMenuOpen(false)}
      >
        <LogIn className="h-4 w-4 mr-2" />
        Entrar
      </Link>
    </motion.div>
  );

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 glass-effect transition-all duration-300 ${
        scrolled
          ? 'py-2 backdrop-blur-lg bg-[#0A0A0A]/90 shadow-lg shadow-[#6C00FF]/10'
          : 'py-4 bg-[#0A0A0A]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-orbitron font-bold gradient-text tracking-wider">VOONZAVE</h1>
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {menuLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-[#00EEFF] transition-colors font-medium relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00EEFF] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            
            {authButton}
          </div>
          <div className="md:hidden flex items-center">
            <motion.button 
              type="button" 
              className="text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#00EEFF]" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden glass-effect bg-[#0A0A0A] bg-opacity-95 backdrop-blur-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuLinks.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-3 text-gray-300 hover:text-[#00EEFF] transition-colors border-l-2 border-transparent hover:border-[#00EEFF] hover:pl-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {mobileAuthButton}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}