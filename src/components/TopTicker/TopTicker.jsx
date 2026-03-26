import React from 'react';
import './TopTicker.css';

const TopTicker = () => {
  const text = "🔥 A LAED TE LEVA PRO ARNOLD! • COMPRE ACIMA DE R$ 279,90 E CONCORRA A UM PAR DE INGRESSOS • ";
  
  return (
    <div className="top-ticker-wrapper">
      <div className="top-ticker-content">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default TopTicker;
