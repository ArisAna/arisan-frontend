import Navigation from "@/components/Navigation";

export default function Projects() {
  const projects = [
    {
      title: "Personal Portfolio Site",
      description:
        "Full-stack personal website with Next.js frontend and Node.js backend API, featuring PostgreSQL database and deployed on Railway and TopHost.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Enterprise Backend System",
      description:
        "Scalable microservices architecture built with Java and Spring Boot, handling high-volume transactions and integrations.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kubernetes"],
      link: "#",
    },
    {
      title: "Product Management Platform",
      description:
        "Internal tool for aligning product strategy with technical execution, featuring roadmap planning and analytics.",
      technologies: ["React", "Node.js", "MongoDB", "REST APIs"],
      link: "#",
    },
  ];

  return (
    <main className="page-shell">
      <div className="page-backdrop" aria-hidden="true" />
      <Navigation />
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <section className="hero mb-10">
          <p className="eyebrow">Portfolio</p>
          <h1 className="hero-title">Projects</h1>
          <p className="hero-description">
            A collection of things I&apos;ve built, from full-stack applications to backend systems
            and product tools.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={index} className="panel flex flex-col">
              <h3 className="mb-3 text-xl font-bold" style={{ color: "var(--title)" }}>
                {project.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-700">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="inline-flex items-center text-sm font-semibold hover:underline"
                style={{ color: "var(--primary)" }}
              >
                Learn more
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <footer className="mt-8 text-center text-xs tracking-wide text-slate-500 md:mt-10">
          © {new Date().getFullYear()} Aris Anastasatos
        </footer>
      </div>
    </main>
  );
}
