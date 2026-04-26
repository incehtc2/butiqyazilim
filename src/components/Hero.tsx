import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Single subtle glow — not everywhere */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-accent/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-highlight opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-highlight" />
              </span>
              <span className="text-[10px] font-mono text-secondary tracking-[0.18em] uppercase">
                Strateji · Tasarım · Teknoloji
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-medium leading-[1.1] tracking-tight mb-7"
            >
              Markalar için<br />  
            
              <span className="text-secondary">Butik Yazılım</span><br />
               Çözümleri
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[14px] md:text-[15px] text-secondary leading-[1.8] mb-10 max-w-md"
            >
              Markanız için sadece bir web sitesi değil — estetik, hız ve
              işlevselliğin kusursuz uyumuyla tasarlanmış özel yazılım çözümleri.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                to="/iletisim"
                className="group h-10 px-7 bg-highlight text-white text-[13px] font-medium rounded-md inline-flex items-center gap-2 hover:bg-highlight/90 transition-colors duration-200"
              >
                İletişime Geçin
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
              <a
                href="#hizmetler"
                className="text-[13px] text-secondary underline hover:text-primary transition-colors duration-200"
              >
                Hizmetlere göz atın
              </a>
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <img
                src="/hero.png"
                alt="Butiq Studio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>

         
          </motion.div>
        </div>
      </div>
    </section>
  );
}
