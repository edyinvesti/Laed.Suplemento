import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './ProductCard.css';

const ProductCard = ({ product, layout = 'vertical', isReversed = false, showMarketingText = false }) => {
  const { name, price, originalPrice, discount, image, rating, reviews, badge } = product;
  const { addToCart, toggleWishlist, isWishlisted, setIsCartOpen, viewProduct, setQuickViewProduct } = useStore();
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleBuy = (e) => {
    e.stopPropagation(); // prevent viewing product
    addToCart(product);
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
        {badge && <span className={`product-badge ${badge.type}`}>{badge.text}</span>}
        <img src={image} alt={name} className="product-image" />
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          title={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <div className="product-overlay">
          <button 
            className="quick-view"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
          >
            ESPIADA RÁPIDA
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{name}</h3>

        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < rating ? "var(--accent-yellow)" : "none"} stroke="var(--accent-yellow)" />
          ))}
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
          {originalPrice && <span className="original-price">R$ {originalPrice.toFixed(2).replace('.', ',')}</span>}
          <div className="current-price-row">
            <span className="current-price">R$ {price.toFixed(2).replace('.', ',')}</span>
            {discount && <span className="discount-tag">-{discount}%</span>}
          </div>
        </div>

        <button className={`btn-buy ${added ? 'added' : ''} pill`} onClick={handleBuy}>
          {added ? 'ADICIONADO!' : 'COMPRAR'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


