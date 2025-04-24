import { ReactNode } from 'react';
import FlowingParticlesBackground from './FlowingParticlesBackground';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative">
      <FlowingParticlesBackground 
        intensity={0.65} 
        density={50} 
        speed={0.4} 
        mouseInteraction={true}
        color1="#6C00FF"
        color2="#00EEFF"
        color3="#FF00B8"
      />
      {children}
    </div>
  );
}
