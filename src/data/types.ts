export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Position =
  | "Setter"
  | "Outside Hitter"
  | "Opposite"
  | "Middle Blocker"
  | "Libero"
  | "Defensive Specialist"
  | "Undecided";

export interface Player {
  id: string;
  name: string;
  handle: string;
  position: Position;
  level: Level;
  region: string;
  bio: string;
  emoji: string;
  gradient: string; // css gradient for avatar ring / cover
  followers: number;
  verified?: boolean;
  /** real photo (e.g. Wikimedia Commons) shown instead of the emoji avatar */
  photo?: string;
}

export interface Comment {
  id: string;
  authorId: string;
  text: string;
}

export interface Post {
  id: string;
  authorId: string;
  text: string;
  emoji: string; // big visual emoji for the post card art
  gradient: string;
  tag: string;
  likes: number;
  timestamp: string;
  comments: Comment[];
}

export interface Club {
  id: string;
  name: string;
  region: string;
  city: string;
  size: "Small" | "Medium" | "Large";
  competitiveness: "Recreational" | "Competitive" | "Elite";
  travel: boolean;
  seasonFee: number;
  tryoutFee: number;
  ageGroups: string[];
  openings: { position: Position; spots: number }[];
  tryoutDate: string;
  tryoutLocation: string;
  blurb: string;
  emoji: string;
  gradient: string;
}

export interface NewsArticle {
  id: string;
  headline: string;
  category: "Pro" | "College" | "Club" | "Rules" | "Gear";
  summary: string;
  body: string;
  date: string;
  emoji: string;
  gradient: string;
  minLevel?: Level;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** index of correct answer — only for knowledge quizzes */
  correct?: number;
  explanation?: string;
  /** for personality quizzes: score weights per option, keyed by position */
  weights?: Record<string, Partial<Record<Position, number>>>;
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  content: LessonBlock[];
}

export type LessonBlock =
  | { kind: "text"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "terms"; terms: { term: string; def: string }[] }
  | { kind: "tip"; text: string }
  | { kind: "court"; variant: CourtVariant; caption: string };

export type CourtVariant =
  | "zones"
  | "positions"
  | "seams"
  | "serve-receive"
  | "base-defense"
  | "rotation-1"
  | "rotation-2"
  | "rotation-3"
  | "rotation-4"
  | "rotation-5"
  | "rotation-6"
  | "attack-lines";

export interface Course {
  id: string;
  title: string;
  emoji: string;
  level: Level;
  description: string;
  gradient: string;
  lessons: Lesson[];
  checkpoint: QuizQuestion[];
}

export interface Drill {
  id: string;
  name: string;
  skill: string;
  level: Level;
  players: string;
  description: string;
  emoji: string;
}

export interface NutritionGuide {
  id: string;
  title: string;
  emoji: string;
  category: "Game Day" | "Recovery" | "Everyday" | "Hydration";
  summary: string;
  points: string[];
  gradient: string;
}
