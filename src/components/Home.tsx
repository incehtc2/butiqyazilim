import { lazy, Suspense } from 'react';
import Hero from './Hero';
import Services from './Services';
import Process from './Process';
import ProductsTeaser from './ProductsTeaser';
import Faq from './Faq';

const Projects = lazy(() => import('./Projects'));

export default function Home() {
  return (
    <>
      <Hero />
      <div id="hizmetler-wrapper">
        <Services />
      </div>
      <Process />
      <ProductsTeaser />
      <Suspense fallback={<div className="py-24 bg-surface border-t border-border" />}>
        <Projects />
      </Suspense>
      <Faq />
    </>
  );
}
