import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="page-backdrop" aria-hidden="true" />
      <Navigation />
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <section className="hero">
          <p className="eyebrow">Professional Portfolio</p>
          <h1 className="hero-title">Aris Anastasatos</h1>
          <p className="hero-subtitle">Technical Architect & Product Manager</p>
          <p className="hero-description">
            I build reliable technical foundations and align them with product strategy to
            deliver measurable outcomes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#about" className="btn btn-primary">
              About Me
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in Touch With Me
            </a>
          </div>
        </section>

        <section id="about" className="panel mb-8 md:mb-10">
          <h2 className="section-title">About</h2>
          <div className="space-y-4 text-sm leading-7 text-slate-700 md:text-base">
            <p>
              I&apos;m a Technical Architect and Product Manager with a strong background in backend
              development, particularly in Java. I bridge technical implementation and product
              strategy to keep teams aligned and execution focused.
            </p>
            <p>
              I&apos;m currently exploring modern web technologies and building personal projects to
              broaden my product and engineering toolkit.
            </p>
          </div>
        </section>

        <section id="contact">
          <ContactForm />
        </section>
        <footer className="mt-8 text-center text-xs tracking-wide text-slate-500 md:mt-10">
          © {new Date().getFullYear()} Aris Anastasatos
        </footer>
          </div>
    </main>
  );
}
