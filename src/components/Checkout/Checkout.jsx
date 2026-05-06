import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, goToHome, clearCart } = useStore();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState('');

  const pixTotal = cartTotal * 0.9;
  const shipping = 15.90;
  const finalTotal = pixTotal + shipping;

  const [formData, setFormData] = React.useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    if (name === 'cpf') {
      maskedValue = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').substring(0, 14);
    } else if (name === 'cep') {
      maskedValue = value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2').substring(0, 9);
    } else if (name === 'telefone') {
      maskedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').substring(0, 15);
    }

    setFormData(prev => ({ ...prev, [name]: maskedValue }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Validação de CPF
    const cpfDigits = formData.cpf.replace(/\D/g, '');
    if (cpfDigits.length !== 11) return alert('Por favor, insira um CPF válido com 11 dígitos');
    // Rejeita CPFs com todos os dígitos iguais
    if (/^(\d)\1+$/.test(cpfDigits)) return alert('CPF inválido');

    // Validação de CEP
    if (formData.cep.replace(/\D/g, '').length !== 8) return alert('Por favor, insira um CEP válido com 8 dígitos');

    // Validação de campos obrigatórios
    if (!formData.nome.trim()) return alert('Por favor, insira seu nome completo');
    if (!formData.email.includes('@')) return alert('Por favor, insira um e-mail válido');
    
    setOrderId((Math.random() * 100000).toFixed(0));
    setIsSuccess(true);
    // Limpa o carrinho após finalizar o pedido
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="checkout-success animate-fade-in">
        <div className="success-card">
          <div className="success-header">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={64} className="success-icon" />
            </div>
            <h1>Pedido Confirmado!</h1>
            <p className="success-subtitle">Obrigado por confiar na <strong>LAED SUPLEMENTOS</strong>.</p>
          </div>

          <div className="success-details">
            <div className="detail-item">
              <span className="label">Número do Pedido</span>
              <span className="value">#{orderId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Data</span>
              <span className="value">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="detail-item">
              <span className="label">Total Final</span>
              <span className="value">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="order-timeline">
            <h3>Acompanhe seu Pedido</h3>
            <div className="timeline-steps">
              <div className="timeline-step active">
                <div className="step-dot"></div>
                <span>Recebido</span>
              </div>
              <div className="timeline-step">
                <div className="step-dot"></div>
                <span>Processando</span>
              </div>
              <div className="timeline-step">
                <div className="step-dot"></div>
                <span>Enviado</span>
              </div>
              <div className="timeline-step">
                <div className="step-dot"></div>
                <span>Entregue</span>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn-return-home" onClick={goToHome}>
              VOLTAR PARA A LOJA
            </button>
            <a 
              href={`https://wa.me/5562992115143?text=Olá, meu pedido é o #${orderId}. Gostaria de confirmar o pagamento.`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp-support"
            >
              CHAMAR NO WHATSAPP
            </a>
          </div>
          
          <p className="email-info">Enviamos um e-mail de confirmação para {formData.email}</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h2>Seu carrinho está vazio.</h2>
          <button className="btn-return-home" onClick={goToHome}>
            VOLTAR PARA A LOJA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <button className="back-btn" onClick={goToHome}>
            <ArrowLeft size={20} /> Continuar Comprando
          </button>
          <h1>Finalizar Compra</h1>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form-section">
            <form onSubmit={handleCheckout}>
              <div className="form-group">
                <h3>1. Dados Pessoais</h3>
                <div className="form-row">
                  <input type="text" name="nome" placeholder="Nome Completo" required value={formData.nome} onChange={handleInputChange} />
                  <input type="text" name="cpf" placeholder="CPF (000.000.000-00)" required value={formData.cpf} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                  <input type="email" name="email" placeholder="E-mail" required value={formData.email} onChange={handleInputChange} />
                  <input type="tel" name="telefone" placeholder="Celular / WhatsApp" required value={formData.telefone} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group">
                <h3>2. Endereço de Entrega</h3>
                <div className="form-row">
                  <input type="text" name="cep" placeholder="CEP (00000-000)" required className="input-short" value={formData.cep} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                  <input type="text" name="rua" placeholder="Rua / Avenida" required value={formData.rua} onChange={handleInputChange} />
                  <input type="text" name="numero" placeholder="Número" required className="input-short" value={formData.numero} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                  <input type="text" name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleInputChange} />
                  <input type="text" name="bairro" placeholder="Bairro" required value={formData.bairro} onChange={handleInputChange} />
                </div>
                <div className="form-row">
                  <input type="text" name="cidade" placeholder="Cidade" required value={formData.cidade} onChange={handleInputChange} />
                  <input type="text" name="estado" placeholder="Estado" required className="input-short" value={formData.estado} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group">
                <h3>3. Pagamento Seguro <ShieldCheck size={18} className="shield-icon" /></h3>
                <div className="payment-methods">
                  <label className="payment-method selected">
                    <input type="radio" name="payment" defaultChecked />
                    <div className="method-info">
                      <span className="method-name">PIX (10% de desconto)</span>
                      <span className="method-desc">Aprovação imediata</span>
                    </div>
                  </label>
                  <label className="payment-method">
                    <input type="radio" name="payment" />
                    <div className="method-info">
                      <span className="method-name">Cartão de Crédito</span>
                      <span className="method-desc">Até 3x sem juros</span>
                    </div>
                  </label>
                  <label className="payment-method">
                    <input type="radio" name="payment" />
                    <div className="method-info">
                      <span className="method-name">Boleto Bancário</span>
                      <span className="method-desc">Aprovação em até 2 dias úteis</span>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-finish-checkout">
                FINALIZAR PEDIDO NO PIX
              </button>
            </form>
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary-box">
              <h3>Resumo do Pedido</h3>
              <div className="checkout-items">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-item">
                    <img src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = `${import.meta.env.BASE_URL}produtos/whey-concentrado-chocolate.png`; }} />
                    <div className="checkout-item-details">
                      <span className="checkout-item-name">{item.name}</span>
                      <span className="checkout-item-qty">Qtd: {item.quantity}</span>
                      <span className="checkout-item-price">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="total-row highlight-discount">
                  <span>Desconto PIX (10%)</span>
                  <span>- R$ {(cartTotal - pixTotal).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="total-row">
                  <span>Frete <Truck size={14} /></span>
                  <span>R$ {shipping.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="total-row final-total">
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="secure-checkout-badge">
                <CreditCard size={20} />
                <span>Ambiente 100% Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


