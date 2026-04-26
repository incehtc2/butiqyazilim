import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Logo } from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') { setActiveSection(''); return; }
    const ids = ['hizmetler', 'surec'];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="animate-fade-in">
          <Logo size="sm" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => {
            const isAnchor = link.href.startsWith('#');
            const isActive = isAnchor
              ? activeSection === link.href.slice(1)
              : location.pathname === link.href;
            return (
              <div
                key={link.label}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {isAnchor ? (
                  <a
                    href={link.href}
                    onClick={(e: any) => handleNavClick(e, link.href)}
                    className={`text-[13px] transition-colors duration-200 ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-[13px] transition-colors duration-200 ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block animate-fade-in" style={{ animationDelay: '240ms' }}>
            <Link
              to="/iletisim"
              className="h-8 px-5 text-[12px] font-medium bg-highlight text-white rounded-md inline-flex items-center hover:bg-highlight/90 transition-colors duration-200"
            >
              Proje Başlat
            </Link>
          </div>

          <button
            className="md:hidden p-1 text-secondary hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(v => !v)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden bg-background border-t border-border overflow-hidden transition-all duration-200 ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link) => {
            const isAnchor = link.href.startsWith('#');
            return isAnchor ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e: any) => {
                  setIsMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="py-3.5 text-[14px] text-secondary hover:text-primary transition-colors border-b border-border/60 last:border-0"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3.5 text-[14px] text-secondary hover:text-primary transition-colors border-b border-border/60 last:border-0"
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/iletisim"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-5 h-10 flex items-center justify-center bg-highlight text-white text-[13px] font-medium rounded-md"
          >
            Proje Başlat
          </Link>
        </div>
      </div>
    </nav>
  );
}
