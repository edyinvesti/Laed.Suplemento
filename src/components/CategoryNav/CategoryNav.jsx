import React from 'react';
import { Dumbbell, Zap, Flame, Activity, Leaf, Shirt, Gift } from 'lucide-react';
import './CategoryNav.css';

const categories = [
  { id: 'whey', label: 'WHEY PROTEIN', icon: <Dumbbell size={28} /> },
  { id: 'creatina', label: 'CREATINA', icon: <Zap size={28} /> },
  { id: 'pretreino', label: 'PRÉ-TREINO', icon: <Flame size={28} /> },
  { id: 'vitaminas', label: 'VITAMINAS', icon: <Activity size={28} /> },
  { id: 'vegano', label: 'LINHA VEGANA', icon: <Leaf size={28} /> },
  { id: 'roupas', label: 'VESTUÁRIO', icon: <Shirt size={28} /> },
  { id: 'kits', label: 'KITS', icon: <Gift size={28} /> },
];

const CategoryNav = () => {
  return (
    <section className="category-nav-section">
      <div className="container">
        <div className="category-nav-scroll">
          {categories.map((cat) => (
            <div key={cat.id} className="category-nav-item">
              <div className="category-icon-wrapper">
                {cat.icon}
              </div>
              <span className="category-label">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
