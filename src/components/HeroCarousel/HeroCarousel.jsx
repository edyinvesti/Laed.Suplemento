import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';

const slides = [
  {
    id: 0,
    bgImage: '/laed-bg-arnold.png',
    eyebrow: 'A LAED TE LEVA',
    title: 'PRO ARNOLD!',
    subtitle: 'COMPRE ACIMA DE R$ 279,90',
    description: 'E concorra a um par de ingressos para o maior evento multiesportivo do ano!',
    buttonText: 'COMPRE AGORA',
    align: 'left'
  },
  {
    id: 1,
    bgImage: '/laed-cyber-bottles.png',
    eyebrow: 'AGORA COM DESCONTO EXCLUSIVO',
    title: 'R$ 159,90',
    subtitle: 'KIT WHEY CONCENTRADO + CREATINA',
    description: '23g PROTEÍNA + 3g CREATINA POR DIA POR APENAS R$ 4,85 A DOSE.',
    buttonText: 'COMPRAR AGORA',
    align: 'left'
  },
  {
    id: 2,
    bgImage: '/laed-hero-gym.png',
    eyebrow: 'FOCO TOTAL:',
    title: 'SUA MELHOR VERSÃO',
    subtitle: 'ESTÁ AQUI',
    description: 'Equipamentos e suplementos de elite para quem não aceita menos que o topo. Treine com LAED.',
    buttonText: 'COMEÇAR AGORA',
    align: 'left'
  },
  {
    id: 3,
    bgImage: '/laed-hero-gym-2.jpg',
    eyebrow: 'MÁXIMA RESISTÊNCIA:',
    title: 'TREINE PESADO',
    subtitle: 'O SEU LIMITE É SÓ O COMEÇO',
    description: 'A base para a hipertrofia e definição. Produtos desenvolvidos para quem não encontra desculpas.',
    buttonText: 'LINHA PERFORMANCE',
    align: 'left'
  },
  {
    id: 7,
    bgImage: '/laed-hero-gym-3.jpg',
    eyebrow: 'FORÇA BASE:',
    title: 'TREINO SÉRIO',
    subtitle: 'A CONSTRUÇÃO COMEÇA AQUI',
    description: 'Nutrição esportiva avançada para quem desafia a gravidade. Supere suas marcas com a tecnologia LAED.',
    buttonText: 'VER LINHA DE FORÇA',
    align: 'left'
  },
  {
    id: 8,
    bgImage: '/laed-hero-gym-4.jpg',
    eyebrow: 'DUPLA PERFORMANCE:',
    title: 'FOCO TOTAL',
    subtitle: 'JUNTOS NA MESMA SINTONIA',
    description: 'Suplementação premium para quem entende que o resultado é construído todos os dias, lado a lado.',
    buttonText: 'VER KITS EM OFERTA',
    align: 'left'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 2000); // 2 seconds interval
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-carousel">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div 
            className="carousel-slide-img" 
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          ></div>
          <div className="container carousel-content">
            <span className="carousel-eyebrow">{slide.eyebrow}</span>
            <h1 className="carousel-title">{slide.title}</h1>
            <h3 className="carousel-subtitle">{slide.subtitle}</h3>
            <p className="carousel-desc">{slide.description}</p>
            <button className="carousel-btn">{slide.buttonText}</button>
          </div>
        </div>
      ))}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
