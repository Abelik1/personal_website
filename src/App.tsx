import {
  ArrowUpRight,
  Search,
  X,
  Atom,
  BarChart3,
  Bot,
  BrainCircuit,
  ChevronDown,
  Cpu,
  Database,
  Download,
  FileText,
  FlaskConical,
  Gauge,
  Github,
  Images,
  Linkedin,
  Mail,
  MapPin,
  Mic,
  Orbit,
  Repeat2,
  Route,
  Server,
  Sigma,
  Terminal,
  Waves,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FluidField } from "./FluidField";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ProjectArtwork } from "./ProjectArtwork";
import {
  education,
  portfolioCopy,
  projectCategories,
  profile,
  projects,
  skillClusters,
  thesisStorySections,
  thesisTechnicalItems,
  workstreams,
  heroDemos,
  type Project,
  type ProjectMedia
} from "./content";

type View = "portfolio" | "thesis";

const portfolioNavItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

const thesisNavItems = [
  { label: "Overview", href: "#thesis-overview" },
  { label: "Explainer", href: "#thesis-explainer" },
  { label: "Technical", href: "#thesis-technical" },
  { label: "Contact", href: "#thesis-contact" }
];

const projectIcons: Record<Project["accent"], LucideIcon> = {
  cyan: Waves,
  green: Cpu,
  amber: BrainCircuit
};

type SkillLogo =
  | { kind: "brand"; slug: string; label?: string }
  | { kind: "icon"; Icon: LucideIcon };


const skillLogos: Record<string, SkillLogo> = {
  Python: { kind: "brand", slug: "python" },
  NumPy: { kind: "brand", slug: "numpy" },
  PyTorch: { kind: "brand", slug: "pytorch" },
  Mathematica: { kind: "brand", slug: "wolframmathematica", label: "Wolfram Mathematica" },
  "C/C++ simulations": { kind: "brand", slug: "cplusplus", label: "C++" },
  Matplotlib: { kind: "icon", Icon: BarChart3 },
  React: { kind: "brand", slug: "react" },
  TypeScript: { kind: "brand", slug: "typescript" },
  FastAPI: { kind: "brand", slug: "fastapi" },
  SQLite: { kind: "brand", slug: "sqlite" },
  "UX collaboration": { kind: "brand", slug: "figma", label: "Figma" },
  Figma: { kind: "brand", slug: "figma" },
  "Local LLM workflows": { kind: "icon", Icon: Bot },
  "Agent orchestration": { kind: "icon", Icon: Workflow },
  "Memory systems": { kind: "icon", Icon: Database },
  "Tool routing": { kind: "icon", Icon: Route },
  Automation: { kind: "icon", Icon: Cpu },
  LaTeX: { kind: "brand", slug: "latex" },
  "Quantum mechanics": { kind: "icon", Icon: Atom },
  "Statistical mechanics": { kind: "icon", Icon: FlaskConical },
  QFT: { kind: "icon", Icon: Atom },
  "Data analysis": { kind: "icon", Icon: BarChart3 },
  Reproducibility: { kind: "icon", Icon: Repeat2 },
  "Git / GitHub": { kind: "brand", slug: "github" },
  "CUDA / CuPy": { kind: "brand", slug: "nvidia", label: "NVIDIA CUDA" },
  SLURM: { kind: "icon", Icon: Server },
  "Parallel pipelines": { kind: "icon", Icon: Workflow },
  Benchmarking: { kind: "icon", Icon: Gauge },
  Linux: { kind: "brand", slug: "linux" },
  "Numerical solvers": { kind: "icon", Icon: Sigma },
  "Tailwind CSS": { kind: "brand", slug: "tailwindcss" },
  PostgreSQL: { kind: "brand", slug: "postgresql" },
  Docker: { kind: "brand", slug: "docker" },
  "GitHub Actions": { kind: "brand", slug: "githubactions" },
  "Data pipelines": { kind: "icon", Icon: Database },
  "Node.js": { kind: "brand", slug: "nodedotjs", label: "Node.js" },
  "Speech to text": { kind: "icon", Icon: Mic }
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
        <span>ρ<sub>AB</sub> = γ ⊗ γ + C</span>
      </div>
      <div className="equation-line secondary">
        <span>Tr<sub>A</sub> C = Tr<sub>B</sub> C = 0</span>
      </div>
      <div className="equation-caption">local marginals fixed, correlations left free</div>
    </div>
  );
}

function HeroDemoDome() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [still, setStill] = useState(false);
  const demo = heroDemos[index];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || still) return;
    void video.play().catch(() => undefined);
  }, [index, still]);

  return (
    <a className="hero-art" href="#work" aria-label="Leonardo Visual Demos, jump to selected work">
      <video
        ref={videoRef}
        key={demo.src}
        src={still ? undefined : demo.src}
        poster={demo.poster}
        muted
        playsInline
        preload="auto"
        onEnded={() => setIndex((current) => (current + 1) % heroDemos.length)}
      />
      <span className="field-label">
        {String(index + 1).padStart(2, "0")} / {demo.name}
      </span>
      <span className="field-source">
        Leonardo demos
        <ArrowUpRight size={13} aria-hidden="true" />
      </span>
    </a>
  );
}

function ProjectMediaItem({ item }: { item: ProjectMedia }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="project-media">
      {item.kind === "video" ? (
        <video ref={videoRef} src={item.src} poster={item.poster} muted loop playsInline preload="none" />
      ) : (
        <img src={item.src} alt={item.caption} loading="lazy" decoding="async" />
      )}
      <figcaption>{item.caption}</figcaption>
    </figure>
  );
}

function ProjectCard({
  project,
  featured = false,
  isOpen = false,
  side = "right",
  onToggle
}: {
  project: Project;
  featured?: boolean;
  isOpen?: boolean;
  side?: "left" | "right";
  onToggle: () => void;
}) {
  const Icon = projectIcons[project.accent];

  return (
    <details
      open={isOpen}
      className={`project-card accent-${project.accent} opens-${side} ${featured ? "featured" : ""}`}
    >
      <summary
        className="project-summary-panel"
        aria-label={`${isOpen ? "Close" : "Explore"} ${project.title}`}
        onClick={(event) => {
          event.preventDefault();
          onToggle();
        }}
      >
        <ProjectArtwork visual={project.visual} />
        <div className="project-card__top">
          <div>
            <div className="project-eyebrow-row">
              <p className="eyebrow">{project.eyebrow}</p>
              {project.status && (
                <span className="status-pill">
                  <span className="status-dot" aria-hidden="true" />
                  {project.status}
                </span>
              )}
            </div>
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
          {isOpen ? "Close details" : "Open details"}
          <ChevronDown size={16} />
        </span>
      </summary>
      <div className="project-expanded" role="group" aria-label={`${project.title} details`}>
        <div className="project-expanded-head">
          <h4>{project.title}</h4>
          <button type="button" className="project-close" onClick={onToggle} aria-label={`Close ${project.title} details`}>
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="project-expanded-intro">
          <strong>Overview</strong>
          <p className="project-expanded-summary">{project.summary}</p>
        </div>
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
        {project.media && project.media.length > 0 && (
          <div className="project-detail">
            <strong>{project.mediaLabel ?? "From the repository"}</strong>
            <div className="project-media-grid">
              {project.media.map((item) => (
                <ProjectMediaItem key={item.src} item={item} />
              ))}
            </div>
          </div>
        )}
        <div className="stack-list" aria-label={`${project.title} stack`}>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="project-footer">
          <p>{project.impact}</p>
          {project.link && (
            <a href={project.link.href} className="text-link" target="_blank" rel="noreferrer">
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
        <div className="research-art"><ProjectArtwork visual="thesis" /></div>
      </div>
    </section>
  );
}

function SkillPill({ skill }: { skill: string }) {
  const logo = skillLogos[skill];

  return (
    <span className="skill-pill">
      {logo?.kind === "brand" && <Terminal size={15} aria-hidden="true" />}
      {logo?.kind === "icon" && <logo.Icon size={15} aria-hidden="true" />}
      {!logo && <Cpu size={15} aria-hidden="true" />}
      <span>{skill}</span>
    </span>
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
                <SkillPill key={skill} skill={skill} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ thesis = false }: { thesis?: boolean }) {
  return (
    <section className="section contact-section" id={thesis ? "thesis-contact" : "contact"}>
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Open to research, software, and AI systems work.</h2>
        <p>
          Based in Dublin, with a theoretical physics degree and practical experience across research
          platforms, GPU and HPC simulation, product systems, automation, and teaching.
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
        <LinkButton href={profile.researchGate} variant="ghost">
          <Atom size={17} />
          ResearchGate
        </LinkButton>
        <LinkButton href={profile.rscPublication} variant="ghost">
          <FileText size={17} />
          RSC paper
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
        <h2>Recent workstreams.</h2>
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
  const [openProjectTitle, setOpenProjectTitle] = useState<string | null>(null);
  const [category, setCategory] = useState("All work");
  const [query, setQuery] = useState("");
  const displayedProjects = projects.filter((project) =>
    (category === "All work" || project.category === category) &&
    [project.title, project.eyebrow, project.short, ...project.stack].join(" ").toLowerCase().includes(query.trim().toLowerCase())
  );
  const featuredProjectTitles = new Set(projects.slice(0, 3).map((project) => project.title));

  useEffect(() => {
    if (!openProjectTitle) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenProjectTitle(null);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [openProjectTitle]);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-location">
            <MapPin size={16} />
            {profile.location}
          </p>
          <p className="hero-kicker">{portfolioCopy.kicker}</p>
          <h1>{profile.name.split(" ")[0]}<br /><span>{profile.name.split(" ").slice(1).join(" ")}<span className="name-period">.</span></span></h1>
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
            <ExternalProfileLink href={profile.researchGate}>
              <Atom size={17} />
              ResearchGate
            </ExternalProfileLink>
            <a href={`mailto:${profile.email}`}>
              <Mail size={17} />
              {profile.email}
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Current profile">
          <HeroDemoDome />
          <div className="current-focus"><p className="eyebrow">Currently</p><strong>{portfolioCopy.currentTitle}</strong><span>{portfolioCopy.currentDetail}</span></div>
        </aside>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work / 2024–2026</p>
          <h2>{portfolioCopy.workTitle}</h2>
          <p className="section-intro">{portfolioCopy.workIntro}</p>
        </div>
        <div className="work-toolbar">
          <div className="project-filters" role="group" aria-label="Filter projects">
            {projectCategories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setOpenProjectTitle(null); }}>{item}</button>)}
          </div>
          <div className="project-search"><Search size={17} aria-hidden="true" /><input type="search" aria-label="Search projects" placeholder="Search projects or tools" value={query} onChange={(event) => { setQuery(event.target.value); setOpenProjectTitle(null); }} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={16} /></button>}</div>
        </div>
        <p className="work-count" role="status">{displayedProjects.length} {displayedProjects.length === 1 ? "project" : "projects"}</p>
        {displayedProjects.length === 0 && <div className="empty-state"><h3>No matching projects.</h3><p>Try a different subject or tool, or browse the full collection.</p><button className="link-button ghost" type="button" onClick={() => { setQuery(""); setCategory("All work"); }}>Reset filters</button></div>}
        <div className="featured-grid work-grid">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={featuredProjectTitles.has(project.title)}
              side={index % 2 === 0 ? "right" : "left"}
              isOpen={openProjectTitle === project.title}
              onToggle={() =>
                setOpenProjectTitle((current) => (current === project.title ? null : project.title))
              }
            />
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
          <h2>From theoretical physics to high-performance computing.</h2>
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

      <section className="section thesis-explainer-section" id="thesis-explainer">
        <div className="section-heading">
          <p className="eyebrow">Simple explanation</p>
          <h2>The research, one idea at a time.</h2>
        </div>
        <div className="thesis-story-list">
          {thesisStorySections.map((section, index) => (
            <article className="thesis-story-card" key={section.title}>
              <div className="story-image-wrap">
                <img src={section.image} alt={`${section.title} presentation visual`} loading="lazy" />
              </div>
              <div className="story-copy">
                <span>{String(index + 1).padStart(2, "0")} / {section.eyebrow}</span>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section thesis-technical-section" id="thesis-technical">
        <div className="section-heading">
          <p className="eyebrow">Technical overview</p>
          <h2>A concise technical overview.</h2>
        </div>
        <div className="technical-layout">
          <div className="technical-equations">
            <EquationBlock />
            <div className="equation-block compact" aria-label="Free energy and mutual information equation">
              <div className="equation-line">
                <span>D(ρ ∥ Γ) = I(A : A′)</span>
              </div>
              <div className="equation-line secondary">
                <span>Γ = γ ⊗ γ</span>
              </div>
            </div>
          </div>
          <div className="technical-card-grid">
            {thesisTechnicalItems.map((item) => (
              <article className="technical-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="technical-actions">
          <LinkButton href={profile.thesis}>
            <Download size={17} />
            Download full thesis
          </LinkButton>
          <LinkButton href={profile.capstoneSlides} variant="ghost">
            <Images size={17} />
            Download presentation
          </LinkButton>
        </div>
      </section>

      <ContactSection thesis />
    </>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<View>(() => window.location.hash.startsWith("#thesis") ? "thesis" : "portfolio");
  useEffect(() => {
    const syncView = () => {
      setActiveView(window.location.hash.startsWith("#thesis") ? "thesis" : "portfolio");
    };
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);
  useEffect(() => {
    document.title = activeView === "thesis" ? "Quantum thermodynamics thesis | Alexander Belik" : "Alexander Belik | Theoretical Physics & Scientific Computing";
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }, [activeView]);
  const navItems = activeView === "portfolio" ? portfolioNavItems : thesisNavItems;
  const openView = (view: View) => {
    window.location.hash = view === "thesis" ? "thesis-overview" : "top";
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="site-shell">
      <FluidField />
      <a className="skip-link" href={activeView === "thesis" ? "#thesis-main-content" : "#main-content"}>Skip to content</a>
      <header className="site-header">
        <button type="button" className="brand" aria-label="Alexander Belik, home" onClick={() => openView("portfolio")}>
          AB
        </button>
        <nav aria-label="Primary navigation">
          <div className={`view-switch ${activeView}`} role="group" aria-label="Site view">
            <span className="view-switch-thumb" aria-hidden="true" />
            <button
              type="button"
              className={activeView === "portfolio" ? "active" : ""}
              aria-pressed={activeView === "portfolio"}
              onClick={() => openView("portfolio")}
            >
              Portfolio
            </button>
            <button
              type="button"
              className={activeView === "thesis" ? "active" : ""}
              aria-pressed={activeView === "thesis"}
              onClick={() => openView("thesis")}
            >
              Thesis
            </button>
          </div>
          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top"><span id={activeView === "thesis" ? "thesis-main-content" : "main-content"} tabIndex={-1} />
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
        <a href={profile.researchGate} target="_blank" rel="noreferrer">
          <Atom size={16} />
          ResearchGate
        </a>
      </footer>
    </div>
  );
}
