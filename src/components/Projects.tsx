import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PROJECTS as STATIC_PROJECTS } from '../constants';
import { db } from '../lib/firebase';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id?: string;
  title: string;
  description: string;
  serviceId: string;
  image: string;
  tags: string[];
  url: string;
}

export default function Projects() {
  const [dbProjects, setDbProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(6));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setDbProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const allProjects: Project[] = [...dbProjects];
  (STATIC_PROJECTS as Project[]).forEach(sp => {
    if (!dbProjects.find(dp => dp.title === sp.title)) {
      allProjects.push(sp);
    }
  });

  const featuredProjects = allProjects.slice(0, 3);

  return (
    <section id="projeler" className="py-24 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <div className="section-label mb-5">Portfolyo</div>
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-medium leading-[1.15] tracking-tight">
              Hayata geçirdiğimiz<br />bazı işler
            </h2>
          </div>
          <a
            href="/projeler"
            className="group flex items-center gap-3 text-[12px] font-mono text-secondary hover:text-primary transition-colors tracking-[0.12em] uppercase"
          >
            Tüm Projeler
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </a>
        </div>

        {/* Cards */}
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <a href={project.url} className="block group">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-background mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {project.tags?.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono bg-background/80 border border-border/60 px-2 py-1 rounded-sm text-secondary/70 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-start justify-between gap-3 px-1">
                    <div>
                      <h3 className="text-[14px] font-medium text-primary mb-1.5">{project.title}</h3>
                      <p className="text-[12px] text-secondary line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={15}
                      className="text-border group-hover:text-secondary transition-colors duration-200 shrink-0 mt-0.5"
                    />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-border rounded-xl bg-background">
            <p className="text-[13px] text-secondary">Projeler yükleniyor...</p>
          </div>
        )}
      </div>
    </section>
  );
}
