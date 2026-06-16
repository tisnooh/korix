import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { TrustBar } from "../components/landing/TrustBar";
import { Services } from "../components/landing/Services";
import { Portfolio } from "../components/landing/Portfolio";
import { Process } from "../components/landing/Process";
import { FinalCTA } from "../components/landing/FinalCTA";
import { Footer } from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="grain relative bg-[#030303] min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Portfolio />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
