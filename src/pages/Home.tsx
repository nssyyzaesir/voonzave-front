import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import EmailCapture from '@/components/EmailCapture';
import FAQ from '@/components/FAQ';
import OfferModal from '@/components/OfferModal';
import LoadingScreen from '@/components/LoadingScreen';
import ProductShowcase from '@/components/ProductShowcase';
import StorePlans from '@/components/StorePlans';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simular um tempo de carregamento para a tela de loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Smooth scroll for navigation links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId || '');
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    const handleScroll = () => {
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add('bg-opacity-95');
          navbar.classList.remove('bg-opacity-70');
        } else {
          navbar.classList.add('bg-opacity-70');
          navbar.classList.remove('bg-opacity-95');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <ProductShowcase />
      <Testimonials />
      <StorePlans />
      <FAQ />
      <EmailCapture />
      <CTA />
      <Footer />
      <OfferModal />
    </>
  );
}
