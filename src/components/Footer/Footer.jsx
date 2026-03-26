import React from 'react';
import { CreditCard, ShieldCheck, Mail, MapPin } from 'lucide-react';

// Inline SVG social icons (lucide-react v1.7.0 doesn't include social icons)
const IconFacebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconYoutube = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div className="container newsletter-content">
          <div className="newsletter-text">
            <h3>RECEBA NOSSAS NOVIDADES E OFERTAS</h3>
            <p>Cadastre-se e ganhe 10% de desconto na sua primeira compra!</p>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Seu melhor e-mail" />
            <button>CADASTRAR</button>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        <div className="footer-grid">
          <div className="footer-col">
            <h4 className="logo-text">LAED <span>SUPLEMENTOS</span></h4>
            <p className="footer-about">
              Sua loja de suplementos favorita. Tecnologia e pureza para o seu melhor desempenho físico.
            </p>
            <div className="social-links">
              <IconFacebook />
              <IconInstagram />
              <IconTwitter />
              <IconYoutube />
            </div>
          </div>

          <div className="footer-col">
            <h4>INSTITUCIONAL</h4>
            <ul>
              <li><a href="#">Sobre a LAED SUPLEMENTOS</a></li>
              <li><a href="#">Políticas de Privacidade</a></li>
              <li><a href="#">Trabalhe Conosco</a></li>
              <li><a href="#">Termos de Uso</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>AJUDA E SUPORTE</h4>
            <ul>
              <li><a href="#">Central de Atendimento</a></li>
              <li><a href="#">Meus Pedidos</a></li>
              <li><a href="#">Trocas e Devoluções</a></li>
              <li><a href="#">Prazos de Entrega</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>ATENDIMENTO</h4>
            <div className="contact-info">
              <a
                className="contact-item whatsapp-link"
                href="https://wa.me/5562992115143?text=Olá!%20Gostaria%20de%20atendimento."
                target="_blank"
                rel="noopener noreferrer"
                title="Falar no WhatsApp"
              >
                <IconWhatsApp />
                <span>(62) 99211-5143</span>
                <span className="whatsapp-tag">WhatsApp</span>
              </a>
              <div className="contact-item">
                <Mail size={16} />
                 <span>laedsuplementos@gmail.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>Anápolis, GO - Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <div className="payment-methods">
            <CreditCard size={24} />
            <div className="payment-icons">
               {/* Simplified representation */}
               <span className="payment-badge">Mastercard</span>
               <span className="payment-badge">Visa</span>
               <span className="payment-badge">Pix</span>
               <span className="payment-badge">Boleto</span>
            </div>
          </div>
          <div className="security-badges">
            <ShieldCheck size={24} />
            <span>Site 100% Seguro</span>
          </div>
          <div className="copyright">
            <p>© 2026 LAED SUPLEMENTOS Alimentares Ltda. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
