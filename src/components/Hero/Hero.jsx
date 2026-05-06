import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="badge">NOVIDADE</span>
          <h1>A EVOLUÇÃO DO SEU TREINO COMEÇA AQUI.</h1>
          <p>Suplementos de alta performance com a pureza e transparência que você merece.</p>
          <div className="hero-actions">
            <button className="btn-primary">VER LANÇAMENTOS</button>
            <button className="btn-secondary">OFERTAS DO DIA</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/laed-cyber-bottles.png" alt="LAED SUPLEMENTOS" />
        </div>
      </div>
    </section>
  );
};

export default Hero;


