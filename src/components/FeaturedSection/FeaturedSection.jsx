import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './FeaturedSection.css';

const FeaturedSection = ({ products }) => {
  if (!products || products.length < 2) return null;

  return (
    <section className="featured-products-section">
      <div className="container">
        <div className="featured-grid">
          {products.slice(0, 2).map((product, index) => (
            <div key={product.id} className={`featured-item banner-${index + 1}`}>
              <ProductCard 
                product={product} 
                layout="horizontal" 
                isReversed={index === 1} /* One left, one right */
                showMarketingText={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
