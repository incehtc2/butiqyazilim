import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { FAQS } from '../constants';
import { Plus } from 'lucide-react';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-surface border-t border-border">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <div className="section-label mb-5">Sıkça Sorulanlar</div>
          <h2 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.15] tracking-tight">
            Merak edilen sorular
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-border">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-5 flex items-center justify-between text-left gap-4 group"
              >
                <span className="text-[14px] font-medium text-primary group-hover:text-white transition-colors duration-200">
                  {faq.question}
                </span>
                <Plus
                  size={15}
                  className={`text-secondary shrink-0 transition-all duration-300 ${
                    openIndex === i ? 'rotate-45 text-primary' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5 text-[13px] text-secondary leading-[1.8]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
