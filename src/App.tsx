import {
  ArrowLeft,
  ArrowUpRight,
  Search,
  X,
  Atom,
  Download,
  FileText,
  Github,
  Images,
  Linkedin,
  Mail,
  MapPin,
  Orbit,
  Route,
  Terminal,
  Workflow
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FluidField } from "./FluidField";
import { agitateField, calmField, fieldBus } from "./fieldBus";
import { fallbackVisual, skillVisuals } from "./skillBrands";
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
  type ProjectMedia,
  type ProjectSection,
  type ProjectTable
} from "./content";

type View = "portfolio" | "thesis" | "project";

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

// Remembered so Back from a project page returns to the same place in the grid.
const navigation = { portfolioScroll: 0, cameFromPortfolio: false };
// Filters survive a trip to a project page and back.
const workFilters = { category: "All work", query: "" };

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A project's own image or clip. Clips play while `playing` is true and step through the playlist.
function ProjectCover({ project, playing }: { project: Project; playing: boolean }) {
  const { cover } = project;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clip, setClip] = useState(0);
  const clips = cover?.kind === "video" ? [{ src: cover.src, poster: cover.poster ?? "" }, ...(cover.playlist ?? [])] : [];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && !prefersReducedMotion()) void video.play().catch(() => undefined);
    else video.pause();
  }, [playing, clip]);

  if (!cover) return <ProjectArtwork visual={project.visual} hue={project.hue} />;
  if (cover.kind === "image") {
    return <img src={cover.src} alt={cover.alt} loading="lazy" decoding="async" style={{ objectPosition: cover.position }} />;
  }
  const current = clips[clip % clips.length];
  return (
    <video
      ref={videoRef}
      key={current.src}
      src={current.src}
      poster={current.poster}
      aria-label={cover.alt}
      muted
      playsInline
      preload={clip === 0 ? "metadata" : "auto"}
      loop={clips.length === 1}
      onEnded={() => setClip((value) => (value + 1) % clips.length)}
      style={{ objectPosition: cover.position }}
    />
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);
  const external = Boolean(project.href);
  const engage = (element: HTMLElement) => {
    setActive(true);
    agitateField(element, project.hue);
  };
  const release = (element: HTMLElement) => {
    setActive(false);
    calmField(element);
  };

  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el) calmField(el);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={project.href ?? `#project/${project.slug}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="project-card"
      style={{ "--h": project.hue } as CSSProperties}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") engage(event.currentTarget);
      }}
      onPointerLeave={(event) => release(event.currentTarget)}
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
        event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
      }}
      onFocus={(event) => engage(event.currentTarget)}
      onBlur={(event) => release(event.currentTarget)}
      onClick={() => {
        if (external) return;
        navigation.portfolioScroll = window.scrollY;
        navigation.cameFromPortfolio = true;
      }}
    >
      <div className="project-face">
        <div className="project-cover">
          <ProjectCover project={project} playing={active} />
          <span className="project-cover__shade" aria-hidden="true" />
          {project.status && (
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {project.status}
            </span>
          )}
          {external && (
            <span className="project-badge">
              {new URL(project.href!).hostname}
              <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          )}
          <div className="project-cover__caption">
            <p className="eyebrow">{project.eyebrow}</p>
            <h3>{project.title}</h3>
          </div>
        </div>
        <div className="project-body">
          <p className="project-summary">{project.short}</p>
          <div className="stack-list compact" aria-label={`${project.title} stack preview`}>
            {project.stack.slice(0, 4).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <span className="expand-cue">
            {external ? `Visit ${new URL(project.href!).hostname}` : "Open project page"}
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="project-peek" aria-hidden="true">
        <ul>
          {project.peek.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </a>
  );
}

function ProjectTableBlock({ table }: { table: ProjectTable }) {
  return (
    <div className="project-table-wrap">
      <div className="project-table-scroll">
        <table className="project-table">
          <thead>
            <tr>
              {table.head.map((cell) => (
                <th key={cell} scope="col">{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, index) => (index === 0 ? <th key={cell} scope="row">{cell}</th> : <td key={`${cell}-${index}`}>{cell}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && <p className="project-table-note">{table.note}</p>}
    </div>
  );
}

function projectSections(project: Project): { lead: string[]; stats?: { value: string; label: string }[]; sections: ProjectSection[] } {
  if (project.detail) return project.detail;
  return {
    lead: [project.summary],
    sections: [
      { title: "The problem", body: [project.problem] },
      { title: "What I built", bullets: project.built },
      ...(project.media && project.media.length > 0
        ? [{ title: project.mediaLabel ?? "From the repository", body: project.mediaCredit ? [project.mediaCredit] : undefined, media: project.media }]
        : []),
      { title: "Outcome", body: [project.impact] }
    ]
  };
}

function ProjectPage({ project }: { project: Project | undefined }) {
  const goBack = (event: React.MouseEvent) => {
    if (navigation.cameFromPortfolio) {
      event.preventDefault();
      navigation.cameFromPortfolio = false;
      window.history.back();
    }
  };

  if (!project) {
    return (
      <section className="section project-missing">
        <h1>Project not found.</h1>
        <p>That link does not match a project on this site.</p>
        <LinkButton href="#work">All projects</LinkButton>
      </section>
    );
  }

  const { lead, stats, sections } = projectSections(project);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="project-hero" style={{ "--h": project.hue } as CSSProperties}>
        <div className="project-hero__copy">
          <a className="back-link" href="#work" onClick={goBack}>
            <ArrowLeft size={16} aria-hidden="true" />
            All projects
          </a>
          <div className="project-eyebrow-row">
            <p className="eyebrow">{project.eyebrow}</p>
            {project.status && (
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                {project.status}
              </span>
            )}
          </div>
          <h1>{project.title}</h1>
          {lead.map((paragraph) => (
            <p className="project-lead" key={paragraph}>{paragraph}</p>
          ))}
          <div className="stack-list" aria-label={`${project.title} stack`}>
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          {project.link && (
            <div className="hero-actions">
              <LinkButton href={project.link.href}>
                {project.link.href.includes("github.com") ? <Github size={17} /> : <ArrowUpRight size={17} />}
                {project.link.label}
              </LinkButton>
            </div>
          )}
        </div>
        <div className="project-hero__art">
          <ProjectCover project={project} playing />
        </div>
      </section>

      {stats && stats.length > 0 && (
        <section className="project-stats" style={{ "--h": project.hue } as CSSProperties} aria-label={`${project.title} key facts`}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>
      )}

      {sections.map((section) => (
        <section className="section project-section" key={section.title}>
          <div className="project-section__head">
            <h2>{section.title}</h2>
          </div>
          <div className="project-section__body">
            {section.body?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.table && <ProjectTableBlock table={section.table} />}
            {section.media && section.media.length > 0 && (
              <div className="project-media-grid">
                {section.media.map((item) => (
                  <ProjectMediaItem key={item.src} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      <nav className="section project-pager" aria-label="More projects">
        <a href={`#project/${previous.slug}`}>
          <span><ArrowLeft size={14} aria-hidden="true" /> Previous</span>
          <strong>{previous.title}</strong>
        </a>
        <a href={`#project/${next.slug}`}>
          <span>Next <ArrowUpRight size={14} aria-hidden="true" /></span>
          <strong>{next.title}</strong>
        </a>
      </nav>

      <ContactSection />
    </>
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
  const visual = skillVisuals[skill] ?? fallbackVisual;
  return (
    <span className="skill-pill" style={{ "--skill": visual.color } as CSSProperties}>
      <span className="skill-mark" aria-hidden="true">
        {visual.kind === "brand" ? (
          <svg viewBox="0 0 24 24"><path d={visual.path} fill="currentColor" /></svg>
        ) : (
          <visual.Icon size={17} />
        )}
      </span>
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
  const [category, setCategoryState] = useState(workFilters.category);
  const [query, setQueryState] = useState(workFilters.query);
  const setCategory = (value: string) => {
    workFilters.category = value;
    setCategoryState(value);
  };
  const setQuery = (value: string) => {
    workFilters.query = value;
    setQueryState(value);
  };
  const displayedProjects = projects.filter((project) =>
    (category === "All work" || project.category === category) &&
    [project.title, project.eyebrow, project.short, ...project.stack].join(" ").toLowerCase().includes(query.trim().toLowerCase())
  );

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
            {projectCategories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="project-search"><Search size={17} aria-hidden="true" /><input type="search" aria-label="Search projects" placeholder="Search projects or tools" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={16} /></button>}</div>
        </div>
        <p className="work-count" role="status">{displayedProjects.length} {displayedProjects.length === 1 ? "project" : "projects"}</p>
        {displayedProjects.length === 0 && <div className="empty-state"><h3>No matching projects.</h3><p>Try a different subject or tool, or browse the full collection.</p><button className="link-button ghost" type="button" onClick={() => { setQuery(""); setCategory("All work"); }}>Reset filters</button></div>}
        <div className="featured-grid work-grid">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
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

type Route = { view: View; slug?: string };

const readRoute = (): Route => {
  const hash = window.location.hash;
  if (hash.startsWith("#thesis")) return { view: "thesis" };
  if (hash.startsWith("#project/")) return { view: "project", slug: decodeURIComponent(hash.slice("#project/".length)) };
  return { view: "portfolio" };
};

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute);
  const previousView = useRef<View>(route.view);
  const activeView = route.view;
  const project = route.slug ? projects.find((item) => item.slug === route.slug) : undefined;
  useEffect(() => {
    const syncView = () => setRoute(readRoute());
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);
  useEffect(() => {
    document.title =
      activeView === "thesis"
        ? "Quantum thermodynamics thesis | Alexander Belik"
        : activeView === "project" && project
          ? `${project.title} | Alexander Belik`
          : "Alexander Belik | Theoretical Physics & Scientific Computing";
    fieldBus.pageHue = activeView === "project" && project ? project.hue : null;
    const leftProject = previousView.current === "project" && activeView === "portfolio";
    previousView.current = activeView;
    if (activeView === "project") {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (leftProject && navigation.portfolioScroll > 0) {
      window.scrollTo({ top: navigation.portfolioScroll, behavior: "instant" });
    } else {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "instant" });
    }
  }, [activeView, project]);
  const navItems = activeView === "thesis" ? thesisNavItems : portfolioNavItems;
  const openView = (view: View) => {
    navigation.cameFromPortfolio = false;
    window.location.hash = view === "thesis" ? "thesis-overview" : "top";
    setRoute({ view });
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const switchView: "portfolio" | "thesis" = activeView === "thesis" ? "thesis" : "portfolio";

  return (
    <div className="site-shell">
      <FluidField />
      <a className="skip-link" href={activeView === "thesis" ? "#thesis-main-content" : "#main-content"}>Skip to content</a>
      <header className="site-header">
        <button type="button" className="brand" aria-label="Alexander Belik, home" onClick={() => openView("portfolio")}>
          AB
        </button>
        <nav aria-label="Primary navigation">
          <div className={`view-switch ${switchView}`} role="group" aria-label="Site view">
            <span className="view-switch-thumb" aria-hidden="true" />
            <button
              type="button"
              className={switchView === "portfolio" ? "active" : ""}
              aria-pressed={switchView === "portfolio"}
              onClick={() => openView("portfolio")}
            >
              Portfolio
            </button>
            <button
              type="button"
              className={switchView === "thesis" ? "active" : ""}
              aria-pressed={switchView === "thesis"}
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
        {activeView === "portfolio" && <PortfolioPage onOpenThesis={() => openView("thesis")} />}
        {activeView === "project" && <ProjectPage project={project} />}
        {activeView === "thesis" && <ThesisPage />}
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
