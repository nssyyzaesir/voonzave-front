import { motion } from 'framer-motion';

export default function Stats() {
  const stats = [
    { value: '99%', label: 'Precisão' },
    { value: '82%', label: 'Economia de tempo' },
    { value: '24/7', label: 'Disponibilidade' },
    { value: '15x', label: 'ROI médio' }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] bg-opacity-60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="text-center"
            >
              <p className="text-4xl font-orbitron font-bold gradient-text">{stat.value}</p>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
