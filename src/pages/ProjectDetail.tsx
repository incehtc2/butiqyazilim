import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS as STATIC_PROJECTS, SERVICES } from '../constants';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { ArrowLeft, ExternalLink, X, Maximize2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Project {
  id?: string;
  title: string;
  description: string;
  serviceId: string;
  image: string;
  images?: string[];
  tags: string[];
  url: string;
}

export default function ProjectDetail() {
  const { serviceId } = useParams();
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDynamicProjects();
  }, [serviceId]);

  const fetchDynamicProjects = async () => {
    try {
      const q = query(
        collection(db, 'projects'),
        where('serviceId', '==', serviceId)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));

      // Memory sort to avoid index requirement
      const sorted = data.sort((a: any, b: any) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });

      setDynamicProjects(sorted);
    } catch (error) {
      console.error("Error fetching dynamic projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const service = SERVICES.find(s => s.id === serviceId);
  const staticProjects = (STATIC_PROJECTS as Project[]).filter(p => p.serviceId === serviceId);

  // Combine static and dynamic projects
  const allProjects: Project[] = [...dynamicProjects, ...staticProjects];

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">Hizmet Bulunamadı</h1>
        <Link to="/" className="text-highlight/90 underline">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 relative">
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
          Geri Dön
        </Link>

        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-mono text-highlight/90 uppercase tracking-widest mb-4 block">PORTFOLYO</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium mb-8">
              {service.title} <br /> <span className="text-neutral-500 italic">Projelerimiz</span>
            </h1>
            <p className="text-xl text-neutral-400 font-light leading-relaxed">
              {service.details}
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-neutral-500 italic">Projeler yükleniyor...</div>
        ) : allProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {allProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-display font-medium">{project.title}</h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-highlight/90 text-xs font-mono uppercase tracking-widest flex items-center gap-1 hover:underline mt-2"
                    >
                      Canlı Site <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <p className="text-neutral-500 mb-6 font-light">{project.description}</p>

                {project.images && project.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {project.images.map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-surface cursor-zoom-in hover:border-accent transition-colors"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                )}

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
            <p className="text-neutral-500 italic">Bu hizmet için yakında daha fazla proje eklenecektir.</p>
          </div>
        )}
      </div>
    </div>
  );
}
