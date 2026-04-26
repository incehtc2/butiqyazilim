import { Suspense, lazy, Component, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import Home from './components/Home';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: '#fff', padding: '2rem', fontFamily: 'monospace' }}>
          <h2>Bir hata oluştu</h2>
          <pre style={{ fontSize: '12px', opacity: 0.6 }}>{(this.state.error as Error).message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function PageLoader() {
  return <div className="min-h-screen bg-background" />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen overflow-x-hidden bg-background">
          <TopBar />
          <Navbar />
          <main>
            <Suspense fallback={<PageLoader />}>
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
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
