import type { Course } from "./types";
import { G } from "./players";

export const courses: Course[] = [
  {
    id: "rules-101",
    title: "Rules 101",
    emoji: "📖",
    level: "Beginner",
    description: "Scoring, court zones, faults, and everything a ref would whistle you for.",
    gradient: G.lime,
    lessons: [
      {
        id: "r1",
        title: "The Court & The Basics",
        minutes: 6,
        content: [
          { kind: "heading", text: "The playing field" },
          {
            kind: "text",
            text: "An indoor volleyball court is 18m long and 9m wide, split by a net. The net is 2.43m (7'11⅝\") for men and 2.24m (7'4⅛\") for women. Each side has an attack line (the \"10-foot line\") 3m from the net, dividing the front row from the back row.",
          },
          { kind: "court", variant: "zones", caption: "The six zones of the court. Zone 1 is back-right (where you serve from), and numbering runs counter-clockwise." },
          {
            kind: "terms",
            terms: [
              { term: "Rally", def: "One sequence of play, from serve until the ball is dead." },
              { term: "Side out", def: "When the receiving team wins the rally and earns the right to serve." },
              { term: "Ace", def: "A serve that scores directly, untouched or unplayable." },
            ],
          },
          { kind: "tip", text: "Memorize zone numbers early — coaches call them constantly (\"serve zone 5!\") and rotations are built on them." },
        ],
      },
      {
        id: "r2",
        title: "Scoring & Winning",
        minutes: 5,
        content: [
          { kind: "heading", text: "Rally scoring" },
          {
            kind: "text",
            text: "Every rally scores a point, no matter who served. Sets go to 25 points (win by 2). Matches are best of 5, and the deciding 5th set goes to 15. In club, matches are usually best of 3 with a 15-point third set.",
          },
          {
            kind: "terms",
            terms: [
              { term: "Set point", def: "The rally that can win the set for a team." },
              { term: "Deuce", def: "Tied at 24-24 (or 14-14) — play continues until one team leads by 2." },
              { term: "Let serve", def: "A serve that clips the net but lands in. It's live — play on!" },
            ],
          },
          { kind: "tip", text: "There is no cap in most rulesets — sets have gone past 40-38 in real matches!" },
        ],
      },
      {
        id: "r3",
        title: "Faults & Violations",
        minutes: 7,
        content: [
          { kind: "heading", text: "What gets whistled" },
          {
            kind: "text",
            text: "Common faults: four hits (max 3 per side, block doesn't count), double contact (one player hits twice in a row, except off a block), lift/carry (ball rests in your hands), net touch (touching the net during play at the top band), foot fault (stepping on/over the line while serving), and back-row attack (a back-row player attacking above the net in front of the attack line).",
          },
          {
            kind: "terms",
            terms: [
              { term: "Rotation fault", def: "Players out of rotational order when the ball is served." },
              { term: "Center line violation", def: "Crossing fully under the net into the opponent's court." },
              { term: "Screening", def: "Serving team illegally blocking the receiver's view of the server." },
            ],
          },
          { kind: "tip", text: "Back-row players CAN attack — they just have to jump from behind the 3m line. That's called a pipe or D-ball attack." },
        ],
      },
    ],
    checkpoint: [
      {
        id: "rq1",
        question: "How many hits is a team allowed per side (not counting the block)?",
        options: ["2", "3", "4", "Unlimited"],
        correct: 1,
        explanation: "Three hits max — typically pass, set, attack.",
      },
      {
        id: "rq2",
        question: "A 5th deciding set is played to how many points?",
        options: ["25", "21", "15", "10"],
        correct: 2,
        explanation: "Deciding sets go to 15, still win by 2.",
      },
      {
        id: "rq3",
        question: "A serve that hits the net and lands in the opponent's court is…",
        options: ["A fault — replay", "A fault — point to receivers", "Live — play on", "An automatic ace"],
        correct: 2,
        explanation: "The let serve rule: net serves that go over are live.",
      },
      {
        id: "rq4",
        question: "Which zone do you serve from?",
        options: ["Zone 6", "Zone 1", "Zone 5", "Zone 2"],
        correct: 1,
        explanation: "Zone 1 is the back-right of the court — the service zone starts behind it.",
      },
    ],
  },
  {
    id: "positions",
    title: "Positions & Roles",
    emoji: "🧩",
    level: "Beginner",
    description: "Setter, outside, opposite, middle, libero, DS — who does what and where.",
    gradient: G.ocean,
    lessons: [
      {
        id: "po1",
        title: "The Six Roles",
        minutes: 8,
        content: [
          { kind: "heading", text: "Meet the team" },
          { kind: "court", variant: "positions", caption: "A standard starting lineup in a 5-1 offense: setter in zone 1, outside hitters and middles opposite each other." },
          {
            kind: "terms",
            terms: [
              { term: "Setter (S)", def: "The quarterback. Takes the 2nd ball and decides who attacks. Runs the offense." },
              { term: "Outside Hitter (OH)", def: "Attacks from the left antenna, usually passes in serve receive. The all-rounder." },
              { term: "Opposite (OPP)", def: "Attacks from the right side, blocks the opponent's OH. Often the power scorer." },
              { term: "Middle Blocker (MB)", def: "Fast attacks in the middle (quicks, slides) and the first line of blocking defense." },
              { term: "Libero (L)", def: "Back-row defensive specialist in a different-colored jersey. Cannot attack above the net or set in front of the attack line with hands." },
              { term: "Defensive Specialist (DS)", def: "Subs in for back-row defense and serve receive — like a libero, but uses a normal substitution." },
            ],
          },
          { kind: "tip", text: "The libero can replace any back-row player without a substitution — that's why they seem to be on the court forever." },
        ],
      },
      {
        id: "po2",
        title: "Front Row vs Back Row",
        minutes: 5,
        content: [
          { kind: "heading", text: "Two different jobs" },
          {
            kind: "text",
            text: "Front-row players (zones 2, 3, 4) can attack and block at the net. Back-row players (zones 1, 6, 5) defend, pass, and can only attack from behind the 3m line. After your team wins a side out, everyone rotates one zone clockwise — so every player (except the libero) plays every zone.",
          },
          { kind: "court", variant: "attack-lines", caption: "Front-row attackers hit in front of the 3m line. Back-row attackers (like the pipe) must take off from behind it." },
          { kind: "tip", text: "\"Pipe\" = back-row attack through the middle. \"D\" = back-row attack from zone 1. Pro offenses use both constantly." },
        ],
      },
    ],
    checkpoint: [
      {
        id: "pq1",
        question: "Which player wears a different-colored jersey?",
        options: ["Setter", "Opposite", "Libero", "Middle Blocker"],
        correct: 2,
        explanation: "The libero's contrasting jersey signals their special substitution rules.",
      },
      {
        id: "pq2",
        question: "Who usually takes the second ball?",
        options: ["Libero", "Setter", "Outside Hitter", "Whoever is closest"],
        correct: 1,
        explanation: "The setter takes the 2nd contact and runs the offense.",
      },
      {
        id: "pq3",
        question: "A back-row player attacking above the net must jump from…",
        options: ["Anywhere", "Behind the attack (3m) line", "Behind the end line", "Zone 6 only"],
        correct: 1,
        explanation: "Back-row attacks are legal only when taking off behind the 3m line.",
      },
    ],
  },
  {
    id: "serving-passing",
    title: "Serving & Passing",
    emoji: "🎯",
    level: "Beginner",
    description: "Float serves, platform angles, and the serve-receive formation that wins games.",
    gradient: G.sunset,
    lessons: [
      {
        id: "sp1",
        title: "Serving Fundamentals",
        minutes: 7,
        content: [
          { kind: "heading", text: "Your first weapon" },
          {
            kind: "text",
            text: "The float serve is volleyball's knuckleball: toss low and in front, contact the middle of the ball with a firm hand, and stop your follow-through. No spin = unpredictable movement. The topspin serve trades movement for power and accuracy, and the jump serve adds an approach for maximum heat.",
          },
          {
            kind: "terms",
            terms: [
              { term: "Float serve", def: "No-spin serve that wobbles unpredictably in the air." },
              { term: "Short serve", def: "A serve dropped just over the net into zones 2/3/4 to pull passers forward." },
              { term: "Serve tough zones", def: "Zone 1 (setter's corner) and zone 5 (weak passer's line) are classic targets." },
            ],
          },
          { kind: "tip", text: "Consistency first: a 90% in-rate medium serve beats a 50% in-rate rocket at every level below pro." },
        ],
      },
      {
        id: "sp2",
        title: "Passing & Serve Receive",
        minutes: 8,
        content: [
          { kind: "heading", text: "The platform" },
          {
            kind: "text",
            text: "Lock your arms straight, shrug your shoulders forward, and angle your platform toward the target — the ball goes where your platform points, not where you swing. Move your feet first, arrive early, and pass from a stable base.",
          },
          { kind: "court", variant: "serve-receive", caption: "A standard 3-person serve-receive: libero in the middle seam, outsides on each side. The setter hides at the net." },
          {
            kind: "terms",
            terms: [
              { term: "Seam", def: "The gap in responsibility between two passers. \"Left seam\" and \"right seam\" name the gaps either side of the middle passer." },
              { term: "Pass rating", def: "0-3 scale. 3 = perfect to the setter, 2 = setter moves but all options open, 1 = only high sets, 0 = ace." },
              { term: "Shank", def: "A pass that flies wildly off the platform. It happens to everyone." },
            ],
          },
          { kind: "tip", text: "Call \"mine!\" early and loud. 90% of seam confusion is solved by talking before the serve crosses the net." },
        ],
      },
    ],
    checkpoint: [
      {
        id: "sq1",
        question: "What makes a float serve \"float\"?",
        options: ["Heavy topspin", "No spin", "Sidespin", "A high toss"],
        correct: 1,
        explanation: "Zero spin lets air currents push the ball unpredictably.",
      },
      {
        id: "sq2",
        question: "Where should your platform point when passing?",
        options: ["At the server", "Straight up", "At your target", "At the net"],
        correct: 2,
        explanation: "The ball rebounds in the direction the platform faces.",
      },
      {
        id: "sq3",
        question: "A \"seam\" in serve receive is…",
        options: ["The line on the ball", "The gap between two passers", "The net's top band", "The 3m line"],
        correct: 1,
        explanation: "Seams are shared-responsibility gaps — communication zones.",
      },
    ],
  },
  {
    id: "setting-hitting",
    title: "Setting & Attacking",
    emoji: "🏐",
    level: "Intermediate",
    description: "Clean hands, the four-step approach, and shot selection beyond just hitting hard.",
    gradient: G.berry,
    lessons: [
      {
        id: "sh1",
        title: "Setting Mechanics",
        minutes: 7,
        content: [
          { kind: "heading", text: "Hands like a window" },
          {
            kind: "text",
            text: "Shape your hands above your forehead like you're framing the ball in a triangle window. Take the ball with all ten fingers, absorb, and extend through — legs, core, arms in one motion. Square your shoulders to the left antenna and set with your body, not just your wrists.",
          },
          {
            kind: "terms",
            terms: [
              { term: "Hut / Go", def: "A fast set to the left-side (outside) antenna." },
              { term: "Red / Back", def: "A back set to the opposite in zone 2." },
              { term: "Quick (1)", def: "A low, fast set the middle attacks almost immediately." },
              { term: "Pipe", def: "A set to the back-row attacker through the middle." },
            ],
          },
          { kind: "tip", text: "Great setters set the same-looking ball every time — hitters trust consistency more than perfection." },
        ],
      },
      {
        id: "sh2",
        title: "The Attack Approach",
        minutes: 8,
        content: [
          { kind: "heading", text: "Four steps to airborne" },
          {
            kind: "text",
            text: "The right-handed approach is left-right-left-(right): a slow directional first step, an explosive long second step, then a fast right-left plant with arms swinging back and up. Contact the ball high and in front, snapping your wrist over the top.",
          },
          {
            kind: "terms",
            terms: [
              { term: "Tool / Wipe", def: "Deliberately hitting off the blocker's hands so the ball flies out." },
              { term: "Cut shot", def: "A sharp cross-court shot at an extreme angle." },
              { term: "Tip / Dink", def: "A soft touch over or around the block into open space." },
              { term: "Line vs Cross", def: "Hitting down the sideline vs diagonally across the court." },
            ],
          },
          { kind: "court", variant: "attack-lines", caption: "Attack angles from the left side: line, cross-court, and the deep cut." },
          { kind: "tip", text: "If the block takes your favorite shot away, that's information — tool it, tip behind it, or swing high hands." },
        ],
      },
    ],
    checkpoint: [
      {
        id: "shq1",
        question: "What is a \"1\" or quick set?",
        options: ["A high set to the outside", "A low fast set to the middle", "A back set", "A serve"],
        correct: 1,
        explanation: "The quick is a low, fast tempo set attacked by the middle blocker.",
      },
      {
        id: "shq2",
        question: "\"Tooling the block\" means…",
        options: ["Blocking with tools", "Hitting off the blocker's hands out of bounds", "Setting the middle", "A double contact"],
        correct: 1,
        explanation: "Using the block as a tool — the ball ricochets out for your point.",
      },
      {
        id: "shq3",
        question: "For a right-handed hitter, the standard 4-step approach is…",
        options: ["Right-left-right-left", "Left-right-left-right", "Left-left-right-right", "Any order works"],
        correct: 1,
        explanation: "L-R-L-R lets righties plant and rotate power into the swing.",
      },
    ],
  },
  {
    id: "defense-blocking",
    title: "Defense & Blocking",
    emoji: "🧱",
    level: "Intermediate",
    description: "Reading hitters, digging angles, and building a wall at the net.",
    gradient: G.night,
    lessons: [
      {
        id: "db1",
        title: "Blocking Basics",
        minutes: 7,
        content: [
          { kind: "heading", text: "The first line of defense" },
          {
            kind: "text",
            text: "Blocking is about position and timing, not height. Watch the setter, then the hitter's approach and shoulders. Press over the net with strong hands angled into the court (\"penetrate\"), and seal the line or the angle — your diggers cover whatever you leave open.",
          },
          {
            kind: "terms",
            terms: [
              { term: "Swing block", def: "Using a running approach and arm swing to jump higher when blocking." },
              { term: "Soft block", def: "Angling hands back to deflect the ball up on your side." },
              { term: "Seal the line", def: "Positioning the block to take away the down-the-line shot." },
              { term: "Stuff block", def: "Blocking the ball straight down for a point. The best feeling in volleyball." },
            ],
          },
          { kind: "tip", text: "Eyes sequence: ball → setter → set → hitter. Blockers who ball-watch get burned." },
        ],
      },
      {
        id: "db2",
        title: "Floor Defense",
        minutes: 8,
        content: [
          { kind: "heading", text: "Base and read" },
          {
            kind: "text",
            text: "Defense starts before the attack: move to base position as the ball crosses, then read the set and adjust. Stay low, weight forward, hands ready. Dig hard-driven balls with your platform angled to target; run down tips and roll shots with quick first steps.",
          },
          { kind: "court", variant: "base-defense", caption: "Perimeter defense base: wing diggers on the lines, libero in the middle-back, off-blocker pulls in for tips." },
          {
            kind: "terms",
            terms: [
              { term: "Pancake", def: "Sliding flat and letting the ball bounce off the back of your hand. Legal and glorious." },
              { term: "Cover", def: "Surrounding your own hitter to dig blocked balls back up." },
              { term: "Reading", def: "Predicting the attack from the hitter's approach, shoulder, and contact." },
            ],
          },
          { kind: "tip", text: "Defense is a decision, not a reaction. Great diggers choose their spot before the hitter contacts." },
        ],
      },
    ],
    checkpoint: [
      {
        id: "dbq1",
        question: "A \"pancake\" is…",
        options: ["A blocking technique", "A flat-hand floor save", "A type of set", "A serve"],
        correct: 1,
        explanation: "The pancake: hand flat on the floor, ball bounces off the back of it.",
      },
      {
        id: "dbq2",
        question: "The blocker's eye sequence should be…",
        options: ["Ball only", "Ball → setter → set → hitter", "Hitter only", "Coach → ball"],
        correct: 1,
        explanation: "Tracking that sequence tells you where and when to jump.",
      },
      {
        id: "dbq3",
        question: "\"Covering\" your hitter means…",
        options: ["Blocking for them", "Standing behind them for blocked balls", "Setting them", "Cheering"],
        correct: 1,
        explanation: "Cover picks up the ball if the opposing block sends it straight back down.",
      },
    ],
  },
  {
    id: "advanced-strategy",
    title: "Advanced Strategy",
    emoji: "🧠",
    level: "Advanced",
    description: "Offensive systems, seam theory, out-of-system play, and thinking two rallies ahead.",
    gradient: G.fire,
    lessons: [
      {
        id: "as1",
        title: "Offensive Systems: 5-1 vs 6-2",
        minutes: 9,
        content: [
          { kind: "heading", text: "Choosing your engine" },
          {
            kind: "text",
            text: "A 5-1 runs one setter through all six rotations: consistent hands and leadership, but only two front-row attackers half the time. A 6-2 uses two setters who set from the back row only, keeping three front-row attackers at all times — at the cost of chemistry and constant transitions. Most college and pro teams run a 5-1; many club teams develop players in a 6-2.",
          },
          { kind: "court", variant: "rotation-1", caption: "5-1, rotation 1: setter in zone 1. The setter penetrates from the back row to set." },
          {
            kind: "terms",
            terms: [
              { term: "Penetrate", def: "The back-row setter sprinting to the net after the serve to run the offense." },
              { term: "Stack", def: "Aligning front-row players before the serve to get hitters into their best spots legally." },
              { term: "Out of system", def: "When the pass pulls the setter off the net and the offense improvises — usually a high ball to the outside." },
            ],
          },
          { kind: "tip", text: "In-system kills are easy points. Elite teams win by scoring OUT of system — practice your high-ball swings." },
        ],
      },
      {
        id: "as2",
        title: "Seam Theory & Serve Targeting",
        minutes: 8,
        content: [
          { kind: "heading", text: "Attack the gaps" },
          {
            kind: "text",
            text: "Every serve-receive formation has seams — the shared spaces between passers. The left seam sits between the left passer and the middle passer; the right seam between middle and right. Serving seams forces split-second communication and creates weak passes. Advanced servers also target the setter's entry path and the front-left corner behind a stacked outside.",
          },
          { kind: "court", variant: "seams", caption: "Left seam and right seam in a 3-passer formation. A serve into the seam makes two players decide in a heartbeat." },
          { kind: "tip", text: "Scout warmups: find the passer who drops their platform angle under pressure, then serve their seam side all match." },
        ],
      },
      {
        id: "as3",
        title: "Reading & Match IQ",
        minutes: 8,
        content: [
          { kind: "heading", text: "Play chess, not checkers" },
          {
            kind: "text",
            text: "Advanced volleyball is pattern recognition. Setters telegraph back sets with arched posture; hitters show line shots with open shoulders; teams repeat their favorite out-of-system pattern under pressure. Track tendencies by rotation: many teams have one rotation they can't side-out from — serve tough there in crunch time.",
          },
          {
            kind: "terms",
            terms: [
              { term: "Rotation score tracking", def: "Charting points won/lost per rotation to find weak spots." },
              { term: "Commit block", def: "The middle jumps with the quick attacker no matter what — a bet against the 1-ball." },
              { term: "Release defense", def: "A defender leaving their zone early based on a scouted tendency." },
            ],
          },
          { kind: "tip", text: "Timeouts are data resets. The best teams use them to break an opponent's serving rhythm — notice when refs hand the ball to a hot server." },
        ],
      },
    ],
    checkpoint: [
      {
        id: "asq1",
        question: "In a 6-2 system, the setter always sets from…",
        options: ["The front row", "The back row", "Zone 4", "The bench"],
        correct: 1,
        explanation: "Both setters set only when in the back row, keeping 3 front-row hitters.",
      },
      {
        id: "asq2",
        question: "The \"left seam\" is the gap between…",
        options: ["The net and the antenna", "The left passer and middle passer", "Zones 1 and 6", "The setter and libero"],
        correct: 1,
        explanation: "Seams are the shared gaps between adjacent passers.",
      },
      {
        id: "asq3",
        question: "\"Out of system\" means…",
        options: ["The libero is serving", "A rotation fault", "The pass pulled the setter off the net", "Playing without a setter"],
        correct: 2,
        explanation: "A bad pass forces improvised offense — usually a high outside set.",
      },
      {
        id: "asq4",
        question: "A \"commit block\" means the middle blocker…",
        options: ["Never jumps", "Jumps with the quick attacker every time", "Only blocks line", "Blocks with one hand"],
        correct: 1,
        explanation: "Committing is an all-in bet on the opponent's quick attack.",
      },
    ],
  },
];
