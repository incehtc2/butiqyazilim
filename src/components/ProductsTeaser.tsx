import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS as STATIC_PRODUCTS } from '../constants';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { ArrowRight } from 'lucide-react';
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

export default function ProductsTeaser() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(2));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setDbProducts(data);
      } catch {
        // fallback to static
      }
    };
    fetchProducts();
  }, []);

  const allProducts: Product[] = [...dbProducts];
  (STATIC_PRODUCTS as Product[]).forEach(sp => {
    if (!dbProducts.find(dp => dp.title === sp.title)) {
      allProducts.push(sp);
    }
  });

  const teaserProducts = allProducts.slice(0, 2);

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <div className="section-label mb-5">Hazır Çözümler</div>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.15] tracking-tight">
              İşletmenizi hızlandıracak<br />hazır yazılımlar
            </h2>
          </div>
          <Link
            to="/urunler"
            className="group flex items-center gap-3 text-[12px] font-mono text-secondary hover:text-primary transition-colors tracking-[0.12em] uppercase"
          >
            Tüm Ürünler
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {teaserProducts.map((product, i) => (
            <motion.div
              key={product.id || i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group bg-surface border border-border rounded-xl p-8 hover:border-primary/15 transition-all duration-300 flex flex-col justify-between gap-8"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.15em]">
                    {product.category}
                  </span>
                  {product.tag && (
                    <span className="text-[9px] font-mono border border-accent/35 text-highlight/90 px-2.5 py-1 rounded-sm tracking-[0.12em] uppercase">
                      {product.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-medium text-primary mb-3">{product.title}</h3>
                <p className="text-[13px] text-secondary leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-end pt-5 border-t border-border">
                {product.url ? (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-secondary hover:text-primary transition-colors uppercase tracking-[0.12em]"
                  >
                    Ürünü İncele →
                  </a>
                ) : (
                  <Link
                    to="/urunler"
                    className="text-[11px] font-mono text-secondary hover:text-primary transition-colors uppercase tracking-[0.12em]"
                  >
                    Detaylar →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
