import React from 'react';
import './CartModal.css';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ShoppingBag, Plus, Award } from 'lucide-react';

const UPSELL_PRODUCTS = [
  { id: 3, name: 'PURE CREATINE - 500g', price: 139.90, image: '/laed-cyber-bottles.png' },
  { id: 6, name: 'DAILY HEALTH NEON - 90 Caps', price: 49.90, image: '/laed-cyber-bottles.png' }
];

const CartModal = () => {
  const { cartItems, cartTotal, cartCount, addToCart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, goToCheckout } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={(e) => e.target === e.currentTarget && setIsCartOpen(false)}>
      <div className="cart-modal">
        <div className="cart-modal-header">
          <div className="cart-title-area">
            <ShoppingBag size={22} />
            <h2>Meu Carrinho <span className="cart-badge">{cartCount}</span></h2>
          </div>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={64} className="empty-icon" />
              <p>Seu carrinho está vazio</p>
              <button onClick={() => setIsCartOpen(false)} className="btn-continue-shopping">
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {/* Shipping Progress Bar */}
              <div className="shipping-progress-container">
                <div className="shipping-info">
                  {cartTotal >= 250 ? (
                    <span className="shipping-success"><Award size={16} /> VOCÊ GANHOU FRETE GRÁTIS!</span>
                  ) : (
                    <span>Faltam <span className="highlight">R$ {(250 - cartTotal).toFixed(2).replace('.', ',')}</span> para <strong>Frete Grátis</strong></span>
                  )}
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(100, (cartTotal / 250) * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="cart-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                      <div className="cart-item-qty">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Upsell */}
              <div className="cart-upsell-section">
                <p className="upsell-title">COMPRE JUNTO</p>
                <div className="upsell-list">
                  {UPSELL_PRODUCTS.map(product => (
                    <div key={product.id} className="upsell-item">
                      <img src={product.image} alt={product.name} />
                      <div className="upsell-details">
                        <span className="upsell-name">{product.name}</span>
                        <span className="upsell-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <button className="btn-add-upsell" onClick={() => addToCart(product)}>
                        <Plus size={16} /> ADD
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cart-modal-footer">
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <strong>R$ {cartTotal.toFixed(2).replace('.', ',')}</strong>
                </div>
                <div className="cart-total-row highlight">
                  <span>Frete</span>
                  <strong className="free-shipping">{cartTotal >= 250 ? 'GRÁTIS 🎉' : `R$ 19,90`}</strong>
                </div>
                <button className="btn-checkout" onClick={goToCheckout}>
                  FINALIZAR COMPRA →
                </button>
                <button onClick={() => setIsCartOpen(false)} className="btn-continue-shopping secondary">
                  Continuar Comprando
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
