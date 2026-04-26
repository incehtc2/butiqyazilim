import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { PROJECTS as STATIC_PROJECTS, SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Maximize2, X } from 'lucide-react';

export default function ProjectsPage() {
  const [dynamicProjects, setDynamicProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDynamicProjects(data);
    } catch (error) {
      console.error("Projeler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  const allProjects = [...dynamicProjects, ...STATIC_PROJECTS];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-full flex items-center justify-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-highlight/90 transition-colors p-2"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                alt="Proje tam ekran"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Ana Sayfaya Dön
        </Link>

        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-mono text-highlight/90 uppercase tracking-widest mb-4 block">BAZI ÇALIŞMALARIMIZ</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium mb-8">
              Şimdiye kadar <br /> <span className="text-neutral-500 italic">neler yaptık?</span>
            </h1>
            <p className="text-xl text-neutral-400 font-light leading-relaxed">
              Basit web sitelerinden karmaşık yönetim panellerine kadar, her bütçeye ve ihtiyaca uygun geliştirdiğimiz projelerin bir özeti.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-neutral-500 italic">Yükleniyor...</div>
        ) : allProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {allProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div
                  className="aspect-video w-full rounded-3xl overflow-hidden bg-surface border border-neutral-800 mb-6 relative"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-zoom-in"
                    referrerPolicy="no-referrer"
                    onClick={() => setSelectedImage(project.image)}
                  />

                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button
                      onClick={() => setSelectedImage(project.image)}
                      className="w-10 h-10 bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
                    >
                      <Maximize2 size={18} />
                    </button>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-white"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-mono text-white uppercase tracking-widest">
                      {SERVICES.find(s => s.id === project.serviceId)?.title || 'Genel Proje'}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-display font-medium">{project.title}</h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-highlight/100 text-xs font-mono uppercase tracking-widest flex items-center gap-1 hover:underline mt-2"
                    >
                      İncele <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <p className="text-neutral-500 mb-6 font-light">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-surface border border-neutral-800 rounded-full text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-neutral-800 rounded-[2.5rem]">
            <p className="text-neutral-500 italic">Henüz yüklü bir proje bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
