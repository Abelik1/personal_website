import {
  ArrowUpRight,
  Atom,
  BrainCircuit,
  ChevronDown,
  Cpu,
  Download,
  FileText,
  Github,
  Images,
  Linkedin,
  Mail,
  MapPin,
  Orbit,
  Terminal,
  Waves
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { FluidField } from "./FluidField";
import {
  education,
  experiences,
  identityChips,
  profile,
  projects,
  skillClusters,
  thesisSlides,
  workstreams,
  type Project
} from "./content";

type View = "portfolio" | "thesis";

const portfolioNavItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

const thesisNavItems = [
  { label: "Overview", href: "#thesis-overview" },
  { label: "Slides", href: "#thesis-slides" },
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
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      className={`link-button ${variant}`}
      href={href}
      download={download}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function ActionButton({
  children,
  onClick,
  variant = "primary"
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "ghost";
}) {
  return (
    <button className={`link-button ${variant}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function ExternalProfileLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function EquationBlock() {
  return (
    <div className="equation-block" aria-label="Thesis core equations">
      <div className="equation-line">
        <span>ρ</span>
        <sub>AB</sub>
        <span> = γ ⊗ γ + C</span>
      </div>
      <div className="equation-line secondary">
        <span>Tr</span>
        <sub>A</sub>
        <span>C = Tr</span>
        <sub>B</sub>
        <span>C = 0</span>
      </div>
      <div className="equation-caption">local marginals fixed, correlations left free</div>
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.visual}`} aria-hidden="true">
      <div className="visual-gridline" />
      {project.visual === "assistant" && (
        <>
          <span className="visual-chip chip-one">wake</span>
          <span className="visual-chip chip-two">tools</span>
          <span className="visual-orbit" />
          <span className="visual-core" />
        </>
      )}
      {project.visual === "car" && (
        <>
          <span className="road-line" />
          <span className="car-body" />
          <span className="car-window" />
          <span className="car-wheel wheel-one" />
          <span className="car-wheel wheel-two" />
        </>
      )}
      {project.visual === "quantum" && (
        <>
          <span className="wave-line line-one" />
          <span className="wave-line line-two" />
          <span className="spin-dot dot-one" />
          <span className="spin-dot dot-two" />
          <span className="spin-dot dot-three" />
        </>
      )}
      {project.visual === "thesis" && (
        <>
          <span className="thermal-box box-one">gamma</span>
          <span className="thermal-box box-two">rho</span>
          <span className="thermal-link" />
        </>
      )}
      {project.visual === "chemistry" && (
        <>
          <span className="molecule atom-one" />
          <span className="molecule atom-two" />
          <span className="molecule atom-three" />
          <span className="bond bond-one" />
          <span className="bond bond-two" />
        </>
      )}
      {project.visual === "spectroscopy" && (
        <>
          <span className="spectrum bar-one" />
          <span className="spectrum bar-two" />
          <span className="spectrum bar-three" />
          <span className="spectrum bar-four" />
          <span className="scope-line" />
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const Icon = projectIcons[project.accent];

  return (
    <details className={`project-card accent-${project.accent} ${featured ? "featured" : ""}`}>
      <summary className="project-summary-panel">
        <ProjectVisual project={project} />
        <div className="project-card__top">
          <div>
            <p className="eyebrow">{project.eyebrow}</p>
            <h3>{project.title}</h3>
          </div>
          <span className="project-icon" aria-hidden="true">
            <Icon size={22} />
          </span>
        </div>
        <p className="project-summary">{project.short}</p>
        <div className="stack-list compact" aria-label={`${project.title} stack preview`}>
          {project.stack.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <span className="expand-cue">
          Open details
          <ChevronDown size={16} />
        </span>
      </summary>
      <div className="project-expanded">
        <p className="project-expanded-summary">{project.summary}</p>
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
      </div>
    </details>
  );
}

function ResearchFeature({ onOpenThesis }: { onOpenThesis: () => void }) {
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
          <ActionButton onClick={onOpenThesis} variant="ghost">
            <FileText size={17} />
            Open thesis tab
          </ActionButton>
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

function WorkstreamsSection() {
  return (
    <section className="section notes-section">
      <div className="section-heading">
        <p className="eyebrow">Selected threads</p>
        <h2>Recent work grouped by what it is actually trying to do.</h2>
      </div>
      <div className="note-grid">
        {workstreams.map((item) => (
          <article className="note" key={item.title}>
            <span>{item.area}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PortfolioPage({ onOpenThesis }: { onOpenThesis: () => void }) {
  const featuredProjects = projects.slice(0, 3);
  const additionalProjects = projects.slice(3);

  return (
    <>
      <section className="hero">
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
            <ActionButton onClick={onOpenThesis} variant="ghost">
              <FileText size={17} />
              Thesis
            </ActionButton>
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
            <ExternalProfileLink href={profile.github}>
              <Github size={17} />
              GitHub
            </ExternalProfileLink>
            <ExternalProfileLink href={profile.linkedin}>
              <Linkedin size={17} />
              LinkedIn
            </ExternalProfileLink>
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

      <ResearchFeature onOpenThesis={onOpenThesis} />
      <WorkstreamsSection />
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
    </>
  );
}

function ThesisPage() {
  return (
    <>
      <section className="thesis-hero" id="thesis-overview">
        <div>
          <p className="eyebrow">Capstone thesis</p>
          <h1>Locally Thermal from Global Athermality</h1>
          <p>
            A quantum thermodynamics project about states that look thermal from every local
            viewpoint, while global correlations still store non-equilibrium structure.
          </p>
          <div className="hero-actions">
            <LinkButton href={profile.thesis}>
              <Download size={17} />
              Download report
            </LinkButton>
            <LinkButton href={profile.capstoneSlides} variant="ghost">
              <Images size={17} />
              Download slides
            </LinkButton>
          </div>
        </div>
        <div className="thesis-equation" aria-label="Thesis core equation">
          <EquationBlock />
        </div>
      </section>

      <section className="section thesis-overview">
        <div className="section-heading">
          <p className="eyebrow">Core story</p>
          <h2>Freeze the local physics, then study what the correlations can still do.</h2>
        </div>
        <div className="thesis-pillars">
          <article>
            <h3>Local thermality</h3>
            <p>Both reduced states are fixed to the Gibbs state, so local athermality is removed by construction.</p>
          </article>
          <article>
            <h3>Global athermality</h3>
            <p>Any deviation from γ ⊗ γ must be encoded in correlations, coherence, or entanglement.</p>
          </article>
          <article>
            <h3>GP convertibility</h3>
            <p>Choi-matrix SDPs test whether one locally thermal state can be transformed into another without adding free energy.</p>
          </article>
        </div>
      </section>

      <section className="section thesis-slide-section" id="thesis-slides">
        <div className="section-heading">
          <p className="eyebrow">Presentation narrative</p>
          <h2>Built from the current capstone presentation PDF.</h2>
        </div>
        <div className="thesis-slide-list">
          {thesisSlides.map((slide, index) => (
            <article className="thesis-slide-card" key={slide.title}>
              <div className="slide-image-wrap">
                <img src={slide.image} alt={`${slide.title} slide render`} loading="lazy" />
              </div>
              <div className="slide-copy">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{slide.title}</h3>
                <p>{slide.body}</p>
                <ul>
                  {slide.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactSection />
    </>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<View>("portfolio");
  const navItems = activeView === "portfolio" ? portfolioNavItems : thesisNavItems;
  const openView = (view: View) => {
    setActiveView(view);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  return (
    <div className="site-shell">
      <FluidField />
      <header className="site-header">
        <button type="button" className="brand" onClick={() => openView("portfolio")}>
          AB
        </button>
        <nav aria-label="Primary navigation">
          <button
            type="button"
            className={activeView === "portfolio" ? "active" : ""}
            onClick={() => openView("portfolio")}
          >
            Portfolio
          </button>
          <button
            type="button"
            className={activeView === "thesis" ? "active" : ""}
            onClick={() => openView("thesis")}
          >
            Thesis
          </button>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        {activeView === "portfolio" ? (
          <PortfolioPage onOpenThesis={() => openView("thesis")} />
        ) : (
          <ThesisPage />
        )}
      </main>

      <footer className="site-footer">
        <span>{profile.name}</span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <Terminal size={16} />
          GitHub
        </a>
      </footer>
    </div>
  );
}
