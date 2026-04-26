import Hero from './Hero';
import Services from './Services';
import Process from './Process';
import Projects from './Projects';

import Faq from './Faq';
import ProductsTeaser from './ProductsTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <div id="hizmetler-wrapper">
        <Services />
      </div>
      <Process />
      <ProductsTeaser />
      <Projects />
      <Faq />

    </>
  );
}
