import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DistortedGridBackgroundProps {
  intensity?: number; // Visual intensity
  speed?: number; // Animation speed
  color1?: string; // Primary grid color
  color2?: string; // Secondary grid color
  pulseEffect?: boolean; // Whether to add a pulsing light effect
}

export default function DistortedGridBackground({
  intensity = 0.6,
  speed = 0.3,
  color1 = '#6C00FF', // Purple
  color2 = '#00EEFF', // Cyan
  pulseEffect = true,
}: DistortedGridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const gridRef = useRef<THREE.Object3D | null>(null);
  const gridRef2 = useRef<THREE.Object3D | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const frameIdRef = useRef<number>(0);

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
      
      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0x0A0A0A);
      scene.fog = new THREE.FogExp2(0x0A0A0A, 0.05);
      
      // Setup camera
      const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;
      camera.position.set(0, 5, 10);
      camera.lookAt(0, 0, 0);
      
      // Initialize renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      rendererRef.current = renderer;
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      
      // Create distorted grid
      createDistortedGrid();
      
      // Add ambient lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
      scene.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
      directionalLight.position.set(0, 5, 5);
      scene.add(directionalLight);
      
      // Add pulse effect
      if (pulseEffect) {
        createPulseEffect();
      }
      
      // Start animation
      animate();
    };

    // Create a distorted grid effect
    const createDistortedGrid = () => {
      if (!sceneRef.current) return;
      
      // Create primary grid - horizontal plane
      const gridSize = 20;
      const gridDivisions = 20;
      
      // Create a plane geometry for the grid
      const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
      
      // Apply distortion to the vertices
      const positionAttribute = gridGeometry.getAttribute('position');
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        
        // Add some waviness to the grid
        const z = Math.sin(x * 0.3) * 0.5 + Math.cos(y * 0.3) * 0.5;
        
        positionAttribute.setZ(i, z);
      }
      
      // Update geometry
      gridGeometry.computeVertexNormals();
      
      // Create material for the grid
      const gridMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color1),
        wireframe: true,
        transparent: true,
        opacity: 0.3 * intensity,
      });
      
      // Create mesh
      const grid = new THREE.Mesh(gridGeometry, gridMaterial);
      grid.rotation.x = -Math.PI / 2; // Rotate to horizontal
      grid.position.y = -2;
      gridRef.current = grid;
      sceneRef.current.add(grid);
      
      // Create second grid - at an angle
      const gridGeometry2 = new THREE.PlaneGeometry(gridSize * 1.5, gridSize * 1.5, gridDivisions, gridDivisions);
      
      // Apply different distortion pattern
      const positionAttribute2 = gridGeometry2.getAttribute('position');
      for (let i = 0; i < positionAttribute2.count; i++) {
        const x = positionAttribute2.getX(i);
        const y = positionAttribute2.getY(i);
        
        // More complex distortion pattern
        const z = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 1.5;
        
        positionAttribute2.setZ(i, z);
      }
      
      // Update geometry
      gridGeometry2.computeVertexNormals();
      
      // Create material for the second grid
      const gridMaterial2 = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color2),
        wireframe: true,
        transparent: true,
        opacity: 0.2 * intensity,
      });
      
      // Create mesh
      const grid2 = new THREE.Mesh(gridGeometry2, gridMaterial2);
      grid2.rotation.x = -Math.PI / 3; // Angled
      grid2.position.set(0, -1, -5);
      gridRef2.current = grid2;
      sceneRef.current.add(grid2);
    };

    // Create pulsing light effect
    const createPulseEffect = () => {
      if (!sceneRef.current) return;
      
      // Create a soft point light for pulsing glow
      const pulseLight1 = new THREE.PointLight(new THREE.Color(color1), 1, 15);
      pulseLight1.position.set(-5, 2, -3);
      sceneRef.current.add(pulseLight1);
      
      // Create a second pulse light with different color
      const pulseLight2 = new THREE.PointLight(new THREE.Color(color2), 1, 15);
      pulseLight2.position.set(5, 2, -3);
      sceneRef.current.add(pulseLight2);
    };

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Animate grid distortion
      if (gridRef.current) {
        // Get the geometry
        const gridGeometry = (gridRef.current as THREE.Mesh).geometry;
        const positionAttribute = gridGeometry.getAttribute('position');
        
        // Update vertex positions for ripple effect
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i);
          const y = positionAttribute.getY(i);
          
          // Animate distortion over time
          const z = Math.sin(x * 0.3 + elapsedTime * speed) * 0.5 + 
                   Math.cos(y * 0.3 + elapsedTime * speed * 0.7) * 0.5;
          
          positionAttribute.setZ(i, z);
        }
        
        positionAttribute.needsUpdate = true;
        
        // Slowly rotate grid
        gridRef.current.rotation.z += 0.001 * speed;
      }
      
      // Animate second grid with different pattern
      if (gridRef2.current) {
        // Get the geometry
        const gridGeometry = (gridRef2.current as THREE.Mesh).geometry;
        const positionAttribute = gridGeometry.getAttribute('position');
        
        // Update vertex positions with different pattern
        for (let i = 0; i < positionAttribute.count; i++) {
          const x = positionAttribute.getX(i);
          const y = positionAttribute.getY(i);
          
          // Different animation pattern
          const z = Math.sin(x * 0.2 + elapsedTime * speed * 0.5) * 
                   Math.cos(y * 0.2 + elapsedTime * speed * 0.3) * 1.5;
          
          positionAttribute.setZ(i, z);
        }
        
        positionAttribute.needsUpdate = true;
        
        // Rotate in opposite direction
        gridRef2.current.rotation.z -= 0.001 * speed;
      }
      
      // Pulse the lights
      if (pulseEffect && sceneRef.current) {
        // Find the pulse lights
        sceneRef.current.children.forEach(child => {
          if (child instanceof THREE.PointLight) {
            // Adjust intensity for pulsing effect
            child.intensity = (Math.sin(elapsedTime * speed * 0.5) * 0.5 + 0.5) * intensity;
          }
        });
      }
      
      // Subtle camera movement
      cameraRef.current.position.y = 5 + Math.sin(elapsedTime * 0.2) * 0.5;
      cameraRef.current.lookAt(0, 0, 0);
      
      // Render scene
      rendererRef.current.render(sceneRef.current, cameraRef.current);
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
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cleanup();
    };
  }, [intensity, speed, color1, color2, pulseEffect]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 w-full h-full" 
      style={{ pointerEvents: 'none' }}
    />
  );
}