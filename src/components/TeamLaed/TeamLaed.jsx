import React from 'react';
import './TeamLaed.css';

const TeamLaed = () => {
  return (
    <section className="team-laed-section">
      <div className="team-overlay"></div>
      <div className="container team-content">
        <h2 className="team-title">A ELITE DA ALTA PERFORMANCE</h2>
        <p className="team-description">
          Os maiores nomes do esporte nacional confiam na pureza e tecnologia da LAED Suplementos para quebrarem seus próprios limites todos os dias. Junte-se ao time dos campeões.
        </p>
        
        <div className="team-stats">
          <div className="stat-item">
            <span className="stat-number">+50</span>
            <span className="stat-label">ATLETAS PRO</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">RESULTADOS REAIS</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">#1</span>
            <span className="stat-label">EM QUALIDADE</span>
          </div>
        </div>
        
        <button className="btn-team">CONHEÇA NOSSO TIME</button>
      </div>
    </section>
  );
};

export default TeamLaed;


