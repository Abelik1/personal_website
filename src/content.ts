export type Project = {
  title: string;
  eyebrow: string;
  short: string;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  impact: string;
  accent: "cyan" | "green" | "amber";
  visual: "assistant" | "car" | "quantum" | "thesis" | "chemistry" | "spectroscopy";
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

export const profile = {
  name: "Alexander Belik",
  title: "Theoretical Physics | AI Systems | Scientific Software",
  location: "Dublin, Ireland",
  email: "abelik1@outlook.com",
  github: "https://github.com/ABelik1",
  linkedin: "https://www.linkedin.com/in/alexander-belik/",
  softwareCv: "/documents/alexander-belik-software-cv.pdf",
  physicsCv: "/documents/alexander-belik-physics-cv.pdf",
  thesis: "/documents/locally-thermal-from-global-athermality.pdf",
  capstoneSlides: "/documents/capstone-slides.pdf",
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
    short: "Windows-first local assistant with wake-word gating, local LLM orchestration, memory, guarded tools, and a PyQt overlay/dashboard.",
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
    accent: "cyan",
    visual: "assistant"
  },
  {
    title: "Choose Car",
    eyebrow: "Product and data system",
    short: "Ireland-focused car keep-vs-switch optimizer with FastAPI, React, SQLite, scraping, normalization, and admin review tools.",
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
    visual: "car"
  },
  {
    title: "EchoState and Heisenberg Chain",
    eyebrow: "Physics-informed ML",
    short: "PyTorch Echo State Network toolkit plus a Heisenberg spin-chain simulator for learning quantum time dynamics.",
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
    accent: "amber",
    visual: "quantum"
  },
  {
    title: "Locally Thermal from Global Athermality",
    eyebrow: "Capstone thesis",
    short: "Quantum thermodynamics project on globally correlated states whose local subsystems are exactly thermal.",
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
    visual: "thesis",
    link: {
      label: "Read thesis",
      href: profile.thesis
    }
  },
  {
    title: "DFT Hamilton / PySCF Work",
    eyebrow: "Computational chemistry",
    short: "Dockerized PySCF workflow for molecular examples, spin-correlation tests, and custom functional comparisons.",
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
    accent: "green",
    visual: "chemistry"
  },
  {
    title: "Spectroscopy Automation",
    eyebrow: "Lab tooling",
    short: "Python experiment-control and data-acquisition tooling for spectroscopy work on ferrofluids and liquid crystals.",
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
    visual: "spectroscopy",
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

export const workstreams: Workstream[] = [
  {
    area: "AI systems",
    title: "Local-first assistant architecture",
    description: "ORION explores how personal automation can combine local models, memory, safety gates, and practical desktop tooling."
  },
  {
    area: "Physics ML",
    title: "Reservoir computing for dynamics",
    description: "Echo State Networks are used as compact sequence learners for quantum spin-chain observables and stability analysis."
  },
  {
    area: "Product engineering",
    title: "Car-market data tooling",
    description: "Choose Car is a technical product project built around scraping, normalization, admin review, and decision support."
  },
  {
    area: "Quantum thermodynamics",
    title: "Locally thermal correlations",
    description: "The capstone studies how correlations store global athermality when every subsystem already looks thermal."
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
