type Stat = {
  label: string;
  value: string;
  detail: string;
};

const repoUrl = "https://github.com/jfbastien/VLMaxxing";
const arxivStatus = "arXiv pending";

const headlineStats: Stat[] = [
  {
    label: "Same-video follow-up speedup",
    value: "14.90–35.92×",
    detail: "adaptive repaired-cache breadth · n=93 · no measurable accuracy drift",
  },
  {
    label: "Warm 26B perception view",
    value: "54.68 fps",
    detail: "32-frame warm follow-up · 19/21 rows above 30 fps",
  },
  {
    label: "Correctness drift",
    value: "0 / 93",
    detail: "paired choice + correctness diffs · same-video follow-up breadth",
  },
];

const mechanismBullets: string[] = [
  "Most frames are reruns. The factory wall did not move; the cache says so. VLMaxxing makes the runtime remember that.",
  "After ingest, later questions on the same video reuse repaired visual state instead of rebuilding the expensive prefix.",
  "On fresh videos, sparse vision helps when timed vision work is actually skipped. C-CEILING keeps the speedup honest.",
  "For live streams, the target is perception rate: buy fresh evidence around change, motion, text, object boundaries, and sensor disagreement.",
];

const cells: {
  lane: string;
  number: string;
  what: string;
  guardrail: string;
}[] = [
  {
    lane: "C-PERSIST",
    number: "14.90–35.92×",
    what: "later questions reuse repaired same-video state",
    guardrail: "n=93 · 0 paired choice/correctness drift",
  },
  {
    lane: "C-STREAM target",
    number: "54.68 fps",
    what: "warm 32-frame follow-up perception on a 26B-class stack",
    guardrail: "19/21 rows >30 fps · first question pays once",
  },
  {
    lane: "C-VISION",
    number: "1.316×",
    what: "fresh-video vision work skipped before the first answer",
    guardrail: "Gemma 32f short · n=20 · 0 drift/parse failures",
  },
  {
    lane: "C-CEILING",
    number: "stage share",
    what: "a local win only counts where wall-clock was actually skipped",
    guardrail: "separate first-query, follow-up, streaming, and routing rows",
  },
];

type Clip = {
  src: string;
  poster: string;
  title: string;
  blurb: string;
};

const clips: Clip[] = [
  {
    src: "/videos/tomato_0298_00_routing_audit.mp4",
    poster: "/thumbs/tomato_0298_00_routing_audit.png",
    title: "TOMATO 0298",
    blurb: "High-reuse clip: the background stays paid for; orange marks the fresh motion budget.",
  },
  {
    src: "/videos/videomme_267_routing_audit.mp4",
    poster: "/thumbs/videomme_267_routing_audit.png",
    title: "VideoMME 267",
    blurb: "Boundary clip: more orange appears where the evidence actually moves.",
  },
  {
    src: "/videos/videomme_380_routing_audit.mp4",
    poster: "/thumbs/videomme_380_routing_audit.png",
    title: "VideoMME 380",
    blurb: "Camera-pan clip: shifted blocks dominate, while stable structure remains reusable.",
  },
];

const useCases: { title: string; detail: string }[] = [
  {
    title: "Factories + cameras",
    detail: "Stable walls, counters, and workspaces should stay cached while entrants and contacts refresh.",
  },
  {
    title: "Screen + UI agents",
    detail: "Exact-copy regions, glyph changes, cursor motion, and scroll events need different freshness rules.",
  },
  {
    title: "Robotics + VLA",
    detail: "Refresh the gripper, object, contact boundary, and goal zone; reuse the boring workspace.",
  },
  {
    title: "Driving + drones",
    detail: "Pose, flow, borders, parallax, and occlusion decide where same-position reuse stops being safe.",
  },
  {
    title: "Games + HUD streams",
    detail: "Stable HUD anchors and repeated interaction states are obvious cache candidates.",
  },
  {
    title: "Sensor-fusion streams",
    detail: "Depth, IMU, events, object tracks, timestamps, and confidence can say where RGB is worth buying.",
  },
];

const receipts: { label: string; href?: string }[] = [
  { label: arxivStatus },
  { label: "Source repo", href: repoUrl },
  {
    label: "Headline data snapshot",
    href: `${repoUrl}/blob/main/paper/arxiv/generated/data/headline_snapshot.json`,
  },
  {
    label: "Scale-out bundle snapshot",
    href: `${repoUrl}/blob/main/paper/arxiv/generated/data/scaleout_bundle_snapshot.json`,
  },
  {
    label: "Teaser provenance",
    href: `${repoUrl}/blob/main/research/experiments/2026/2026-05-05-codec-through-cinematic-reels.md`,
  },
  {
    label: "mlx-vlm cache patch",
    href: `${repoUrl}/blob/main/scripts/mlx_vlm_swa_aware_trim.patch`,
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-5 py-16 sm:gap-24 sm:px-10 sm:py-28">
        <section className="flex flex-col gap-7 sm:gap-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-500 sm:text-xs sm:tracking-[0.18em]">
            <span className="rounded-full border border-zinc-800 px-2.5 py-1">
              VLMaxxing <span className="text-zinc-600">through FrameMogging</span>
            </span>
            <span className="text-zinc-600">training-free anti-recomputation for video VLMs</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Stop paying twice to see the same pixels.
          </h1>
          <p className="max-w-2xl text-balance text-base text-zinc-400 sm:text-lg lg:text-xl">
            Video VLMs keep re-buying visual state that is already sitting in the stream. VLMaxxing
            asks a frozen model to reuse what survived, refresh what changed, and keep the expensive
            bits for when they matter: training-free, no measurable accuracy drift in the tested
            follow-up rows.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span
              aria-disabled="true"
              className="inline-flex h-11 cursor-default items-center justify-center rounded-full bg-zinc-100 px-5 text-sm font-medium text-zinc-950"
            >
              Read the paper →
              <span className="ml-2 text-zinc-500">{arxivStatus}</span>
            </span>
            <a
              href={repoUrl}
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-5 text-sm font-medium text-zinc-200 transition hover:border-zinc-400 hover:text-white"
            >
              Get the code →
              <span className="ml-2 text-zinc-500">github.com/jfbastien/VLMaxxing</span>
            </a>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40">
            <video
              className="aspect-video w-full"
              src="/videos/anchored_lure_cut.mp4"
              poster="/thumbs/anchored_lure_cut.png"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
            <div className="border-t border-zinc-900 px-5 py-3 text-xs text-zinc-500">
              Routing-budget overlay across updated VLMaxxing clips. Orange is the per-frame
              fresh buy; static and shifted regions reuse prior visual state.
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {headlineStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5 transition hover:border-zinc-600 sm:p-6"
            >
              <div className="font-mono text-3xl tracking-tight text-[var(--color-accent)] sm:text-4xl lg:text-5xl">
                {s.value}
              </div>
              <div className="mt-3 text-sm font-medium text-zinc-200">{s.label}</div>
              <div className="mt-1 text-xs text-zinc-500">{s.detail}</div>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">What it actually does</h2>
          <ul className="flex flex-col gap-4 text-zinc-300">
            {mechanismBullets.map((b, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span className="text-base leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">The Numbers Worth Clicking</h2>
          <div className="overflow-x-auto overflow-y-hidden rounded-2xl border border-zinc-800">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-zinc-950 text-[11px] uppercase tracking-wider text-zinc-500 sm:text-xs">
                <tr>
                  <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">Lane</th>
                  <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">Teaser number</th>
                  <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">What it means</th>
                  <th className="whitespace-nowrap px-3 py-3 font-medium sm:px-5">Guardrail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {cells.map((c, i) => (
                  <tr key={i} className="bg-zinc-950/30">
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-zinc-200 sm:px-5 sm:py-4">{c.lane}</td>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-zinc-100 sm:px-5 sm:py-4">{c.number}</td>
                    <td className="px-3 py-3 text-zinc-300 sm:px-5 sm:py-4">{c.what}</td>
                    <td className="px-3 py-3 text-xs text-zinc-500 sm:px-5 sm:py-4">{c.guardrail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="max-w-3xl text-sm text-zinc-500">
            Same numbers, separate workloads: first query, later questions on the same video,
            warm streaming views, and routing overlays each have their own denominator.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">Watch the Cache Spend</h2>
          <p className="max-w-2xl text-sm text-zinc-400">
            Orange shows where the runtime buys fresh visual evidence. The pattern is the point:
            moving regions get new spend, while stable and shifted structure keeps its cached state.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {clips.map((c) => (
              <figure
                key={c.src}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40"
              >
                <video
                  className="aspect-video w-full"
                  src={c.src}
                  poster={c.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <figcaption className="border-t border-zinc-900 px-4 py-3">
                  <div className="text-sm font-medium text-zinc-200">{c.title}</div>
                  <div className="mt-1 text-xs text-zinc-500">{c.blurb}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">Why it matters</h2>
          <div className="grid gap-6 text-zinc-300 sm:grid-cols-2">
            <p className="text-base leading-relaxed">
              Continuous-video agents — computer-use, screen recording, robotics, games, driving —
              need to notice the world changing while most of it does not. In the 26B scale-out
              bundle, warm follow-up turns hit 54.68 fps at the median on 32-frame rows, with
              19/21 rows above 30 fps.
            </p>
            <p className="text-base leading-relaxed">
              Streaming is the big target because the input rate keeps rising. The future interface
              is not just more frames; it is a state stream that carries what stayed put, what
              shifted, what surprised the codec, and which tiles deserve fresh vision now.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">Where reuse gets interesting</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4"
              >
                <div className="text-sm font-medium text-zinc-200">{u.title}</div>
                <div className="mt-2 text-xs leading-relaxed text-zinc-500">{u.detail}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">Toward VLM-native codecs</h2>
          <div className="grid gap-6 text-zinc-300 sm:grid-cols-2">
            <p className="text-base leading-relaxed">
              Today&rsquo;s codecs already know about motion, residual surprise, stable blocks, and
              prediction failure. VLMaxxing asks what happens when that structure becomes model
              state instead of being flattened back into RGB.
            </p>
            <p className="text-base leading-relaxed">
              The next codec for models should speak in active tiles, object state, sensor time,
              uncertainty, text events, and cheap invalidation signals. More pixels is the boring
              interface; fresh evidence is the interesting one.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-zinc-900 pt-12">
          <h2 className="text-xl font-semibold tracking-tight">Receipts</h2>
          <ul className="grid gap-2 text-zinc-400 sm:grid-cols-2">
            {receipts.map((r) => (
              <li key={r.href ?? r.label}>
                {r.href ? (
                  <a
                    className="text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white hover:decoration-[var(--color-accent)]"
                    href={r.href}
                  >
                    {r.label}
                  </a>
                ) : (
                  <span className="text-zinc-500">{r.label}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-auto border-t border-zinc-900 pt-8 text-xs text-zinc-600">
          <p className="flex flex-wrap gap-x-2 gap-y-1">
            <a
              href="https://sdami.co"
              className="text-zinc-400 underline decoration-zinc-800 underline-offset-4 hover:text-white hover:decoration-[var(--color-accent)]"
            >
              Sam D&rsquo;Amico
            </a>
            <span>·</span>
            <a
              href="https://jfbastien.com"
              className="text-zinc-400 underline decoration-zinc-800 underline-offset-4 hover:text-white hover:decoration-[var(--color-accent)]"
            >
              JF Bastien
            </a>
            <span>· 2026</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
