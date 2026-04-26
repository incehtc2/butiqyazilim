import { motion } from 'motion/react';
import { RESTAURANT_APP_FEATURES } from '../constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RestaurantAppShowcase() {
  return (
    <section id="restoran-yazilimi" className="py-24 bg-surface noise overflow-hidden border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-mono text-highlight/90 mb-6 uppercase tracking-widest"
            >
              ÖZEL YAZILIM ÜRÜNÜMÜZ
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-medium mb-8 leading-tight"
            >
              Restoranınız İçin <br /> <span className="text-secondary italic">Yeni Nesil</span> Sipariş Yönetimi
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-neutral-400 text-lg mb-10 font-light leading-relaxed max-w-xl"
            >
              Karmaşık sistemlerle uğraşmayı bırakın. Abonelik modeliyle bütçenizi zorlamadan, restoranınızı dijitalin hızıyla yönetmeye bugün başlayın.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {RESTAURANT_APP_FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-background border border-neutral-800 flex items-center justify-center text-highlight/90 shrink-0">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1 text-sm">{feature.title}</h4>
                    <p className="text-xs text-neutral-500 font-light leading-snug">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="flex flex-col sm:flex-row gap-6">
              <button className="h-14 px-8 bg-highlight text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-highlight/90 transition-colors">
                Ücretsiz Demo Talep Et
                <ArrowRight size={18} />
              </button>
              <div className="flex flex-col justify-center">
                <span className="text-xs text-neutral-500 font-mono uppercase tracking-widest mb-1">ABONELİK FİYATI</span>
                <span className="text-xl font-display font-bold">499₺ <span className="text-neutral-500 text-xs font-normal">/ ay</span></span>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-square bg-linear-to-br from-accent/20 to-transparent rounded-[3rem] p-8 border border-accent/10">
              <div className="w-full h-full bg-background rounded-[2rem] border border-neutral-800 overflow-hidden shadow-2xl relative">
                {/* Simulated App UI */}
                <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-surface/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-black font-black">R</div>
                    <span className="text-sm font-bold tracking-tight">RESTRA-PANEL</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="h-32 rounded-2xl bg-surface border border-neutral-800 p-4">
                    <p className="text-[10px] text-neutral-500 mb-2 uppercase">GÜNLÜK TOPLAM SİPARİŞ</p>
                    <p className="text-3xl font-display font-bold">124</p>
                    <div className="mt-2 h-1 w-full bg-accent/20 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '70' }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map(i => (
                      <div key={i} className="h-20 rounded-2xl bg-surface border border-neutral-800 p-3">
                        <div className="w-6 h-6 rounded-full bg-neutral-800 mb-2" />
                        <div className="h-2 w-12 bg-neutral-800 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 right-10 p-4 glass rounded-xl border border-white/10 shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-[10px] font-medium text-white">Sipariş Hazır! (Masa 4)</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
