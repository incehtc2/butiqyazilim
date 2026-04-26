import { motion } from 'motion/react';
import { PROCESS } from '../constants';

export default function Process() {
  return (
    <section id="surec" className="py-24 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-20">
          <div className="section-label mb-5">Sürecimiz</div>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.15] tracking-tight max-w-lg">
            Fikirlerinizi çalışan<br />ürünlere dönüştüren süreç
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="relative"
            >
              {/* Number row with connector line */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-mono text-highlight/50 tracking-[0.2em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i < 3 && (
                  <div className="hidden lg:block flex-1 h-px bg-border" />
                )}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-secondary mb-6">
                <step.icon size={18} strokeWidth={1.5} />
              </div>

              {/* Text */}
              <h3 className="text-[15px] font-medium text-primary mb-3">{step.title}</h3>
              <p className="text-[13px] text-secondary leading-[1.75]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
