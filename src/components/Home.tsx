import { lazy, Suspense } from 'react';
import Hero from './Hero';

const Services = lazy(() => import('./Services'));
const Process = lazy(() => import('./Process'));
const ProductsTeaser = lazy(() => import('./ProductsTeaser'));
const Projects = lazy(() => import('./Projects'));
const Faq = lazy(() => import('./Faq'));

function SectionPlaceholder() {
  return <div className="py-24 bg-background border-t border-border" />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <div id="hizmetler-wrapper">
        <Suspense fallback={<SectionPlaceholder />}>
          <Services />
        </Suspense>
      </div>
      <Suspense fallback={<SectionPlaceholder />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <ProductsTeaser />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionPlaceholder />}>
        <Faq />
      </Suspense>
    </>
  );
}
