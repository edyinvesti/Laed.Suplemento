import React, { useEffect, useState } from 'react';
import { Menu, ChevronDown, Percent, Star, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './Navbar.css';

const Navbar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, clearFilters, toggleFilter, setSortOrder, goToHome } = useStore();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  // Filtra por categoria e rola até os produtos
  const handleFilter = (e, filterType, filterValue) => {
    e.preventDefault();
    clearFilters();
    if (filterType === 'sort') {
      setSortOrder(filterValue);
    } else if (filterType === 'categoria') {
      toggleFilter('categoria', filterValue);
    } else if (filterType === 'objetivo') {
      toggleFilter('objetivo', filterValue);
    }
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector('.main-content');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleHome = (e) => {
    e.preventDefault();
    clearFilters();
    goToHome();
    setIsMobileMenuOpen(false);
  };

  // Links principais da navbar
  const navLinks = [
    { name: 'TOP 20',        icon: <Star size={16} />,    highlight: true,  action: () => ({ type: 'sort',      value: 'mais-vendidos' }) },
    { name: 'LANÇAMENTOS',   icon: null,                  highlight: false, action: () => ({ type: 'sort',      value: 'lancamentos'   }) },
    { name: 'WHEY PROTEIN',  icon: null,                  highlight: false, action: () => ({ type: 'categoria', value: 'Whey Protein'  }) },
    { name: 'CREATINA',      icon: null,                  highlight: false, action: () => ({ type: 'categoria', value: 'Creatina'      }) },
    { name: 'VITAMINAS',     icon: null,                  highlight: false, action: () => ({ type: 'categoria', value: 'Vitaminas'     }) },
    { name: 'PRÉ-TREINO',    icon: null,                  highlight: false, action: () => ({ type: 'categoria', value: 'Pré-Treino'    }) },
    { name: 'KITS EM OFERTA',icon: <Percent size={16} />, highlight: true,  action: () => ({ type: 'categoria', value: 'Kits'          }) },
  ];

  // Mega menu — objetivos e categorias clicáveis
  const megaMenuItems = {
    'Objetivos': [
      { label: 'Massa Muscular',      type: 'objetivo',  value: 'Massa Muscular'      },
      { label: 'Emagrecimento',       type: 'objetivo',  value: 'Emagrecimento'       },
      { label: 'Energia & Foco',      type: 'objetivo',  value: 'Energia'             },
      { label: 'Saúde & Bem-Estar',   type: 'objetivo',  value: 'Saúde & Bem Estar'   },
      { label: 'Recuperação Muscular',type: 'objetivo',  value: 'Recuperação Muscular'},
    ],
    'Proteínas': [
      { label: 'Whey Concentrado',    type: 'categoria', value: 'Whey Protein' },
      { label: 'Whey Isolado',        type: 'categoria', value: 'Whey Protein' },
      { label: 'Whey Hidrolisado',    type: 'categoria', value: 'Whey Protein' },
    ],
    'Aminoácidos': [
      { label: 'Creatina',            type: 'categoria', value: 'Creatina'    },
      { label: 'BCAA',                type: 'categoria', value: 'Aminoácidos' },
      { label: 'Glutamina',           type: 'categoria', value: 'Aminoácidos' },
    ],
    'Outros': [
      { label: 'Pré-Treino',          type: 'categoria', value: 'Pré-Treino'  },
      { label: 'Termogênicos',        type: 'categoria', value: 'Termogênico' },
      { label: 'Vitaminas',           type: 'categoria', value: 'Vitaminas'   },
      { label: 'Kits em Oferta',      type: 'categoria', value: 'Kits'        },
    ],
  };

  return (
    <>
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="bold">MENU</span>
          <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="container navbar-content">
          {/* Dropdown "Todas as Categorias" */}
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
                          <li key={idx}>
                            <a
                              href="#"
                              onClick={(e) => handleFilter(e, item.type, item.value)}
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="mega-menu-featured">
                    <img
                      src={`${import.meta.env.BASE_URL}produtos/whey-concentrado-chocolate.png`}
                      alt="Whey Protein"
                      onError={(e) => { e.target.onerror = null; e.target.src = `${import.meta.env.BASE_URL}laed-cyber-bottles.png`; }}
                    />
                    <div className="featured-content">
                      <p className="featured-tag">MAIS VENDIDO</p>
                      <p className="featured-name">WHEY PROTEIN CONCENTRADO</p>
                      <button
                        className="btn-featured"
                        onClick={(e) => handleFilter(e, 'categoria', 'Whey Protein')}
                      >
                        VER AGORA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Links principais */}
          <ul className="nav-links">
            {navLinks.map((cat, index) => {
              const { type, value } = cat.action();
              return (
                <li key={index} className={cat.highlight ? 'highlight' : ''}>
                  <a
                    href="#"
                    onClick={(e) => handleFilter(e, type, value)}
                  >
                    {cat.icon && <span className="nav-icon">{cat.icon}</span>}
                    {cat.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
