import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Check, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './ProductCard.css';

const ProductCard = ({ product, layout = 'vertical', isReversed = false, showMarketingText = false, flashPrice = null, flashDiscount = null }) => {
  const { name, price, originalPrice, discount, image, rating, reviews, badge } = product;
  const { addToCart, toggleWishlist, isWishlisted, setIsCartOpen, viewProduct, setQuickViewProduct } = useStore();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const displayPrice = flashPrice || price;
  const displayDiscount = flashDiscount || discount;
  const pixPrice = (displayPrice * 0.90).toFixed(2).replace('.', ',');
  const installments = (displayPrice / 6).toFixed(2).replace('.', ',');

  const handleBuy = (e) => {
    e.stopPropagation();
    addToCart({ ...product, price: displayPrice });
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className={`product-card ${layout} ${isReversed ? 'reversed' : ''}`}
      onClick={() => viewProduct(product)}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image-container">
        {badge && !flashPrice && <span className={`product-badge ${badge.type}`}>{badge.text}</span>}
        {flashPrice && <span className="flash-badge"><Zap size={10} /> RELÂMPAGO</span>}
        <img
          src={`${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`}
          alt={name}
          className="product-image"
          loading="lazy"
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = `${import.meta.env.BASE_URL}produtos/whey-concentrado-chocolate.png`; 
          }}
        />
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          title={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <div className="product-overlay">
          <button
            className="quick-view"
            onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
          >
            ESPIADA RÁPIDA
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>

        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} fill={i < rating ? 'var(--accent-yellow)' : 'none'} stroke="var(--accent-yellow)" />
          ))}
          {reviews > 0 && <span className="reviews-count">({reviews.toLocaleString('pt-BR')})</span>}
        </div>

        {showMarketingText && (
          <div className="marketing-area">
            <span className="marketing-main">WHEY MAIS VENDIDO DO BRASIL 2023, 2024 E 2025</span>
            <div className="marketing-list-row">
              <div className="m-item"><span className="v-bar">|</span> O WHEY MAIS AVALIADO DO BRASIL</div>
              <div className="m-item"><span className="v-bar">|</span> NÍVEL EUROPEU DE QUALIDADE</div>
            </div>
          </div>
        )}

        <div className="price-container">
          {originalPrice && (
            <div className="original-price-row">
              <span className="original-price">R$ {originalPrice.toFixed(2).replace('.', ',')}</span>
              {displayDiscount && <span className="discount-tag">-{displayDiscount}%</span>}
            </div>
          )}
          <div className="current-price-row">
            <span className="current-price">R$ {displayPrice.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="pix-row">
            <Zap size={11} className="pix-icon" />
            <span className="pix-info">
              <strong>R$ {pixPrice}</strong> no PIX <span className="pix-badge">-10%</span>
            </span>
          </div>
          <span className="installments-info">ou 6x de R$ {installments} sem juros</span>
        </div>

        <button className={`btn-buy ${added ? 'added' : ''}`} onClick={handleBuy} aria-label="Adicionar ao carrinho">
          {added ? <><Check size={15} /> ADICIONADO!</> : <><ShoppingCart size={15} /> COMPRAR</>}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
