import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
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
          Kullanım Koşulları
        </motion.h1>

        <div className="prose prose-invert prose-neutral max-w-none space-y-8 text-neutral-400 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">1. Hizmet Şartları</h2>
            <p>Butiq Studio web sitesini kullanarak, aşağıda belirtilen koşullara uymayı kabul etmiş sayılırsınız. Bu kurallar sitenin genel kullanımını ve içerik erişimini kapsar.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">2. Fikri Mülkiyet</h2>
            <p>Bu sitede yer alan tüm tasarım, yazılım, metin ve görsellerin mülkiyeti Butiq Studio'ya aittir. Yazılı izin olmaksızın kopyalanamaz veya ticari amaçla kullanılamaz.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">3. Sorumluluk Reddi</h2>
            <p>Sitemizde sunulan bilgilerin doğruluğu için özen gösterilmektedir ancak içeriğin kullanımından kaynaklanabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">4. Değişiklik Hakları</h2>
            <p>Butiq Studio, bu koşulları herhangi bir bildirimde bulunmaksızın güncelleme hakkını saklı tutar.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
