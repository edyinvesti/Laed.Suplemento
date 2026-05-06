import React, { useState, useEffect, useRef } from 'react';
import { Zap, ChevronLeft, ChevronRight, ShoppingCart, Check } from 'lucide-react';
import { FLASH_SALE_PRODUCTS } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import './FlashSale.css';

const getInitialTime = () => {
  const stored = sessionStorage.getItem('flashSaleEnd');
  if (stored) {
    const diff = parseInt(stored) - Date.now();
    if (diff > 0) return Math.floor(diff / 1000);
  }
  const end = Date.now() + 4 * 60 * 60 * 1000;
  sessionStorage.setItem('flashSaleEnd', end.toString());
  return 4 * 60 * 60;
};

const FlashSale = () => {
  const [seconds, setSeconds] = useState(getInitialTime);
  const [addedIds, setAddedIds] = useState(new Set());
  const { addToCart, setIsCartOpen } = useStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart({ ...product, price: product.flashPrice });
    setIsCartOpen(true);
    setAddedIds(prev => new Set([...prev, product.id]));
    setTimeout(() => setAddedIds(prev => {
      const next = new Set(prev);
      next.delete(product.id);
      return next;
    }), 2000);
  };

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    }
  };

  if (seconds <= 0 || !FLASH_SALE_PRODUCTS || FLASH_SALE_PRODUCTS.length === 0) return null;

  return (
    <section className="flash-sale-section">
      <div className="container">
        <div className="flash-header">
          <div className="flash-title-group">
            <Zap size={22} className="flash-zap" />
            <h2 className="flash-title">OFERTA RELÂMPAGO</h2>
          </div>
          <div className="flash-countdown">
            <span className="countdown-label">Termina em:</span>
            <div className="countdown-blocks">
              <div className="countdown-block">
                <span className="countdown-num">{h}</span>
                <span className="countdown-unit">h</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-block">
                <span className="countdown-num">{m}</span>
                <span className="countdown-unit">m</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-block">
                <span className="countdown-num">{s}</span>
                <span className="countdown-unit">s</span>
              </div>
            </div>
          </div>
          <div className="flash-nav">
            <button className="flash-nav-btn" onClick={() => scroll(-1)} aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <button className="flash-nav-btn" onClick={() => scroll(1)} aria-label="Próximo">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flash-scroll" ref={scrollRef}>
          {FLASH_SALE_PRODUCTS.map(product => {
            if (!product || !product.originalPrice) return null;
            const saving = (product.originalPrice - product.flashPrice).toFixed(2).replace('.', ',');
            const pixPrice = (product.flashPrice * 0.90).toFixed(2).replace('.', ',');
            const isAdded = addedIds.has(product.id);
            return (
              <div key={product.id} className="flash-card">
                <div className="flash-discount-badge">-{product.flashDiscount}%</div>
                <div className="flash-img-wrap">
                  <img src={`${import.meta.env.BASE_URL}${product.image.replace(/^\//, '')}`} alt={product.name} loading="lazy" />
                </div>
                <div className="flash-info">
                  <p className="flash-name">{product.name}</p>
                  <div className="flash-prices">
                    <span className="flash-original">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
                    <span className="flash-price">R$ {product.flashPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <span className="flash-pix">
                    <Zap size={10} /> R$ {pixPrice} no PIX
                  </span>
                  <span className="flash-saving">Economize R$ {saving}</span>
                  <button
                    className={`flash-btn ${isAdded ? 'added' : ''}`}
                    onClick={(e) => handleAdd(e, product)}
                  >
                    {isAdded
                      ? <><Check size={14} /> ADICIONADO!</>
                      : <><ShoppingCart size={14} /> APROVEITAR</>
                    }
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
