import Navigation from "@/components/Navigation";
import type { BlogPost } from "@/types";

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building a Full-Stack Portfolio with Next.js",
    excerpt:
      "A deep dive into the architecture decisions behind this portfolio site, from frontend to backend deployment on Railway. Learn about the tech stack, design patterns, and deployment strategies.",
    date: "2026-02-14",
    slug: "building-fullstack-portfolio",
    tags: ["Next.js", "Railway", "TypeScript", "PostgreSQL"],
  },
  {
    id: "2",
    title: "Bridging Technical Architecture and Product Strategy",
    excerpt:
      "Lessons learned from aligning technical implementation with product goals in enterprise environments. Discover how to balance technical excellence with business outcomes.",
    date: "2026-02-10",
    slug: "technical-architecture-product-strategy",
    tags: ["Product Management", "Architecture", "Leadership"],
  },
  {
    id: "3",
    title: "Modern Backend Development with Java and Spring Boot",
    excerpt:
      "Exploring best practices for building scalable backend systems with Java. From microservices architecture to database optimization, learn the patterns that drive reliability.",
    date: "2026-02-05",
    slug: "modern-backend-java-spring",
    tags: ["Java", "Spring Boot", "Backend", "Microservices"],
  },
];

export default function Blog() {
  return (
    <main className="page-shell">
      <div className="page-backdrop" aria-hidden="true" />
      <Navigation />
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <section className="hero mb-10">
          <p className="eyebrow">Insights & Articles</p>
          <h1 className="hero-title">Blog</h1>
          <p className="hero-description">
            Thoughts on technical architecture, product strategy, and the intersection of
            engineering and business.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="panel flex flex-col">
              <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <h2 className="mb-3 text-xl font-bold leading-tight" style={{ color: "var(--title)" }}>
                {post.title}
              </h2>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-700">
                {post.excerpt}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-semibold hover:underline"
                style={{ color: "var(--primary)" }}
              >
                Read more
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
            </article>
          ))}
        </div>

        <footer className="mt-8 text-center text-xs tracking-wide text-slate-500 md:mt-10">
          © {new Date().getFullYear()} Aris Anastasatos
        </footer>
      </div>
    </main>
  );
}
