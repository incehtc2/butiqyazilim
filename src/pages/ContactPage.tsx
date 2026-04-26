import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const contactItems = [
  {
    icon: Mail,
    label: 'E-POSTA',
    value: 'iletisim@butiqstudio.com',
    href: 'mailto:iletisim@butiqstudio.com',
  },
  {
    icon: WhatsAppIcon,
    label: 'WHATSAPP',
    value: '+90 (536) 773 62 42',
    href: 'https://wa.me/905367736242',
  },
  {
    icon: MapPin,
    label: 'OFİS',
    value: 'Bahçelievler, İstanbul',
    href: null,
  },
  {
    icon: Clock,
    label: 'ÇALIŞMA SAATLERİ',
    value: 'Pzt–Cum, 09:00–18:00',
    href: null,
  },
];

const services = [
  'Web Tasarım & Geliştirme',
  'SaaS Uygulama Geliştirme',
  'E-Ticaret Çözümleri',
  'Marka & Kurumsal Kimlik',
  'Diğer',
];

const socials = ['Instagram', 'LinkedIn', 'Twitter'];

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;
    setFormState('submitting');
    const data = new FormData(e.currentTarget);
    try {
      await addDoc(collection(db, 'contacts'), {
        name: data.get('name'),
        email: data.get('email'),
        service: data.get('service'),
        message: data.get('message'),
        createdAt: serverTimestamp(),
      });
      setFormState('success');
    } catch {
      setFormState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      {/* Hero strip */}
      <div className="border-b border-border pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-6"
          >
            İletişim
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[1.05] tracking-tight max-w-4xl"
          >
            Bir projeniz mi var?{' '}
            <span className="italic text-secondary">Konuşalım.</span>
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 xl:gap-24">

          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col justify-between gap-16"
          >
            <div>
              <p className="text-neutral-400 font-light text-lg leading-relaxed max-w-sm mb-14">
                Fikirlerinizi gerçeğe dönüştürmek için sabırsızlanıyoruz. Formu doldurun, en geç 24 saat içinde dönüş yapalım.
              </p>

              <ul className="space-y-0 divide-y divide-border">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-center gap-5 py-5 group">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-highlight/90 shrink-0 group-hover:border-accent/50 transition-colors">
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith('https') ? '_blank' : undefined} rel={href.startsWith('https') ? 'noopener noreferrer' : undefined} className="text-sm font-medium text-primary hover:text-highlight/90 transition-colors truncate block">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-primary">{value}</p>
                      )}
                    </div>
                    {href && (
                      <ArrowUpRight size={14} className="ml-auto text-neutral-700 group-hover:text-highlight/90 transition-colors shrink-0" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-mono mb-5">Sosyal Medya</p>
              <div className="flex flex-wrap gap-3">
                {socials.map(s => (
                  <a
                    key={s}
                    href="#"
                    className="px-4 py-2 rounded-xl border border-border text-xs font-mono text-neutral-400 hover:border-accent/50 hover:text-highlight/90 transition-all uppercase tracking-widest"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[520px] flex flex-col items-center justify-center text-center px-8 bg-surface border border-border rounded-3xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                    <CheckCircle2 size={28} className="text-highlight/90" />
                  </div>
                  <h3 className="text-2xl font-display font-medium mb-3">Mesajınız Alındı</h3>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed max-w-xs mb-8">
                    Ekibimiz talebinizi inceleyip en kısa sürede sizinle iletişime geçecek.
                  </p>
                  <button
                    onClick={() => { setFormState('idle'); setAgreed(false); }}
                    className="px-6 py-3 rounded-xl border border-border text-sm font-medium hover:border-accent/50 hover:text-highlight/90 transition-all"
                  >
                    Yeni mesaj gönder
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-surface border border-border rounded-3xl p-8 md:p-10 space-y-7"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Ad Soyad" name="name" type="text" placeholder="Ahmet Yılmaz" />
                    <Field label="E-posta" name="email" type="email" placeholder="ahmet@firma.com" />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-mono mb-2.5">
                      Hizmet
                    </label>
                    <select
                      name="service"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent transition-colors text-neutral-300 appearance-none cursor-pointer"
                    >
                      {services.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-mono mb-2.5">
                      Mesaj
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Projenizden kısaca bahsedin..."
                      className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <button
                      type="button"
                      onClick={() => setAgreed(v => !v)}
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${agreed
                          ? 'bg-highlight border-highlight text-white'
                          : 'border-border group-hover:border-highlight/50'
                        }`}
                    >
                      {agreed && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className="text-xs text-neutral-500 leading-relaxed">
                      Gizlilik politikasını okudum ve verilerimin işlenmesini kabul ediyorum.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={formState === 'submitting' || !agreed}
                    className="w-full h-14 rounded-xl bg-highlight text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2.5 hover:bg-highlight/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? (
                      <span className="opacity-70">Gönderiliyor…</span>
                    ) : (
                      <>
                        Talep Gönder
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Map strip */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-24 rounded-3xl border border-border overflow-hidden relative h-64 md:h-96 bg-neutral-900 group"
        >
          {/* grid lines */}
          {[25, 50, 75].map(p => (
            <React.Fragment key={p}>
              <div className="absolute inset-x-0 h-px bg-white/[0.04]" style={{ top: `${p}%` }} />
              <div className="absolute inset-y-0 w-px bg-white/[0.04]" style={{ left: `${p}%` }} />
            </React.Fragment>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-highlight/5" />

          {/* pin */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin size={24} className="text-highlight/90" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">İstanbul, Türkiye</p>
              <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest mt-0.5">Bahçelievler</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-[10px] text-neutral-500 uppercase tracking-widest font-mono mb-2.5">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
