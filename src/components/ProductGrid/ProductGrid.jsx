import React, { useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useStore } from '../../context/StoreContext';
import { ALL_PRODUCTS } from '../../data/products';
import './ProductGrid.css';

const ProductGrid = () => {
  const { searchQuery, activeFilters, sortOrder, setSortOrder } = useStore();

  const filteredProducts = useMemo(() => {
    let results = ALL_PRODUCTS;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(q));
    }

    // Active filters
    const entries = Object.entries(activeFilters);
    if (entries.length > 0) {
      results = results.filter(product => {
        for (let [category, selectedOptions] of entries) {
          if (selectedOptions.length > 0) {
            if (category === 'preco') {
              const matchesPrice = selectedOptions.some(opt => {
                if (opt === 'Até R$ 100') return product.price <= 100;
                if (opt === 'R$ 100 a R$ 200') return product.price > 100 && product.price <= 200;
                if (opt === 'Acima de R$ 200') return product.price > 200;
                return false;
              });
              if (!matchesPrice) return false;
            } else {
              const productValue = product[category];
              if (!selectedOptions.includes(productValue)) return false;
            }
          }
        }
        return true; // If the product passes all active filters
      });
    }

    // Sort
    switch (sortOrder) {
      case 'menor-preco':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'maior-preco':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'lancamentos':
        results = [...results].sort((a, b) => b.id - a.id);
        break;
      default: // mais-vendidos
        results = [...results].sort((a, b) => b.reviews - a.reviews);
    }

    return results;
  }, [searchQuery, activeFilters, sortOrder]);

  const handleSortChange = (e) => setSortOrder(e.target.value);

  return (
    <div className="product-grid-container">
      <div className="grid-header">
        <h2>
          PRODUTOS EM DESTAQUE
          <span className="product-count">{filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}</span>
        </h2>
        <div className="grid-sort">
          <span>Ordenar por:</span>
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="mais-vendidos">Mais Vendidos</option>
            <option value="menor-preco">Menor Preço</option>
            <option value="maior-preco">Maior Preço</option>
            <option value="lancamentos">Lançamentos</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <p>😕 Nenhum produto encontrado</p>
          <span>Tente outros filtros ou termos de busca.</span>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="pagination">
          <button className="btn-load-more">CARREGAR MAIS PRODUTOS</button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
