import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TrendingUp, Sparkles, Package } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import TopTicker from './components/TopTicker/TopTicker';
import BenefitsBar from './components/BenefitsBar/BenefitsBar';
import LoginModal from './components/LoginModal/LoginModal';
import Sidebar from './components/Sidebar/Sidebar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import CartModal from './components/CartModal/CartModal';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import QuickView from './components/QuickView/QuickView';
import Dashboard from './components/Dashboard/Dashboard';
import FeaturedSection from './components/FeaturedSection/FeaturedSection';
import MarqueeTicker from './components/MarqueeTicker/MarqueeTicker';
import CategoryNav from './components/CategoryNav/CategoryNav';
import ShopByGoal from './components/ShopByGoal/ShopByGoal';
import TeamLaed from './components/TeamLaed/TeamLaed';
import Testimonials from './components/Testimonials/Testimonials';
import Admin from './components/Admin/Admin';
import FlashSale from './components/FlashSale/FlashSale';
import ProductCarousel from './components/ProductCarousel/ProductCarousel';
import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import './App.css';

const Home = () => {
  const { products } = useStore();

  const highlights = products.filter(p => p.id === 1 || p.id === 3);
  const bestSellers = [...products].sort((a, b) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 10);
  const newArrivals = products.filter(p => p.badge?.type === 'new').slice(0, 10);
  const kits = products.filter(p => p.categoria === 'Kits');

  return (
    <>
      <CategoryNav />
      <HeroCarousel />
      <MarqueeTicker />
      <BenefitsBar />

      {/* Oferta Relâmpago com countdown */}
      <FlashSale />

      {/* Mais Vendidos */}
      <ProductCarousel
        title="MAIS VENDIDOS"
        products={bestSellers}
        icon={<TrendingUp size={22} />}
        accentColor="var(--primary-blue)"
      />

      {/* Lançamentos */}
      <ProductCarousel
        title="LANÇAMENTOS"
        products={newArrivals}
        icon={<Sparkles size={22} />}
        accentColor="#9333ea"
      />

      {/* Compre por Objetivo */}
      <ShopByGoal />

      {/* Banners em destaque */}
      <FeaturedSection products={highlights} />

      {/* Kits em Oferta */}
      {kits.length > 0 && (
        <ProductCarousel
          title="KITS EM OFERTA"
          products={kits}
          icon={<Package size={22} />}
          accentColor="#ff6b00"
        />
      )}

      {/* Grade completa com filtros */}
      <main className="main-content">
        <div className="container main-layout">
          <Sidebar />
          <ProductGrid />
        </div>
      </main>

      <TeamLaed />
      <Testimonials />
    </>
  );
};

function App() {
  return (
    <StoreProvider>
      <div className="app">
        <LoginModal />
        <Header />
        <Navbar />
        <TopTicker />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/minha-conta" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
        <CartModal />
        <QuickView />
      </div>
    </StoreProvider>
  );
}

export default App;
