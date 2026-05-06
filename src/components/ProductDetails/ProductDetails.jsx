import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import NutritionalTable from '../NutritionalTable/NutritionalTable';
import './ProductDetails.css';

const ProductDetails = () => {
  const { selectedProduct, addToCart, toggleWishlist, isWishlisted, goToHome } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState('');
  const [shippingResults, setShippingResults] = useState(null);
  const [calculating, setCalculating] = useState(false);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart({ ...selectedProduct, quantity });
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const pixPrice = selectedProduct.price * 0.9; // 10% off

  const handleCalculateShipping = () => {
    if (cep.replace(/\D/g, '').length !== 8) return;
    
    setCalculating(true);
    setShippingResults(null);
    
    // Simulate API delay
    setTimeout(() => {
      setCalculating(false);
      setShippingResults([
        { type: 'PAC', price: 18.90, days: '7 a 10 dias úteis' },
        { type: 'SEDEX', price: 34.50, days: '2 a 4 dias úteis' },
        { type: 'LOGGI (Express)', price: 42.00, days: 'Mesmo dia' }
      ]);
    }, 1200);
  };

  return (
    <div className="product-details-page">
      <div className="container">
        <div className="breadcrumb">
          <span onClick={goToHome}>Início</span>
          <ChevronRight size={14} />
          <span>{selectedProduct.categoria}</span>
          <ChevronRight size={14} />
          <span className="current">{selectedProduct.name}</span>
        </div>

        <div className="product-details-content">
          <div className="product-gallery">
            <div className="main-image-wrapper">
              {selectedProduct.badge && (
                <div className={`product-badge ${selectedProduct.badge.type}`}>
                  {selectedProduct.badge.text}
                </div>
              )}
              <img
                src={`${import.meta.env.BASE_URL}${selectedProduct.image.replace(/^\//, '')}`}
                alt={selectedProduct.name}
                className="main-image"
                onError={(e) => { e.target.onerror = null; e.target.src = `${import.meta.env.BASE_URL}produtos/whey-concentrado-chocolate.png`; }}
              />
            </div>
          </div>

          <div className="product-info-panel">
            <div className="product-brand">{selectedProduct.marca}</div>
            <h1 className="product-title">{selectedProduct.name}</h1>
            
            <div className="product-meta">
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < selectedProduct.rating ? 'filled' : 'empty'} />
                ))}
                <span>({selectedProduct.reviews} avaliações)</span>
              </div>
              <span className="sku">SKU: PD-{selectedProduct.id}992</span>
            </div>

            <div className="product-pricing">
              {selectedProduct.originalPrice > selectedProduct.price && (
                <div className="original-price">De R$ {selectedProduct.originalPrice.toFixed(2).replace('.', ',')}</div>
              )}
              <div className="current-price">R$ {selectedProduct.price.toFixed(2).replace('.', ',')}</div>
              <div className="pix-price">
                <span className="highlight">R$ {pixPrice.toFixed(2).replace('.', ',')}</span> no PIX (10% de desconto)
              </div>
              <div className="installment-price">
                ou 3x de R$ {(selectedProduct.price / 3).toFixed(2).replace('.', ',')} sem juros
              </div>
            </div>

            <div className="product-attributes">
              <div className="attribute-group">
                <span className="attr-label">Sabor:</span>
                <div className="attr-options">
                  <button className="attr-btn active">{selectedProduct.sabor}</button>
                </div>
              </div>
              <div className="attribute-group">
                <span className="attr-label">Tamanho:</span>
                <div className="attr-options">
                  <button className="attr-btn active">{selectedProduct.tamanho}</button>
                </div>
              </div>
            </div>

            <NutritionalTable data={selectedProduct.nutricao} />

            <div className="purchase-actions">
              <div className="quantity-selector">
                <button onClick={decreaseQty}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
              </div>
              
              <button className="btn-buy-large" onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                COMPRAR AGORA
              </button>

              <button 
                className={`btn-wishlist-large ${isWishlisted(selectedProduct.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(selectedProduct.id)}
              >
                <Heart size={24} className={isWishlisted(selectedProduct.id) ? 'filled' : ''} />
              </button>
            </div>

            <div className="trust-features">
              <div className="trust-item">
                <ShieldCheck size={20} />
                <span>Compra 100% Segura</span>
              </div>
              <div className="trust-item">
                <Truck size={20} />
                <span>Envio Expresso para todo o Brasil</span>
              </div>
            </div>
            
            <div className="shipping-calculator">
              <span className="shipping-title">Calcular Frete e Prazo</span>
              <div className="shipping-input-group">
                <input 
                  type="text" 
                  placeholder="00000-000" 
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9))}
                />
                <button onClick={handleCalculateShipping} disabled={calculating}>
                  {calculating ? '...' : 'OK'}
                </button>
              </div>
              <a href="#" className="dont-know-zip">Não sei meu CEP</a>

              {shippingResults && (
                <div className="shipping-results animate-fade-in">
                  {shippingResults.map((res, i) => (
                    <div key={i} className="shipping-row">
                      <div className="shipping-method">
                        <span className="method-name">{res.type}</span>
                        <span className="method-days">{res.days}</span>
                      </div>
                      <span className="method-price">
                        {res.price === 0 ? 'GRÁTIS' : `R$ ${res.price.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  ))}
                  <p className="shipping-disclaimer">Preços e prazos estimados para 1 unidade.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="product-reviews-section">
          <div className="reviews-header">
            <h2>AVALIAÇÕES DE QUEM COMPROU</h2>
            <div className="reviews-summary">
              <div className="summary-big-score">
                <span className="score">{selectedProduct.rating}.0</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < selectedProduct.rating ? 'filled' : 'empty'} />
                  ))}
                </div>
                <span className="total-reviews">Baseado em {selectedProduct.reviews} avaliações</span>
              </div>
              <div className="summary-bars">
                {[5, 4, 3, 2, 1].map(num => (
                  <div key={num} className="summary-bar-row">
                    <span>{num} estrelas</span>
                    <div className="bar-bg">
                      <div className="bar-fill" style={{ width: num === 5 ? '92%' : num === 4 ? '5%' : '1%' }}></div>
                    </div>
                    <span>{num === 5 ? '92%' : num === 4 ? '5%' : '1%'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reviews-list">
            <div className="review-card">
              <div className="review-meta">
                <div className="review-user">
                  <span className="user-name">Carlos Oliveira</span>
                  <span className="verified-purchase">✓ Compra Verificada</span>
                </div>
                <div className="review-score">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="filled" />)}
                </div>
                <span className="review-date">Há 2 dias</span>
              </div>
              <p className="review-comment">
                Produto sensacional! O gosto é muito bom e a solubilidade é perfeita. Chegou muito rápido aqui em SP.
              </p>
            </div>

            <div className="review-card">
              <div className="review-meta">
                <div className="review-user">
                  <span className="user-name">Marina Silva</span>
                  <span className="verified-purchase">✓ Compra Verificada</span>
                </div>
                <div className="review-score">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="filled" />)}
                </div>
                <span className="review-date">Há 1 semana</span>
              </div>
              <p className="review-comment">
                Melhor custo benefício que já encontrei. A LAED está de parabéns pela qualidade do suplemento.
              </p>
            </div>
          </div>
          
          <button className="btn-load-reviews">CARREGAR MAIS AVALIAÇÕES</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;


