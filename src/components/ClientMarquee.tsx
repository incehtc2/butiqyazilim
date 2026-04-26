import { motion } from 'motion/react';
import { CLIENTS } from '../constants';

export default function ClientMarquee() {
  return (
    <div className="w-full bg-surface border-y border-neutral-900 py-10 overflow-hidden noise">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center gap-20 px-10"
        >
          {CLIENTS.map((client, idx) => (
            <span 
              key={`client-1-${idx}`} 
              className="text-2xl md:text-4xl font-display font-medium text-neutral-800 hover:text-neutral-700 transition-colors tracking-tighter"
            >
              {client}
            </span>
          ))}
          {/* Repeat for seamless loop */}
          {CLIENTS.map((client, idx) => (
            <span 
              key={`client-2-${idx}`} 
              className="text-2xl md:text-4xl font-display font-medium text-neutral-800 hover:text-neutral-700 transition-colors tracking-tighter"
            >
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
