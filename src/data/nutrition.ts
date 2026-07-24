import type { NutritionGuide } from "./types";
import { G } from "./players";

export const nutritionGuides: NutritionGuide[] = [
  {
    id: "nu1",
    title: "Game Day Fueling Plan",
    emoji: "🍝",
    category: "Game Day",
    summary: "What and when to eat so you peak at first serve, not at warmups.",
    points: [
      "3-4 hours before: a real meal — pasta or rice + lean protein + veggies. Carbs are your jump fuel.",
      "1 hour before: light snack — banana, granola bar, or toast with honey. Nothing heavy or greasy.",
      "Between sets: sips of sports drink and a few orange slices or half a banana if the tournament runs long.",
      "Multi-match tournaments: pack a cooler. PB&J, pretzels, fruit, and electrolyte drinks between matches.",
      "Avoid: fried food, energy drinks, and trying anything NEW on game day. Test foods at practice first.",
    ],
    gradient: G.sunset,
  },
  {
    id: "nu2",
    title: "Recovery Window (0-60 min)",
    emoji: "🥤",
    category: "Recovery",
    summary: "The hour after practice is when your body rebuilds. Don't waste it.",
    points: [
      "Within 30-60 minutes: carbs + protein in roughly a 3:1 ratio. Chocolate milk is the classic for a reason.",
      "Good options: Greek yogurt with fruit, a turkey sandwich, a smoothie with protein, or rice with chicken.",
      "Rehydrate: drink 16-24 oz of fluid for every pound of sweat lost. Weigh yourself before/after a hard practice once to learn your rate.",
      "Sore all the time? Check your protein: aim for 0.7-0.9g per pound of bodyweight daily, spread across meals.",
      "Sleep is the best recovery supplement ever invented. 8-10 hours for teen athletes.",
    ],
    gradient: G.berry,
  },
  {
    id: "nu3",
    title: "Everyday Athlete Plate",
    emoji: "🍽️",
    category: "Everyday",
    summary: "The simple plate formula that fuels growth, training, and school.",
    points: [
      "Half your plate: colorful fruits and vegetables (vitamins, minerals, recovery).",
      "A quarter: quality protein — chicken, fish, eggs, beans, tofu, Greek yogurt.",
      "A quarter: whole-grain carbs — rice, oats, whole wheat pasta, potatoes. On hard training days, make this a third.",
      "Add healthy fats daily: avocado, nuts, olive oil, nut butter. Fats support hormones and joints.",
      "Calcium + vitamin D matter for jumpers' bones: dairy, fortified alternatives, or leafy greens every day.",
    ],
    gradient: G.lime,
  },
  {
    id: "nu4",
    title: "Hydration Science 101",
    emoji: "💧",
    category: "Hydration",
    summary: "A 2% drop in hydration can cut your vertical and reaction time. Here's the math.",
    points: [
      "Daily baseline: roughly half your bodyweight (lbs) in ounces of water. A 140 lb player needs ~70 oz.",
      "Practice days: add 16-24 oz per hour of play. Start hydrating the NIGHT BEFORE a tournament.",
      "Electrolytes matter when sessions pass 60-90 minutes or you're a salty sweater (white marks on your jersey).",
      "Pee check: pale lemonade = hydrated. Apple juice = drink up now.",
      "Chugging right before practice doesn't work — hydration is an all-day habit. That's why we built you a reminder.",
    ],
    gradient: G.aqua,
  },
  {
    id: "nu5",
    title: "Tournament Day Survival Kit",
    emoji: "🎒",
    category: "Game Day",
    summary: "The exact packing list for those 8-hour convention center marathons.",
    points: [
      "2 water bottles (one water, one electrolyte mix) — refill every break.",
      "Easy carbs: pretzels, fruit snacks, bananas, applesauce pouches, granola bars.",
      "Real food for the long break: sandwich or wrap, not convention center nachos.",
      "Something salty AND something sweet — your cravings are data about what your body needs.",
      "Post-tournament: a full recovery meal within an hour of your last match, even if it's fast-casual on the drive home.",
    ],
    gradient: G.gold,
  },
  {
    id: "nu6",
    title: "Muscle & Vertical Building Blocks",
    emoji: "🏋️",
    category: "Everyday",
    summary: "Eating to jump higher: what actually supports strength gains.",
    points: [
      "You can't out-train an under-fueled body. Eating too little stalls vertical progress faster than skipping gym days.",
      "Protein timing: 20-40g within a couple hours after lifting or plyo work.",
      "Creatine is one of the most-studied supplements in sports — but talk to your doctor and parents first; food comes first at youth level.",
      "Iron check for high-mileage athletes (especially girls): fatigue that won't quit deserves a doctor visit, not more caffeine.",
      "Carbs around workouts aren't cheating — they're the fuel that lets you train hard enough to adapt.",
    ],
    gradient: G.fire,
  },
];

export const hydrationTips = [
  "Sip, don't chug — your body absorbs steady fluids better.",
  "Add electrolytes if practice runs past 90 minutes.",
  "Cold water absorbs slightly faster and keeps core temp down.",
  "Start tournament hydration the night before.",
  "A 2% hydration drop can measurably cut your vertical.",
  "Salty sweater? (white jersey marks) You need more sodium, not just water.",
];
