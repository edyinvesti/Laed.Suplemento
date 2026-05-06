import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import TopTicker from './components/TopTicker/TopTicker';
import HeroCarousel from './components/HeroCarousel/HeroCarousel';
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
import './App.css';

const Home = () => {
  const { products } = useStore();
  const highlights = products.filter(p => p.id === 1 || p.id === 3);
  const newArrivals = products.filter(p => p.badge?.type === 'new').slice(0, 6);

  return (
    <>
      <CategoryNav />
      <HeroCarousel />
      <MarqueeTicker />
      <BenefitsBar />
      <ShopByGoal />
      
      {/* Featured Products (Twin Cards) */}
      <FeaturedSection products={highlights} />

      <main className="main-content">
        <div className="container main-layout">
          <Sidebar />
          <ProductGrid />
        </div>
      </main>

      {/* Team LAED Section placed after main content block */}
      <TeamLaed />
      
      {/* Testimonials placed right before Footer */}
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


