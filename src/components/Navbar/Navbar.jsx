import React, { useEffect, useState } from 'react';
import { Menu, ChevronDown, Percent, Package, Star, TrendingUp, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './Navbar.css';

const Navbar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useStore();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const categories = [
    { name: 'TOP 20', icon: <Star size={16} />, highlight: true },
    { name: 'LANÇAMENTOS', icon: null },
    { name: 'WHEY PROTEIN', icon: null },
    { name: 'CREATINA', icon: null },
    { name: 'VITAMINAS', icon: null },
    { name: 'PRÉ-TREINO', icon: null },
    { name: 'KITS EM OFERTA', icon: <Percent size={16} />, highlight: true },
  ];

  const megaMenuItems = {
    'Objetivos': ['Massa Muscular', 'Emagrecimento', 'Energia & Resistência', 'Saúde & Bem-Estar', 'Definição'],
    'Proteínas': ['Whey Protein Concentrado', 'Whey Protein Isolado', 'Whey Protein Hidrolisado', 'Blend de Proteínas', 'Proteína Vegana'],
    'Aminoácidos': ['Creatina', 'BCAA', 'Glutamina', 'EAA'],
    'Acessórios': ['Coqueteleiras', 'Camisetas', 'Mochilas', 'Kits'],
  };

  return (
    <>
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      
      <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="bold">MENU</span>
          <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="container navbar-content">
          <div 
            className="categories-dropdown-wrapper"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="categories-dropdown">
              <Menu size={20} />
              <span className="bold">TODAS AS CATEGORIAS</span>
              <ChevronDown size={14} className={isMegaMenuOpen ? 'rotate' : ''} />
            </div>
            
            {isMegaMenuOpen && (
              <div className="mega-menu">
                <div className="mega-menu-grid">
                  {Object.entries(megaMenuItems).map(([category, items]) => (
                    <div key={category} className="mega-menu-column">
                      <h4 className="mega-menu-title">{category}</h4>
                      <ul className="mega-menu-list">
                        {items.map((item, idx) => (
                          <li key={idx}><a href="#">{item}</a></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="mega-menu-featured">
                    <img src="/laed-cyber-bottles.png" alt="Promo" />
                    <div className="featured-content">
                      <p className="featured-tag">LANÇAMENTO</p>
                      <p className="featured-name">WHEY PROTEIN PREMIUM</p>
                      <button className="btn-featured">VER AGORA</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <ul className="nav-links">
            {categories.slice(0, 8).map((cat, index) => (
              <li key={index} className={cat.highlight ? 'highlight' : ''}>
                <a href="#" onClick={() => setIsMobileMenuOpen(false)}>
                  {cat.icon && <span className="nav-icon">{cat.icon}</span>}
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


