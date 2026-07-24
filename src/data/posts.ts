import type { Post } from "./types";
import { G } from "./players";

/**
 * Feed posts referencing real events from the VNL 2026 Finals in Macao
 * (quarterfinals July 22-23, semifinals July 25, medal matches July 26)
 * and the 2026 rule changes.
 */
export const seedPosts: Post[] = [
  {
    id: "post1",
    authorId: "anacristina",
    text: "SEMIFINALS! 🇧🇷 3-1 over Japan in Macao. That pipe to close set three might be my favorite swing of the season. Now the big one — Italy on Saturday. Vamos Brasil!",
    emoji: "🇧🇷",
    gradient: G.lime,
    tag: "VNL 2026",
    likes: 48210,
    timestamp: "2d",
    comments: [
      { id: "c1", authorId: "gabi", text: "High-voltage mode ⚡ proud of you" },
      { id: "c2", authorId: "boskovic", text: "That pipe was ridiculous 🔥" },
    ],
  },
  {
    id: "post2",
    authorId: "thompson",
    text: "Not the ending we wanted in Macao. Five sets, 15-13 in the fifth, in front of 4,400 of the loudest fans I've ever heard. Credit to China — they fought for every ball. We'll be back. 🇺🇸",
    emoji: "💔",
    gradient: G.ocean,
    tag: "VNL 2026",
    likes: 35400,
    timestamp: "1d",
    comments: [
      { id: "c3", authorId: "wongorantes", text: "Proud of this team. Always." },
      { id: "c4", authorId: "zhuting", text: "24 points — incredible battle. Respect 🙏" },
    ],
  },
  {
    id: "post3",
    authorId: "vargas",
    text: "Semifinal bound! 🇹🇷 3-1 over Canada and now we climb to #3 in the world ranking. China at home in Macao next — the atmosphere is going to be insane. Saturday 19:30. Be there.",
    emoji: "🇹🇷",
    gradient: G.gold,
    tag: "VNL 2026",
    likes: 41200,
    timestamp: "1d",
    comments: [
      { id: "c5", authorId: "egonu", text: "See you on Sunday maybe 👀" },
    ],
  },
  {
    id: "post4",
    authorId: "zhuting",
    text: "What a night in Macao. China taking down the USA — Preliminary Phase winners — in five sets, first semifinal since 2023. Zhuang Yushan with 17 points at 22 years old. The next generation is HERE. 🇨🇳❤️",
    emoji: "🇨🇳",
    gradient: G.fire,
    tag: "VNL 2026",
    likes: 89300,
    timestamp: "1d",
    comments: [
      { id: "c6", authorId: "anacristina", text: "That fifth set had me standing 😭" },
    ],
  },
  {
    id: "post5",
    authorId: "egonu",
    text: "Semifinals Saturday, 16:00, Macao. Brazil again — it's never anything less than a war with them. We came here to defend this VNL title. Focus. 🇮🇹",
    emoji: "🏆",
    gradient: G.fire,
    tag: "VNL 2026",
    likes: 76800,
    timestamp: "20h",
    comments: [
      { id: "c7", authorId: "michieletto", text: "Forza Azzurre! 🇮🇹" },
      { id: "c8", authorId: "gabi", text: "See you Saturday 😤💛💚" },
    ],
  },
  {
    id: "post6",
    authorId: "christenson",
    text: "Setter talk: the double-contact interpretation being tested at VNL this year (doubles on the set are fine if the ball stays on your side) is changing how young setters should train. Stop fearing the whistle — train clean hands because they're FASTER, not because you're scared. The best sets were never about avoiding a call.",
    emoji: "🧠",
    gradient: G.ocean,
    tag: "Rule Watch",
    likes: 22150,
    timestamp: "6h",
    comments: [
      { id: "c9", authorId: "ngapeth", text: "Setters getting away with everything now 😂" },
    ],
  },
  {
    id: "post7",
    authorId: "wongorantes",
    text: "Libero PSA on the 2026 rules: first contact still has referee latitude — a hard-driven ball that compresses on your platform and rebounds clean is NOT a lift. What's gone is the sketchy stuff on attacks: catches, throws, two-hand redirects. Play defense fearlessly. 🛡️",
    emoji: "🛡️",
    gradient: G.aqua,
    tag: "Rule Watch",
    likes: 18700,
    timestamp: "10h",
    comments: [
      { id: "c10", authorId: "christenson", text: "The clarity this year is genuinely good for the game" },
    ],
  },
  {
    id: "post8",
    authorId: "ngapeth",
    text: "So the new strict Rule 9.2.2 says no more push-carry-catch-throw attacks. Two-hand tricks: banned. Directional changes: banned. Good thing the one-hand magic is still perfectly legal 😏✨",
    emoji: "🎩",
    gradient: G.sunset,
    tag: "Rule Watch",
    likes: 54600,
    timestamp: "1d",
    comments: [
      { id: "c11", authorId: "leon", text: "They made a rule and you're already finding the loophole 😂" },
      { id: "c12", authorId: "michieletto", text: "The refs are watching YOU specifically" },
    ],
  },
  {
    id: "post9",
    authorId: "gabi",
    text: "Brazil x Italy. VNL semifinal. Saturday 16:00 in Macao. This rivalry has given volleyball some of its greatest matches and tomorrow we write another chapter. Deixa tudo em quadra. 💛💚",
    emoji: "⚔️",
    gradient: G.lime,
    tag: "VNL 2026",
    likes: 67400,
    timestamp: "8h",
    comments: [
      { id: "c13", authorId: "anacristina", text: "Juntas! 🙌" },
    ],
  },
  {
    id: "post10",
    authorId: "leon",
    text: "Serving clinic for the juniors watching VNL this week: power means nothing without a toss you can repeat blindfolded. I hit 135 km/h because the toss is identical every single time. Boring reps build scary serves. 🚀",
    emoji: "🚀",
    gradient: G.night,
    tag: "Tips",
    likes: 31900,
    timestamp: "2d",
    comments: [
      { id: "c14", authorId: "thompson", text: "Facts. Toss discipline is everything" },
    ],
  },
  {
    id: "post11",
    authorId: "boskovic",
    text: "To every young lefty being told to \"fix\" your hitting arm: don't. Being left-handed at opposite is a superpower — the ball comes from an angle blockers never train against. Own it. 👑",
    emoji: "👑",
    gradient: G.night,
    tag: "Tips",
    likes: 44800,
    timestamp: "3d",
    comments: [
      { id: "c15", authorId: "vargas", text: "Lefty opposites run the world 🤝" },
    ],
  },
  {
    id: "post12",
    authorId: "michieletto",
    text: "To the American players in my DMs asking about the new NCAA rule: yes, five years to play five seasons is real now (age-based, starts fully in 2027). One more year of college eligibility changes everything — use it. The European leagues will still be here when you're ready. 🌍",
    emoji: "🎓",
    gradient: G.lime,
    tag: "College",
    likes: 28300,
    timestamp: "2d",
    comments: [
      { id: "c16", authorId: "wongorantes", text: "Wish we had this rule when I was at Nebraska!" },
    ],
  },
];
