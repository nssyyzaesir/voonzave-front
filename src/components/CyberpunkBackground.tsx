import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CyberpunkBackgroundProps {
  intensity?: number; // Controls the overall visual intensity of the effect
  density?: number; // Controls number of particles
  speed?: number; // Controls animation speed
  responsive?: boolean; // If true, adjust to window resize
}

export default function CyberpunkBackground({
  intensity = 0.8,
  density = 80,
  speed = 0.5,
  responsive = true
}: CyberpunkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>(0);
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

    // Setup scene, camera, renderer
    const init = () => {
      cleanup(); // Clean up any existing scene
      
      const container = containerRef.current;
      if (!container) return;
      
      // Create scene and add fog for depth
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.fog = new THREE.FogExp2(0x0A0A0A, 0.035);
      scene.background = new THREE.Color(0x0A0A0A); // Dark background
      
      // Setup camera
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;
      camera.position.z = 15;
      
      // Initialize renderer with alpha for transparency
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      rendererRef.current = renderer;
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      
      // Create particles
      createParticles();
      
      // Create grid
      createGrid();

      // Start animation
      animate();
    };

    // Create particle system
    const createParticles = () => {
      if (!sceneRef.current) return;
      
      // Create particle geometry
      const particleCount = density * 25; // Adjust based on density
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      
      // Set random positions, colors, and sizes for particles
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position particles in a cube formation
        positions[i3] = (Math.random() - 0.5) * 50;
        positions[i3 + 1] = (Math.random() - 0.5) * 50;
        positions[i3 + 2] = (Math.random() - 0.5) * 50;
        
        // Assign cyberpunk-inspired colors
        // Decide which color theme to use for this particle
        if (Math.random() < 0.6) {
          // Purple/blue spectrum for 60% of particles
          colors[i3] = 0.4 + Math.random() * 0.2; // Red (purple component)
          colors[i3 + 1] = 0.0; // Green
          colors[i3 + 2] = 0.8 + Math.random() * 0.2; // Blue
        } else if (Math.random() < 0.8) {
          // Cyan spectrum for 20% of particles
          colors[i3] = 0.0; // Red
          colors[i3 + 1] = 0.8 + Math.random() * 0.2; // Green
          colors[i3 + 2] = 0.8 + Math.random() * 0.2; // Blue
        } else {
          // Magenta spectrum for remaining 20% of particles
          colors[i3] = 0.8 + Math.random() * 0.2; // Red
          colors[i3 + 1] = 0.0; // Green
          colors[i3 + 2] = 0.8 + Math.random() * 0.2; // Blue
        }
        
        // Random particle size, weighted toward smaller particles
        sizes[i] = Math.random() * 3 * intensity;
      }
      
      // Add attributes to geometry
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Create shader material for particles
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending, // Additive blending for glow effect
      });
      
      // Create particle system
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particlesRef.current = particles;
      sceneRef.current.add(particles);
    };

    // Create a glowing grid effect
    const createGrid = () => {
      if (!sceneRef.current) return;
      
      // Grid size and divisions
      const size = 30;
      const divisions = 20;
      
      // Create grid helper
      const gridHelper = new THREE.GridHelper(size, divisions);
      
      // Customize grid color
      if (gridHelper.material instanceof THREE.Material) {
        gridHelper.material.opacity = 0.2 * intensity;
        gridHelper.material.transparent = true;
        gridHelper.material.color.set(0x6C00FF); // Purple tint
      } else if (Array.isArray(gridHelper.material)) {
        // Aplicar configurações em cada material no array
        for (let i = 0; i < gridHelper.material.length; i++) {
          const mat = gridHelper.material[i] as THREE.Material;
          if (mat) {
            mat.opacity = 0.2 * intensity;
            mat.transparent = true;
            if (Math.random() > 0.5) {
              (mat as THREE.MeshBasicMaterial).color.set(0x6C00FF); // Purple
            } else {
              (mat as THREE.MeshBasicMaterial).color.set(0x00EEFF); // Cyan
            }
          }
        }
      }
      
      // Position grid below center
      gridHelper.position.y = -5;
      gridHelper.position.z = 0;
      
      // Add to scene
      sceneRef.current.add(gridHelper);
      
      // Create second grid for layered effect, rotated
      const gridHelper2 = new THREE.GridHelper(size * 2, divisions);
      if (gridHelper2.material instanceof THREE.Material) {
        gridHelper2.material.opacity = 0.1 * intensity;
        gridHelper2.material.transparent = true;
        gridHelper2.material.color.set(0x00EEFF); // Cyan tint
      } else if (Array.isArray(gridHelper2.material)) {
        // Aplicar configurações em cada material no array
        for (let i = 0; i < gridHelper2.material.length; i++) {
          const mat = gridHelper2.material[i] as THREE.Material;
          if (mat) {
            mat.opacity = 0.1 * intensity;
            mat.transparent = true;
            (mat as THREE.MeshBasicMaterial).color.set(0x00EEFF); // Cyan
          }
        }
      }
      
      // Position and rotate second grid
      gridHelper2.position.y = -8;
      gridHelper2.position.z = -2;
      gridHelper2.rotation.x = Math.PI * 0.1;
      
      // Add to scene
      sceneRef.current.add(gridHelper2);
    };

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const delta = clockRef.current.getDelta();
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Animate particle positions
      if (particlesRef.current) {
        particlesRef.current.rotation.y += delta * 0.05 * speed;
        
        // Update particle positions
        const positions = particlesRef.current.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const i3 = i * 3;
          
          // Create a subtle wave motion
          positions.array[i3 + 1] += Math.sin(elapsedTime * speed + i * 0.1) * 0.01;
          
          // Move particles slowly toward camera
          positions.array[i3 + 2] += 0.02 * speed;
          
          // Reset particles that get too close
          if (positions.array[i3 + 2] > 20) {
            positions.array[i3 + 2] = -20;
          }
        }
        positions.needsUpdate = true;
      }
      
      // Subtle camera movement
      cameraRef.current.position.y = Math.sin(elapsedTime * 0.3) * 0.5;
      cameraRef.current.position.x = Math.cos(elapsedTime * 0.5) * 0.5;
      cameraRef.current.lookAt(sceneRef.current.position);
      
      // Render the scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const container = containerRef.current;
      
      // Update camera aspect
      cameraRef.current.aspect = container.clientWidth / container.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      
      // Update renderer size
      rendererRef.current.setSize(container.clientWidth, container.clientHeight);
    };

    // Initialize scene
    init();
    
    // Add resize event listener
    if (responsive) {
      window.addEventListener('resize', handleResize);
    }

    // Cleanup on unmount
    return () => {
      if (responsive) {
        window.removeEventListener('resize', handleResize);
      }
      cleanup();
    };
  }, [intensity, density, speed, responsive]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 w-full h-full" 
      style={{ pointerEvents: 'none' }}
    />
  );
}