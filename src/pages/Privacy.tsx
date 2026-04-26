import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Geri Dön
        </Link>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-medium mb-12"
        >
          Gizlilik Politikası
        </motion.h1>

        <div className="prose prose-invert prose-neutral max-w-none space-y-8 text-neutral-400 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">1. Veri Toplama</h2>
            <p>Butiq Studio olarak, hizmetlerimizi sağlamak ve iyileştirmek amacıyla yalnızca gerekli olan verileri topluyoruz. Bu veriler, iletişim formları aracılığıyla sağladığınız isim ve e-posta adresini içerebilir.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">2. Veri Kullanımı</h2>
            <p>Toplanan bilgiler, taleplerinize yanıt vermek, projeleriniz hakkında bilgi sağlamak ve bültenimize kayıt olmanız durumunda güncellemeleri paylaşmak için kullanılır. Verileriniz asla üçüncü şahıslara satılmaz.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">3. Çerezler</h2>
            <p>Web sitemiz deneyiminizi iyileştirmek için temel çerezler kullanabilir. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">4. İletişim</h2>
            <p>Gizlilik politikamız hakkında sorularınız için iletisim@butiqstudio.com adresi üzerinden bizimle iletişime geçebilirsiniz.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
