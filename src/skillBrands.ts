import {
  siAndroid,
  siCmake,
  siCplusplus,
  siDocker,
  siFastapi,
  siFigma,
  siGithub,
  siGithubactions,
  siJavascript,
  siJetpackcompose,
  siKotlin,
  siLanggraph,
  siLatex,
  siLinux,
  siNodedotjs,
  siNumpy,
  siNvidia,
  siOllama,
  siOptuna,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siSqlite,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVercel,
  siVite,
  siWolframmathematica
} from "simple-icons";
import {
  Activity,
  Atom,
  BarChart3,
  Bluetooth,
  Bot,
  Cpu,
  Database,
  Drama,
  FlaskConical,
  Gauge,
  Home,
  Mic,
  Network,
  Orbit,
  Repeat2,
  Route,
  Server,
  Share2,
  Sigma,
  Waves,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillVisual =
  | { kind: "brand"; path: string; color: string }
  | { kind: "icon"; Icon: LucideIcon; color: string };

// Dark brand colours vanish on the dark page, so they are lightened towards white just far enough to read.
const brandColor = (hex: string) => {
  const base = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const luminance = (rgb: number[]) => (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  for (let mix = 0; mix <= 1; mix += 0.05) {
    const rgb = base.map((channel) => Math.round(channel + (255 - channel) * mix));
    if (luminance(rgb) >= 0.34) return `rgb(${rgb.join(" ")})`;
  }
  return "#f1f3ee";
};

const brand = (icon: { path: string; hex: string }): SkillVisual => ({
  kind: "brand",
  path: icon.path,
  color: brandColor(icon.hex)
});

const icon = (Icon: LucideIcon, color: string): SkillVisual => ({ kind: "icon", Icon, color });

export const skillVisuals: Record<string, SkillVisual> = {
  Python: brand(siPython),
  NumPy: brand(siNumpy),
  PyTorch: brand(siPytorch),
  Mathematica: brand(siWolframmathematica),
  "C / C++": brand(siCplusplus),
  Optuna: brand(siOptuna),
  Matplotlib: icon(BarChart3, "#4aa3df"),
  PySCF: icon(FlaskConical, "#ff9f43"),

  "CUDA / CuPy": brand(siNvidia),
  SLURM: icon(Server, "#ffd166"),
  CMake: brand(siCmake),
  Linux: brand(siLinux),
  Benchmarking: icon(Gauge, "#ff6b8b"),
  "Parallel pipelines": icon(Workflow, "#7bdff2"),
  "N-body and lattice-Boltzmann solvers": icon(Orbit, "#b39bff"),

  React: brand(siReact),
  TypeScript: brand(siTypescript),
  JavaScript: brand(siJavascript),
  "Node.js": brand(siNodedotjs),
  Vite: brand(siVite),
  "Tailwind CSS": brand(siTailwindcss),
  FastAPI: brand(siFastapi),
  "three.js": brand(siThreedotjs),
  Playwright: icon(Drama, "#45ba4b"),
  Figma: brand(siFigma),
  Vercel: brand(siVercel),

  Matter: icon(Network, "#5ee6b8"),
  "Thread networking": icon(Share2, "#ff8a5b"),
  "BLE commissioning": icon(Bluetooth, "#4f9dff"),
  Kotlin: brand(siKotlin),
  Android: brand(siAndroid),
  "Jetpack Compose": brand(siJetpackcompose),
  "Home energy and thermal models": icon(Home, "#ffb84d"),

  PostgreSQL: brand(siPostgresql),
  SQLite: brand(siSqlite),
  Docker: brand(siDocker),
  "Git / GitHub": brand(siGithub),
  "GitHub Actions": brand(siGithubactions),
  "Data pipelines": icon(Database, "#63d2ff"),

  Ollama: brand(siOllama),
  LangGraph: brand(siLanggraph),
  "Local LLM workflows": icon(Bot, "#7cf5c0"),
  "Agent orchestration": icon(Cpu, "#ff9ecf"),
  "Speech to text": icon(Mic, "#ffcb47"),
  "Tool routing": icon(Route, "#8fb8ff"),

  LaTeX: brand(siLatex),
  "Quantum mechanics": icon(Atom, "#c39bff"),
  "Statistical mechanics": icon(Waves, "#4fd1c5"),
  QFT: icon(Activity, "#ff7a90"),
  "Semidefinite programming": icon(Sigma, "#f6d04d"),
  "Data analysis": icon(BarChart3, "#6ee7a8"),
  Reproducibility: icon(Repeat2, "#79c0ff")
};

export const fallbackVisual: SkillVisual = icon(Cpu, "#b6ddc4");
