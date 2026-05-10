import {
  ArrowUpRight,
  Atom,
  BrainCircuit,
  Cpu,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Orbit,
  Terminal,
  Waves
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FluidField } from "./FluidField";
import {
  education,
  experiences,
  identityChips,
  labNotes,
  profile,
  projects,
  skillClusters,
  type Project
} from "./content";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

const projectIcons: Record<Project["accent"], LucideIcon> = {
  cyan: Waves,
  green: Cpu,
  amber: BrainCircuit
};

function LinkButton({
  href,
  children,
  variant = "primary",
  download
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
}) {
  return (
    <a className={`link-button ${variant}`} href={href} download={download}>
      {children}
    </a>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const Icon = projectIcons[project.accent];

  return (
    <article className={`project-card accent-${project.accent} ${featured ? "featured" : ""}`}>
      <div className="project-card__top">
        <div>
          <p className="eyebrow">{project.eyebrow}</p>
          <h3>{project.title}</h3>
        </div>
        <span className="project-icon" aria-hidden="true">
          <Icon size={22} />
        </span>
      </div>
      <p className="project-summary">{project.summary}</p>
      <div className="project-detail">
        <strong>Problem</strong>
        <p>{project.problem}</p>
      </div>
      <div className="project-detail">
        <strong>What I built</strong>
        <ul>
          {project.built.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="stack-list" aria-label={`${project.title} stack`}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="project-footer">
        <p>{project.impact}</p>
        {project.link && (
          <a href={project.link.href} className="text-link">
            {project.link.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function ResearchFeature() {
  const thesis = projects.find((project) => project.title.includes("Locally Thermal"));
  if (!thesis) return null;

  return (
    <section className="section research-section" id="research">
      <div className="section-heading">
        <p className="eyebrow">Research</p>
        <h2>Thermodynamics after local equilibrium is already enforced.</h2>
      </div>
      <div className="research-layout">
        <div className="research-copy">
          <p>
            The capstone asks what remains when a bipartite quantum system has exactly thermal
            local marginals. Any distance from global equilibrium can no longer live locally; it has
            to live in correlations.
          </p>
          <p>
            The work characterizes the locally thermal set as a spectrahedral slice, develops the
            two-qubit normal form, studies positivity and PPT structure, and compares global and
            local Gibbs-preserving convertibility.
          </p>
          <LinkButton href={profile.thesis} variant="ghost">
            <Download size={17} />
            Download thesis
          </LinkButton>
        </div>
        <div className="lt-diagram" aria-label="Locally thermal state diagram">
          <div className="node node-a">Local Gibbs state</div>
          <div className="node node-b">Global state</div>
          <div className="node node-c">Correlation resource</div>
          <div className="beam beam-one" />
          <div className="beam beam-two" />
          <div className="beam beam-three" />
          <p>D(rho || Gamma) = mutual information on the locally thermal manifold</p>
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline() {
  return (
    <section className="section" id="experience">
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>Research, teaching, product engineering, and lab automation.</h2>
      </div>
      <div className="timeline">
        {experiences.map((item) => (
          <article className="timeline-item" key={`${item.period}-${item.role}`}>
            <time>{item.period}</time>
            <div>
              <h3>{item.role}</h3>
              <p className="muted">{item.place}</p>
              <ul>
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillCluster() {
  return (
    <section className="section skill-section">
      <div className="section-heading">
        <p className="eyebrow">Skills</p>
        <h2>A toolkit shaped by physics problems and software products.</h2>
      </div>
      <div className="skill-grid">
        {skillClusters.map((cluster) => (
          <article className="skill-cluster" key={cluster.title}>
            <h3>{cluster.title}</h3>
            <div>
              {cluster.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Open to research, software, and AI systems work.</h2>
        <p>
          Based in Dublin, with a background in theoretical physics and practical experience across
          research code, product systems, automation, and teaching.
        </p>
      </div>
      <div className="contact-actions">
        <LinkButton href={`mailto:${profile.email}`}>
          <Mail size={17} />
          Email
        </LinkButton>
        <LinkButton href={profile.github} variant="ghost">
          <Github size={17} />
          GitHub
        </LinkButton>
        <LinkButton href={profile.linkedin} variant="ghost">
          <Linkedin size={17} />
          LinkedIn
        </LinkButton>
      </div>
    </section>
  );
}

export default function App() {
  const featuredProjects = projects.slice(0, 3);
  const additionalProjects = projects.slice(3);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#top" className="brand">
          AB
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <FluidField />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-location">
              <MapPin size={16} />
              {profile.location}
            </p>
            <h1>{profile.name}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions" aria-label="Main actions">
              <LinkButton href="#work">
                <Orbit size={17} />
                View projects
              </LinkButton>
              <LinkButton href={profile.softwareCv} variant="ghost">
                <Download size={17} />
                Software CV
              </LinkButton>
              <LinkButton href={profile.physicsCv} variant="ghost">
                <Download size={17} />
                Physics CV
              </LinkButton>
            </div>
            <div className="hero-links" aria-label="Profile links">
              <a href={profile.github}>
                <Github size={17} />
                GitHub
              </a>
              <a href={profile.linkedin}>
                <Linkedin size={17} />
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>
                <Mail size={17} />
                {profile.email}
              </a>
            </div>
            <div className="identity-row">
              {identityChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
          <aside className="hero-panel" aria-label="Current profile">
            <div>
              <p className="eyebrow">Current focus</p>
              <strong>Physics-trained builder</strong>
              <span>AI systems, quantum simulation, data tooling, and full-stack products.</span>
            </div>
            <div className="signal-stack">
              <span>Local-first AI</span>
              <span>Reservoir computing</span>
              <span>Thermal correlations</span>
            </div>
          </aside>
        </section>

        <section className="section" id="work">
          <div className="section-heading">
            <p className="eyebrow">Featured work</p>
            <h2>Systems that move between theory, data, and useful interfaces.</h2>
          </div>
          <div className="featured-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} featured />
            ))}
          </div>
          <div className="project-grid">
            {additionalProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <ResearchFeature />

        <section className="section notes-section">
          <div className="section-heading">
            <p className="eyebrow">Lab notes</p>
            <h2>Ideas with enough traction to keep pulling on.</h2>
          </div>
          <div className="note-grid">
            {labNotes.map((note, index) => (
              <article className="note" key={note}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </section>

        <ExperienceTimeline />

        <SkillCluster />

        <section className="section education-section">
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Formal grounding in theoretical physics.</h2>
          </div>
          <div className="education-grid">
            {education.map((item) => (
              <article key={item.title} className="education-item">
                <Atom size={20} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <span>{item.focus}</span>
              </article>
            ))}
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="site-footer">
        <span>{profile.name}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github}>
          <Terminal size={16} />
          GitHub
        </a>
      </footer>
    </div>
  );
}
