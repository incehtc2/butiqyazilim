import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md"
      >
        <h1 className="text-9xl font-display font-bold text-highlight/90 mb-4">404</h1>
        <h2 className="text-3xl font-display font-medium mb-6">Sayfa Bulunamadı</h2>
        <p className="text-neutral-500 mb-12 font-light">
          Aradığınız sayfa silinmiş, ismi değiştirilmiş veya geçici olarak kullanım dışı olabilir.
        </p>
        <Link
          to="/"
          className="px-8 py-4 bg-highlight text-white font-bold rounded-xl hover:bg-highlight/90 transition-colors inline-block"
        >
          Ana Sayfaya Dön
        </Link>
      </motion.div>
    </div>
  );
}
