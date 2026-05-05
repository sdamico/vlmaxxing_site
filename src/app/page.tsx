type Stat = {
  label: string;
  value: string;
  detail: string;
};

const headlineStats: Stat[] = [
  {
    label: "Perception throughput, 32f follow-up turns",
    value: "54 fps",
    detail: "median, n=21 paired rows · range 23.85–134.43 fps",
  },
  {
    label: "Speedup vs cold-dense, 32f",
    value: "18.7×",
    detail: "median paired · range 7.34×–44.17×",
  },
  {
    label: "Correctness drift",
    value: "0 / 21",
    detail: "choice diffs · 0 correctness diffs · byte-paired audit",
  },
];

const mechanismBullets: string[] = [
  "Most of what a video VLM is asked to ingest is what it already ingested. The factory wall did not move; the cache says so.",
  "Topology-aware prefix snapshot: capture KV state at the [system, image] boundary before question tokens enter, and reuse it across follow-up turns instead of re-prefilling.",
  "Works on mixed sliding-window / full-attention models (Gemma 4 26B-A4B) with the upstream mlx-vlm cache-trim fix; default cross-turn reuse on those topologies is silently wrong.",
  "Training-free. No new weights, no fine-tune, no distillation. The mechanism is in how the cache is borrowed across turns.",
];

const cells: { model: string; frames: string; speedup: string; fps: string; n: string }[] = [
  { model: "Gemma 4 26B-A4B", frames: "8", speedup: "9.11×", fps: "27.0", n: "21" },
  { model: "Gemma 4 26B-A4B", frames: "32", speedup: "18.7×", fps: "54.7", n: "21" },
  { model: "Qwen 2.5-VL-7B-4bit", frames: "20 · short/med/long", speedup: "14.9–35.9×", fps: "—", n: "93" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-24 px-6 py-20 sm:px-10 sm:py-28">
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-zinc-500">
            <span className="rounded-full border border-zinc-800 px-2.5 py-1">VLMaxxing</span>
            <span className="text-zinc-600">training-free anti-recomputation for video VLMs</span>
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Stop paying twice to see the same pixels.
          </h1>
          <p className="max-w-2xl text-balance text-lg text-zinc-400 sm:text-xl">
            Most of what a video VLM is told to ingest is evidence the stack already paid for. We
            reuse the prompt/KV state across turns and only refresh what actually changed —
            training-free, byte-paired correctness, on frozen open-weights models.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://github.com/jfbastien/codec-through"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-100 px-5 text-sm font-medium text-zinc-950 transition hover:bg-white"
            >
              Read the paper →
            </a>
            <a
              href="https://github.com/jfbastien/codec-through"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-5 text-sm font-medium text-zinc-200 transition hover:border-zinc-400 hover:text-white"
            >
              github.com/jfbastien/codec-through
            </a>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {headlineStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6 transition hover:border-zinc-600"
            >
              <div className="font-mono text-4xl tracking-tight text-[var(--color-accent)] sm:text-5xl">
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
          <h2 className="text-2xl font-semibold tracking-tight">Numbers</h2>
          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-xs uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Model</th>
                  <th className="px-5 py-3 font-medium">Frames / turn</th>
                  <th className="px-5 py-3 font-medium">Median speedup</th>
                  <th className="px-5 py-3 font-medium">Median fps</th>
                  <th className="px-5 py-3 font-medium">n</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {cells.map((c, i) => (
                  <tr key={i} className="bg-zinc-950/30">
                    <td className="px-5 py-4 font-mono text-zinc-200">{c.model}</td>
                    <td className="px-5 py-4 text-zinc-300">{c.frames}</td>
                    <td className="px-5 py-4 font-mono text-zinc-100">{c.speedup}</td>
                    <td className="px-5 py-4 font-mono text-zinc-100">{c.fps}</td>
                    <td className="px-5 py-4 font-mono text-zinc-400">{c.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="max-w-3xl text-sm text-zinc-500">
            All rows are paired against cold-dense baselines on the same frames, prompt, and
            decoding seed. Gemma 4 26B-A4B requires the topology-aware prefix snapshot wrapper +
            the upstream mlx-vlm cache-trim fix; default cross-turn reuse on mixed-SWA topologies
            is silently corrupting and is documented in the paper.
          </p>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight">Why it matters</h2>
          <div className="grid gap-6 text-zinc-300 sm:grid-cols-2">
            <p className="text-base leading-relaxed">
              Continuous-video computer-use agents observe at 30 fps or higher. If the stack
              re-prefills the entire screen state on every action, you cannot keep up. Cache reuse
              + selective tail refresh lets the model perceive at 24–134 fps per follow-up turn on
              a 26B-class open-weights model — the throughput regime where 30 fps observation
              becomes tractable on consumer-laptop-class hardware.
            </p>
            <p className="text-base leading-relaxed">
              The mechanism class is also a cache-correctness story. Mixed sliding-window /
              full-attention topologies break in subtle ways under naive cross-turn reuse — fast
              and wrong. Topology-aware reuse, with explicit refusal when the rotating buffer has
              wrapped, is the difference between shipping and shipping silently broken outputs.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-zinc-900 pt-12">
          <h2 className="text-xl font-semibold tracking-tight">Links</h2>
          <ul className="flex flex-col gap-2 text-zinc-400">
            <li>
              <a
                className="text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white hover:decoration-[var(--color-accent)]"
                href="https://github.com/jfbastien/codec-through"
              >
                Paper repo (codec-through)
              </a>
            </li>
            <li>
              <a
                className="text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white hover:decoration-[var(--color-accent)]"
                href="https://github.com/jfbastien/codec-through/blob/main/paper/arxiv/main.tex"
              >
                Manuscript source (LaTeX)
              </a>
            </li>
            <li>
              <a
                className="text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white hover:decoration-[var(--color-accent)]"
                href="https://github.com/jfbastien/codec-through/blob/main/scripts/mlx_vlm_swa_aware_trim.patch"
              >
                Upstream mlx-vlm SWA-aware cache-trim patch
              </a>
            </li>
          </ul>
        </section>

        <footer className="mt-auto border-t border-zinc-900 pt-8 text-xs text-zinc-600">
          <p>Sam D&rsquo;Amico · JF Bastien · 2026</p>
        </footer>
      </main>
    </div>
  );
}
