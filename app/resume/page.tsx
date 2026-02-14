import Navigation from "@/components/Navigation";
import type { ResumeData } from "@/types";

const resumeData: ResumeData = {
  summary:
    "Technical Architect and Product Manager with a strong background in backend development, particularly in Java. I bridge technical implementation and product strategy to keep teams aligned and execution focused. Currently exploring modern web technologies and building personal projects to broaden my product and engineering toolkit.",
  experience: [
    {
      title: "Technical Architect & Product Manager",
      organization: "Your Company Name",
      period: "2020 - Present",
      description: [
        "Led architecture decisions for enterprise-scale applications serving thousands of users",
        "Aligned technical implementation with product strategy to deliver measurable business outcomes",
        "Managed cross-functional teams to execute on complex technical initiatives",
        "Designed and implemented scalable backend systems using Java and Spring Boot",
      ],
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Microservices", "Docker"],
    },
    {
      title: "Senior Backend Developer",
      organization: "Previous Company",
      period: "2017 - 2020",
      description: [
        "Developed and maintained high-performance backend services",
        "Implemented RESTful APIs and microservices architecture",
        "Optimized database queries and improved system performance by 40%",
        "Mentored junior developers and conducted code reviews",
      ],
      technologies: ["Java", "Spring Framework", "MySQL", "Redis", "AWS"],
    },
    {
      title: "Backend Developer",
      organization: "Early Career Company",
      period: "2015 - 2017",
      description: [
        "Built backend features for web applications",
        "Collaborated with frontend teams to deliver end-to-end solutions",
        "Participated in agile development processes and sprint planning",
      ],
      technologies: ["Java", "Hibernate", "SQL", "REST APIs"],
    },
  ],
  skills: {
    Backend: ["Java", "Spring Boot", "Node.js", "REST APIs", "Microservices"],
    Frontend: ["React", "Next.js", "TypeScript", "HTML/CSS"],
    Database: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    DevOps: ["Docker", "Kubernetes", "CI/CD", "Git", "AWS"],
    "Product & Leadership": ["Product Strategy", "Technical Architecture", "Team Leadership", "Agile/Scrum"],
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University Name",
      period: "2011 - 2015",
    },
  ],
};

export default function Resume() {
  return (
    <main className="page-shell">
      <div className="page-backdrop" aria-hidden="true" />
      <Navigation />
      <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <section className="hero mb-10">
          <h1 className="hero-title">Aris Anastasatos</h1>
          <p className="hero-subtitle">Technical Architect & Product Manager</p>
          <p className="mt-4 text-sm text-slate-600">Based in Greece, working internationally</p>
        </section>

        {/* Professional Summary */}
        <section className="panel mb-8">
          <h2 className="section-title">Professional Summary</h2>
          <p className="text-sm leading-7 text-slate-700 md:text-base">{resumeData.summary}</p>
        </section>

        {/* Experience */}
        <section className="panel mb-8">
          <h2 className="section-title">Experience</h2>
          <div className="space-y-8">
            {resumeData.experience.map((job, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-slate-200">
                <div
                  className="absolute left-0 -translate-x-1/2 h-4 w-4 rounded-full border-2"
                  style={{
                    borderColor: "var(--primary)",
                    backgroundColor: "var(--surface)",
                  }}
                />
                <div className="mb-2">
                  <h3 className="text-lg font-bold" style={{ color: "var(--title)" }}>
                    {job.title}
                  </h3>
                  <p className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
                    {job.organization}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{job.period}</p>
                </div>
                <ul className="mb-3 space-y-1.5 text-sm leading-relaxed text-slate-700">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="panel mb-8">
          <h2 className="section-title">Skills</h2>
          <div className="space-y-4">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="mb-2 text-sm font-semibold" style={{ color: "var(--title)" }}>
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border px-3 py-1.5 text-xs font-medium"
                      style={{
                        borderColor: "var(--surface-border)",
                        color: "var(--foreground)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="panel mb-8">
          <h2 className="section-title">Education</h2>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index}>
                <h3 className="text-base font-bold" style={{ color: "var(--title)" }}>
                  {edu.degree}
                </h3>
                <p className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
                  {edu.institution}
                </p>
                <p className="text-xs text-slate-500 mt-1">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-8 text-center text-xs tracking-wide text-slate-500 md:mt-10">
          © {new Date().getFullYear()} Aris Anastasatos
        </footer>
      </div>
    </main>
  );
}
