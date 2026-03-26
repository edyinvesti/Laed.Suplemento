import React from 'react';
import { X, ShoppingCart, Star, Heart, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './QuickView.css';

const QuickView = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsCartOpen, toggleWishlist, isWishlisted, viewProduct } = useStore();

  if (!quickViewProduct) return null;

  const { id, name, price, originalPrice, discount, image, rating, reviews, flavor, goal } = quickViewProduct;
  const wishlisted = isWishlisted(id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const handleFullView = () => {
    viewProduct(quickViewProduct);
    setQuickViewProduct(null);
  };

  return (
    <div className="quickview-overlay" onClick={() => setQuickViewProduct(null)}>
      <div className="quickview-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setQuickViewProduct(null)}>
          <X size={24} />
        </button>

        <div className="quickview-content">
          <div className="quickview-image">
            <img src={image} alt={name} />
          </div>

          <div className="quickview-info">
            <div className="quickview-header">
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < rating ? "var(--accent-yellow)" : "none"} stroke="var(--accent-yellow)" />
                ))}
                <span className="reviews-count">({reviews} avaliações)</span>
              </div>
              <h2 className="product-title">{name}</h2>
              <p className="product-brand">LAED SUPLEMENTOS</p>
            </div>

            <div className="price-box">
              {originalPrice && (
                <span className="old-price">R$ {originalPrice.toFixed(2).replace('.', ',')}</span>
              )}
              <div className="current-price-row">
                <span className="price">R$ {price.toFixed(2).replace('.', ',')}</span>
                {discount && <span className="discount">-{discount}% OFF</span>}
              </div>
              <p className="pix-price">ou <strong>R$ {(price * 0.9).toFixed(2).replace('.', ',')}</strong> no PIX (10% OFF)</p>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="label">Objetivo:</span>
                <span className="value">{goal || 'Massa Muscular'}</span>
              </div>
              <div className="meta-item">
                <span className="label">Disponibilidade:</span>
                <span className="value stock">Em Estoque</span>
              </div>
            </div>

            <div className="quickview-actions">
              <button className="btn-add-cart" onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                ADICIONAR AO CARRINHO
              </button>
              <button 
                className={`btn-wishlist ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(id)}
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <button className="btn-view-details" onClick={handleFullView}>
              VER DETALHES COMPLETOS
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
