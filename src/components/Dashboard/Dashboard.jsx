import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Package, MapPin, Heart, User, LogOut, ChevronRight, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { goToHome } = useStore();

  const mockOrders = [
    { id: '45821', date: '25/03/2026', total: 365.80, status: 'Em trânsito', items: 2 },
    { id: '45120', date: '10/03/2026', total: 149.90, status: 'Entregue', items: 1 }
  ];

  return (
    <div className="dashboard-page animate-fade-in">
      <div className="container">
        <div className="dashboard-layout">
          {/* Sidebar Navigation */}
          <aside className="dashboard-sidebar">
            <div className="user-profile-brief">
              <div className="avatar">A</div>
              <div className="info">
                <h3>André Silva</h3>
                <p>cliente@email.com</p>
              </div>
            </div>
            
            <nav className="dashboard-nav">
              <button className="nav-item active">
                <Package size={20} /> Meus Pedidos
              </button>
              <button className="nav-item">
                <Heart size={20} /> Favoritos
              </button>
              <button className="nav-item">
                <MapPin size={20} /> Endereços
              </button>
              <button className="nav-item">
                <User size={20} /> Meus Dados
              </button>
              <div className="nav-divider"></div>
              <button className="nav-item logout" onClick={goToHome}>
                <LogOut size={20} /> Sair
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="dashboard-content">
            <header className="content-header">
              <h1>Meus Pedidos</h1>
              <p>Gerencie suas compras e acompanhe as entregas.</p>
            </header>

            <div className="orders-list">
              {mockOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-main-info">
                    <div className="id-group">
                      <span className="label">Pedido</span>
                      <span className="id">#{order.id}</span>
                    </div>
                    <div className="date-group">
                      <span className="label">Data</span>
                      <span className="date">{order.date}</span>
                    </div>
                    <div className="status-group">
                      <span className={`status-badge ${order.status === 'Entregue' ? 'delivered' : 'shipping'}`}>
                        {order.status === 'Entregue' ? 'Concluído' : 'EM TRÂNSITO'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="order-footer">
                    <div className="items-summary">
                      <span className="items-count">{order.items} {order.items > 1 ? 'itens' : 'item'}</span>
                      <span className="total">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button className="btn-view-details">
                      Ver Detalhes <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-empty-state" style={{ display: 'none' }}>
              <Package size={64} />
              <h3>Você ainda não fez nenhum pedido</h3>
              <p>Explore nosso catálogo e encontre os melhores suplementos.</p>
              <button className="btn-shop-now" onClick={goToHome}>VER PRODUTOS</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
