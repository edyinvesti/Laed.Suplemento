import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductCarousel.css';

const ProductCarousel = ({ title, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="product-carousel-section">
      <div className="container">
        <div className="carousel-header">
          <h2 className="carousel-title">{title}</h2>
          <div className="carousel-controls">
            <button className="control-btn" onClick={() => scroll('left')} aria-label="Anterior">
              <ChevronLeft size={24} />
            </button>
            <button className="control-btn" onClick={() => scroll('right')} aria-label="Próximo">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="carousel-track-container" ref={scrollRef}>
          <div className="carousel-track">
            {products.map(product => (
              <div key={product.id} className="carousel-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;


