import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Platforms } from "./sections/Platforms";
import { WhyMarketTech } from "./sections/WhyMarketTech";
import { FAQ } from "./sections/FAQ";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-3 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        דילוג לתוכן הראשי
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Platforms />
        <WhyMarketTech />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
