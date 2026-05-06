import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import './Testimonials.css';

const reviews = [
  {
    id: 1,
    name: 'Carlos Oliveira',
    text: 'Melhor Whey que já tomei! O sabor é incrível e a diluição é perfeita. Entrega na metade do tempo.',
    product: 'WHEY ISO 100%'
  },
  {
    id: 2,
    name: 'Mariana Souza',
    text: 'A creatina da LAED fez total diferença nos meus treinos de força. Recomendo de olhos fechados!',
    product: 'CREATINA PURA'
  },
  {
    id: 3,
    name: 'Felipe Santos',
    text: 'O pré-treino é insano. Foco absurdo e zero crash depois. O melhor custo-benefício do mercado.',
    product: 'PRÉ-TREINO NEURO'
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="section-title">O QUE NOSSOS CLIENTES DIZEM</h2>
          <div className="rating-summary">
            <span className="rating-score">4.9/5</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} fill="#FFD700" stroke="#FFD700" />)}
            </div>
            <span className="review-count">Baseado em +15.000 avaliações de clientes reais</span>
          </div>
        </div>

        <div className="testimonials-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-stars">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FFD700" stroke="#FFD700" />)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-footer">
                <div className="reviewer">
                  <span className="reviewer-name">{review.name}</span>
                  <div className="verified-badge">
                    <CheckCircle size={14} />
                    <span>Compra Verificada</span>
                  </div>
                </div>
                <span className="review-product">{review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


