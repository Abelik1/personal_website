export type ProjectMedia = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  caption: string;
};

export type ProjectTable = {
  head: string[];
  rows: string[][];
  note?: string;
};

export type ProjectSection = {
  title: string;
  body?: string[];
  bullets?: string[];
  table?: ProjectTable;
  media?: ProjectMedia[];
};

export type ProjectDetail = {
  lead: string[];
  stats?: { value: string; label: string }[];
  sections: ProjectSection[];
};

export type ProjectCover = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  // Extra clips a video cover plays through in turn while hovered.
  playlist?: { src: string; poster: string }[];
  alt: string;
  // CSS object-position for the crop inside the card.
  position?: string;
};

export type Project = {
  slug: string;
  // Drives the card's colour, its glow, and the tint of the background particles around it.
  hue: number;
  cover?: ProjectCover;
  // Three short, concrete facts shown in the hover panel.
  peek: string[];
  // Cards with an href open that address in a new tab instead of the project page.
  href?: string;
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
  // Attribution shown above a gallery of figures taken from a paper.
  mediaCredit?: string;
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
  detail?: ProjectDetail;
  link?: {
    label: string;
    href: string;
  };
};

type ProjectInput = Omit<Project, "slug" | "hue" | "cover" | "peek" | "href">;

type ProjectPresentation = Pick<Project, "hue" | "cover" | "peek" | "href">;

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

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

const projectInputs: ProjectInput[] = [
  {
    title: "Inhabis",
    eyebrow: "Home platform",
    status: "In progress",
    short:
      "One system for the whole house: solar, heating, the car and every device, working inside rules the household sets.",
    summary:
      "Inhabis builds a trusted model of a home, translates different device ecosystems into a consistent internal language, evaluates goals and actions against explicit policy, and records what actually happened. It is local-first, policy-first, and fail-closed: stale evidence, missing authority, or an ambiguous action is rejected with a recorded reason.",
    problem:
      "A home can be full of capable devices whose intelligence is fragmented. One system knows the solar output, another the car, another the heating, and none of them holds the household's priorities, so an ordinary goal like using up spare solar power is not a command any single device can take.",
    built: [
      "TypeScript server with separated layers for operational state, derived planning context, and constrained planning",
      "Embedded Matter controller with one persistent fabric per home, plus an Android companion that does BLE and Thread onboarding next to the device while the server finishes commissioning over the LAN",
      "Energy work spanning solar-surplus EV charging, solar production forecasting, and a learned room thermal predictor",
      "Pilot Home: a fictional two-storey house that runs the real physics and planning against simulated devices, with weather, energy, goals, and expiring approvals",
      "Customer dashboard (Home, Rooms, Intelligence, History) over a furnished 3D house, and a Workbench view for the model, learning, and simulator tools",
      "Native Android household preview and an optional spatial beta that records room walkthroughs, replays them with controlled noise, and proposes reviewed device candidates"
    ],
    stack: ["TypeScript", "Node.js", "React", "Python", "Matter / Thread", "Kotlin"],
    impact:
      "Automation that earns trust in steps: no model, forecast, or dashboard is the final safety authority, and every action is checked against policy and verified afterwards.",
    accent: "cyan",
    category: "Software & AI",
    visual: "home",
    link: {
      label: "Visit inhabis.ie",
      href: "https://inhabis.ie"
    },
    detail: {
      lead: [
        "Inhabis treats a house as one system. It keeps a current, explainable picture of rooms, devices, sensors, and availability, says so when information is missing or stale, and only acts inside the authority the household has granted.",
        "It is an active engineering system. The pilot work is about getting a first household to use it safely, so most of what you see here runs against a fictional home called Willow House."
      ],
      stats: [
        { value: "Matter + Thread", label: "Direct onboarding with an Android companion" },
        { value: "8 rooms, 16 devices", label: "The fictional Pilot Home" },
        { value: "Fail-closed", label: "Stale, unauthorised, or ambiguous actions are rejected and logged" }
      ],
      sections: [
        {
          title: "The problem",
          body: [
            "One system knows whether solar power is available, another the state of the car, another the heating, another the room conditions. None of them has a reliable view of the household's priorities.",
            "Goals like use spare solar power, keep the house comfortable, or have the car ready this evening are household outcomes. Achieving them takes observation, coordination, trade-offs, and follow-up across several ecosystems."
          ],
          media: [
            { kind: "image", src: "/media/inhabis/demo-energy.webp", caption: "Illustration from the Inhabis site: solar, the car, storage and the grid all draw on the same energy." },
            { kind: "image", src: "/media/inhabis/demo-heat.webp", caption: "Illustration from the Inhabis site: heat moving through a home, the kind of behaviour the thermal predictor learns." }
          ]
        },
        {
          title: "What the system does",
          bullets: [
            "Observe the home and know when its information is incomplete or stale",
            "Understand devices through a small, consistent set of capabilities, leaving anything ambiguous unsupported",
            "Coordinate solar, battery, vehicle charging, and flexible appliances under one household plan",
            "Decide against explicit constraints, preferences, and uncertainty, keeping doing nothing as a valid outcome",
            "Act only within granted authority, with manual control always winning",
            "Verify what actually happened after every action",
            "Learn from outcomes, approvals, rejections, and manual corrections"
          ]
        },
        {
          title: "Try a fictional home",
          body: [
            "The Pilot Home simulator is a complete two-storey UK house with smart and unconnected devices, evolving weather, temperature, and energy, goals, approvals, manual overrides, and failure scenarios. It runs the real Python physics and planning with simulated endpoints and never loads a physical adapter.",
            "The customer interface has four places: Home, Rooms, Intelligence, and History, around a shared furnished 3D house. Workbench is the advanced workspace for the world model and simulator."
          ],
          media: [
            { kind: "image", src: "/media/inhabis/energy-day.webp", caption: "A simulated day of household energy: solar, baseline load, heat pump, EV charging, battery, and grid import and export." },
            { kind: "image", src: "/media/inhabis/home-mobile.webp", caption: "The Pilot Home dashboard at phone width." }
          ]
        },
        {
          title: "On the phone",
          body: [
            "Matter devices on Thread, or far from the server, are onboarded by an Android companion. The phone talks BLE and Thread next to the device, asks for the preferred Thread network with explicit system consent, and Inhabis completes commissioning to its own fabric over the LAN. The Thread operational dataset is never stored or sent to the host.",
            "A native household preview shows rooms and devices read-only. An optional spatial beta scans rooms, replays recorded walkthroughs with controlled noise, and starts a rough house draft that a person reviews before anything is placed."
          ],
          media: [
            { kind: "image", src: "/media/inhabis/android-home.webp", caption: "Android household preview with offline example readings and no device control." },
            { kind: "image", src: "/media/inhabis/android-rooms.webp", caption: "Rooms and their devices, with stale or unavailable readings called out." }
          ]
        },
        {
          title: "Trust promises",
          bullets: [
            "Local first: core home information, policy, decisions, and logs stay local by default",
            "Household authority: the owner decides who may change configuration and which experiments may issue real commands",
            "No hidden control: language models and forecasts can propose, and deterministic checks decide what is admissible",
            "Visible uncertainty: predictions state their quality and limits",
            "Accountability: the goal, conditions, options, decision, safety result, action, observed outcome, and any override are recorded"
          ]
        },
        {
          title: "Where it stands",
          body: [
            "Direct Matter is the primary path for new compatible devices, with Homey kept as a migration-era integration. The energy and thermal features are experiments tied to a specific home and evidence set, and predictions are advisory.",
            "The natural-language goal intake is a review-only prototype: it can produce suggestions and cannot dispatch an action from a vague request. Locks, alarms, and garage doors are out of scope for now."
          ],
          media: [
            { kind: "image", src: "/media/inhabis/insight-solar.webp", caption: "Illustration from the Inhabis site: sizing solar and battery for a home." },
            { kind: "image", src: "/media/inhabis/insight-thermal.webp", caption: "Illustration from the Inhabis site: thermal inertia in a wall and floor." }
          ]
        }
      ]
    }
  },
  {
    title: "ORION",
    eyebrow: "Local AI assistant",
    status: "In progress",
    short:
      "A voice assistant for my Windows PC that runs its language models locally and answers to a wake word.",
    summary:
      "ORION is a voice and text assistant for Windows. A wake word starts it, a language model running on the machine chooses what to do with each request, and anything that touches the system or its memory waits for approval. A PyQt overlay and dashboard sit on top.",
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
      "A desktop app for my projects, tasks, reminders and transcribed recordings, with a local assistant built in.",
    summary:
      "Orion Mini keeps my conversations, projects, tasks, reminders and an AI assistant in one desktop app. The interface is React running inside a PySide6 and Qt WebEngine shell, and the packaged build ships its own dashboard.",
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
    mediaLabel: "Screens from the app",
    media: [
      { kind: "image", src: "/media/orion-mini/cover.webp", caption: "Today view: the next commitments, reminders and a quiet summary of the day." },
      { kind: "image", src: "/media/orion-mini/popup.webp", caption: "An escalated reminder that stays on screen until the break has actually happened." },
      { kind: "image", src: "/media/orion-mini/reminders.webp", caption: "Reminder rings counting down to the next commitment." },
      { kind: "image", src: "/media/orion-mini/project-switcher.webp", caption: "Switching between projects, each with its own conversations and files." },
      { kind: "image", src: "/media/orion-mini/library.webp", caption: "The transcription library with per-track progress." }
    ],
    accent: "green",
    category: "Software & AI",
    visual: "workspace"
  },
  {
    title: "EuroHPC Demo Lab",
    eyebrow: "HPC and GPU simulation",
    short:
      "Fourteen physics and AI demos I rendered on Leonardo and Discoverer for the EuroHPC Demo Lab, played back on a public stand.",
    summary:
      "A gallery of visual high-performance computing demonstrations for public engagement. Each demo separates headless computation from presentation: the solver writes numbered frames and metadata, and a lightweight web viewer handles playback, controls, readouts, and saved runs. Large showcase renders are made ahead of time on Brain++ Discoverer GB200 nodes, on Leonardo A100 nodes, and on a CUDA desktop, and the stand replays them when nobody is at the controls.",
    problem:
      "Live scientific demonstrations tend to fail at the venue. They assume a graphics context, a fast link to the cluster, and a solver that finishes on cue, and a batch queue on a supercomputer guarantees none of those.",
    built: [
      "Fourteen solvers spanning lattice-Boltzmann flow, particle-mesh cosmology, direct N-body gravity, black-hole lensing, reaction-diffusion, plasma control, molecular dynamics, and two evolving-AI games",
      "One demo contract that runs on NumPy, CuPy/CUDA, or a hybrid pipeline overlapping GPU solving with CPU frame encoding",
      "SLURM job templates for Leonardo's CPU and A100 Booster partitions and for Discoverer's GB200 nodes, with preflight, submission, and sync scripts",
      "A walk-up stand viewer with a Discoverer lineup and a Leonardo lineup, run bundles that move saved runs between machines, and a front end for the team's MUrB N-body code"
    ],
    stack: ["Python", "CuPy / CUDA", "PyTorch", "NumPy", "SLURM", "JavaScript"],
    impact:
      "Exhibition-grade demonstrations that stay inspectable: the same run reproduces on a laptop, a CUDA desktop, or a cluster node, and a partially finished job is already usable.",
    accent: "cyan",
    category: "Scientific computing",
    visual: "hpc",
    link: {
      label: "View on GitHub",
      href: "https://github.com/Abelik1/HPC_Visual_Demos"
    },
    detail: {
      lead: [
        "The Demo Lab needed physics that a visitor can poke at, produced by machines that live in another country. The answer was to make every demo a headless solver that writes frames, and to make the stand a viewer that plays them back with controls on top.",
        "Showcase runs were rendered on Discoverer's GB200 nodes, on Leonardo's A100 Booster partition, and on a CUDA desktop. Anything a visitor starts live runs on the CPU at a local preset."
      ],
      stats: [
        { value: "2,000,000", label: "Particles in the 3D Milky Way and Andromeda collision, on a GB200" },
        { value: "5120 × 2880", label: "Lattice, 170,000 steps, in the wind tunnel run" },
        { value: "14.7 million", label: "Exact photon orbits per frame in the black-hole render" },
        { value: "93.8%", label: "Four-A100 parallel efficiency at 500,000 bodies (MUrB)" }
      ],
      sections: [
        {
          title: "On the stand",
          body: [
            "There are two demo days, and the walk-up viewer shows the lineup of whichever is active. The Discoverer lineup is the 3D galaxy collision, the wind tunnel, Neuro-Racers, the black hole, and the Molecular Machine. The Leonardo lineup is MUrB N-body, Star in a Bottle, the cosmic web, and Bat vs Moth, alongside pre-rendered films from teammates.",
            "The viewer has large controls, prints the explanation under the picture, and keeps every advanced setting behind one presenter panel."
          ],
          media: [
            { kind: "video", src: "/media/hpc-demos/galaxy_collision_3d.mp4", poster: "/media/hpc-demos/galaxy_collision_3d.jpg", caption: "Milky Way meets Andromeda in full 3D gravity: direct softened all-pairs forces, seeded from Gaia DR3 and PHAT data, illustrative and not a fitted prediction." },
            { kind: "video", src: "/media/hpc-demos/fluid.mp4", poster: "/media/hpc-demos/fluid.jpg", caption: "Virtual wind tunnel: a D2Q9 lattice-Boltzmann flow past an obstacle with advected streaklines. Visitors draw their own obstacle." },
            { kind: "video", src: "/media/hpc-demos/black_hole.mp4", poster: "/media/hpc-demos/black_hole.jpg", caption: "A camera beside a black hole found by Gaia, looking at 1.8 million real Gaia stars through exact photon orbits." },
            { kind: "video", src: "/media/hpc-demos/molecular_dynamics.mp4", poster: "/media/hpc-demos/molecular_dynamics.jpg", caption: "Molecular Machine: coarse-grained 3D molecular dynamics with all-pairs interactions and ensemble comparisons." }
          ]
        },
        {
          title: "Evolving AI, with nobody programming the behaviour",
          body: [
            "Two demos let visitors design a brain and watch selection do the rest. In Neuro-Racers, visitors build a car brain from blocks, thousands of cars share it with different random weights, and the best drivers of each generation become the parents of the next. In Bat vs Moth, one visitor builds a sonar-hunting bat and another a moth that learns to jam it, and the two co-evolve in a dark cave."
          ],
          media: [
            { kind: "video", src: "/media/hpc-demos/neuro_racers.mp4", poster: "/media/hpc-demos/neuro_racers.jpg", caption: "Neuro-Racers: 4,096 cars over 150 generations on the Grand Prix track, computed on a desktop RTX 3060 Ti." },
            { kind: "video", src: "/media/hpc-demos/bat_vs_moth.mp4", poster: "/media/hpc-demos/bat_vs_moth.jpg", caption: "Bat vs Moth: a population of 8,192 over 300 generations, with jamming evolving at generation 131." }
          ]
        },
        {
          title: "Star in a Bottle",
          body: [
            "A fusion plasma held by magnetic fields inside a torus-shaped vessel, modelled as a nonlinear plasma-wave lattice projected onto a rotatable tokamak. Passive confinement advects tracers through the drift the field produces. In the AI plasma guardian mode a neural policy trained shot by shot controls the coils and sparks the markers it fails to hold off the wall.",
            "On a Discoverer GB200 the passive run took 24,000 lattice steps with 6,000 tracers, and the guardian trained across 12 shots with 16 parallel plasmas."
          ],
          media: [
            { kind: "video", src: "/media/hpc-demos/fusion_plasma.mp4", poster: "/media/hpc-demos/fusion_plasma.jpg", caption: "Passive confinement: tracers follow the drift the field produces." },
            { kind: "video", src: "/media/hpc-demos/plasma_guardian.mp4", poster: "/media/hpc-demos/plasma_guardian.jpg", caption: "AI plasma guardian: a trainable neural controller learning to suppress a plasma instability." }
          ]
        },
        {
          title: "MUrB N-body on Leonardo",
          body: [
            "The Leonardo lineup includes MUrB, a gravitational N-body code from Sorbonne University and LIP6 that a team extended from a CPU reference to one A100 and to four A100s over MPI. The solver and its benchmark suite live in the team's NBody-EuroHPC repository. My part is the front end in the gallery: it runs the real executable, reads the trajectory it records, and renders it the way MUrB's own OpenGL viewer does.",
            "The measurements below come from that repository's Leonardo benchmark campaign: FP32, five repetitions per point, median time per iteration, 0 failed records in 190. The four-GPU backend runs four MPI ranks on four A100s inside a single Booster node."
          ],
          table: {
            head: ["Bodies", "CPU OpenMP (ms/iter)", "1× A100", "4× A100", "4 vs 1 GPU"],
            rows: [
              ["10,000", "2.24", "1.58", "1.77", "0.89×"],
              ["100,000", "219.2", "15.36", "16.08", "0.96×"],
              ["200,000", "1,020.8", "56.30", "31.71", "1.78×"],
              ["500,000", "6,722", "280.1", "74.66", "3.75×"]
            ],
            note: "Small problems do not repay the MPI synchronisation and host staging of the four-GPU path. The crossover sits between 100,000 and 200,000 bodies, and at 500,000 the four A100s reach about 67 estimated TFLOP/s against 0.74 for the CPU backend. GFLOP/s figures come from an analytical 20 flops per interaction model, not hardware counters."
          },
          media: [
            { kind: "video", src: "/media/eurohpc/murb-nbody.mp4", poster: "/media/eurohpc/murb-nbody.jpg", caption: "A MUrB galaxy initial condition, replayed from a recorded trajectory." }
          ]
        },
        {
          title: "Where each run was made",
          table: {
            head: ["Demo", "Machine", "Scale"],
            rows: [
              ["3D galaxy collision", "Discoverer GB200", "2,000,000 particles, 8 billion years"],
              ["Wind tunnel", "Discoverer GB200", "5120 × 2880 lattice, 170,000 steps"],
              ["Star in a Bottle", "Discoverer GB200", "24,000 steps, 6,000 tracers; 12 guardian shots"],
              ["Cosmic web", "Desktop RTX 3060 Ti", "10.5 million particles on a 2048² mesh"],
              ["Neural image compression", "Desktop RTX 3060 Ti", "64 networks trained at once on the Hubble Deep Field"],
              ["Black hole", "Desktop CPU", "2560 × 1440, 2× supersampled"]
            ]
          }
        }
      ]
    }
  },
  {
    title: "LabFlow",
    eyebrow: "Research data platform",
    short:
      "A lab notebook for a materials research institute where every measurement is a structured, searchable record.",
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
      "Helps Irish car owners decide whether to keep their car or switch, using listings scraped from the market.",
    summary:
      "CarCove compares what it costs to keep a car with what it costs to switch, using Irish market data. Scrapers collect listings and manufacturer catalogues, admin screens let me review and clean the data, and a React front end shows the comparison.",
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
    mediaLabel: "Screens from the app",
    media: [
      { kind: "image", src: "/media/carcove/sell.webp", caption: "Seller flow: account, car details and a clear listing fee." },
      { kind: "image", src: "/media/carcove/ev.webp", caption: "EV advice built around charging reality." },
      { kind: "image", src: "/media/carcove/garage.webp", caption: "Garage: saved cars, ownership baselines and a shareable code." },
      { kind: "image", src: "/media/carcove/tools.webp", caption: "Registration lookup turned into an ownership report." },
      { kind: "image", src: "/media/carcove/market.webp", caption: "Market browser with grouped listings and filters." }
    ],
    accent: "green",
    category: "Software & AI",
    visual: "car"
  },
  {
    title: "EchoState and Heisenberg Chain",
    eyebrow: "Physics-informed ML",
    short:
      "A neural network that learns how a quantum spin chain evolves in time, built on echo state networks in PyTorch.",
    summary:
      "A PyTorch library for echo state networks, plus a simulator that generates Heisenberg spin-chain data for it to learn from. The network sees observables from the chain and predicts how they evolve.",
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
      "My capstone on quantum states that look thermal from every local view while their correlations still hold non-equilibrium structure.",
    summary:
      "If both halves of a quantum system look exactly thermal on their own, any distance from global equilibrium has to sit in the correlations between them. The thesis maps that set of states and uses semidefinite programs to test which states can be turned into which.",
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
      "Instrument control and data analysis for ferronematic liquid-crystal experiments, work that fed into a published paper.",
    summary:
      "Summer research on ferronematic liquid crystals. I wrote the Python that runs the spectrometer, stepped the sample through temperatures and voltages, and analysed the spectra, which contributed to a co-authored paper.",
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
    mediaLabel: "Figures from the published paper",
    mediaCredit:
      "Figures reproduced under CC BY 4.0 from Ferroelectric and hyper dielectric modes in ferronematic liquid crystals, Journal of Materials Chemistry C, 2026, 14, 6808 (open-access preprint: arXiv:2504.19633). The spectrometer control and analysis work above contributed to this paper, and the figures show the paper's own measurements.",
    media: [
      { kind: "image", src: "/media/ferronematic/birefringence.webp", caption: "Birefringence of the three mixtures against temperature at 550 nm, measured with a fibre spectrometer. The dashed red line is the Haller fit that confirms an ordinary nematic phase at high temperature. From the paper." },
      { kind: "image", src: "/media/ferronematic/pom-textures.webp", caption: "Polarising-microscope textures of the MIX 10, MIX 25 and MIX 50 cells from the isotropic phase down to room temperature. From the paper." },
      { kind: "image", src: "/media/ferronematic/pom-cell.webp", caption: "Two domains of opposite chirality in the ferroelectric nematic phase, seen by rotating the polariser either side of crossed. From the paper." },
      { kind: "image", src: "/media/ferronematic/switching-current.webp", caption: "Polarisation reversal current in a 4 µm cell for WJ-16, DIO and MIX 25. Only the ferroelectric phases show a current peak. From the paper." },
      { kind: "image", src: "/media/ferronematic/permittivity-3d.webp", caption: "Dielectric permittivity and loss of MIX 25 across temperature and frequency. From the paper." },
      { kind: "image", src: "/media/ferronematic/relaxation-fits.webp", caption: "Dielectric loss spectra fitted to three relaxation processes at four temperatures. From the paper." },
      { kind: "image", src: "/media/ferronematic/dielectric-strength.webp", caption: "Strength and frequency of the relaxation processes against temperature in a planar cell. From the paper." }
    ],
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
      "A Docker setup for running PySCF density-functional and Hartree-Fock calculations on a machine the standard build does not support.",
    summary:
      "The reference chemistry stack has no native build on my machine, so I containerised PySCF. One command builds it, scripted molecules write result tables, and a custom spin-correlation functional is checked against LibXC.",
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
    mediaLabel: "From the results folder",
    media: [
      { kind: "image", src: "/media/dft/gap-comparison.webp", caption: "HOMO-LUMO gaps of five small systems under LDA, PBE and the custom functional, drawn from the repository's own results CSV." }
    ],
    accent: "green",
    category: "Scientific computing",
    visual: "chemistry"
  }
];

const galaxyClip = { src: "/media/hpc-demos/galaxy_collision_3d.mp4", poster: "/media/hpc-demos/galaxy_collision_3d.jpg" };

// Everything the cards need for colour and imagery. Covers are taken from the projects themselves.
const presentation: Record<string, ProjectPresentation> = {
  inhabis: {
    hue: 26,
    href: "https://inhabis.ie",
    cover: { kind: "image", src: "/media/inhabis/estate.webp", alt: "A two-storey house at sunset with its rooms lit and solar panels on the roof", position: "50% 62%" },
    peek: [
      "Matter and Thread devices onboard from an Android phone",
      "A fictional house runs the real physics and planning, so you can try it",
      "Every action is checked against policy, then verified"
    ]
  },
  orion: {
    hue: 205,
    cover: { kind: "image", src: "/media/orion/sky-cover.webp", alt: "ORION's interface: a constellation map over the Earth at sunrise with a small robot", position: "50% 40%" },
    peek: [
      "Wakes on a spoken word, then a language model picks the capability that handles the request",
      "System actions and memory changes wait for approval",
      "Runs offline, as a daemon, with a GUI, or text-only"
    ]
  },
  "orion-mini": {
    hue: 152,
    cover: { kind: "image", src: "/media/orion-mini/cover.webp", alt: "Orion Mini's Today view with a glowing orb, reminders and next steps", position: "50% 0%" },
    peek: [
      "Transcription library with checkpoints, corrections and timestamped exports",
      "Reminders that notice when you are idle and escalate",
      "The assistant runs on local Ollama, provider APIs or existing CLI logins"
    ]
  },
  "eurohpc-demo-lab": {
    hue: 268,
    cover: {
      kind: "video",
      ...galaxyClip,
      playlist: [
        { src: "/media/hpc-demos/fluid.mp4", poster: "/media/hpc-demos/fluid.jpg" },
        { src: "/media/hpc-demos/black_hole.mp4", poster: "/media/hpc-demos/black_hole.jpg" },
        { src: "/media/hpc-demos/plasma_guardian.mp4", poster: "/media/hpc-demos/plasma_guardian.jpg" },
        { src: "/media/hpc-demos/neuro_racers.mp4", poster: "/media/hpc-demos/neuro_racers.jpg" }
      ],
      alt: "A simulated collision of the Milky Way and Andromeda galaxies"
    },
    peek: [
      "A 2,000,000-particle galaxy collision rendered on a GB200",
      "MUrB N-body reaches 93.8% parallel efficiency on four A100s",
      "Neuro-Racers and Bat vs Moth evolve in front of visitors"
    ]
  },
  labflow: {
    hue: 186,
    cover: { kind: "image", src: "/media/labflow/home-dashboard.webp", alt: "LabFlow's home dashboard listing projects, samples and recent measurements", position: "50% 0%" },
    peek: [
      "FastAPI and PostgreSQL backend with versioned migrations",
      "Instrument capture turns large measurement files into named records",
      "Role-based access across organisations and sites"
    ]
  },
  carcove: {
    hue: 48,
    cover: { kind: "image", src: "/media/carcove/sell.webp", alt: "CarCove's seller page for listing a car", position: "50% 30%" },
    peek: [
      "Scrapers for Toyota, Hyundai and Volkswagen Ireland data",
      "Admin tools to review and normalise the catalogue",
      "SQLite-backed FastAPI services with a React front end"
    ]
  },
  "echostate-and-heisenberg-chain": {
    hue: 326,
    cover: { kind: "image", src: "/media/echostate/heisenberg-overlay.webp", alt: "Predicted and exact Heisenberg spin-chain dynamics overlaid", position: "50% 50%" },
    peek: [
      "Nine ridge-regression solvers plus streaming covariance",
      "Optuna tuning and structured experiment logs",
      "The spin-chain simulator is checked against conservation laws"
    ]
  },
  "locally-thermal-from-global-athermality": {
    hue: 246,
    cover: { kind: "image", src: "/media/thesis/lt-geometry.webp", alt: "The geometry of the locally thermal set from the capstone thesis", position: "50% 50%" },
    peek: [
      "Derived a nine-parameter two-qubit normal form",
      "Convertibility between states is tested with semidefinite programs",
      "Free-energy monotonicity becomes mutual-information monotonicity"
    ]
  },
  "ferronematic-liquid-crystal-research": {
    hue: 8,
    cover: { kind: "image", src: "/media/ferronematic/birefringence.webp", alt: "Birefringence of three ferronematic mixtures against temperature, with the phase transitions marked", position: "50% 40%" },
    peek: [
      "Python drives the spectrometer through its Windows acquisition software",
      "Sequential imaging under stepped temperature and voltage",
      "Contributed to a co-authored RSC publication"
    ]
  },
  "dft-hamilton": {
    hue: 96,
    cover: { kind: "image", src: "/media/dft/gap-comparison.webp", alt: "Bar chart of HOMO-LUMO gaps for five small systems under LDA, PBE and the custom functional", position: "50% 50%" },
    peek: [
      "One command builds the Docker environment and checks basis loading, RHF, DFT and UHF",
      "A spin-correlation functional is compared against LibXC references",
      "Ionisation-energy checks show where the custom functional breaks down"
    ]
  }
};

export const projects: Project[] = projectInputs.map((project) => {
  const slug = slugify(project.title);
  const extra = presentation[slug];
  if (!extra) throw new Error(`Missing card presentation for ${project.title}`);
  return { ...project, ...extra, slug };
});

export const experiences: Experience[] = [
  {
    period: "Aug 2026 - Present",
    start: "2026-08",
    end: "2026-09",
    role: "Co-founder and Engineer",
    place: "Inhabis",
    details: [
      "Building a local-first operating layer for connected homes: an embedded Matter controller with one persistent fabric per home, and an Android companion for BLE and Thread onboarding.",
      "Working on the planning and safety layers that check every action against household policy and verify the result, and on solar-surplus EV charging, solar forecasting and a learned room thermal predictor.",
      "Building the Pilot Home simulator and customer dashboard so a first household can try the system before it touches real devices."
    ]
  },
  {
    period: "Aug 2026 - Sep 2026",
    start: "2026-08",
    end: "2026-09",
    role: "EuroHPC Student Ambassador",
    place: "EuroHPC Demo Lab 2026",
    details: [
      "As a EuroHPC student ambassador, built fourteen GPU physics and AI demos and a walk-up viewer for the Demo Lab, rendered on Leonardo A100 nodes and Brain++ Discoverer GB200 nodes and replayed on a public stand.",
      "Wrote the SLURM job templates and run bundles that move saved runs between the clusters and a stand laptop.",
      "Added a front end for the team's MUrB N-body code, which reached 93.8% parallel efficiency on four A100s at 500,000 bodies."
    ]
  },
  {
    period: "May 2026 - Sep 2026",
    start: "2026-05",
    end: "2026-09",
    role: "Scientific Software Developer",
    place: "Trinity College Dublin",
    details: [
      "Built a digital lab notebook platform storing experimental measurements as structured, auditable records.",
      "Developed GPU-accelerated physics demonstrations that run headlessly on the Leonardo EuroHPC system and on Brain++ Discoverer GB200 nodes, for the EuroHPC Demo Lab 2026."
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
    skills: ["Python", "NumPy", "PyTorch", "Mathematica", "C / C++", "Matplotlib", "PySCF", "Optuna"]
  },
  {
    title: "HPC and GPU",
    skills: ["CUDA / CuPy", "SLURM", "CMake", "Linux", "Benchmarking", "Parallel pipelines", "N-body and lattice-Boltzmann solvers"]
  },
  {
    title: "Web and product",
    skills: ["React", "TypeScript", "JavaScript", "Node.js", "Vite", "Tailwind CSS", "FastAPI", "three.js", "Playwright", "Figma", "Vercel"]
  },
  {
    title: "Home and mobile",
    skills: ["Matter", "Thread networking", "BLE commissioning", "Kotlin", "Android", "Jetpack Compose", "Home energy and thermal models"]
  },
  {
    title: "Data and infrastructure",
    skills: ["PostgreSQL", "SQLite", "Docker", "Git / GitHub", "GitHub Actions", "Data pipelines"]
  },
  {
    title: "AI systems",
    skills: ["Ollama", "LangGraph", "Local LLM workflows", "Agent orchestration", "Tool routing", "Speech to text"]
  },
  {
    title: "Research practice",
    skills: ["LaTeX", "Quantum mechanics", "Statistical mechanics", "QFT", "Semidefinite programming", "Data analysis", "Reproducibility"]
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
      "Fourteen physics and AI demos behind one compute contract that spans NumPy, CUDA, and SLURM batch jobs on Leonardo and Discoverer."
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
  workTitle: "Recent projects.",
  workIntro: "Home automation, supercomputer demos, research code and a few tools I wanted for myself. Hover a card for the short version, click for the full page."
};
