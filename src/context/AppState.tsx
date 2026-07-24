/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Level, Position, Post, Comment } from "../data/types";
import { seedPosts } from "../data/posts";

export interface Profile {
  name: string;
  handle: string;
  emoji: string;
  bio: string;
  region: string;
  position: Position;
  level: Level | null;
  onboarded: boolean;
}

export interface Hydration {
  goalOz: number;
  drankOz: number;
  day: string; // YYYY-MM-DD — resets daily
  remindEveryMin: number;
  remindersOn: boolean;
}

export interface CourseProgress {
  lessonsDone: string[];
  checkpointPassed: boolean;
}

interface AppState {
  profile: Profile;
  posts: Post[];
  liked: string[];
  follows: string[];
  progress: Record<string, CourseProgress>;
  hydration: Hydration;
  positionResult: Position | null;
  toast: string | null;
  updateProfile: (patch: Partial<Profile>) => void;
  completeOnboarding: (name: string, level: Level) => void;
  resetLevel: () => void;
  addPost: (text: string, tag: string, emoji: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  toggleFollow: (playerId: string) => void;
  markLesson: (courseId: string, lessonId: string) => void;
  passCheckpoint: (courseId: string) => void;
  logWater: (oz: number) => void;
  setHydration: (patch: Partial<Hydration>) => void;
  setPositionResult: (p: Position) => void;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = "volleyvibe-state-v1";

const today = () => new Date().toISOString().slice(0, 10);

const defaultProfile: Profile = {
  name: "",
  handle: "you.volleyvibe",
  emoji: "🏐",
  bio: "New to VolleyVibe and ready to ball.",
  region: "West Coast",
  position: "Undecided",
  level: null,
  onboarded: false,
};

const defaultHydration: Hydration = {
  goalOz: 70,
  drankOz: 0,
  day: today(),
  remindEveryMin: 45,
  remindersOn: true,
};

interface Persisted {
  profile: Profile;
  userPosts: Post[];
  liked: string[];
  follows: string[];
  progress: Record<string, CourseProgress>;
  hydration: Hydration;
  positionResult: Position | null;
  seedComments: Record<string, Comment[]>;
}

function loadPersisted(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Persisted;
      if (p.hydration.day !== today()) {
        p.hydration = { ...p.hydration, day: today(), drankOz: 0 };
      }
      p.seedComments ??= {};
      return p;
    }
  } catch {
    // corrupted state — start fresh
  }
  return {
    profile: defaultProfile,
    userPosts: [],
    liked: [],
    follows: ["p1", "p2"],
    progress: {},
    hydration: defaultHydration,
    positionResult: null,
    seedComments: {},
  };
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [persisted, setPersisted] = useState<Persisted>(loadPersisted);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  }, [persisted]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 5000);
  }, []);

  // hydration reminder loop
  const { remindersOn, remindEveryMin } = persisted.hydration;
  useEffect(() => {
    if (!remindersOn || !persisted.profile.onboarded) return;
    const id = window.setInterval(() => {
      showToast("💧 Hydration check! Take a few sips — your vertical will thank you.");
    }, remindEveryMin * 60 * 1000);
    return () => window.clearInterval(id);
  }, [remindersOn, remindEveryMin, persisted.profile.onboarded, showToast]);

  const value = useMemo<AppState>(() => {
    const posts = [
      ...persisted.userPosts,
      ...seedPosts.map((p) => {
        const extra = persisted.seedComments[p.id];
        return extra ? { ...p, comments: [...p.comments, ...extra] } : p;
      }),
    ];

    return {
      profile: persisted.profile,
      posts,
      liked: persisted.liked,
      follows: persisted.follows,
      progress: persisted.progress,
      hydration: persisted.hydration,
      positionResult: persisted.positionResult,
      toast,
      showToast,
      updateProfile: (patch) =>
        setPersisted((s) => ({ ...s, profile: { ...s.profile, ...patch } })),
      completeOnboarding: (name, level) =>
        setPersisted((s) => ({
          ...s,
          profile: {
            ...s.profile,
            name,
            handle: `${name.toLowerCase().replace(/[^a-z0-9]+/g, ".")}.vibes`,
            level,
            onboarded: true,
          },
        })),
      resetLevel: () =>
        setPersisted((s) => ({
          ...s,
          profile: { ...s.profile, level: null, onboarded: false },
        })),
      addPost: (text, tag, emoji) =>
        setPersisted((s) => ({
          ...s,
          userPosts: [
            {
              id: `user-${Date.now()}`,
              authorId: "me",
              text,
              emoji,
              gradient: "linear-gradient(135deg, #ff6b4a 0%, #c084fc 100%)",
              tag,
              likes: 0,
              timestamp: "now",
              comments: [],
            },
            ...s.userPosts,
          ],
        })),
      toggleLike: (postId) =>
        setPersisted((s) => ({
          ...s,
          liked: s.liked.includes(postId)
            ? s.liked.filter((id) => id !== postId)
            : [...s.liked, postId],
        })),
      addComment: (postId, text) =>
        setPersisted((s) => {
          const comment: Comment = {
            id: `uc-${Date.now()}`,
            authorId: "me",
            text,
          };
          if (s.userPosts.some((p) => p.id === postId)) {
            return {
              ...s,
              userPosts: s.userPosts.map((p) =>
                p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
              ),
            };
          }
          return {
            ...s,
            seedComments: {
              ...s.seedComments,
              [postId]: [...(s.seedComments[postId] ?? []), comment],
            },
          };
        }),
      toggleFollow: (playerId) =>
        setPersisted((s) => ({
          ...s,
          follows: s.follows.includes(playerId)
            ? s.follows.filter((id) => id !== playerId)
            : [...s.follows, playerId],
        })),
      markLesson: (courseId, lessonId) =>
        setPersisted((s) => {
          const cur = s.progress[courseId] ?? { lessonsDone: [], checkpointPassed: false };
          if (cur.lessonsDone.includes(lessonId)) return s;
          return {
            ...s,
            progress: {
              ...s.progress,
              [courseId]: { ...cur, lessonsDone: [...cur.lessonsDone, lessonId] },
            },
          };
        }),
      passCheckpoint: (courseId) =>
        setPersisted((s) => {
          const cur = s.progress[courseId] ?? { lessonsDone: [], checkpointPassed: false };
          return {
            ...s,
            progress: { ...s.progress, [courseId]: { ...cur, checkpointPassed: true } },
          };
        }),
      logWater: (oz) =>
        setPersisted((s) => ({
          ...s,
          hydration: {
            ...s.hydration,
            day: today(),
            drankOz: Math.max(0, s.hydration.drankOz + oz),
          },
        })),
      setHydration: (patch) =>
        setPersisted((s) => ({ ...s, hydration: { ...s.hydration, ...patch } })),
      setPositionResult: (p) =>
        setPersisted((s) => ({
          ...s,
          positionResult: p,
          profile: { ...s.profile, position: p },
        })),
    };
  }, [persisted, toast, showToast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppStateProvider");
  return ctx;
}
