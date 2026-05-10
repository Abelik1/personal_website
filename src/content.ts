export type Project = {
  title: string;
  eyebrow: string;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  impact: string;
  accent: "cyan" | "green" | "amber";
  link?: {
    label: string;
    href: string;
  };
};

export type Experience = {
  period: string;
  role: string;
  place: string;
  details: string[];
};

export type SkillCluster = {
  title: string;
  skills: string[];
};

export const profile = {
  name: "Alexander Belik",
  title: "Theoretical Physics | AI Systems | Scientific Software",
  location: "Dublin, Ireland",
  email: "abelik1@outlook.com",
  github: "https://github.com/Abelik1",
  linkedin: "https://www.linkedin.com/in/alexander-belik",
  softwareCv: "/documents/alexander-belik-software-cv.pdf",
  physicsCv: "/documents/alexander-belik-physics-cv.pdf",
  thesis: "/documents/locally-thermal-from-global-athermality.pdf",
  intro:
    "I build research tools, machine-learning systems, and full-stack products across theoretical physics, automation, scientific simulation, and data-heavy software."
};

export const identityChips = [
  "Physics research",
  "AI and ML systems",
  "Full-stack tools",
  "Scientific computing"
];

export const projects: Project[] = [
  {
    title: "ORION / Big Brother Assistant",
    eyebrow: "Local AI assistant",
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
    accent: "cyan"
  },
  {
    title: "Choose Car",
    eyebrow: "Product and data system",
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
    accent: "green"
  },
  {
    title: "EchoState and Heisenberg Chain",
    eyebrow: "Physics-informed ML",
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
    accent: "amber"
  },
  {
    title: "Locally Thermal from Global Athermality",
    eyebrow: "Capstone thesis",
    summary:
      "A research project on bipartite quantum states whose local marginals are thermal, so all deviation from global equilibrium must be stored in correlations.",
    problem:
      "If local athermality is removed exactly, the remaining thermodynamic resource becomes a geometric and operational question about correlations.",
    built: [
      "Characterized locally thermal states as affine slices of the positive semidefinite cone",
      "Derived a full nine-parameter two-qubit normal form",
      "Reduced generic two-qubit positivity to a Schur-complement criterion",
      "Studied global versus local Gibbs-preserving convertibility with SDP methods"
    ],
    stack: ["Quantum thermodynamics", "Linear algebra", "SDP methods", "Python", "LaTeX"],
    impact:
      "Shows how free-energy monotonicity becomes mutual-information monotonicity on the locally thermal manifold.",
    accent: "cyan",
    link: {
      label: "Read thesis",
      href: profile.thesis
    }
  },
  {
    title: "DFT Hamilton / PySCF Work",
    eyebrow: "Computational chemistry",
    summary:
      "A Dockerized PySCF environment for molecular examples, spin-correlation experiments, endpoint sensitivity checks, and custom functional comparisons.",
    problem:
      "PySCF does not build natively on Windows, so reproducible computational chemistry experiments need a clean Linux container workflow.",
    built: [
      "One-command Docker setup for PySCF verification",
      "H2 RHF and DFT checks plus open-shell lithium UHF validation",
      "Molecular examples exported to CSV and Markdown",
      "Spin-correlation and endpoint sensitivity analysis scripts"
    ],
    stack: ["Docker", "PySCF", "Python", "LibXC", "CSV", "Markdown"],
    impact:
      "Makes density-functional experiments repeatable on a Windows-first research workstation.",
    accent: "green"
  },
  {
    title: "Spectroscopy Automation",
    eyebrow: "Lab tooling",
    summary:
      "Python control and acquisition tooling for spectroscopy measurements on ferrofluids and liquid crystals under varied experimental conditions.",
    problem:
      "Manual experiment control makes spectroscopy data harder to reproduce, structure, and compare across conditions.",
    built: [
      "Control system for measurement workflows",
      "Automated data acquisition and structured logging",
      "Experiment-facing tooling for repeated lab runs"
    ],
    stack: ["Python", "Instrumentation", "Data acquisition", "Matplotlib", "Research workflow"],
    impact:
      "Reduced manual friction in experimental data capture and supported cleaner downstream analysis.",
    accent: "amber",
    link: {
      label: "Related arXiv",
      href: "https://arxiv.org/abs/2504.19633"
    }
  }
];

export const experiences: Experience[] = [
  {
    period: "Oct 2025 - present",
    role: "Teaching Assistant",
    place: "Trinity College Dublin",
    details: [
      "Lead weekly tutorials and problem-solving sessions aligned with lectures.",
      "Grade assignments and exams with clear, constructive feedback."
    ]
  },
  {
    period: "Jun 2024 - Dec 2025",
    role: "Software Engineer (EdTech)",
    place: "Grinds360",
    details: [
      "Built Python automation tools for video and interactive lesson workflows.",
      "Contributed to UX iteration in Figma and full-stack product features."
    ]
  },
  {
    period: "Jun 2025 - Sep 2025",
    role: "Research Assistant",
    place: "Trinity College Dublin, CRANN Institute",
    details: [
      "Designed Echo State Network reservoir models for quantum time-evolution data.",
      "Analysed model stability, convergence, and predictive accuracy across hyperparameters."
    ]
  },
  {
    period: "May 2024 - Sep 2024",
    role: "Experimental / Computational Research Assistant",
    place: "Trinity College Dublin",
    details: [
      "Created a spectroscopy control system for ferrofluids and liquid crystals.",
      "Built Python tools for automated data acquisition and experiment control."
    ]
  },
  {
    period: "Jul 2021 - Jan 2024",
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
    title: "Web and product",
    skills: ["React", "TypeScript", "FastAPI", "SQLite", "UX collaboration", "Figma"]
  },
  {
    title: "AI systems",
    skills: ["Local LLM workflows", "Agent orchestration", "Memory systems", "Tool routing", "Automation"]
  },
  {
    title: "Research practice",
    skills: ["LaTeX", "Quantum mechanics", "Statistical mechanics", "QFT", "Data analysis", "Reproducibility"]
  }
];

export const education = [
  {
    title: "B.A. Theoretical Physics",
    detail: "Trinity College Dublin, expected 2026",
    focus: "Quantum mechanics, statistical mechanics, quantum field theory, and computational physics."
  },
  {
    title: "Leaving Certificate",
    detail: "The Dublin Academy of Education, 2020-2022",
    focus: "Dublin, Ireland."
  }
];

export const labNotes = [
  "Local-first assistant architecture for personal automation",
  "Reservoir computing as a compact learner for physical dynamics",
  "Car-market normalization and source-of-truth data review",
  "Thermodynamic resource structure under fixed thermal marginals"
];
