import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { experiences } from "./content";

const roles = [...experiences].sort((a, b) => a.start.localeCompare(b.start));
const colors = ["#ffb35c", "#d8ff6f", "#ff6f9f", "#c58cff", "#ffdf6e", "#79dbcf"];
const tints = ["#d7fff8", "#c9f7f0", "#b9eee9", "#e6fff9", "#c4f4ec", "#b6ebe4", "#defcf7"];
const month = (date: string) => {
  const [year, value] = date.split("-").map(Number);
  return year * 12 + value - 1;
};
const firstYear = Math.floor(Math.min(...roles.map(role => month(role.start))) / 12);
const lastYear = Math.floor(Math.max(...roles.map(role => month(role.end))) / 12);
const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);

export function ExperienceTimeline() {
  const stageRef = useRef<HTMLOListElement>(null);
  const [size, setSize] = useState({ width: 1180, heights: roles.map(() => 220) });
  const [running, setRunning] = useState(false);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const width = stage.clientWidth;
      const heights = Array.from(stage.querySelectorAll<HTMLElement>(".timeline-card"), card => card.offsetHeight);
      setSize(previous => previous.width === width && previous.heights.every((height, i) => height === heights[i]) ? previous : { width, heights });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    stage.querySelectorAll(".timeline-card").forEach(card => observer.observe(card));
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let visible = false;
    const sync = () => setRunning(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(stage);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  const narrow = size.width < 760;
  const center = narrow ? 30 : size.width / 2;
  const cardWidth = narrow ? size.width - 88 : Math.min(390, size.width * .36);
  const scaleHeight = Math.max(1250, size.heights.reduce((sum, h) => sum + h + 35, 0) * (narrow ? 1 : .8));
  const yFor = (date: string) => 70 + (month(date) - firstYear * 12) / ((lastYear + 1 - firstYear) * 12) * (scaleHeight - 140);
  const laneBottom = [40, 40];
  const cardLayout = roles.map((role, index) => {
    const lane = narrow ? 1 : index % 2;
    const top = Math.max(laneBottom[lane] + 30, (yFor(role.start) + yFor(role.end)) / 2 - size.heights[index] / 2);
    laneBottom[lane] = top + size.heights[index];
    return { role, top, left: lane === 0 ? 0 : size.width - cardWidth, lane, color: colors[index % colors.length] };
  });
  const height = Math.max(scaleHeight, ...laneBottom) + 65;

  const strandCount = narrow ? 9 : 15;
  const spacing = narrow ? 3 : 4.2;
  const strandX = (index: number) => center + (index - (strandCount - 1) / 2) * spacing;
  const strands = Array.from({ length: strandCount }, (_, i) => ({
    x: strandX(i),
    tint: tints[i % tints.length],
    opacity: .3 + i % 4 * .07,
    duration: 4.4 + i % 5 * .6,
    delay: -i * .37
  }));

  const branches = cardLayout.map((card, index) => {
    const x = strandX(Math.round((index + .5) / roles.length * (strandCount - 1)));
    const startY = yFor(card.role.start);
    const endY = card.top + 35;
    const endX = card.lane === 0 ? card.left + cardWidth : card.left;
    const direction = card.lane === 0 ? -1 : 1;
    return {
      key: card.role.role + card.role.start,
      color: card.color,
      x,
      startY,
      endX,
      endY,
      duration: 4.6 + index % 4 * .7,
      delay: -index * .55,
      curve: `M${x} ${startY} C${x + direction * 62} ${startY + 22} ${endX - direction * 78} ${endY - 20} ${endX} ${endY}`,
      future: `M${x} ${startY} C${x - 4} ${startY + 130} ${x + 4} ${height - 150} ${x} ${height - 4}`
    };
  });

  const spine = <g className="tl-spine">
    {strands.map((strand, i) => <path
      key={`strand-${i}`}
      className="tl-strand"
      d={`M${strand.x} 4 C${strand.x - 9} ${height * .32} ${strand.x + 9} ${height * .68} ${strand.x} ${height - 4}`}
      stroke={strand.tint}
      style={{ opacity: strand.opacity, animationDuration: `${strand.duration}s`, animationDelay: `${strand.delay}s` }}
    />)}
    {branches.map(branch => <path
      key={branch.key}
      className="tl-future"
      d={branch.future}
      stroke={branch.color}
      style={{ animationDuration: `${branch.duration}s`, animationDelay: `${branch.delay}s` }}
    />)}
  </g>;

  const threads = <>
    {spine}
    {branches.map(branch => <g key={branch.key}>
      <path className="tl-branch" d={branch.curve} stroke={branch.color} style={{ animationDelay: `${branch.delay}s` }} />
      <circle className="tl-node" cx={branch.x} cy={branch.startY} r={narrow ? 4 : 5.5} stroke={branch.color} />
      <path className="tl-end" d={`M${branch.endX - 6} ${branch.endY - 6}l12 12m0 -12l-12 12`} stroke={branch.color} />
    </g>)}
  </>;

  return <section className="section" id="experience">
    <div className="section-heading"><p className="eyebrow">Experience</p><h2>Research meets practice.</h2></div>
    <p className="timeline-help">Follow the threads through research, software, and teaching.</p>
    <div className={`timeline-wrap ${running ? "is-running" : ""}`}>
      <svg className="timeline-svg" width={size.width} height={height} viewBox={`0 0 ${size.width} ${height}`} aria-hidden="true">
        <g className="tl-layer tl-halo">{threads}</g>
        <g className="tl-layer tl-core">{threads}</g>
        <g className="tl-layer tl-flow">
          {branches.map(branch => <path key={branch.key} className="tl-branch-flow" d={branch.curve} stroke={branch.color} style={{ animationDelay: `${branch.delay}s` }} />)}
        </g>
        {years.map(year => <g className="timeline-year" key={year} transform={`translate(${center} ${yFor(`${year}-01`)})`}>
          <path d={narrow ? "M-20 0H18" : "M-40 0H40"} /><text x={narrow ? 24 : 51} y="4">{year}</text>
        </g>)}
      </svg>
      <ol ref={stageRef} className="timeline-stage" style={{ height }} aria-label="Experience timeline">
        {cardLayout.map(({ role, top, left, color }) => <li key={role.role + role.start} className="timeline-card" style={{ top, left, width: cardWidth, "--thread-color": color } as CSSProperties}>
          <p className="timeline-period"><time dateTime={role.start}>{role.period}</time></p>
          <h3>{role.role}</h3><p className="timeline-place">{role.place}</p>
          <ul>{role.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        </li>)}
      </ol>
    </div>
  </section>;
}
