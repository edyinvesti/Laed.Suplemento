import React from 'react';
import './MarqueeTicker.css';

const MarqueeTicker = () => {
  const promoText = "🔥 A LAED TE LEVA PRO ARNOLD! • COMPRE ACIMA DE R$ 279,90 E CONCORRA A UM PAR DE INGRESSOS • ";
  
  // For a seamless loop, we just need two sets of the text
  // The CSS will animate from 0 to -50%
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span className="marquee-text">{promoText}{promoText}{promoText}{promoText}</span>
        <span className="marquee-text">{promoText}{promoText}{promoText}{promoText}</span>
      </div>
    </div>
  );
};

export default MarqueeTicker;


