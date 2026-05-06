import React from 'react';
import { Dumbbell, Zap, Flame, Activity, Leaf, Package, Gift } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './CategoryNav.css';

const categories = [
  { id: 'Whey Protein',  label: 'WHEY PROTEIN', icon: <Dumbbell size={28} /> },
  { id: 'Creatina',      label: 'CREATINA',      icon: <Zap size={28} /> },
  { id: 'Pré-Treino',    label: 'PRÉ-TREINO',    icon: <Flame size={28} /> },
  { id: 'Vitaminas',     label: 'VITAMINAS',     icon: <Activity size={28} /> },
  { id: 'Aminoácidos',   label: 'AMINOÁCIDOS',   icon: <Leaf size={28} /> },
  { id: 'Termogênico',   label: 'TERMOGÊNICO',   icon: <Package size={28} /> },
  { id: 'Kits',          label: 'KITS',          icon: <Gift size={28} /> },
];

const CategoryNav = () => {
  const { activeFilters, toggleFilter, clearFilters } = useStore();
  const activeCat = activeFilters.categoria?.[0] || null;

  const handleClick = (catId) => {
    // Se já está ativo, limpa o filtro de categoria; senão aplica
    if (activeCat === catId) {
      clearFilters();
    } else {
      clearFilters();
      toggleFilter('categoria', catId);
      // Scroll suave até a grade de produtos
      setTimeout(() => {
        const el = document.querySelector('.main-content');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <section className="category-nav-section">
      <div className="container">
        <div className="category-nav-scroll">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-nav-item ${activeCat === cat.id ? 'active' : ''}`}
              onClick={() => handleClick(cat.id)}
              aria-label={`Filtrar por ${cat.label}`}
              aria-pressed={activeCat === cat.id}
            >
              <div className="category-icon-wrapper">
                {cat.icon}
              </div>
              <span className="category-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
