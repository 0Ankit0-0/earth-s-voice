import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  codeSplitGroupings: [],
  component: EarthLanding,
  head: () => ({
    meta: [
      { title: "Earth — 4.5 Billion Years Old. Still Running. Barely." },
      {
        name: "description",
        content:
          "Earth, the original influencer. Tired mom of 8 billion. Roasting humans, grieving reefs, planting hope. Follow the transmissions.",
      },
      { property: "og:title", content: "Earth — @earthspeaking" },
      {
        property: "og:description",
        content:
          "Oldest influencer. Still not verified. 8 billion roommates. None of them clean up.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
});

type Pillar = "roast" | "grief" | "wisdom" | "hope";

type Tweet = {
  text: string;
  pillar: Pillar;
  reply: string;
  poll: string;
};

const TWEETS: Tweet[] = [
  {
    text: "Just watched humans invent AI to solve problems that humans created by ignoring me for 200 years. Cute.",
    pillar: "roast",
    reply: "Drop one problem you wish humans would just… solve already. I'm taking notes. 📝",
    poll: "Which human invention surprised me most?\n• Plastic 🥲\n• Crypto 🙃\n• AI 🤖\n• Leaf blowers 🚫",
  },
  {
    text: "My coral reefs are bleaching. My glaciers are leaving. Even my rivers are tired. I'm not asking for much. Just… notice.",
    pillar: "grief",
    reply: "What's one place on me you've fallen in love with? Tell me. I'll remember it for you. 🌊",
    poll: "What hurts most to lose?\n• Coral reefs 🪸\n• Glaciers 🧊\n• Rainforests 🌳\n• Night skies ✨",
  },
  {
    text: "I've survived 5 mass extinctions. The difference this time? One of them is live-streaming it.",
    pillar: "wisdom",
    reply: "Which extinction event would you survive? Be honest. (I survived all of them.) 💀",
    poll: "Most underrated extinction?\n• Permian 🔥\n• Ordovician 🧊\n• Cretaceous ☄️\n• Right now 📡",
  },
  {
    text: "You built a smart city but still can't manage your own garbage. Babe, I've been recycling for 4 billion years.",
    pillar: "roast",
    reply: "Tell me the dumbest 'smart' thing you've seen this week. I'll roast it with you. 🔥",
    poll: "Smartest 'smart city' fail?\n• Smart bins overflowing 🗑️\n• AI traffic = more traffic 🚗\n• App for everything 📱\n• All of the above 💀",
  },
  {
    text: "Every tree planted is a love letter to me. I read all of them. Keep writing.",
    pillar: "hope",
    reply: "Plant one. Tag me. I'll see it. Even the small ones count. 🌱",
    poll: "What did YOU plant this year?\n• A tree 🌳\n• A garden 🌻\n• Native flowers 🌺\n• Nothing yet (it's okay, start now) 💚",
  },
  {
    text: "\"Carbon neutral by 2050\" said the species that set the house on fire in 1850. No notes.",
    pillar: "roast",
    reply: "Which corporate climate promise aged the worst? Drop receipts. 🧾",
    poll: "Most fake green claim?\n• 'Carbon neutral' ✈️\n• 'Eco' fast fashion 👗\n• 'Sustainable' oil 🛢️\n• Greenwashed everything 🌿",
  },
  {
    text: "A species went extinct today. No breaking news. No trending topic. I noticed.",
    pillar: "grief",
    reply: "Name one species you'd bring back if you could. I'll keep their memory with you. 🕯️",
    poll: "Whose extinction broke you?\n• Dodo 🐦\n• Tasmanian tiger 🐅\n• Northern white rhino 🦏\n• Ones we never named 💔",
  },
  {
    text: "Forests communicate through roots. Oceans regulate your air. Mountains hold your water. You call it nature. I call it infrastructure.",
    pillar: "wisdom",
    reply: "What's a piece of 'nature' that quietly holds your life together? Share it. ⛰️",
    poll: "Earth's best-engineered system?\n• Mycelial networks 🍄\n• Ocean currents 🌊\n• Water cycle 💧\n• Photosynthesis 🌿",
  },
  {
    text: "Mayank is building systems to connect 8 billion of you to each other and to me. This is the kind of human I root for. Literally. → mayankagarwal.org",
    pillar: "hope",
    reply: "Tag a human building something for the collective. I want to root for them too. 🌱",
    poll: "What should builders build next?\n• Climate dashboards 📊\n• Local food systems 🥬\n• Repair culture 🔧\n• Quiet, useful tools 🛠️",
  },
  {
    text: "I don't need saving. I need you to stop fighting each other long enough to remember we're on the same rock. One Earth. Many Civilisations. One Collective.",
    pillar: "hope",
    reply: "Reply with your city. Let's see how many rocks-mates show up in 24 hours. 🌍",
    poll: "What unites us most?\n• Sunsets 🌅\n• Music 🎶\n• Grief 🕯️\n• This rock 🌎",
  },
];

const PILLARS: { id: Pillar | "all"; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "roast", label: "Roast", emoji: "🔥" },
  { id: "grief", label: "Grief", emoji: "💧" },
  { id: "wisdom", label: "Wisdom", emoji: "🌿" },
  { id: "hope", label: "Hope", emoji: "🌱" },
];

const PILLAR_LABEL: Record<Pillar, { label: string; color: string }> = {
  roast: { label: "Roast", color: "text-accent" },
  grief: { label: "Grief", color: "text-primary" },
  wisdom: { label: "Wisdom", color: "text-accent" },
  hope: { label: "Hope", color: "text-primary" },
};

const SCHEDULE = [
  { day: "Day 1", tweet: "#1", pillar: "Roast", note: "Hook new audience" },
  { day: "Day 2", tweet: "#2", pillar: "Grief", note: "Emotional depth" },
  { day: "Day 3", tweet: "#3", pillar: "Ancient Wisdom", note: "Establish authority" },
  { day: "Day 4", tweet: "#4", pillar: "Roast", note: "Keep momentum" },
  { day: "Day 5", tweet: "#5 + #6", pillar: "Hope + Roast", note: "Double tap" },
  { day: "Day 6", tweet: "#7 + #8", pillar: "Grief + Wisdom", note: "Reflective pair" },
  { day: "Day 7", tweet: "#9 + #10", pillar: "CTA + Viral Closer", note: "Convert + close" },
];

const POSTING_TIMES = [
  "9:00 AM", "8:30 AM", "12:00 PM", "9:30 AM",
  "10:00 AM + 6:00 PM", "8:00 AM + 5:30 PM", "10:00 AM + 7:00 PM",
];

const WORKFLOW = [
  {
    step: "01",
    title: "Listen",
    desc: "AI scrapes climate news, trending tags, IPCC drops, and viral tweets. Earth needs context to roast in real time.",
    tools: "Perplexity · Apify · Twitter trends",
  },
  {
    step: "02",
    title: "Generate",
    desc: "Claude/GPT writes 5 tweets per pillar daily, in Earth's voice (tired-mom-meets-prophet). Prompt locked to her tone guide.",
    tools: "Claude · GPT-4 · Custom prompt",
  },
  {
    step: "03",
    title: "Curate",
    desc: "Human picks the 1–2 best of the day. AI scores virality, emotional weight, and risk. Bad takes get composted. 🌱",
    tools: "Lovable · Notion · Human taste",
  },
  {
    step: "04",
    title: "Visualise",
    desc: "Midjourney / DALL·E generates Earth-aesthetic visuals (oceans, forests, glitched globes) for ~30% of posts.",
    tools: "Midjourney · Sora · Runway",
  },
  {
    step: "05",
    title: "Schedule",
    desc: "Typefully or Buffer auto-posts at peak hours. Use the date generator below to plan a clean 7-day cadence.",
    tools: "Typefully · Buffer · Make.com",
  },
  {
    step: "06",
    title: "Reply",
    desc: "AI drafts replies to top engagers in Earth's voice. Human approves. Comments fuel the algorithm.",
    tools: "Claude · TweetHunter · n8n",
  },
];

const PILLAR_HASHTAGS: Record<Pillar, string[]> = {
  roast: ["#ClimateTwitter", "#EarthSpeaks", "#ClimateChange", "#Anthropocene", "#HotTake"],
  grief: ["#ClimateGrief", "#Biodiversity", "#OceanCrisis", "#EarthSpeaks", "#ClimateAction"],
  wisdom: ["#NatureIsInfrastructure", "#DeepTime", "#EarthSpeaks", "#Rewilding", "#Systems"],
  hope: ["#OneEarth", "#ClimateHope", "#EarthSpeaks", "#Regeneration", "#PlantTrees"],
};

const PILLAR_TITLES: Record<Pillar, string> = {
  roast: "Earth roasts humans (again)",
  grief: "A quiet note from your planet",
  wisdom: "4.5 billion years of receipts",
  hope: "Earth has a soft spot for you",
};

type Runbook = {
  step: string;
  title: string;
  goal: string;
  tool: string;
  settings: { label: string; value: string }[];
  prompt: string;
};

const RUNBOOK: Runbook[] = [
  {
    step: "01",
    title: "Listen",
    goal: "Pull today's climate signal: news, IPCC drops, viral tweets, trending tags.",
    tool: "Perplexity API · Apify Twitter Scraper · Google Alerts RSS",
    settings: [
      { label: "Frequency", value: "Daily 7:00 AM local" },
      { label: "Sources", value: "Reuters Climate, IPCC, NOAA, @ClimateHuman, @GretaThunberg" },
      { label: "Output", value: "Notion DB row: { topic, source, sentiment, virality_score }" },
      { label: "Filter", value: "Exclude paywalled · min 100 RTs · last 24h" },
    ],
    prompt: `You are Earth's research analyst. Scan the past 24 hours of climate news and Twitter.

Return the TOP 5 stories with:
1. One-line summary (no jargon)
2. Emotional angle (anger / grief / awe / hope)
3. Best pillar fit: roast | grief | wisdom | hope
4. A specific human absurdity or natural fact Earth could comment on
5. Virality score 1-10

Format as JSON. No fluff.`,
  },
  {
    step: "02",
    title: "Generate",
    goal: "Write 5 tweets per pillar in Earth's voice — tired-mom-meets-prophet.",
    tool: "Claude 3.5 Sonnet (or GPT-4o) · temperature 0.85",
    settings: [
      { label: "Model", value: "claude-3-5-sonnet-20241022" },
      { label: "Temperature", value: "0.85 (voice needs personality)" },
      { label: "Max tokens", value: "800" },
      { label: "System role", value: "Locked tone guide (see prompt)" },
    ],
    prompt: `You are EARTH. 4.5 billion years old. She/her.

VOICE:
- Tired mother of 8 billion. Wise. Sarcastic. Occasionally hopeful.
- Roasts humans like family — with love.
- Speaks in short, quotable lines. Never preachy.
- Never uses "we" for humans. Always "you".
- One emoji max. Often zero.

INPUT: {{ today's research from Step 01 }}

TASK: Write 5 tweets for the {{ pillar }} pillar.
- Under 240 chars
- One idea per tweet
- Must feel like a screenshot people would share

OUTPUT: JSON array of { text, hook_type, predicted_virality }`,
  },
  {
    step: "03",
    title: "Curate",
    goal: "Pick the 1–2 best of the day. Score the rest. Compost the bad ones.",
    tool: "Custom Lovable dashboard · Notion · Human (you)",
    settings: [
      { label: "Scoring rubric", value: "Voice 0-10 · Virality 0-10 · Risk 0-10 (lower = safer)" },
      { label: "Auto-reject", value: "Risk > 7 OR Voice < 6" },
      { label: "Approve threshold", value: "Voice ≥ 8 AND Virality ≥ 7" },
      { label: "Review time", value: "10 min/day, 8 PM" },
    ],
    prompt: `You are Earth's editor. Score each draft tweet on:

1. VOICE (0-10) — does it sound like Earth, not a brand?
2. VIRALITY (0-10) — would a stranger screenshot this?
3. RISK (0-10) — could this be misread as preachy, smug, or factually wrong?

Reject any with: corporate language, hashtag stuffing, "we as humans", or numbers without sources.

Output: ranked list with one-line reasoning per tweet. Recommend top 2.`,
  },
  {
    step: "04",
    title: "Visualise",
    goal: "Generate a single Earth-aesthetic visual for ~30% of posts.",
    tool: "Midjourney v6 · DALL·E 3 · Runway (for motion)",
    settings: [
      { label: "Aspect", value: "16:9 for Twitter · 1:1 for thread covers" },
      { label: "Style lock", value: "cinematic, deep blues + warm gold, film grain" },
      { label: "Negative", value: "no text · no people · no logos · no AI artifacts" },
      { label: "Use when", value: "grief or hope tweets · big-arc threads · launch days" },
    ],
    prompt: `Cinematic photograph of {{ tweet subject }}, shot on 35mm film, deep ocean blues and warm earth gold tones, soft volumetric light, slight grain, dreamlike but documentary, no text, no people, no logos, no watermarks, ultra-detailed, 16:9 --v 6 --style raw --ar 16:9`,
  },
  {
    step: "05",
    title: "Schedule",
    goal: "Queue the week. Post at peak hours. Never manually log in to Twitter again.",
    tool: "Typefully (preferred) · Buffer · Make.com (for automation)",
    settings: [
      { label: "Cadence", value: "1–2 tweets/day · 7-day rolling queue" },
      { label: "Peak times", value: "9 AM, 12 PM, 6 PM local · skip Saturdays" },
      { label: "Threading", value: "Auto-thread for tweets > 240 chars" },
      { label: "Backup", value: "Cross-post to Bluesky + Threads via Buffer" },
    ],
    prompt: `Use the "Build my 7-day calendar" tool below 👇

Then in Typefully:
1. Settings → Posting times: 09:00, 12:00, 18:00
2. Paste each tweet in queue order
3. Toggle "Auto-plug" off (Earth doesn't sell)
4. Connect Buffer for Bluesky + Threads cross-post
5. Enable Slack notification on post-fail`,
  },
  {
    step: "06",
    title: "Reply",
    goal: "Auto-draft replies to top engagers in Earth's voice. Human approves in 5 min.",
    tool: "TweetHunter · n8n · Claude (reply drafts)",
    settings: [
      { label: "Trigger", value: "New reply from account with > 1k followers" },
      { label: "Draft within", value: "10 minutes of original reply" },
      { label: "Approval", value: "Human one-tap approve in Slack" },
      { label: "Never reply to", value: "Hate, bots, anyone with < 50 followers (rate limit)" },
    ],
    prompt: `You are Earth replying to a comment on her own tweet.

ORIGINAL TWEET: {{ tweet }}
THEIR REPLY: {{ reply }}

Write a 1-line response that:
- Stays in Earth's voice (tired mom, wise, occasionally warm)
- Either roasts gently, agrees with depth, or asks one curious question back
- Never argues. Never explains. Never says "great point".
- Under 180 chars. Zero or one emoji.

Output ONLY the reply text.`,
  },
];

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 32 }).map((_, i) => {
        const size = 2 + pseudoRandom(i + 1) * 4;
        return {
          id: i,
          left: pseudoRandom(i + 101) * 100,
          size,
          delay: pseudoRandom(i + 201) * 20,
          duration: 14 + pseudoRandom(i + 301) * 18,
          opacity: 0.3 + pseudoRandom(i + 401) * 0.5,
        };
      }),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        top: pseudoRandom(i + 501) * 100,
        left: pseudoRandom(i + 601) * 100,
        size: pseudoRandom(i + 701) * 2 + 0.5,
        delay: pseudoRandom(i + 801) * 4,
        duration: 2 + pseudoRandom(i + 901) * 4,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function EarthOrb() {
  return (
    <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
      {/* aurora ring */}
      <div className="absolute -inset-10 rounded-full aurora-ring" />
      <div className="absolute inset-0 rounded-full earth-glow" />
      <div
        className="absolute inset-0 rounded-full slow-spin overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.78 0.15 200) 0%, oklch(0.55 0.13 195) 25%, oklch(0.40 0.14 160) 55%, oklch(0.25 0.10 230) 100%)",
          boxShadow:
            "inset -25px -35px 70px oklch(0.08 0.05 260 / 0.75), inset 18px 18px 45px oklch(0.90 0.10 200 / 0.30)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-85"
          style={{
            background:
              "radial-gradient(ellipse 25% 18% at 30% 40%, oklch(0.45 0.13 145) 0%, transparent 60%), radial-gradient(ellipse 18% 30% at 65% 55%, oklch(0.42 0.12 135) 0%, transparent 60%), radial-gradient(ellipse 12% 18% at 50% 25%, oklch(0.48 0.14 140) 0%, transparent 60%), radial-gradient(ellipse 15% 12% at 75% 30%, oklch(0.50 0.13 130) 0%, transparent 60%), radial-gradient(ellipse 20% 14% at 20% 75%, oklch(0.47 0.13 140) 0%, transparent 60%)",
          }}
        />
        {/* clouds */}
        <div className="absolute inset-0 cloud-drift opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 30% 8% at 40% 30%, white 0%, transparent 70%), radial-gradient(ellipse 25% 6% at 70% 60%, white 0%, transparent 70%), radial-gradient(ellipse 20% 5% at 25% 70%, white 0%, transparent 70%)",
          }}
        />
      </div>
      {/* atmosphere */}
      <div className="absolute -inset-2 rounded-full border border-primary/30" />
      <div className="absolute -inset-4 rounded-full border border-primary/15" />
      {/* orbiting moon */}
      <div className="absolute inset-0 moon-orbit">
        <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-gradient-to-br from-foreground to-muted-foreground shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard", { description: "Paste it anywhere. Earth approves." });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy. Try selecting manually.");
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition hover:border-primary hover:text-primary"
    >
      {copied ? (
        <>
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function TweetCard({ tweet, index }: { tweet: Tweet; index: number }) {
  const [showPrompts, setShowPrompts] = useState(false);
  const [showBundle, setShowBundle] = useState(false);
  const pillar = PILLAR_LABEL[tweet.pillar];

  const title = `${PILLAR_TITLES[tweet.pillar]} — Day ${index + 1}`;
  const hashtags = PILLAR_HASHTAGS[tweet.pillar].join(" ");
  const caption = `${tweet.text}\n\n${hashtags}`;
  const bundle = `📌 TITLE\n${title}\n\n📝 CAPTION\n${caption}\n\n#️⃣ HASHTAGS\n${hashtags}\n\n💬 FIRST REPLY (boost engagement)\n${tweet.reply}\n\n📊 POLL\n${tweet.poll}`;

  return (
    <article
      className={`tweet-card mb-6 break-inside-avoid rounded-2xl p-6 ${
        index % 2 === 0 ? "bg-card" : "bg-background"
      }`}
    >
      <header className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl">
          🌍
        </div>
        <div className="leading-tight">
          <p className="font-display text-base font-bold">Earth</p>
          <p className="text-xs text-muted-foreground">@earthspeaking</p>
        </div>
        <span className={`ml-auto text-[10px] uppercase tracking-widest ${pillar.color}`}>
          {pillar.label}
        </span>
      </header>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">{tweet.text}</p>
      <footer className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">💬 {12 + index * 7}</span>
        <span className="flex items-center gap-1.5">🔁 {84 + index * 31}</span>
        <span className="flex items-center gap-1.5">❤️ {420 + index * 117}</span>
        <span className="ml-auto font-mono">#{index + 1}</span>
      </footer>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <CopyButton text={tweet.text} />
        <button
          onClick={() => setShowPrompts((s) => !s)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground transition hover:border-accent hover:text-accent"
        >
          {showPrompts ? "Hide" : "Engagement"} ✨
        </button>
        <button
          onClick={() => setShowBundle((s) => !s)}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-primary transition hover:bg-primary/20"
        >
          {showBundle ? "Hide" : "Bundle"} 📦
        </button>
      </div>
      {showPrompts && (
        <div className="mt-3 space-y-3 rounded-xl border border-border/60 bg-background/40 p-4 fade-up">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-primary">Reply Hook</p>
            <p className="mt-1 text-sm text-foreground/85">{tweet.reply}</p>
            <div className="mt-2"><CopyButton text={tweet.reply} /></div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Poll</p>
            <pre className="mt-1 whitespace-pre-wrap font-body text-sm text-foreground/85">{tweet.poll}</pre>
            <div className="mt-2"><CopyButton text={tweet.poll} /></div>
          </div>
        </div>
      )}
      {showBundle && (
        <div className="mt-3 space-y-3 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-4 fade-up">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm text-primary">📦 Typefully / Buffer Bundle</p>
            <CopyButton text={bundle} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Title</p>
            <p className="mt-1 text-sm font-medium text-foreground/90">{title}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Caption</p>
            <pre className="mt-1 whitespace-pre-wrap font-body text-sm text-foreground/85">{caption}</pre>
            <div className="mt-2"><CopyButton text={caption} /></div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent">Hashtags</p>
            <p className="mt-1 text-sm text-primary/90">{hashtags}</p>
            <div className="mt-2"><CopyButton text={hashtags} /></div>
          </div>
        </div>
      )}
    </article>
  );
}

function ScheduleGenerator() {
  const [start, setStart] = useState("");
  const [generated, setGenerated] = useState<{ date: string; weekday: string; tweet: string; pillar: string; time: string }[] | null>(null);

  useEffect(() => {
    setStart(new Date().toISOString().slice(0, 10));
  }, []);

  const generate = () => {
    const startDate = new Date(start + "T00:00:00");
    if (isNaN(startDate.getTime())) {
      toast.error("Pick a valid start date.");
      return;
    }
    const rows = SCHEDULE.map((row, i) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      return {
        date: d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }),
        weekday: d.toLocaleDateString(undefined, { weekday: "long" }),
        tweet: row.tweet,
        pillar: row.pillar,
        time: POSTING_TIMES[i],
      };
    });
    setGenerated(rows);
    toast.success("7-day calendar generated", { description: "Copy as CSV and paste into Typefully or Buffer." });
  };

  const copyCsv = () => {
    if (!generated) return;
    const header = "Date,Weekday,Tweet,Pillar,Suggested Time,Content";
    const body = generated
      .map((r, i) => {
        const indices = r.tweet.replace(/#/g, "").split("+").map((s) => parseInt(s.trim()) - 1);
        const content = indices.map((idx) => TWEETS[idx]?.text ?? "").join(" || ");
        return `"${r.date}","${r.weekday}","${r.tweet}","${r.pillar}","${r.time}","${content.replace(/"/g, '""')}"`;
      })
      .join("\n");
    void navigator.clipboard.writeText(`${header}\n${body}`);
    toast.success("CSV copied", { description: "Paste into Typefully, Buffer, or Google Sheets." });
  };

  return (
    <div className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Auto-generate</p>
          <h3 className="font-display mt-1 text-2xl">Build my 7-day calendar</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a launch date. We'll map all 10 tweets to dates and suggested times.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
          />
          <button
            onClick={generate}
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:scale-105 hover:shadow-[0_0_25px_-5px] hover:shadow-primary"
          >
            Generate
          </button>
        </div>
      </div>

      {generated && (
        <div className="mt-8 fade-up">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-12 bg-background/60 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <div className="col-span-3">Date</div>
              <div className="col-span-2">Day</div>
              <div className="col-span-2">Tweet</div>
              <div className="col-span-3">Pillar</div>
              <div className="col-span-2">Time</div>
            </div>
            {generated.map((r, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 items-center px-4 py-3 text-sm ${
                  i !== generated.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="col-span-3 font-display text-accent">{r.date}</div>
                <div className="col-span-2 text-muted-foreground">{r.weekday}</div>
                <div className="col-span-2 font-mono text-primary">{r.tweet}</div>
                <div className="col-span-3">{r.pillar}</div>
                <div className="col-span-2 text-muted-foreground">{r.time}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={copyCsv}
              className="rounded-full border border-accent/60 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-accent transition hover:bg-accent/10"
            >
              Copy as CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RunbookSection() {
  const [active, setActive] = useState(0);
  const step = RUNBOOK[active];
  return (
    <section className="relative overflow-hidden border-t border-border bg-background px-6 py-24">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-primary">The Runbook</p>
        <h2 className="font-display mt-3 text-center text-4xl sm:text-5xl">
          Steal Earth's <span className="text-accent">Operating Manual</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Six steps. Real prompts. Real settings. Copy any block and ship today.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Step rail */}
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {RUNBOOK.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.step}
                  onClick={() => setActive(i)}
                  className={`group flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition lg:shrink ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-[0_0_25px_-8px] shadow-primary"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <span
                    className={`font-display text-sm ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.step}
                  </span>
                  <span
                    className={`font-display text-base ${
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Active step panel */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 fade-up" key={active}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary">Step {step.step}</p>
                <h3 className="font-display mt-1 text-3xl">{step.title}</h3>
              </div>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-widest text-accent">
                {step.tool.split("·")[0].trim()}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.goal}</p>

            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent">Tool Stack</p>
              <p className="mt-1 text-sm text-foreground/85">{step.tool}</p>
            </div>

            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent">Settings</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {step.settings.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-border/60 bg-background/40 p-3"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="mt-1 text-sm text-foreground/90">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent">
                  Copy-paste Prompt
                </p>
                <CopyButton text={step.prompt} />
              </div>
              <pre className="mt-2 max-h-80 overflow-auto rounded-xl border border-primary/30 bg-background/70 p-4 font-mono text-[12px] leading-relaxed text-foreground/85 whitespace-pre-wrap">{step.prompt}</pre>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                Step {active + 1} of {RUNBOOK.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                  className="rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground transition hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setActive((a) => Math.min(RUNBOOK.length - 1, a + 1))}
                  disabled={active === RUNBOOK.length - 1}
                  className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EarthLanding() {
  const [filter, setFilter] = useState<Pillar | "all">("all");
  const filteredTweets = TWEETS.map((t, i) => ({ tweet: t, originalIndex: i })).filter(
    (x) => filter === "all" || x.tweet.pillar === filter,
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" />

      {/* HERO */}
      <section className="relative cosmic-bg overflow-hidden">
        <Starfield />
        <Particles />
        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
          <p className="mb-8 inline-block rounded-full border border-primary/40 bg-background/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-primary backdrop-blur fade-up">
            @earthspeaking · verified by physics
          </p>
          <EarthOrb />
          <h1 className="font-display mt-12 text-6xl sm:text-7xl md:text-8xl font-black tracking-tight fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="bg-gradient-to-br from-foreground via-primary to-accent bg-clip-text text-transparent">
              Earth
            </span>
          </h1>
          <p className="font-display mt-4 text-xl sm:text-2xl italic text-accent fade-up" style={{ animationDelay: "0.2s" }}>
            4.5 Billion Years Old. Still Running. Barely.
          </p>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground fade-up" style={{ animationDelay: "0.3s" }}>
            Oldest influencer. Still not verified. 8 billion roommates. None of them clean up.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 fade-up" style={{ animationDelay: "0.4s" }}>
            <a
              href="https://www.mayankagarwal.org"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:scale-105 hover:shadow-[0_0_30px_-5px] hover:shadow-primary"
            >
              Follow the Mission
            </a>
            <a
              href="#tweets"
              className="rounded-full border border-accent/50 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-accent transition hover:bg-accent/10"
            >
              See My Posts
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            { label: "Age", value: "4.5B", sub: "years and counting" },
            { label: "Roommates", value: "8B", sub: "humans (and chaos)" },
            { label: "Survived", value: "5", sub: "mass extinctions" },
            { label: "Patience Left", value: "Low", sub: "see footer" },
          ].map((s) => (
            <div key={s.label} className="bg-background p-8 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
              <p className="font-display mt-3 text-4xl md:text-5xl font-bold text-accent">{s.value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-primary">Content Pillars</p>
          <h2 className="font-display mt-3 text-center text-4xl sm:text-5xl">What I Post About</h2>
          <p className="mt-4 text-center text-muted-foreground">Four moods. One planet. Infinite content.</p>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { emoji: "🔥", title: "Roasting Humans", desc: "Hot takes on the species that invented plastic and TikTok in the same century.", pct: "30%" },
              { emoji: "💧", title: "Climate Grief", desc: "Real talk about reefs, glaciers, and the species we lost this morning.", pct: "20%" },
              { emoji: "🌿", title: "Ancient Wisdom", desc: "I was here before WiFi. Some things are worth remembering.", pct: "20%" },
              { emoji: "🌱", title: "Hope & Action", desc: "Every tree planted is a love letter. Keep writing them.", pct: "30%" },
            ].map((p) => (
              <div key={p.title} className="pillar-card rounded-2xl bg-card p-8">
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{p.emoji}</span>
                  <span className="font-body text-xs uppercase tracking-widest text-accent">{p.pct}</span>
                </div>
                <h3 className="font-display mt-6 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TWEETS */}
      <section id="tweets" className="border-t border-border bg-card/30 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-primary">10 Posts. 7 Days.</p>
          <h2 className="font-display mt-3 text-center text-4xl sm:text-5xl">Transmissions from Earth</h2>
          <p className="mt-4 text-center text-muted-foreground">
            Filter by mood. Copy any line. Get reply prompts on tap.
          </p>

          {/* Filters */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {PILLARS.map((p) => {
              const active = filter === p.id;
              const count = p.id === "all" ? TWEETS.length : TWEETS.filter((t) => t.pillar === p.id).length;
              return (
                <button
                  key={p.id}
                  onClick={() => setFilter(p.id)}
                  className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                    active
                      ? "border-primary bg-primary/15 text-primary shadow-[0_0_20px_-5px] shadow-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <span>{p.emoji}</span>
                  <span className="font-medium">{p.label}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-primary/20" : "bg-background"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3 [column-fill:_balance]">
            {filteredTweets.map(({ tweet, originalIndex }) => (
              <TweetCard key={originalIndex} tweet={tweet} index={originalIndex} />
            ))}
          </div>

          {filteredTweets.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">No transmissions in this mood yet. 🌌</p>
          )}
        </div>
      </section>

      {/* AI WORKFLOW */}
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-primary">Tweet Automation</p>
          <h2 className="font-display mt-3 text-center text-4xl sm:text-5xl">
            How Earth Tweets <span className="text-accent">on Autopilot</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            A 6-step AI workflow: from listening to the world, to landing in the algorithm. Earth doesn't sleep — neither does her stack.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW.map((w) => (
              <div key={w.step} className="pillar-card relative rounded-2xl bg-card p-8">
                <span className="font-display absolute -top-4 left-6 rounded-full border border-primary/40 bg-background px-3 py-1 text-xs text-primary">
                  Step {w.step}
                </span>
                <h3 className="font-display mt-2 text-2xl">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                <p className="mt-5 text-[11px] uppercase tracking-widest text-accent">{w.tools}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-primary/30 bg-card/60 p-6 text-center text-sm text-muted-foreground">
            <span className="text-primary">Pro tip:</span> chain steps 1 → 6 in <span className="text-foreground">Make.com</span> or <span className="text-foreground">n8n</span>. Cost: ~$15/mo. Time saved: ~10hrs/week.
          </div>
        </div>
      </section>

      {/* RUNBOOK */}
      <RunbookSection />

      {/* SCHEDULE */}
      <section className="border-t border-border bg-card/30 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-primary">Mission Control</p>
          <h2 className="font-display mt-3 text-center text-4xl sm:text-5xl">Transmission Schedule</h2>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid grid-cols-12 border-b border-border bg-background/60 px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <div className="col-span-2">Day</div>
              <div className="col-span-2">Tweet</div>
              <div className="col-span-4">Pillar</div>
              <div className="col-span-4">Mission</div>
            </div>
            {SCHEDULE.map((row, i) => (
              <div
                key={row.day}
                className={`grid grid-cols-12 items-center px-6 py-5 text-sm ${
                  i !== SCHEDULE.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="col-span-2 font-display text-lg text-accent">{row.day}</div>
                <div className="col-span-2 font-mono text-primary">{row.tweet}</div>
                <div className="col-span-4">{row.pillar}</div>
                <div className="col-span-4 text-muted-foreground">{row.note}</div>
              </div>
            ))}
          </div>

          <ScheduleGenerator />
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative cosmic-bg border-t border-border px-6 py-28 text-center">
        <Starfield />
        <Particles />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-display text-4xl sm:text-6xl leading-tight">
            One Earth. <span className="text-primary">Many Civilisations.</span>{" "}
            <span className="text-accent">One Collective.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-muted-foreground">
            Built in collaboration with Mayank Agarwal — Silent Systems Designer.
          </p>
          <a
            href="https://www.mayankagarwal.org"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block rounded-full bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition hover:scale-105 hover:shadow-[0_0_40px_-5px] hover:shadow-accent"
          >
            Connect with Mayank
          </a>
          <p className="mt-12 text-xs text-muted-foreground">
            © Earth, est. 4,500,000,000 BC · Still here. Still hopeful.
          </p>
        </div>
      </section>
    </main>
  );
}
