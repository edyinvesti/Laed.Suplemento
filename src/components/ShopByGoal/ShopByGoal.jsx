import React from 'react';
import { Dumbbell, Flame, Zap, Heart } from 'lucide-react';
import './ShopByGoal.css';

const goals = [
  { id: 'massa', label: 'MASSA MUSCULAR', icon: <Dumbbell size={45} />, desc: 'Hipertrofia e Força', bgImage: '/laed-goal-massa.jpg' },
  { id: 'emagrecimento', label: 'EMAGRECIMENTO', icon: <Flame size={45} />, desc: 'Queima e Definição' },
  { id: 'energia', label: 'ENERGIA E FOCO', icon: <Zap size={45} />, desc: 'Treinos Intensos' },
  { id: 'saude', label: 'SAÚDE E BEM-ESTAR', icon: <Heart size={45} />, desc: 'Imunidade e Vitalidade' },
];

const ShopByGoal = () => {
  return (
    <section className="shop-by-goal-section">
      <div className="container">
        <h2 className="section-title text-center">COMPRE POR OBJETIVO</h2>
        <div className="goal-grid">
          {goals.map((goal) => (
            <div 
              key={goal.id} 
              className={`goal-card ${goal.bgImage ? 'has-bg' : ''}`}
              style={goal.bgImage ? { backgroundImage: `url(${goal.bgImage})` } : {}}
            >
              <div className="goal-overlay"></div>
              <div className="goal-icon-glow"></div>
              <div className="goal-icon">{goal.icon}</div>
              <div className="goal-content">
                <h3>{goal.label}</h3>
                <p>{goal.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByGoal;
