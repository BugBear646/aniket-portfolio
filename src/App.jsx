import Nav from "./components/Nav";
import CursorGlow from "./components/Cursorglow";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CompanyBanner from "./components/CompanyBanner";
import Work from "./components/Work";
import SideProjects from "./components/SideProjects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div className="bg-base min-h-screen overflow-x-hidden selection:bg-amber selection:text-base">
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <CompanyBanner />
        <Work />
        <SideProjects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}