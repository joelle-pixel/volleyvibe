import type { QuizQuestion, Level, Position } from "./types";

/* ---------------- Leveling quiz (onboarding) ---------------- */

export const levelingQuiz: QuizQuestion[] = [
  {
    id: "l1",
    question: "How many players are on the court per team in indoor volleyball?",
    options: ["4", "5", "6", "7"],
    correct: 2,
    explanation: "Six per side — three front row, three back row.",
  },
  {
    id: "l2",
    question: "What is the maximum number of hits a team can use before sending the ball over?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explanation: "Three hits (a block touch doesn't count as one).",
  },
  {
    id: "l3",
    question: "Which player is the \"quarterback\" who takes the second ball?",
    options: ["Libero", "Middle Blocker", "Setter", "Opposite"],
    correct: 2,
    explanation: "The setter runs the offense and chooses the attacker.",
  },
  {
    id: "l4",
    question: "In serve receive, the \"left seam\" is the space between…",
    options: [
      "The net and the left antenna",
      "The left passer and the middle passer",
      "Zone 5 and the end line",
      "The setter and the libero",
    ],
    correct: 1,
    explanation: "Seams are the shared gaps between adjacent passers.",
  },
  {
    id: "l5",
    question: "What is a \"pipe\"?",
    options: [
      "A serve down the line",
      "A back-row attack through the middle",
      "A type of block",
      "The net's support pole",
    ],
    correct: 1,
    explanation: "The pipe is a back-row attack from zone 6, taking off behind the 3m line.",
  },
  {
    id: "l6",
    question: "A pass rated \"3\" means…",
    options: [
      "The ball was shanked",
      "Only a high outside set is possible",
      "A perfect pass to the setter's target",
      "The serve was an ace",
    ],
    correct: 2,
    explanation: "The 0-3 scale: 3 is a perfect pass with all offensive options available.",
  },
  {
    id: "l7",
    question: "In a 5-1 offense, how many setters are on the roster's starting lineup?",
    options: ["1", "2", "3", "5"],
    correct: 0,
    explanation: "5-1 = five hitters + one setter through all six rotations.",
  },
  {
    id: "l8",
    question: "\"Tooling the block\" means…",
    options: [
      "Blocking with closed fists",
      "Hitting off the blocker's hands so the ball lands out",
      "Setting the middle blocker",
      "Serving at the tallest player",
    ],
    correct: 1,
    explanation: "Using the block as a tool — the deflection scores your point.",
  },
  {
    id: "l9",
    question: "What is a \"commit block\"?",
    options: [
      "A block held for 3 seconds",
      "The middle jumping with the quick attacker no matter what",
      "Two blockers jumping together",
      "A blocking foul",
    ],
    correct: 1,
    explanation: "Committing is an all-in read on the opponent's quick (1-ball) attack.",
  },
  {
    id: "l10",
    question: "Your team is \"out of system.\" The safest choice is usually…",
    options: [
      "A quick set to the middle",
      "A high ball to the outside hitter",
      "A setter dump",
      "A back-row pipe on one foot",
    ],
    correct: 1,
    explanation: "Out of system, the high outside set gives your best hitter time and space.",
  },
];

export function scoreLevel(correctCount: number, total: number): Level {
  const pct = correctCount / total;
  if (pct >= 0.8) return "Advanced";
  if (pct >= 0.5) return "Intermediate";
  return "Beginner";
}

export const levelBlurbs: Record<Level, string> = {
  Beginner:
    "Welcome to the volleyball family! We'll start you in VolleyU Academy with Rules 101 and the fundamentals. Every great player started exactly here.",
  Intermediate:
    "Solid foundation! You know the game — now it's time to sharpen skills, learn systems, and find your ideal club and position.",
  Advanced:
    "You know your seams from your slides. We've unlocked the Pro Zone, club tryout boards, and advanced strategy courses for you.",
};

/* ---------------- Position quiz ---------------- */

export const positionQuiz: QuizQuestion[] = [
  {
    id: "pq1",
    question: "Your team is down 23-24. What role do you want in this rally?",
    options: [
      "Give me the ball. I'll end it.",
      "I'll make the decision on who attacks.",
      "I'll keep the ball off the floor no matter what.",
      "I'll shut down their best hitter at the net.",
    ],
    weights: {
      a: { "Outside Hitter": 3, Opposite: 2 },
      b: { Setter: 3 },
      c: { Libero: 3, "Defensive Specialist": 2 },
      d: { "Middle Blocker": 3, Opposite: 1 },
    },
  },
  {
    id: "pq2",
    question: "Pick your superpower:",
    options: [
      "Hops — I want to fly",
      "Hands — precision and touch",
      "Reflexes — nothing hits my floor",
      "Reading the game like a movie script",
    ],
    weights: {
      a: { "Middle Blocker": 2, "Outside Hitter": 2, Opposite: 2 },
      b: { Setter: 3 },
      c: { Libero: 3, "Defensive Specialist": 2 },
      d: { Setter: 2, Libero: 1, "Middle Blocker": 1 },
    },
  },
  {
    id: "pq3",
    question: "How tall are you compared to your friend group?",
    options: [
      "The tallest, easily",
      "Above average",
      "Around average",
      "On the shorter side (and faster than all of them)",
    ],
    weights: {
      a: { "Middle Blocker": 3, Opposite: 2 },
      b: { "Outside Hitter": 2, Opposite: 2 },
      c: { Setter: 2, "Outside Hitter": 1 },
      d: { Libero: 3, "Defensive Specialist": 2, Setter: 1 },
    },
  },
  {
    id: "pq4",
    question: "Your coach says you get ONE skill mastered overnight. You pick:",
    options: [
      "A jump serve that breaks the radar gun",
      "A perfect set from anywhere on the court",
      "A dig on every ball inside the gym",
      "A block that ends rallies instantly",
    ],
    weights: {
      a: { Opposite: 3, "Outside Hitter": 2 },
      b: { Setter: 3 },
      c: { Libero: 3, "Defensive Specialist": 2 },
      d: { "Middle Blocker": 3 },
    },
  },
  {
    id: "pq5",
    question: "In group projects, you're the one who…",
    options: [
      "Presents — I like the spotlight",
      "Organizes everyone and assigns the work",
      "Quietly fixes everything behind the scenes",
      "Handles the hardest part nobody else wants",
    ],
    weights: {
      a: { "Outside Hitter": 3 },
      b: { Setter: 3 },
      c: { Libero: 2, "Defensive Specialist": 3 },
      d: { "Middle Blocker": 2, Opposite: 2 },
    },
  },
  {
    id: "pq6",
    question: "The ball's coming at your face at 50 mph. Your honest reaction:",
    options: [
      "Perfect. Free dig.",
      "Get my platform there — somehow",
      "Duck, then apologize",
      "It won't reach me. I already blocked it.",
    ],
    weights: {
      a: { Libero: 3 },
      b: { "Defensive Specialist": 2, "Outside Hitter": 2 },
      c: { Setter: 1 },
      d: { "Middle Blocker": 3, Opposite: 1 },
    },
  },
  {
    id: "pq7",
    question: "What sounds like the most fun?",
    options: [
      "Hitting from anywhere, even off a terrible pass",
      "Faking out blockers with a sneaky dump",
      "Chasing down an impossible ball into the bleachers",
      "Timing a quick attack so fast the block can't load",
    ],
    weights: {
      a: { "Outside Hitter": 3, Opposite: 2 },
      b: { Setter: 3 },
      c: { Libero: 3, "Defensive Specialist": 2 },
      d: { "Middle Blocker": 3 },
    },
  },
  {
    id: "pq8",
    question: "Pick your energy on the court:",
    options: [
      "Loud, fiery, first one celebrating",
      "Calm and steady — someone has to think",
      "Locked in and scrappy",
      "Intimidating presence at the net",
    ],
    weights: {
      a: { "Outside Hitter": 2, Opposite: 2 },
      b: { Setter: 3 },
      c: { Libero: 2, "Defensive Specialist": 3 },
      d: { "Middle Blocker": 3 },
    },
  },
  {
    id: "pq9",
    question: "Serve receive is happening. Where do you want to be?",
    options: [
      "Passing — I want the ball first",
      "At the net, ready to run the offense",
      "Covering the whole back court",
      "Not my job — I'm loading up to attack",
    ],
    weights: {
      a: { "Outside Hitter": 2, Libero: 2 },
      b: { Setter: 3 },
      c: { Libero: 2, "Defensive Specialist": 3 },
      d: { "Middle Blocker": 2, Opposite: 3 },
    },
  },
  {
    id: "pq10",
    question: "Your dream highlight clip is…",
    options: [
      "A massive kill over a triple block",
      "A no-look dump at set point",
      "A full-sprint pancake save that wins the rally",
      "A stuff block so loud the gym goes silent",
    ],
    weights: {
      a: { "Outside Hitter": 3, Opposite: 2 },
      b: { Setter: 3 },
      c: { Libero: 3, "Defensive Specialist": 2 },
      d: { "Middle Blocker": 3 },
    },
  },
];

export interface PositionResult {
  position: Position;
  emoji: string;
  tagline: string;
  description: string;
  pros: string;
  famous: string;
}

export const positionResults: Record<string, PositionResult> = {
  Setter: {
    position: "Setter",
    emoji: "🤝",
    tagline: "The Floor General",
    description:
      "You see the whole court, think two plays ahead, and make everyone around you better. You want the responsibility of every second ball — and the glory of the perfect assist.",
    pros: "Great hands, decision-making, leadership, volleyball IQ",
    famous: "Micah Christenson, Jordyn Poulter",
  },
  "Outside Hitter": {
    position: "Outside Hitter",
    emoji: "🔥",
    tagline: "The Go-To Scorer",
    description:
      "When the game is on the line, the ball finds you. You do everything — pass, attack, defend — and you love the spotlight of the left antenna.",
    pros: "All-around skills, clutch scoring, six-rotation stamina",
    famous: "Kathryn Plummer, Wilfredo León",
  },
  Opposite: {
    position: "Opposite",
    emoji: "⚡",
    tagline: "The Power Plant",
    description:
      "You bring the heat from the right side, feast on back sets, and terrorize servers with your arm. Less serve-receive, more pure offense.",
    pros: "Raw power, right-side blocking, big serving",
    famous: "Jordan Larson (as OPP), Earvin N'Gapeth",
  },
  "Middle Blocker": {
    position: "Middle Blocker",
    emoji: "🧱",
    tagline: "The Wall",
    description:
      "You own the net. Lightning-fast quick attacks, slides that feel like flying, and blocks that end conversations. The rally runs through you first.",
    pros: "Height, timing, explosive first step, blocking instincts",
    famous: "Foluke Akinradewo, Robertlandy Simón",
  },
  Libero: {
    position: "Libero",
    emoji: "🛡️",
    tagline: "The Guardian",
    description:
      "Nothing touches your floor. You live for the impossible dig, run the back court like a captain, and wear the different jersey with pride.",
    pros: "Reflexes, passing, fearlessness, communication",
    famous: "Justine Wong-Orantes, Jenia Grebennikov",
  },
  "Defensive Specialist": {
    position: "Defensive Specialist",
    emoji: "💪",
    tagline: "The Secret Weapon",
    description:
      "You change games from the bench — coming in to stabilize serve receive, dig the hot hitter, and drop a tough serve. Every championship team needs you.",
    pros: "Serve receive, serving, adaptability, team-first mentality",
    famous: "Every championship roster's unsung hero",
  },
};
