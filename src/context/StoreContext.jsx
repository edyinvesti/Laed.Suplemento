import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ALL_PRODUCTS_FULL } from '../data/products';

const REGIONS = [
  {"nome": "Acre", "sigla": "AC"}, {"nome": "Alagoas", "sigla": "AL"}, {"nome": "Amapá", "sigla": "AP"},
  {"nome": "Amazonas", "sigla": "AM"}, {"nome": "Bahia", "sigla": "BA"}, {"nome": "Ceará", "sigla": "CE"},
  {"nome": "Distrito Federal", "sigla": "DF"}, {"nome": "Espírito Santo", "sigla": "ES"}, {"nome": "Goiás", "sigla": "GO"},
  {"nome": "Maranhão", "sigla": "MA"}, {"nome": "Mato Grosso", "sigla": "MT"}, {"nome": "Mato Grosso do Sul", "sigla": "MS"},
  {"nome": "Minas Gerais", "sigla": "MG"}, {"nome": "Pará", "sigla": "PA"}, {"nome": "Paraíba", "sigla": "PB"},
  {"nome": "Paraná", "sigla": "PR"}, {"nome": "Pernambuco", "sigla": "PE"}, {"nome": "Piauí", "sigla": "PI"},
  {"nome": "Rio de Janeiro", "sigla": "RJ"}, {"nome": "Rio Grande do Norte", "sigla": "RN"}, {"nome": "Rio Grande do Sul", "sigla": "RS"},
  {"nome": "Rondônia", "sigla": "RO"}, {"nome": "Roraima", "sigla": "RR"}, {"nome": "Santa Catarina", "sigla": "SC"},
  {"nome": "São Paulo", "sigla": "SP"}, {"nome": "Sergipe", "sigla": "SE"}, {"nome": "Tocantins", "sigla": "TO"}
];

const StoreContext = createContext(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};

export const StoreProvider = ({ children }) => {
  // Products state (loads from local storage or ALL_PRODUCTS)
  const [products, setProducts] = useState(ALL_PRODUCTS_FULL);
  // Cart state: [{ ...product, quantity }]
  const [cartItems, setCartItems] = useState([]);
  // Wishlist state: Set of product IDs
  const [wishlist, setWishlist] = useState(new Set());
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  // Active filters: { objetivo: [], sabor: [], marca: [], tamanho: [], categoria: [] }
  const [activeFilters, setActiveFilters] = useState({
    categoria: [],
    objetivo: [],
    sabor: [],
    tamanho: [],
    preco: [],
    ingrediente: [],
  });
  // Sort order
  const [sortOrder, setSortOrder] = useState('mais-vendidos');
  // Selected region
  const [selectedRegion, setSelectedRegion] = useState(REGIONS.find(r => r.sigla === 'GO'));

  // Load from localStorage on mount
  useEffect(() => {
    // Limpa cache de produtos antigos ao atualizar versão
    const DATA_VERSION = '6.0';
    if (localStorage.getItem('laed_data_version') !== DATA_VERSION) {
      localStorage.clear(); // limpa TUDO incluindo produtos antigos
      localStorage.setItem('laed_data_version', DATA_VERSION);
    }

    const savedProducts = localStorage.getItem('laed_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error('Error parsing products from localStorage', e);
      }
    }

    const savedCart = localStorage.getItem('laed_cart');
    const savedWishlist = localStorage.getItem('laed_wishlist');
    
    const savedRegion = localStorage.getItem('laed_region');
    
    if (savedRegion) {
      const region = REGIONS.find(r => r.sigla === savedRegion);
      if (region) setSelectedRegion(region);
    }

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(new Set(JSON.parse(savedWishlist)));
      } catch (e) {
        console.error('Error parsing wishlist from localStorage', e);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('laed_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('laed_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('laed_wishlist', JSON.stringify([...wishlist]));
  }, [wishlist]);

  useEffect(() => {
    if (selectedRegion) {
      localStorage.setItem('laed_region', selectedRegion.sigla);
    }
  }, [selectedRegion]);

  // Cart actions
  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
  }, [removeFromCart]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Wishlist actions
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const isWishlisted = useCallback((productId) => wishlist.has(productId), [wishlist]);

  // Filters actions
  const toggleFilter = useCallback((section, value) => {
    setActiveFilters(prev => {
      const current = prev[section];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [section]: updated };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters({ categoria: [], objetivo: [], sabor: [], tamanho: [], preco: [], ingrediente: [], marca: [] });
    setSearchQuery('');
  }, []);

  // Cart modal state
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Product management actions
  const addProduct = useCallback((newProduct) => {
    setProducts(prev => {
      const maxId = prev.reduce((max, p) => (p.id > max ? p.id : max), 0);
      return [{ ...newProduct, id: maxId + 1 }, ...prev];
    });
  }, []);

  const deleteProduct = useCallback((productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  // Simple Routing - Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const viewProduct = useCallback((product) => {
    setSelectedProduct(product);
    navigate(`/produto/${product.id}`);
    window.scrollTo(0, 0);
  }, [navigate]);

  const goToHome = useCallback(() => {
    navigate('/');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  }, [navigate]);

  const goToCheckout = useCallback(() => {
    navigate('/checkout');
    setIsCartOpen(false); // Close cart when going to checkout
    window.scrollTo(0, 0);
  }, [navigate, setIsCartOpen]);

  // Login modal state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  // User state (mock)
  const [user, setUser] = useState(null);
  
  // Quick View state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <StoreContext.Provider value={{
      products, addProduct, deleteProduct,
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal,
      wishlist, toggleWishlist, isWishlisted,
      searchQuery, setSearchQuery,
      activeFilters, toggleFilter, clearFilters,
      sortOrder, setSortOrder,
      isCartOpen, setIsCartOpen,
      isMobileMenuOpen, setIsMobileMenuOpen,
      currentPage: location.pathname,
      selectedProduct, viewProduct,
      goToHome, goToCheckout,
      REGIONS, selectedRegion, setSelectedRegion,
      isLoginOpen, setIsLoginOpen, user, setUser,
      quickViewProduct, setQuickViewProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};


