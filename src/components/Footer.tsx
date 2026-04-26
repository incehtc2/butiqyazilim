import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Logo } from './Logo';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-surface border-t border-border pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo size="sm" />
            </div>
            <p className="text-[12px] text-secondary leading-relaxed mb-6 max-w-[180px]">
              Dijital dünyadaki butik dokunuşunuz.
            </p>
            <div className="flex gap-4 text-secondary/60">
              <a href="#" className="hover:text-primary transition-colors duration-200"><Twitter size={14} /></a>
              <a href="#" className="hover:text-primary transition-colors duration-200"><Linkedin size={14} /></a>
              <a href="#" className="hover:text-primary transition-colors duration-200"><Github size={14} /></a>
              <a href="#" className="hover:text-primary transition-colors duration-200"><Instagram size={14} /></a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-secondary/50 mb-5">
              Sayfalar
            </h4>
            <ul className="space-y-3.5">
              {NAV_LINKS.map(link => {
                const isAnchor = link.href.startsWith('#');
                return (
                  <li key={link.label}>
                    {isAnchor ? (
                      <a
                        href={link.href}
                        onClick={(e: any) => handleNavClick(e, link.href)}
                        className="text-[13px] text-secondary hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-[13px] text-secondary hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-secondary/50 mb-5">
              Hizmetler
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link to="/urunler" className="text-[13px] text-secondary hover:text-primary transition-colors duration-200">
                  SaaS Ürünlerimiz
                </Link>
              </li>
              <li>
                <Link to="/hizmet/corporate" className="text-[13px] text-secondary hover:text-primary transition-colors duration-200">
                  Kurumsal Web
                </Link>
              </li>
              <li>
                <Link to="/hizmet/saas" className="text-[13px] text-secondary hover:text-primary transition-colors duration-200">
                  SaaS Geliştirme
                </Link>
              </li>
              <li>
                <Link to="/hizmet/e-commerce" className="text-[13px] text-secondary hover:text-primary transition-colors duration-200">
                  E-Ticaret Sitesi
                </Link>
              </li>
              <li>
                <Link to="/hizmet/mobile-dev" className="text-[13px] text-secondary hover:text-primary transition-colors duration-200">
                  Mobil Uygulama
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.18em] text-secondary/50 mb-5">
              İletişim
            </h4>
            <div className="space-y-3.5">
              <a href="mailto:iletisim@butiqstudio.com" className="text-[13px] text-secondary hover:text-primary transition-colors duration-200 block">
                iletisim@butiqstudio.com
              </a>
              <a href="https://wa.me/905367736242" target="_blank" rel="noopener noreferrer" className="text-[13px] text-secondary hover:text-primary transition-colors duration-200 block">
                +90 (536) 773 62 42
              </a>
              <p className="text-[13px] text-secondary">Bahçelievler, İstanbul</p>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[12px] text-green-500">Yeni Projeler İçin Açık</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-secondary/40 tracking-[0.06em]">
            © 2026 Butiq Studio — Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6 text-[11px] font-mono text-secondary/40">
            <Link to="/gizlilik" className="hover:text-secondary transition-colors duration-200">
              Gizlilik Politikası
            </Link>
            <Link to="/kullanim-kosullari" className="hover:text-secondary transition-colors duration-200">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
