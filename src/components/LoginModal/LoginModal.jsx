import React, { useState } from 'react';
import { X, Mail, Lock, User, Globe, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './LoginModal.css';

const LoginModal = () => {
  const { isLoginOpen, setIsLoginOpen, setUser } = useStore();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  if (!isLoginOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login/register
    setUser({ name: formData.name || 'Usuário', email: formData.email });
    setIsLoginOpen(false);
  };

  const handleClose = () => setIsLoginOpen(false);

  return (
    <div className="login-modal-overlay" onClick={handleClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="login-close-btn" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="login-tabs">
          <button 
            className={`login-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            ENTRAR
          </button>
          <button 
            className={`login-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            CRIAR CONTA
          </button>
        </div>

        <div className="login-form-container">
          <h2 className="login-title">
            {activeTab === 'login' ? 'Bem-vindo de volta!' : 'Bem-vindo à LAED!'}
          </h2>
          <p className="login-subtitle">
            {activeTab === 'login' 
              ? 'Acesse sua conta para gerenciar seus pedidos.' 
              : 'Cadastre-se para aproveitar ofertas exclusivas.'}
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            {activeTab === 'register' && (
              <div className="input-group">
                <label>Nome Completo</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Seu nome" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label>E-mail</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Senha</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button" 
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {activeTab === 'login' && (
              <a href="#" className="forgot-password">Esqueceu sua senha?</a>
            )}

            <button type="submit" className="login-submit-btn">
              {activeTab === 'login' ? 'ENTRAR AGORA' : 'CRIAR MINHA CONTA'}
            </button>
          </form>

          <div className="social-login-separator">
            <span>OU ENTRE COM</span>
          </div>

          <div className="social-login-buttons">
            <button className="social-btn google">
              <Globe size={20} />
              Google
            </button>
            <button className="social-btn facebook">
              <Mail size={20} />
              Facebook
            </button>
          </div>
        </div>

        <div className="login-modal-footer">
          {activeTab === 'login' ? (
            <p>Não tem uma conta? <span onClick={() => setActiveTab('register')}>Cadastre-se aqui</span></p>
          ) : (
            <p>Já possui uma conta? <span onClick={() => setActiveTab('login')}>Faça login aqui</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
