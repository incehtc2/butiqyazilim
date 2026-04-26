import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  const navigate = useNavigate();

  return (
    <section id="hizmetler" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <div className="section-label mb-5">Hizmetler</div>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.15] tracking-tight max-w-lg">
              Hangi konularda<br />destek olabiliriz?
            </h2>
          </div>
          <p className="text-[13px] text-secondary leading-relaxed max-w-xs">
            İşini özenle yapan bir butik stüdyonun elinden çıkan pratik dijital çözümler.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => navigate(`/hizmet/${service.id}`)}
              className="group relative bg-neutral-800/60 border border-neutral-700/60 rounded-xl overflow-hidden cursor-pointer aspect-[3/4] flex flex-col justify-between p-5 hover:border-neutral-500/60 hover:bg-neutral-800/80 transition-all duration-500"
            >
              {/* Subtle image background */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-100 group-hover:scale-[1.06] transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent" />
              </div>

              {/* Top: step number */}
              <div className="relative z-10">
                <span className="text-[10px] font-mono text-neutral-400 tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Bottom: title + arrow */}
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-[13px] md:text-[14px] font-medium text-neutral-100 leading-snug">
                    {service.title}
                  </h3>
                  <ArrowUpRight
                    size={13}
                    className="text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 shrink-0 mt-0.5"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
