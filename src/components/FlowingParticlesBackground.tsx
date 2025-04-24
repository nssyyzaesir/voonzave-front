import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FlowingParticlesBackgroundProps {
  intensity?: number; // Controls brightness and visibility of particles
  density?: number; // Number of particles
  speed?: number; // Animation speed
  mouseInteraction?: boolean; // Whether particles react to mouse movement
  color1?: string; // Primary color (in hex)
  color2?: string; // Secondary color (in hex)
  color3?: string; // Tertiary color (in hex)
}

export default function FlowingParticlesBackground({
  intensity = 0.7,
  density = 70,
  speed = 0.4,
  mouseInteraction = true,
  color1 = '#6C00FF', // Purple
  color2 = '#00EEFF', // Cyan
  color3 = '#FF00B8', // Magenta
}: FlowingParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // Initialize scene once on component mount
  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup function to handle component unmount
    const cleanup = () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }
    };

    // Convert hex colors to THREE.Color
    const threeColor1 = new THREE.Color(color1);
    const threeColor2 = new THREE.Color(color2);
    const threeColor3 = new THREE.Color(color3);

    // Setup scene, camera, renderer
    const init = () => {
      cleanup(); // Clean up any existing scene
      
      const container = containerRef.current;
      if (!container) return;
      
      // Create scene with dark background
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0x0A0A0A);
      
      // Set up perspective camera
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;
      camera.position.z = 20;
      
      // Initialize WebGL renderer with transparency
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      rendererRef.current = renderer;
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
      container.appendChild(renderer.domElement);
      
      // Create flowing particles
      createFlowingParticles();
      
      // Start animation loop
      animate();
    };

    // Create flowing particles system
    const createFlowingParticles = () => {
      if (!sceneRef.current) return;
      
      // Calculate number of particles based on density
      const particleCount = density * 30;
      
      // Create geometry for particles
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      
      // Set initial random positions, colors and sizes
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position in 3D space
        positions[i3] = (Math.random() - 0.5) * 30;
        positions[i3 + 1] = (Math.random() - 0.5) * 30;
        positions[i3 + 2] = (Math.random() - 0.5) * 30;
        
        // Assign cyberpunk color palette based on probability
        let color;
        const colorChoice = Math.random();
        
        if (colorChoice < 0.4) {
          color = threeColor1;
        } else if (colorChoice < 0.7) {
          color = threeColor2;
        } else {
          color = threeColor3;
        }
        
        // Store RGB values
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        // Particle size with some variation
        sizes[i] = Math.random() * 0.5 * intensity;
      }
      
      // Add attributes to geometry
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Create shader material for glowing particles
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.7 * intensity,
        blending: THREE.AdditiveBlending, // Creates a glow effect
      });
      
      // Create particle system
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particlesRef.current = particles;
      sceneRef.current.add(particles);
    };

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;
      
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Update particle positions to create flowing effect
      const positions = particlesRef.current.geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3;
        
        // Create flowing motion using sine/cosine waves with offset based on position
        const x = positions.array[i3];
        const y = positions.array[i3 + 1];
        const z = positions.array[i3 + 2];
        
        // Apply flowing motion
        positions.array[i3] += Math.sin(y * 0.1 + elapsedTime * speed) * 0.03;
        positions.array[i3 + 1] += Math.cos(x * 0.1 + elapsedTime * speed) * 0.03;
        positions.array[i3 + 2] += Math.sin(z * 0.1 + elapsedTime * speed * 0.5) * 0.03;
        
        // Apply mouse interaction if enabled
        if (mouseInteraction) {
          // Calculate distance to mouse position (in normalized device coordinates)
          const mouseX = mouseRef.current.x;
          const mouseY = mouseRef.current.y;
          
          // Mouse repulsion/attraction effect
          const dx = x / 15 - mouseX;
          const dy = y / 15 - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 1) {
            // Particles close to the mouse get pushed away
            positions.array[i3] += dx * 0.02;
            positions.array[i3 + 1] += dy * 0.02;
          }
        }
        
        // Keep particles within bounds
        const limit = 15;
        if (positions.array[i3] < -limit || positions.array[i3] > limit) {
          positions.array[i3] *= -0.95;
        }
        if (positions.array[i3 + 1] < -limit || positions.array[i3 + 1] > limit) {
          positions.array[i3 + 1] *= -0.95;
        }
        if (positions.array[i3 + 2] < -limit || positions.array[i3 + 2] > limit) {
          positions.array[i3 + 2] *= -0.95;
        }
      }
      
      positions.needsUpdate = true;
      
      // Subtle camera movement
      cameraRef.current.position.x = Math.sin(elapsedTime * 0.1) * 0.3;
      cameraRef.current.position.y = Math.cos(elapsedTime * 0.1) * 0.3;
      cameraRef.current.lookAt(0, 0, 0);
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    // Track mouse position for interactive particles
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse coordinates to normalized device coordinates (-1 to +1)
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const container = containerRef.current;
      
      // Update camera aspect ratio
      cameraRef.current.aspect = container.clientWidth / container.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      
      // Update renderer size
      rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    };

    // Initialize
    init();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cleanup();
    };
  }, [intensity, density, speed, mouseInteraction, color1, color2, color3]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 w-full h-full" 
      style={{ pointerEvents: 'none' }}
    />
  );
}