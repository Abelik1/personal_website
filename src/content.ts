export type ProjectMedia = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  caption: string;
};

export type Project = {
  title: string;
  category: "Software & AI" | "Scientific computing" | "Research";
  eyebrow: string;
  short: string;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  impact: string;
  accent: "cyan" | "green" | "amber";
  status?: string;
  mediaLabel?: string;
  media?: ProjectMedia[];
  visual:
    | "assistant"
    | "car"
    | "quantum"
    | "thesis"
    | "spectroscopy"
    | "hpc"
    | "lab"
    | "chemistry"
    | "home"
    | "workspace";
  link?: {
    label: string;
    href: string;
  };
};

export type HeroDemo = {
  name: string;
  src: string;
  poster: string;
};

export type Experience = {
  period: string;
  start: string;
  end: string;
  role: string;
  place: string;
  details: string[];
};

export type SkillCluster = {
  title: string;
  skills: string[];
};

export type Workstream = {
  area: string;
  title: string;
  description: string;
};

export type ThesisSlide = {
  title: string;
  image: string;
  body: string;
  points: string[];
};

export type ThesisStorySection = {
  eyebrow: string;
  title: string;
  image: string;
  body: string;
  points: string[];
};

export type ThesisTechnicalItem = {
  title: string;
  body: string;
};

// The hero dome cycles through a few of the Leonardo demos. Files come from public/media.
export const heroDemos: HeroDemo[] = [
  { name: "Black-hole lensing", src: "/media/hpc-demos/black_hole.mp4", poster: "/media/hpc-demos/black_hole.jpg" },
  { name: "Virtual wind tunnel", src: "/media/hpc-demos/fluid.mp4", poster: "/media/hpc-demos/fluid.jpg" },
  { name: "Living mathematics", src: "/media/hpc-demos/reaction_diffusion.mp4", poster: "/media/hpc-demos/reaction_diffusion.jpg" },
  { name: "Galaxy collision, 3D gravity", src: "/media/hpc-demos/galaxy_collision_3d.mp4", poster: "/media/hpc-demos/galaxy_collision_3d.jpg" }
];

export const profile = {
  name: "Alexander Belik",
  title: "Theoretical Physics | Scientific Computing | AI Systems",
  location: "Dublin, Ireland",
  email: "abelik1@outlook.com",
  github: "https://github.com/Abelik1",
  linkedin: "https://www.linkedin.com/in/alexander-belik/",
  researchGate: "https://www.researchgate.net/profile/Alexander-Belik",
  rscPublication: "https://pubs.rsc.org/en/content/articlelanding/2026/tc/d6tc00004e",
  softwareCv: "/documents/alexander-belik-software-cv.pdf",
  physicsCv: "/documents/alexander-belik-physics-cv.pdf",
  thesis: "/documents/locally-thermal-from-global-athermality.pdf",
  capstoneSlides: "/documents/capstone-slides.pdf",
  intro:
    "I build research platforms, GPU and HPC simulation tooling, machine-learning systems, and full-stack products across theoretical physics, scientific computing, and data-heavy software."
};

export const identityChips = [
  "Physics research",
  "HPC and GPU computing",
  "AI and ML systems",
  "Research platforms"
];

export const projects: Project[] = [
  {
    title: "Inhabis",
    eyebrow: "Home platform",
    status: "In progress",
    short:
      "A local-first operating layer for a connected home: one trusted model of the house, explicit policy, and evidence that an action actually worked.",
    summary:
      "Inhabis builds a trusted model of a home, translates different device ecosystems into a consistent internal language, evaluates goals and actions against explicit policy, and records what actually happened. It is local-first, policy-first, and fail-closed: stale evidence, missing authority, or an ambiguous action is rejected with a recorded reason.",
    problem:
      "A home can be full of capable devices whose intelligence is fragmented. One system knows the solar output, another the car, another the heating, and none of them holds the household's priorities, so an ordinary goal like using up spare solar power is not a command any single device can take.",
    built: [
      "TypeScript server with separated layers for operational state, derived planning context, and constrained planning",
      "Embedded Matter controller plus an Android companion that performs BLE and Thread onboarding away from the host",
      "Energy work spanning solar-surplus EV charging, solar production forecasting, and a learned room thermal predictor",
      "React dashboard over devices, energy, the world model, learning, and a whole-home simulator"
    ],
    stack: ["TypeScript", "Node.js", "React", "Python", "Matter / Thread", "Kotlin"],
    impact:
      "Automation that earns trust in steps: no model, forecast, or dashboard is the final safety authority, and every action is checked against policy and verified afterwards.",
    accent: "cyan",
    category: "Software & AI",
    visual: "home"
  },
  {
    title: "ORION",
    eyebrow: "Local AI assistant",
    status: "In progress",
    short:
      "Windows-first local assistant with wake-word gating, local LLM orchestration, memory, guarded tools, and a PyQt overlay/dashboard.",
    summary:
      "A Windows-first voice and text assistant built around wake-word gating, local model routing, guarded tool execution, memory, and a PyQt overlay plus dashboard.",
    problem:
      "Desktop assistants often become brittle command routers. ORION treats requests as an orchestration problem: decide, retrieve context, call tools safely, and report through one runtime envelope.",
    built: [
      "LLM-first capability selection with typed tool boundaries",
      "Wake-word and follow-up metadata for safer utterance handling",
      "Approval paths for system actions and durable memory changes",
      "Direct, offline, daemon, GUI, and text-only runtime modes"
    ],
    stack: ["Python", "PyQt", "Ollama", "SQLite", "Whisper", "Local LLMs"],
    impact:
      "A practical local-agent architecture that keeps persona, planning, memory, and side effects separated.",
    mediaLabel: "Interface artwork from the repository",
    media: [
      {
        "kind": "image",
        "src": "/media/orion/constellation-navigation.webp",
        "caption": "The assistant's navigation: each domain, from memory to workflows, is its own constellation."
      },
      {
        "kind": "image",
        "src": "/media/orion/memory-domain.webp",
        "caption": "Interface artwork for the memory domain, shipped with the ORION UI."
      }
    ],
    accent: "cyan",
    category: "Software & AI",
    visual: "assistant"
  },
  {
    title: "Orion Mini",
    eyebrow: "Desktop workspace",
    status: "In progress",
    short:
      "Local-first Windows workspace for projects, tasks, reminders, transcription, and an assistant, with React rendering inside a Qt shell.",
    summary:
      "A personal Windows desktop workspace that holds conversations, projects, tasks, reminders, and an AI assistant in one local application. React renders inside PySide6 and Qt WebEngine, and the packaged build ships a bundled dashboard.",
    problem:
      "Personal tooling scatters across a browser, a notes app, and a terminal. Pulling it back into one local application only works if the app is precise about where data goes and what it is allowed to do.",
    built: [
      "Multi-track transcription library with checkpoints, corrections, anchored notes, and timestamped exports",
      "Activity-aware reminders with idle detection and escalating native alerts that cannot be quietly dismissed",
      "Assistant with persistent project conversations, transcript retrieval, and selectable skills",
      "Model routing across local Ollama, provider APIs, or existing CLI logins, with no arbitrary skill-code execution"
    ],
    stack: ["Python", "PySide6 / Qt", "React", "TypeScript", "CUDA", "Whisper"],
    impact:
      "One local surface for the working day, where transcription, reminders, and assistance all run against real project state.",
    accent: "green",
    category: "Software & AI",
    visual: "workspace"
  },
  {
    title: "Leonardo Visual Demos",
    eyebrow: "HPC and GPU simulation",
    short:
      "Thirteen GPU-accelerated physics demonstrations that run headlessly on the Leonardo supercomputer and replay through a browser viewer.",
    summary:
      "A portable gallery of thirteen visual high-performance computing demonstrations for public engagement. Each demo separates headless scientific computation from presentation: the solver writes numbered frames and metadata, while a lightweight web viewer handles playback, controls, readouts, and saved runs.",
    problem:
      "Live scientific demonstrations tend to fail at the venue. They assume a graphics context, a fast link to the cluster, and a solver that finishes on cue, and a batch queue on a supercomputer guarantees none of those.",
    built: [
      "Thirteen solvers spanning lattice-Boltzmann flow, particle-mesh cosmology, N-body galaxy collisions, reaction-diffusion, plasma control, and molecular dynamics",
      "One demo contract that runs on NumPy, CuPy/CUDA, or a hybrid pipeline overlapping GPU solving with CPU frame encoding",
      "SLURM job templates for the CPU and A100 Booster partitions, with preflight, submission, and sync scripts",
      "Browser viewer with interactive scientific controls, deep-zoom tiles, and replay of previously computed runs"
    ],
    stack: ["Python", "CuPy / CUDA", "PyTorch", "NumPy", "SLURM", "JavaScript"],
    impact:
      "Exhibition-grade demonstrations that stay inspectable: the same run reproduces on a laptop, a CUDA desktop, or a Leonardo node, and a partially finished job is already usable.",
    mediaLabel: "Demo captures from the repository",
    media: [
      {
        "kind": "video",
        "src": "/media/hpc-demos/black_hole.mp4",
        "poster": "/media/hpc-demos/black_hole.jpg",
        "caption": "Black-hole lensing: image-space gravitational lensing with a numerical 3D photon-path view."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/pbh.mp4",
        "poster": "/media/hpc-demos/pbh.jpg",
        "caption": "Primordial black-hole threshold: a reduced radial model at the boundary between collapse and dispersion."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/fluid.mp4",
        "poster": "/media/hpc-demos/fluid.jpg",
        "caption": "Virtual wind tunnel: D2Q9 lattice-Boltzmann flow with advected streaklines and configurable obstacles."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/cosmic_web.mp4",
        "poster": "/media/hpc-demos/cosmic_web.jpg",
        "caption": "Cosmic-web formation: particle-mesh gravity with expanding space and gas-composition comparisons."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/galaxy_collision.mp4",
        "poster": "/media/hpc-demos/galaxy_collision.jpg",
        "caption": "Milky Way and Andromeda: restricted N-body evolution using physical mass and encounter parameters."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/galaxy_collision_3d.mp4",
        "poster": "/media/hpc-demos/galaxy_collision_3d.jpg",
        "caption": "Full 3D galaxy collision: direct softened all-pairs gravity over disc, bulge, and halo particles."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/reaction_diffusion.mp4",
        "poster": "/media/hpc-demos/reaction_diffusion.jpg",
        "caption": "Living mathematics: Gray-Scott reaction-diffusion evolving from a seed into an emergent pattern."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/crystal.mp4",
        "poster": "/media/hpc-demos/crystal.jpg",
        "caption": "Crystal growth: recursive anisotropic growth with multiple habits and deep zoom."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/neural_wall.mp4",
        "poster": "/media/hpc-demos/neural_wall.jpg",
        "caption": "Neural-network wall: a batched coordinate-network training workload revealing many networks at once."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/fusion_plasma.mp4",
        "poster": "/media/hpc-demos/fusion_plasma.jpg",
        "caption": "Star in a Bottle: a reduced nonlinear plasma-wave lattice projected onto a rotatable tokamak torus."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/plasma_guardian.mp4",
        "poster": "/media/hpc-demos/plasma_guardian.jpg",
        "caption": "AI Plasma Guardian: a trainable neural controller learning to suppress a plasma instability."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/weather_ensemble.mp4",
        "poster": "/media/hpc-demos/weather_ensemble.jpg",
        "caption": "Storm Factory: a barotropic-vorticity atmosphere turning small initial uncertainty into diverging forecasts."
      },
      {
        "kind": "video",
        "src": "/media/hpc-demos/molecular_dynamics.mp4",
        "poster": "/media/hpc-demos/molecular_dynamics.jpg",
        "caption": "Molecular Machine: coarse-grained 3D molecular dynamics with all-pairs interactions and ensemble comparisons."
      }
    ],
    accent: "cyan",
    category: "Scientific computing",
    visual: "hpc",
    link: {
      label: "View on GitHub",
      href: "https://github.com/Abelik1/HPC_Visual_Demos"
    }
  },
  {
    title: "LabFlow",
    eyebrow: "Research data platform",
    short:
      "Digital lab notebook for a materials research institute that stores measurements as structured relational records.",
    summary:
      "A digital lab notebook and experimental data management platform for a materials research institute. It is sample-centred in the interface and project-organised for researchers, storing measurements as structured relational records so provenance stays machine-readable, searchable, and auditable.",
    problem:
      "Research data usually ends up as files in folders named by whoever saved them. Once provenance lives in a filename, nothing downstream can be searched, audited, or trusted without a person in the loop.",
    built: [
      "React and TypeScript frontend over a FastAPI and PostgreSQL backend with versioned migrations",
      "Sample, project, instrument, and booking models with role-based access across organisations and sites",
      "Instrument capture path that moves large measurement files from the bench into named, structured records",
      "Containerised deployment plus a production-shaped local simulator, so backend changes are tested against the real topology"
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "Tailwind CSS"],
    impact:
      "Bench measurements become searchable, auditable records at the moment they are taken.",
    mediaLabel: "Interface screenshots",
    media: [
      {
        "kind": "image",
        "src": "/media/labflow/home-dashboard.webp",
        "caption": "Workspace overview: project groups, recent activity, and the busiest workspaces."
      },
      {
        "kind": "image",
        "src": "/media/labflow/samples-tab.webp",
        "caption": "Samples: every physical sample carries its own identity and history."
      },
      {
        "kind": "image",
        "src": "/media/labflow/new-experiment-form.webp",
        "caption": "New experiment: structured capture that makes the record complete at the point of work."
      },
      {
        "kind": "image",
        "src": "/media/labflow/data-tab.webp",
        "caption": "Data: files attached to the experiment that produced them."
      },
      {
        "kind": "image",
        "src": "/media/labflow/export-tab.webp",
        "caption": "Export: pulling a structured slice of the record back out."
      }
    ],
    accent: "green",
    category: "Software & AI",
    visual: "lab"
  },
  {
    title: "CarCove",
    eyebrow: "Product and data system",
    short:
      "Ireland-focused car keep-vs-switch optimizer with FastAPI, React, SQLite, scraping, normalization, and admin review tools.",
    summary:
      "An Ireland-focused keep-vs-switch car optimizer with FastAPI services, React/TypeScript UI, SQLite storage, scraping pipelines, normalization review, and admin browsers.",
    problem:
      "Car decisions are messy because market data, OEM catalogues, used inventory, finance, and running costs live in different shapes.",
    built: [
      "FastAPI backend with multiple SQLite-backed data services",
      "React admin surfaces for operations, catalogue review, used inventory, and normalization",
      "Scrapers for Autoevolution plus Toyota, Hyundai, and Volkswagen Ireland data",
      "Robots-aware, SearXNG, and Brave-backed indexed discovery options"
    ],
    stack: ["React", "TypeScript", "FastAPI", "SQLite", "Selenium", "Python"],
    impact:
      "Turns fragmented car-market information into inspectable, normalized decision data for real purchase tradeoffs.",
    accent: "green",
    category: "Software & AI",
    visual: "car"
  },
  {
    title: "EchoState and Heisenberg Chain",
    eyebrow: "Physics-informed ML",
    short:
      "PyTorch Echo State Network toolkit plus a Heisenberg spin-chain simulator for learning quantum time dynamics.",
    summary:
      "A PyTorch Echo State Network toolkit paired with a quantum spin-chain simulator for learning Heisenberg dynamics from generated observables.",
    problem:
      "Quantum time evolution is expensive to simulate directly, while sequence models need strong diagnostics before their predictions are physically trustworthy.",
    built: [
      "General-purpose ESN package with configurable reservoirs, feedback, washout, and mixed precision",
      "Nine ridge-regression solvers plus streaming covariance accumulation",
      "Optuna hyperparameter tuning and structured experiment logging",
      "Heisenberg spin-chain simulator with conservation-law validation"
    ],
    stack: ["PyTorch", "NumPy", "SciPy", "QuTiP", "Optuna", "Python"],
    impact:
      "Connects reservoir computing with quantum dynamics prediction while preserving a reusable ML library underneath.",
    mediaLabel: "Result figures from the repository",
    media: [
      {
        "kind": "image",
        "src": "/media/echostate/heisenberg-overlay.webp",
        "caption": "Trained echo-state predictions against exact Heisenberg-chain dynamics for three qubits of a five-site chain."
      }
    ],
    accent: "amber",
    category: "Scientific computing",
    visual: "quantum",
    link: {
      label: "View on GitHub",
      href: "https://github.com/Abelik1/physics_echostate"
    }
  },
  {
    title: "Locally Thermal from Global Athermality",
    eyebrow: "Capstone thesis",
    short:
      "Quantum thermodynamics project on globally correlated states whose local subsystems are exactly thermal, with an SDP toolkit behind it.",
    summary:
      "A research project on bipartite quantum states whose local marginals are thermal, so all deviation from global equilibrium must be stored in correlations, supported by a semidefinite-programming toolkit that tests convertibility numerically.",
    problem:
      "If local athermality is removed exactly, the remaining thermodynamic resource becomes a geometric and operational question about correlations.",
    built: [
      "Characterized locally thermal states as affine slices of the positive semidefinite cone",
      "Derived a full nine-parameter two-qubit normal form",
      "Reduced generic two-qubit positivity to a Schur-complement criterion",
      "Built an SDP toolkit testing global against verified local Gibbs-preserving convertibility, with structured reproducible run artifacts"
    ],
    stack: ["Quantum thermodynamics", "Linear algebra", "SDP methods", "Python", "LaTeX"],
    impact:
      "Shows how free-energy monotonicity becomes mutual-information monotonicity on the locally thermal manifold.",
    mediaLabel: "Result figures from the solver",
    media: [
      {
        "kind": "image",
        "src": "/media/thesis/lt-geometry.webp",
        "caption": "Locally thermal geometry: mutual information against athermality for interior and extremal states."
      },
      {
        "kind": "image",
        "src": "/media/thesis/lt-boundary-slice.webp",
        "caption": "Boundary of the locally thermal set on a diagonal correlation slice."
      },
      {
        "kind": "image",
        "src": "/media/thesis/convertibility-global.webp",
        "caption": "Convertibility under global Gibbs-preserving maps across the slice."
      },
      {
        "kind": "image",
        "src": "/media/thesis/convertibility-local.webp",
        "caption": "The same slice under local Gibbs-preserving maps, where the ordering changes."
      }
    ],
    accent: "cyan",
    category: "Research",
    visual: "thesis",
    link: {
      label: "Read thesis",
      href: profile.thesis
    }
  },
  {
    title: "Ferronematic Liquid-Crystal Research",
    eyebrow: "Published experimental research",
    short:
      "Python experiment control, spectroscopy data analysis, and ferronematic liquid-crystal research contributing to an RSC publication.",
    summary:
      "Experimental and computational work on ferronematic liquid crystals, combining Python automation, spectroscopy data acquisition, analysis, and research outputs that contributed to co-authored publication work.",
    problem:
      "Ferronematic liquid-crystal experiments require reproducible control, structured spectroscopy measurements, and careful analysis across changing material compositions and experimental conditions.",
    built: [
      "Python control system driving a spectroscopy instrument through its Windows acquisition software",
      "Sequential sample imaging under stepped temperature and voltage control",
      "Data acquisition and structured logging for repeated experimental runs",
      "Research contributions feeding into co-authored liquid-crystal publication work"
    ],
    stack: ["Python", "Instrumentation", "Data acquisition", "Matplotlib", "Research workflow"],
    impact:
      "Supported reproducible experimental workflows and downstream data analysis for published ferronematic liquid-crystal research.",
    accent: "amber",
    category: "Research",
    visual: "spectroscopy",
    link: {
      label: "RSC publication",
      href: profile.rscPublication
    }
  },
  {
    title: "DFT Hamilton",
    eyebrow: "Computational chemistry",
    short:
      "Containerised PySCF environment for density-functional and Hartree-Fock experiments, with functional and spin-correlation comparisons.",
    summary:
      "A Docker-based PySCF workflow that makes density-functional and Hartree-Fock experiments reproducible on a platform the reference stack does not build on, together with scripted molecular examples and analysis outputs.",
    problem:
      "A computational chemistry result is only as trustworthy as the environment that produced it, and the reference stack has no native build on the machine where the work actually happens.",
    built: [
      "Docker environment with one-command setup, verifying basis loading, RHF, LibXC DFT, and open-shell UHF",
      "Scripted molecular example runs that write CSV and Markdown result tables",
      "Spin-correlation analysis comparing a proposed correlation scaling against LibXC reference functionals",
      "Ionisation-energy checks that show where the custom functional agrees and where it breaks down"
    ],
    stack: ["Python", "PySCF", "LibXC", "Docker", "NumPy"],
    impact:
      "A repeatable environment where a functional idea can be tested against reference results.",
    accent: "green",
    category: "Scientific computing",
    visual: "chemistry"
  }
];

export const experiences: Experience[] = [
  {
    period: "May 2026 - Sep 2026",
    start: "2026-05",
    end: "2026-09",
    role: "Scientific Software Developer",
    place: "Trinity College Dublin",
    details: [
      "Built a digital lab notebook platform storing experimental measurements as structured, auditable records.",
      "Developed GPU-accelerated physics demonstrations that run headlessly on the Leonardo EuroHPC system."
    ]
  },
  {
    period: "Oct 2025 - May 2026",
    start: "2025-10",
    end: "2026-05",
    role: "Teaching Assistant",
    place: "Trinity College Dublin",
    details: [
      "Led weekly tutorials and problem-solving sessions aligned with lectures.",
      "Graded assignments and exams with clear, constructive feedback."
    ]
  },
  {
    period: "Jun 2024 - Dec 2025",
    start: "2024-06",
    end: "2025-12",
    role: "Software Engineer (EdTech)",
    place: "Grinds360",
    details: [
      "Built Python automation tools for video and interactive lesson workflows.",
      "Contributed to UX iteration in Figma and full-stack product features."
    ]
  },
  {
    period: "Jun 2025 - Sep 2025",
    start: "2025-06",
    end: "2025-09",
    role: "Research Assistant",
    place: "Trinity College Dublin, CRANN Institute",
    details: [
      "Designed Echo State Network reservoir models for quantum time-evolution data.",
      "Analysed model stability, convergence, and predictive accuracy across hyperparameters."
    ]
  },
  {
    period: "May 2024 - Sep 2024",
    start: "2024-05",
    end: "2024-09",
    role: "Experimental / Computational Research Assistant",
    place: "Trinity College Dublin",
    details: [
      "Created a Python spectroscopy control system for ferrofluids and ferronematic liquid crystals.",
      "Built automated acquisition and analysis workflows for repeated experimental data.",
      "Contributed to liquid-crystal research that led to co-authored publication work."
    ]
  },
  {
    period: "Jul 2021 - Jan 2024",
    start: "2021-07",
    end: "2024-01",
    role: "Exam Corrector",
    place: "The Dublin Academy of Education",
    details: ["Corrected exams and coursework and supported marking workflows."]
  }
];

export const skillClusters: SkillCluster[] = [
  {
    title: "Scientific computing",
    skills: ["Python", "NumPy", "PyTorch", "Mathematica", "C/C++ simulations", "Matplotlib"]
  },
  {
    title: "HPC and GPU",
    skills: ["CUDA / CuPy", "SLURM", "Parallel pipelines", "Benchmarking", "Linux", "Numerical solvers"]
  },
  {
    title: "Web and product",
    skills: ["React", "TypeScript", "Node.js", "FastAPI", "Tailwind CSS", "UX collaboration", "Figma"]
  },
  {
    title: "Data and infrastructure",
    skills: ["PostgreSQL", "SQLite", "Docker", "Git / GitHub", "GitHub Actions", "Data pipelines"]
  },
  {
    title: "AI systems",
    skills: [
      "Local LLM workflows",
      "Agent orchestration",
      "Memory systems",
      "Tool routing",
      "Speech to text",
      "Automation"
    ]
  },
  {
    title: "Research practice",
    skills: ["LaTeX", "Quantum mechanics", "Statistical mechanics", "QFT", "Data analysis", "Reproducibility"]
  }
];

export const education = [
  {
    title: "M.Sc. High-Performance Computing",
    detail: "Trinity College Dublin, current",
    focus: "Parallel programming, GPU acceleration, and large-scale numerical simulation."
  },
  {
    title: "B.A. Theoretical Physics",
    detail: "Trinity College Dublin, 2022-2026",
    focus: "Quantum mechanics, statistical mechanics, quantum field theory, and computational physics."
  },
  {
    title: "Leaving Certificate",
    detail: "The Dublin Academy of Education, 2020-2022",
    focus: "Dublin, Ireland."
  }
];

export const workstreams: Workstream[] = [
  {
    area: "Home platforms",
    title: "An operating layer for a house",
    description:
      "Inhabis turns fragmented device ecosystems into one policy-checked model, with evidence that an action actually landed."
  },
  {
    area: "HPC and visualisation",
    title: "Supercomputer demonstrations",
    description:
      "Thirteen physics solvers behind one compute contract that spans NumPy, CUDA, and SLURM batch jobs on Leonardo."
  },
  {
    area: "Research platforms",
    title: "Structured experimental records",
    description:
      "LabFlow replaces files-in-folders provenance with relational sample, measurement, and instrument records."
  },
  {
    area: "AI systems",
    title: "Local-first assistant architecture",
    description:
      "ORION and Orion Mini explore how personal automation combines local models, memory, safety gates, and desktop tooling people actually use."
  },
  {
    area: "Physics ML",
    title: "Reservoir computing for dynamics",
    description:
      "Echo State Networks are used as compact sequence learners for quantum spin-chain observables and stability analysis."
  },
  {
    area: "Quantum thermodynamics",
    title: "Locally thermal correlations",
    description:
      "The capstone studies how correlations store global athermality when every subsystem already looks thermal."
  },
  {
    area: "Applied modelling",
    title: "Traffic flow on real networks",
    description:
      "A hackathon model overlays capacity-aware flows on OpenStreetMap graphs, simplified into junction supernodes."
  },
  {
    area: "Materials research",
    title: "Ferronematic liquid crystals",
    description:
      "Experimental control, spectroscopy analysis, and co-authored publication work on ferroelectric and hyper-dielectric modes."
  }
];

export const thesisStorySections: ThesisStorySection[] = [
  {
    eyebrow: "Motivation",
    title: "Correlations can store thermodynamic resource.",
    image: "/thesis-slides/capstone-slide-03.png",
    body:
      "The project starts from information thermodynamics: correlations are not just bookkeeping, they can carry usable structure. The question is what can be done with that structure when the allowed operations cannot create extra free energy.",
    points: [
      "Treat equilibrium as the free reference point.",
      "Classify transformations that preserve the Gibbs state.",
      "Ask what remains when local systems already look thermal."
    ]
  },
  {
    eyebrow: "Setup",
    title: "Local thermality freezes the local physics.",
    image: "/thesis-slides/capstone-slide-06.png",
    body:
      "A bipartite state is locally thermal when each subsystem reduces to the same Gibbs state. Locally, both sides look equilibrated. Globally, the joint state can still contain correlations, coherence, or entanglement.",
    points: [
      "Both partial traces are fixed to the Gibbs state.",
      "The global state may still be far from the product equilibrium.",
      "This isolates correlations as the remaining non-equilibrium feature."
    ]
  },
  {
    eyebrow: "Key identity",
    title: "On the locally thermal set, athermality becomes correlation.",
    image: "/thesis-slides/capstone-slide-08.png",
    body:
      "Because the marginals are fixed, the relative entropy distance to global equilibrium reduces to mutual information. This gives the project its central interpretation: in this constrained setting, global athermality is stored in correlations.",
    points: [
      "Relative entropy measures distance from equilibrium.",
      "Mutual information measures total correlation.",
      "For locally thermal states, these quantities coincide."
    ]
  },
  {
    eyebrow: "Operations",
    title: "Global and local control give different resource orderings.",
    image: "/thesis-slides/capstone-slide-12.png",
    body:
      "Global Gibbs-preserving maps can coordinate across the bipartite system. Local Gibbs-preserving maps force each side to act independently. The project compares how the reachable states change when that coordination is removed.",
    points: [
      "Global GP preserves the joint Gibbs state.",
      "Local GP preserves the local Gibbs state on each side.",
      "Local restrictions can create incomparability between states."
    ]
  },
  {
    eyebrow: "Method",
    title: "Convertibility becomes a semidefinite program.",
    image: "/thesis-slides/capstone-slide-16.png",
    body:
      "A quantum channel can be represented by its Choi matrix. Complete positivity, trace preservation, Gibbs preservation, and the desired state mapping all become matrix constraints, so the conversion question can be tested numerically.",
    points: [
      "The Choi matrix must be positive semidefinite.",
      "Trace preservation is a linear constraint.",
      "Gibbs preservation and state conversion are also linear constraints."
    ]
  }
];

export const thesisTechnicalItems: ThesisTechnicalItem[] = [
  {
    title: "Geometry of the LT set",
    body:
      "The locally thermal states form a spectrahedron: a convex affine slice of the positive semidefinite cone with fixed marginal constraints."
  },
  {
    title: "Two-qubit parameterization",
    body:
      "For symmetric two-qubit systems, the correlation sector can be represented by a real 3 by 3 matrix of Pauli correlation coefficients."
  },
  {
    title: "Global versus local convertibility",
    body:
      "Global Gibbs-preserving maps are tested against local Gibbs-preserving maps to identify which correlations require coordinated bipartite control."
  },
  {
    title: "Ray and slice tests",
    body:
      "One-dimensional LT rays and diagonal/covariant slices give tractable windows into the full nine-dimensional two-qubit geometry."
  }
];

export const thesisSlides: ThesisSlide[] = [
  {
    title: "Local Thermality from Global Athermality",
    image: "/thesis-slides/capstone-slide-01.png",
    body:
      "The thesis frames correlations as a thermodynamic resource under Gibbs-preserving operations.",
    points: [
      "Project by Alexander Belik, supervised by Felix Binder.",
      "Core theme: local thermal equilibrium can hide global non-equilibrium structure."
    ]
  },
  {
    title: "Objective 1",
    image: "/thesis-slides/capstone-slide-02.png",
    body:
      "Identify and characterize bipartite states that are locally thermal but not globally thermal.",
    points: [
      "Construct a hierarchy where rho_AB >= sigma_AB when a global Gibbs-preserving map converts rho_AB to sigma_AB.",
      "Study how that hierarchy changes when operations are restricted to local Gibbs-preserving maps."
    ]
  },
  {
    title: "Motivation: Why Correlations Matter",
    image: "/thesis-slides/capstone-slide-03.png",
    body:
      "Information thermodynamics treats correlations as something that can store usable resource.",
    points: [
      "The aim is to classify what can be done with that resource.",
      "The project asks which transformations are possible without injecting extra free energy."
    ]
  },
  {
    title: "Thermal Equilibrium State",
    image: "/thesis-slides/capstone-slide-04.png",
    body:
      "For one system with Hamiltonian H and inverse temperature beta, the Gibbs state is the free equilibrium reference.",
    points: [
      "gamma = exp(-beta H) / Z.",
      "A state with no athermality is measured relative to this thermal reference."
    ]
  },
  {
    title: "Two Systems and Symmetry Choice",
    image: "/thesis-slides/capstone-slide-05.png",
    body:
      "The project works with two symmetric systems A and A' sharing the same Hamiltonian and temperature.",
    points: [
      "H_A = H_A' and gamma_A = gamma_A' = gamma.",
      "The reference joint equilibrium state is gamma tensor gamma."
    ]
  },
  {
    title: "Locally Thermal States",
    image: "/thesis-slides/capstone-slide-06.png",
    body:
      "A bipartite state is locally thermal when both partial traces return the Gibbs state.",
    points: [
      "Tr_A' rho = gamma and Tr_A rho = gamma.",
      "The state looks thermal locally, even if it is globally correlated or non-thermal."
    ]
  },
  {
    title: "What Extra Structure Is Left?",
    image: "/thesis-slides/capstone-slide-07.png",
    body:
      "Once the marginals are fixed, all remaining freedom sits in correlations and coherence.",
    points: [
      "rho = gamma tensor gamma + C.",
      "The correlation term C has zero marginals, so it does not change local states."
    ]
  },
  {
    title: "Quantifying the Resource",
    image: "/thesis-slides/capstone-slide-08.png",
    body:
      "On locally thermal states, relative entropy to global equilibrium equals mutual information.",
    points: [
      "D(rho || gamma tensor gamma) = I(A : A').",
      "In this setting, athermality is correlations."
    ]
  },
  {
    title: "Objective 2",
    image: "/thesis-slides/capstone-slide-09.png",
    body:
      "The second objective is to construct and study the resource hierarchy under global Gibbs-preserving operations.",
    points: [
      "rho_AB >= sigma_AB if a global GP operation maps rho_AB to sigma_AB.",
      "This gives an operational ordering of locally thermal states."
    ]
  },
  {
    title: "Resource Cannot Increase",
    image: "/thesis-slides/capstone-slide-10.png",
    body:
      "Allowed operations are Gibbs-preserving maps that leave gamma tensor gamma unchanged.",
    points: [
      "Data processing implies D(rho || gamma tensor gamma) >= D(G(rho) || gamma tensor gamma).",
      "Distinguishability from equilibrium cannot increase under noisy GP evolution."
    ]
  },
  {
    title: "Resource Cannot Increase II",
    image: "/thesis-slides/capstone-slide-11.png",
    body:
      "The monotonicity statement follows by applying data processing with sigma = gamma tensor gamma.",
    points: [
      "For any channel G, D(rho || sigma) >= D(G(rho) || G(sigma)).",
      "If G preserves gamma tensor gamma, the output reference remains the same equilibrium state."
    ]
  },
  {
    title: "Global vs Local",
    image: "/thesis-slides/capstone-slide-12.png",
    body:
      "The key contrast is whether operations can coordinate across the bipartite split.",
    points: [
      "Global GP allows any joint channel preserving gamma tensor gamma.",
      "Local GP restricts the map to G_A tensor G_A', with each side preserving gamma."
    ]
  },
  {
    title: "Thermofield Double Reference",
    image: "/thesis-slides/capstone-slide-13.png",
    body:
      "The thermofield double is a natural maximally correlated pure locally thermal state.",
    points: [
      "It is built from the Gibbs eigenvalues and paired energy eigenstates.",
      "It serves as an anchor point for the hierarchy."
    ]
  },
  {
    title: "Objective 3",
    image: "/thesis-slides/capstone-slide-14.png",
    body:
      "The third objective is to compare the global hierarchy with the hierarchy under local Gibbs-preserving operations.",
    points: [
      "The same states can become incomparable when global coordination is removed.",
      "This exposes the structure of correlations that local operations cannot access."
    ]
  },
  {
    title: "Resource Ordering",
    image: "/thesis-slides/capstone-slide-15.png",
    body:
      "The presentation states the ordering test for global and local convertibility.",
    points: [
      "Global: rho -> sigma if some G preserves gamma tensor gamma and maps rho to sigma.",
      "Local: rho -> sigma if some G_A tensor G_A' maps rho to sigma."
    ]
  },
  {
    title: "Testing Allowed Operations",
    image: "/thesis-slides/capstone-slide-16.png",
    body:
      "A quantum channel can be represented by its Choi matrix, making convertibility an SDP.",
    points: [
      "Physicality constraints are J_G positive semidefinite and trace preservation.",
      "Convertibility and Gibbs preservation are imposed as linear constraints."
    ]
  },
  {
    title: "Results",
    image: "/thesis-slides/capstone-slide-17.png",
    body:
      "The deck shifts from setup to results.",
    points: [
      "The following slides describe the locally thermal geometry.",
      "They also compare global and local convertibility behavior."
    ]
  },
  {
    title: "Geometry of the LT Set",
    image: "/thesis-slides/capstone-slide-18.png",
    body:
      "The locally thermal set is a convex linear slice of the positive semidefinite cone.",
    points: [
      "LT = { gamma tensor gamma + C | linear constraints on C, rho >= 0 }.",
      "This makes LT a spectrahedron."
    ]
  },
  {
    title: "Correlation Parameterization",
    image: "/thesis-slides/capstone-slide-19.png",
    body:
      "For two qubits, locally thermal correlations can be parameterized by a real 3 by 3 tensor T.",
    points: [
      "C = one quarter sum T_ij sigma_i tensor sigma_j.",
      "The remaining structure lives in the correlation matrix T."
    ]
  },
  {
    title: "Global Convertibility",
    image: "/thesis-slides/capstone-slide-20.png",
    body:
      "The global GP results ask whether mutual information fully determines convertibility.",
    points: [
      "Sorting by mutual information gives an almost upper-triangular convertibility plot.",
      "The theorem links relative-entropy monotonicity with Gibbs preservation."
    ]
  },
  {
    title: "Local GP",
    image: "/thesis-slides/capstone-slide-21.png",
    body:
      "Restricting to local GP changes the geometry of the resource theory.",
    points: [
      "Local GP means Alice and Bob act independently with no coordination.",
      "Local operations form a strict subset of global operations."
    ]
  },
  {
    title: "Ray Projection",
    image: "/thesis-slides/capstone-slide-22.png",
    body:
      "A one-parameter locally thermal ray tests whether local incomparability is genuinely high-dimensional.",
    points: [
      "The example direction is C_0 = one quarter X tensor X.",
      "This reduces the problem to a clean 1D slice."
    ]
  },
  {
    title: "Ray Projection PSD Window",
    image: "/thesis-slides/capstone-slide-23.png",
    body:
      "Along the ray rho(p) = gamma tensor gamma + p C_0, local GP behaves like a monotone chain.",
    points: [
      "The slide gives an analytic positive-semidefinite window for p.",
      "The window is obtained by whitening C_0 with gamma inverse halves."
    ]
  },
  {
    title: "Objectives Recap",
    image: "/thesis-slides/capstone-slide-24.png",
    body:
      "The objectives return as a checkpoint before moving from slices to the full locally thermal geometry.",
    points: [
      "Characterize the LT state set.",
      "Build global and local GP hierarchies."
    ]
  },
  {
    title: "Beyond Slices: Full 9D Geometry",
    image: "/thesis-slides/capstone-slide-25.png",
    body:
      "The full two-qubit LT set is a 9-dimensional spectrahedron constrained by positivity.",
    points: [
      "Diagonal slices and 1D rays are useful probes.",
      "The full problem has coupled tensor constraints in T."
    ]
  },
  {
    title: "Why Incomparability Occurs",
    image: "/thesis-slides/capstone-slide-26.png",
    body:
      "The current investigation asks what correlation-matrix structure is preserved under local GP.",
    points: [
      "Verified local GP convertibility becomes sparse in higher-dimensional correlation families.",
      "Candidate structures include singular values, tensor invariants, and SDP-characterized reachable sets."
    ]
  },
  {
    title: "Objectives Closing",
    image: "/thesis-slides/capstone-slide-27.png",
    body:
      "The final objective slide ties the three project goals back together.",
    points: [
      "Characterize locally thermal states.",
      "Compare global and local Gibbs-preserving resource orderings."
    ]
  },
  {
    title: "Q&A",
    image: "/thesis-slides/capstone-slide-28.png",
    body:
      "The deck closes with questions and discussion.",
    points: [
      "The main takeaway is that locally invisible correlations can carry thermodynamic structure.",
      "The SDP framework makes that structure testable."
    ]
  }
];

export const projectCategories = ["All work", "Software & AI", "Scientific computing", "Research"] as const;

export const portfolioCopy = {
  kicker: "Theoretical physicist & software developer",
  currentTitle: "M.Sc. High-Performance Computing",
  currentDetail: "Trinity College Dublin. Working across parallel computing, scientific software, and local AI systems.",
  workTitle: "Ideas, made tangible.",
  workIntro: "A collection of research, scientific software, and tools for everyday problems. Explore a project for the problem, the engineering, and what came out of it."
};
