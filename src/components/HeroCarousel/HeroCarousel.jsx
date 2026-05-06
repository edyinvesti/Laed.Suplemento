import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
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
    action: { type: 'filter', value: 'Whey Protein' },
  },
  {
    id: 1,
    bgImage: '/laed-cyber-bottles.png',
    eyebrow: 'AGORA COM DESCONTO EXCLUSIVO',
    title: 'R$ 159,90',
    subtitle: 'KIT WHEY CONCENTRADO + CREATINA',
    description: '23g PROTEÍNA + 3g CREATINA POR DIA POR APENAS R$ 4,85 A DOSE.',
    buttonText: 'COMPRAR AGORA',
    action: { type: 'filter', value: 'Kits' },
  },
  {
    id: 2,
    bgImage: '/laed-hero-gym.png',
    eyebrow: 'FOCO TOTAL:',
    title: 'SUA MELHOR VERSÃO',
    subtitle: 'ESTÁ AQUI',
    description: 'Equipamentos e suplementos de elite para quem não aceita menos que o topo.',
    buttonText: 'COMEÇAR AGORA',
    action: { type: 'scroll' },
  },
  {
    id: 3,
    bgImage: '/laed-hero-gym-2.jpg',
    eyebrow: 'MÁXIMA RESISTÊNCIA:',
    title: 'TREINE PESADO',
    subtitle: 'O SEU LIMITE É SÓ O COMEÇO',
    description: 'A base para a hipertrofia e definição. Produtos desenvolvidos para quem não encontra desculpas.',
    buttonText: 'LINHA PERFORMANCE',
    action: { type: 'filter', value: 'Pré-Treino' },
  },
  {
    id: 4,
    bgImage: '/laed-hero-gym-3.jpg',
    eyebrow: 'FORÇA BASE:',
    title: 'TREINO SÉRIO',
    subtitle: 'A CONSTRUÇÃO COMEÇA AQUI',
    description: 'Nutrição esportiva avançada para quem desafia a gravidade.',
    buttonText: 'VER LINHA DE FORÇA',
    action: { type: 'filter', value: 'Creatina' },
  },
  {
    id: 5,
    bgImage: '/laed-hero-gym-4.jpg',
    eyebrow: 'DUPLA PERFORMANCE:',
    title: 'FOCO TOTAL',
    subtitle: 'JUNTOS NA MESMA SINTONIA',
    description: 'Suplementação premium para quem entende que o resultado é construído todos os dias.',
    buttonText: 'VER KITS EM OFERTA',
    action: { type: 'filter', value: 'Kits' },
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { clearFilters, toggleFilter } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = (action) => {
    if (action.type === 'filter') {
      clearFilters();
      toggleFilter('categoria', action.value);
      setTimeout(() => {
        const el = document.querySelector('.main-content');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (action.type === 'scroll') {
      const el = document.querySelector('.main-content');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero-carousel" aria-label="Destaques e promoções">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          aria-hidden={index !== currentSlide}
        >
          <div
            className="carousel-slide-img"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
          <div className="container carousel-content">
            <span className="carousel-eyebrow">{slide.eyebrow}</span>
            <h1 className="carousel-title">{slide.title}</h1>
            <h3 className="carousel-subtitle">{slide.subtitle}</h3>
            <p className="carousel-desc">{slide.description}</p>
            <button
              className="carousel-btn"
              onClick={() => handleAction(slide.action)}
            >
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}

      <div className="carousel-dots" role="tablist" aria-label="Slides">
        {slides.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === currentSlide}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
