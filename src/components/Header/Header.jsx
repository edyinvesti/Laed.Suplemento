import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, MapPin, ChevronDown, X, Menu, Phone, Mail, Zap, Settings } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import Logo from '../Logo/Logo';
import './Header.css';

const announcements = [
  "ENTREGA NO MESMO DIA PARA ANÁPOLIS/GO",
  "ENTREGA RÁPIDA EM TODO BRASIL",
  "SITE 100% SEGURO 🔒",
  "PARCELE EM ATÉ 6X SEM JUROS"
];

const Header = () => {
  const {
    searchQuery, setSearchQuery, cartCount, setIsCartOpen,
    wishlist, setIsMobileMenuOpen, goToHome,
    REGIONS, selectedRegion, setSelectedRegion,
    isLoginOpen, setIsLoginOpen, user, products, viewProduct
  } = useStore();

  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const debounceRef = useRef(null);

  // Rotate announcements
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Search with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        const q = searchQuery.toLowerCase();
        const filtered = products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.categoria && p.categoria.toLowerCase().includes(q))
        ).slice(0, 6);
        setSearchResults(filtered);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 250);
    return () => clearTimeout(debounceRef.current);
  }, [searchQuery, products]);

  const handleSelectResult = (product) => {
    setSearchQuery('');
    setShowSearchResults(false);
    viewProduct(product);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const close = () => {
      setIsRegionDropdownOpen(false);
      setIsContactDropdownOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <header className="header">
      {/* ── Top Bar ── */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-left" />

          <div className="top-center header-carousel">
            <span key={currentAnnouncement} className="fade-in-up">
              {announcements[currentAnnouncement]}
            </span>
          </div>

          <div className="top-right">
            <div
              className={`region-selector ${isRegionDropdownOpen ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setIsRegionDropdownOpen(v => !v); }}
            >
              <MapPin size={14} />
              <span>{selectedRegion ? selectedRegion.nome : 'Selecione sua região'}</span>
              <ChevronDown size={14} className={isRegionDropdownOpen ? 'rotate' : ''} />

              {isRegionDropdownOpen && (
                <div className="region-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="region-dropdown-header">Escolha seu Estado</div>
                  <div className="region-list">
                    {REGIONS.map(region => (
                      <div
                        key={region.sigla}
                        className={`region-option ${selectedRegion?.sigla === region.sigla ? 'selected' : ''}`}
                        onClick={() => { setSelectedRegion(region); setIsRegionDropdownOpen(false); }}
                      >
                        <span className="region-name">{region.nome}</span>
                        <span className="region-sigla">{region.sigla}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className="main-header">
        <div className="container main-header-content">
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)} aria-label="Abrir menu">
            <Menu size={24} />
          </button>

          <div className="logo" onClick={goToHome} style={{ cursor: 'pointer' }}>
            <Logo className="logo-img" />
          </div>

          {/* Search */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Encontre o suplemento ideal para você"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              aria-label="Buscar produtos"
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Limpar busca">
                <X size={16} />
              </button>
            )}
            <button className="search-button" aria-label="Buscar">
              <Search size={20} />
            </button>

            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results-dropdown" role="listbox">
                {searchResults.map(product => (
                  <div
                    key={product.id}
                    className="search-result-item"
                    role="option"
                    onClick={() => handleSelectResult(product)}
                  >
                    <img src={`${import.meta.env.BASE_URL}${product.image.replace(/^\//, '')}`} alt={product.name} loading="lazy" />
                    <div className="result-info">
                      <span className="result-name">{product.name}</span>
                      <span className="result-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                ))}
                <div className="search-results-footer">
                  Ver todos os resultados para &ldquo;{searchQuery}&rdquo;
                </div>
              </div>
            )}
            {showSearchResults && searchResults.length === 0 && searchQuery.length >= 2 && (
              <div className="search-results-dropdown no-results">
                Sem resultados para &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="header-actions">
            <Link to="/admin" className="action-item" style={{ color: 'var(--primary-blue)' }} aria-label="Painel Admin">
              <Settings size={28} strokeWidth={1.5} />
              <div className="action-text">
                <span className="line1">Painel</span>
                <span className="line2">Admin</span>
              </div>
            </Link>

            {/* ✅ FIX: botão de usuário abre LoginModal */}
            <button
              className="action-item"
              onClick={() => user ? window.location.assign('/minha-conta') : setIsLoginOpen(true)}
              aria-label={user ? 'Minha conta' : 'Fazer login'}
            >
              <User size={28} strokeWidth={1.5} />
              <div className="action-text">
                {user ? (
                  <>
                    <span className="line1">Olá, {user.name.split(' ')[0]}</span>
                    <span className="line2">Minha Conta</span>
                  </>
                ) : (
                  <>
                    <span className="line1">Cadastre-se ou</span>
                    <span className="line2">faça seu login</span>
                  </>
                )}
              </div>
            </button>

            <button className="action-item" aria-label={`Favoritos (${wishlist.size})`} style={{ position: 'relative' }}>
              <Heart size={28} strokeWidth={1.5} />
              <div className="action-text">
                <span className="line-single">Favoritos</span>
              </div>
              {wishlist.size > 0 && (
                <span className="action-badge-small">{wishlist.size}</span>
              )}
            </button>

            <div
              className={`action-item ${isContactDropdownOpen ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setIsContactDropdownOpen(v => !v); }}
              style={{ position: 'relative', cursor: 'pointer' }}
              aria-label="Fale conosco"
            >
              <Phone size={28} strokeWidth={1.5} />
              <div className="action-text">
                <span className="line1">Fale Conosco</span>
                <span className="line2">Clique aqui</span>
              </div>

              {isContactDropdownOpen && (
                <div className="contact-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="contact-dropdown-header">
                    ENTRE EM CONTATO CONOSCO E TIRE TODAS AS SUAS DÚVIDAS.
                  </div>
                  <div className="contact-dropdown-body">
                    <div className="contact-method">
                      <Phone size={36} className="contact-icon" />
                      <div className="contact-details">
                        <span className="label">TELEFONE</span>
                        <span className="value">(62) 99211-5143</span>
                        <span className="sub">Seg a sex das 8h às 12h / das 13h30 às 18h</span>
                      </div>
                    </div>
                    <div className="contact-method">
                      <Mail size={36} className="contact-icon" />
                      <div className="contact-details">
                        <span className="label">ATENDIMENTO 24H VIA E-MAIL</span>
                        <span className="value">laedsuplementos@gmail.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="contact-dropdown-footer">PARA FALAR CONOSCO</div>
                </div>
              )}
            </div>

            <button
              className="cart-container"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Carrinho (${cartCount} itens)`}
            >
              <ShoppingCart size={28} strokeWidth={1.5} />
              <span className={`cart-count ${cartCount > 0 ? 'active' : ''}`}>{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
