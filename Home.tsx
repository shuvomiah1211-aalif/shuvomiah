import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Certifications from "../components/Certifications";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import { Achievements, Activities } from "../components/Activities";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

/** পাবলিক পোর্টফোলিও পেজ — সব সেকশন ডায়নামিকভাবে প্রোফাইল ডেটা থেকে আসে */
export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth bg-white font-sans text-slate-800 antialiased">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Certifications />
      <Skills />
      <Projects />
      <Activities />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}
