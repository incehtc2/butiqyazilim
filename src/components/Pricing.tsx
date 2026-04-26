import { motion } from 'motion/react';
import { PRICING_PLANS } from '../constants';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <section id="paketler" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <div className="section-label mb-5">Fiyatlandırma</div>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.15] tracking-tight max-w-lg">
            Her ihtiyaca uygun,<br />şeffaf paketler
          </h2>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative p-7 rounded-xl border flex flex-col ${plan.isPopular
                  ? 'border-primary/20 bg-surface'
                  : 'border-border bg-surface/50'
                }`}
            >
              {/* Popular label */}
              {plan.isPopular && (
                <div className="absolute top-5 right-5 text-[9px] font-mono tracking-[0.15em] text-highlight/90 border border-accent/30 px-2.5 py-1 rounded-sm uppercase">
                  Popüler
                </div>
              )}

              {/* Plan name */}
              <span className="text-[11px] font-mono text-secondary uppercase tracking-[0.15em] mb-5 block">
                {plan.name}
              </span>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[1.875rem] font-medium text-primary leading-none">{plan.price}</span>
                {plan.id !== 'custom' && (
                  <span className="text-[12px] text-secondary">'den</span>
                )}
              </div>
              <p className="text-[12px] text-secondary leading-relaxed mb-7">{plan.description}</p>

              {/* Divider */}
              <div className="h-px bg-border mb-6" />

              {/* Features */}
              <ul className="space-y-3.5 mb-8 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3 text-[13px] text-secondary">
                    <span className="w-4 h-4 rounded-full border border-secondary/25 flex items-center justify-center mt-0.5 shrink-0">
                      <Check size={9} className="text-secondary/70" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/iletisim"
                className={`h-10 rounded-md text-[13px] font-medium flex items-center justify-center transition-colors duration-200 ${plan.isPopular
                    ? 'bg-highlight text-white hover:bg-highlight/90'
                    : 'border border-border text-primary hover:border-highlight/50 hover:text-white'
                  }`}
              >
                Hemen Başla
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-[11px] text-secondary/50">
          * Fiyatlar başlangıç seviyesidir ve projenin detaylarına göre revize edilebilir.
        </p>
      </div>
    </section>
  );
}
