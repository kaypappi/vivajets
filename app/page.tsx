import Image from "next/image";
import Services from "./services";
import About from "./about";
import Benefits from "./benefits";
import Testimonials from "./testimonials";
import Cta from "./cta";
import Footer from "../components/layouts/footer";
import Hero from "./hero";
import { SiteHeader } from "@/components/layouts/site-header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Services />
      <About />
      <Benefits />
      <Testimonials />
      <Cta />
      <Footer />
    </main>
  );
}
