import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Home from './components/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminPanel from './pages/AdminPanel';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import ProjectsPage from './pages/ProjectsPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen overflow-x-hidden bg-background">
        <TopBar />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hizmet/:serviceId" element={<ProjectDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/gizlilik" element={<Privacy />} />
            <Route path="/kullanim-kosullari" element={<Terms />} />
            <Route path="/projeler" element={<ProjectsPage />} />
            <Route path="/urunler" element={<ProductsPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

