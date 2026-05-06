import React from 'react';
import { CreditCard, Truck, ShieldCheck, Zap } from 'lucide-react';
import './BenefitsBar.css';

const BenefitsBar = () => {
  return (
    <section className="benefits-bar">
      <div className="container benefits-grid">
        <div className="benefit-item">
          <div className="benefit-icon-wrapper">
            <Zap className="benefit-icon" />
          </div>
          <div className="benefit-info">
            <span className="benefit-title">10% DE DESCONTO</span>
            <span className="benefit-desc">No PIX ou Boleto</span>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon-wrapper">
            <CreditCard className="benefit-icon" />
          </div>
          <div className="benefit-info">
            <span className="benefit-title">6X SEM JUROS</span>
            <span className="benefit-desc">Parcela mínima R$ 50</span>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon-wrapper">
            <Truck className="benefit-icon" />
          </div>
          <div className="benefit-info">
            <span className="benefit-title">FRETE GRÁTIS</span>
            <span className="benefit-desc">Acima de R$ 250</span>
          </div>
        </div>

        <div className="benefit-item">
          <div className="benefit-icon-wrapper">
            <ShieldCheck className="benefit-icon" />
          </div>
          <div className="benefit-info">
            <span className="benefit-title">COMPRA SEGURA</span>
            <span className="benefit-desc">Site 100% Protegido</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsBar;


