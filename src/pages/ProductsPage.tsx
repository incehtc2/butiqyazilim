import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS as STATIC_PRODUCTS } from '../constants';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Check, ArrowRight, Zap, Smartphone, Brain, Box } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id?: string;
  title: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  url?: string;
  tag?: string;
}

export default function ProductsPage() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setDbProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Combine static and dynamic products, avoiding duplicates by title
  const allProducts: Product[] = [...dbProducts];
  (STATIC_PRODUCTS as Product[]).forEach(sp => {
    if (!dbProducts.find(dp => dp.title === sp.title)) {
      allProducts.push(sp);
    }
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-mono text-highlight/90 uppercase tracking-widest mb-4"
          >
            HAZIR ÇÖZÜMLER
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-medium mb-8"
          >
            SaaS <span className="text-secondary italic">Ürünlerimiz</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            İhtiyacınıza yönelik, tak-çalıştır mantığında çalışan ve abonelik yöntemiyle kullanabileceğiniz kurumsal yazılım paketleri.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {allProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-neutral-800 rounded-[2.5rem] overflow-hidden group"
            >
              <div className="grid lg:grid-cols-2">
                {/* Visual Preview */}
                <div className="relative aspect-video lg:aspect-auto bg-neutral-900 overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-800">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-40" />

                  {product.tag && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[9px] font-bold rounded-full uppercase tracking-widest z-10">
                      {product.tag}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-highlight/90 font-mono text-xs uppercase tracking-tighter">PRODUCT #{i + 1}</span>
                      <div className="h-px w-8 bg-neutral-800" />
                      <span className="text-neutral-500 text-xs font-mono uppercase italic">{product.category}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">{product.title}</h2>
                    <p className="text-neutral-400 font-light leading-relaxed mb-8 text-lg">
                      {product.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                      {product.features?.map((feature: string) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-neutral-500">
                          <Check size={14} className="text-highlight/90" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-8 border-t border-neutral-900">
                    {product.url ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto h-14 px-8 bg-highlight text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-highlight/90 transition-all whitespace-nowrap"
                      >
                        Ürünü İncele
                        <ArrowRight size={18} />
                      </a>
                    ) : (
                      <Link
                        to="/iletisim"
                        className="w-full sm:w-auto h-14 px-8 bg-highlight text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-highlight/90 transition-all whitespace-nowrap"
                      >
                        Ürünü İncele
                        <ArrowRight size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 p-12 bg-black rounded-[3rem] text-white text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">Aradığınızı Bulamadınız mı?</h2>
            <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">
              İşletmenize özel, tamamen size özgü bir yazılım geliştirilmesini isterseniz butik hizmetlerimizden yararlanabilirsiniz.
            </p>
            <Link
              to="/#iletisim"
              className="inline-flex h-14 px-10 items-center justify-center bg-background text-white rounded-xl font-bold hover:bg-background/80 transition-colors"
            >
              Hemen Teklif Alın
            </Link>
          </div>
          <Box className="absolute -top-10 -left-10 text-white/5 w-64 h-64 -rotate-12" />
          <Zap className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 rotate-12" />
        </motion.div>
      </div>
    </div>
  );
}
