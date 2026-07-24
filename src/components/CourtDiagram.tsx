import type { CourtVariant } from "../data/types";

/*
 * Half-court diagram, viewed from above. Net at top, end line at bottom.
 * Court box: x 20..340, y 30..350 (square = 9m x 9m). Attack line at y ≈ 137.
 */

const L = 20;
const R = 340;
const TOP = 30;
const BOT = 350;
const ATTACK = TOP + ((BOT - TOP) * 3) / 9;

const COLORS: Record<string, string> = {
  S: "#ff6b4a",
  OH: "#38bdf8",
  MB: "#a78bfa",
  OPP: "#fbbf24",
  L: "#2dd4bf",
  DS: "#f472b6",
  P: "#38bdf8",
  B: "#a78bfa",
  D: "#2dd4bf",
};

interface Dot {
  x: number;
  y: number;
  label: string;
  color?: string;
}

const colX = [73, 180, 287]; // left, mid, right columns
const frontY = (TOP + ATTACK) / 2 + 8;
const backY = (ATTACK + BOT) / 2 + 10;

// zone number -> center coords (receiving team POV, net at top)
const zoneCenters: Record<number, [number, number]> = {
  4: [colX[0], frontY],
  3: [colX[1], frontY],
  2: [colX[2], frontY],
  5: [colX[0], backY],
  6: [colX[1], backY],
  1: [colX[2], backY],
};

// 5-1 lineup at rotation 1, by zone
const baseLineup: Record<number, string> = {
  1: "S",
  2: "OH",
  3: "MB",
  4: "OPP",
  5: "OH",
  6: "MB",
};

function rotationDots(rotation: number): Dot[] {
  return [1, 2, 3, 4, 5, 6].map((zone) => {
    const sourceZone = ((zone + rotation - 2) % 6) + 1;
    const label = baseLineup[sourceZone];
    return {
      x: zoneCenters[zone][0],
      y: zoneCenters[zone][1],
      label,
      color: COLORS[label],
    };
  });
}

function PlayerDot({ x, y, label, color = "#38bdf8" }: Dot) {
  return (
    <g>
      <circle cx={x} cy={y} r={17} fill={color} opacity={0.92} />
      <circle cx={x} cy={y} r={17} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5} />
      <text
        x={x}
        y={y + 4.5}
        textAnchor="middle"
        fontSize={label.length > 2 ? 10 : 12}
        fontWeight={800}
        fill="#0a0e23"
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = "#ff6b4a",
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const a1 = angle + Math.PI * 0.85;
  const a2 = angle - Math.PI * 0.85;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={3}
        strokeDasharray={dashed ? "7 5" : undefined}
        strokeLinecap="round"
      />
      <line x1={x2} y1={y2} x2={x2 + 11 * Math.cos(a1)} y2={y2 + 11 * Math.sin(a1)} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <line x1={x2} y1={y2} x2={x2 + 11 * Math.cos(a2)} y2={y2 + 11 * Math.sin(a2)} stroke={color} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

function CourtBase({ children }: { children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 360 380" role="img">
      {/* floor */}
      <rect x={L} y={TOP} width={R - L} height={BOT - TOP} rx={6} fill="rgba(255,158,88,0.09)" />
      <rect x={L} y={TOP} width={R - L} height={ATTACK - TOP} fill="rgba(56,189,248,0.07)" />
      {/* lines */}
      <rect x={L} y={TOP} width={R - L} height={BOT - TOP} rx={6} fill="none" stroke="#9aa3c7" strokeWidth={2} />
      <line x1={L} y1={ATTACK} x2={R} y2={ATTACK} stroke="#9aa3c7" strokeWidth={2} strokeDasharray="1 0" />
      {/* net */}
      <line x1={L - 8} y1={TOP} x2={R + 8} y2={TOP} stroke="#eef1ff" strokeWidth={5} strokeLinecap="round" />
      <text x={L} y={TOP - 10} fontSize={11} fontWeight={800} fill="#eef1ff" letterSpacing={2}>
        NET
      </text>
      <text x={R - 78} y={ATTACK - 7} fontSize={10} fill="#9aa3c7" fontWeight={600}>
        attack line (3m)
      </text>
      <text x={L} y={BOT + 18} fontSize={10} fill="#9aa3c7" fontWeight={600}>
        end line
      </text>
      {children}
    </svg>
  );
}

export function CourtDiagram({ variant }: { variant: CourtVariant }) {
  if (variant.startsWith("rotation-")) {
    const rot = Number(variant.split("-")[1]);
    return (
      <CourtBase>
        {rotationDots(rot).map((d, i) => (
          <PlayerDot key={i} {...d} />
        ))}
        <text x={R - 4} y={BOT + 18} fontSize={10} fill="#9aa3c7" fontWeight={700} textAnchor="end">
          Rotation {rot} · 5-1 system
        </text>
      </CourtBase>
    );
  }

  switch (variant) {
    case "zones":
      return (
        <CourtBase>
          {/* column separators */}
          <line x1={L + (R - L) / 3} y1={TOP} x2={L + (R - L) / 3} y2={BOT} stroke="#9aa3c7" strokeWidth={1} strokeDasharray="5 6" opacity={0.5} />
          <line x1={L + (2 * (R - L)) / 3} y1={TOP} x2={L + (2 * (R - L)) / 3} y2={BOT} stroke="#9aa3c7" strokeWidth={1} strokeDasharray="5 6" opacity={0.5} />
          {Object.entries(zoneCenters).map(([zone, [x, y]]) => (
            <g key={zone}>
              <circle cx={x} cy={y - 4} r={22} fill="rgba(255,255,255,0.07)" />
              <text x={x} y={y + 4} textAnchor="middle" fontSize={22} fontWeight={800} fill="#eef1ff">
                {zone}
              </text>
            </g>
          ))}
          <text x={colX[2]} y={frontY - 40} textAnchor="middle" fontSize={10} fill="#38bdf8" fontWeight={700}>
            FRONT ROW
          </text>
          <text x={colX[2]} y={backY + 46} textAnchor="middle" fontSize={10} fill="#ff9e58" fontWeight={700}>
            BACK ROW
          </text>
        </CourtBase>
      );

    case "positions":
      return (
        <CourtBase>
          <PlayerDot x={colX[0]} y={frontY} label="OPP" color={COLORS.OPP} />
          <PlayerDot x={colX[1]} y={frontY} label="MB" color={COLORS.MB} />
          <PlayerDot x={colX[2]} y={frontY} label="OH" color={COLORS.OH} />
          <PlayerDot x={colX[0]} y={backY} label="OH" color={COLORS.OH} />
          <PlayerDot x={colX[1]} y={backY} label="L" color={COLORS.L} />
          <PlayerDot x={colX[2]} y={backY} label="S" color={COLORS.S} />
          <text x={colX[2] + 30} y={backY + 30} fontSize={10} fill="#ff6b4a" fontWeight={700} textAnchor="end">
            setter in zone 1
          </text>
        </CourtBase>
      );

    case "seams": {
      const passers: Dot[] = [
        { x: 92, y: 255, label: "P", color: COLORS.P },
        { x: 180, y: 278, label: "L", color: COLORS.L },
        { x: 268, y: 255, label: "P", color: COLORS.P },
      ];
      return (
        <CourtBase>
          {/* seam bands */}
          <rect x={118} y={ATTACK + 8} width={40} height={BOT - ATTACK - 20} rx={8} fill="rgba(255,107,74,0.16)" stroke="rgba(255,107,74,0.6)" strokeDasharray="5 4" />
          <rect x={202} y={ATTACK + 8} width={40} height={BOT - ATTACK - 20} rx={8} fill="rgba(255,107,74,0.16)" stroke="rgba(255,107,74,0.6)" strokeDasharray="5 4" />
          <text x={138} y={ATTACK + 28} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#ffb39f">
            LEFT
          </text>
          <text x={138} y={ATTACK + 40} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#ffb39f">
            SEAM
          </text>
          <text x={222} y={ATTACK + 28} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#ffb39f">
            RIGHT
          </text>
          <text x={222} y={ATTACK + 40} textAnchor="middle" fontSize={9.5} fontWeight={800} fill="#ffb39f">
            SEAM
          </text>
          <Arrow x1={138} y1={TOP - 16} x2={138} y2={ATTACK + 60} color="#fbbf24" dashed />
          <text x={148} y={90} fontSize={10} fill="#fbbf24" fontWeight={700}>
            seam serve
          </text>
          {passers.map((d, i) => (
            <PlayerDot key={i} {...d} />
          ))}
        </CourtBase>
      );
    }

    case "serve-receive":
      return (
        <CourtBase>
          <PlayerDot x={92} y={250} label="OH" color={COLORS.OH} />
          <PlayerDot x={180} y={272} label="L" color={COLORS.L} />
          <PlayerDot x={268} y={250} label="OH" color={COLORS.OH} />
          <PlayerDot x={235} y={TOP + 26} label="S" color={COLORS.S} />
          <PlayerDot x={120} y={TOP + 26} label="MB" color={COLORS.MB} />
          <PlayerDot x={305} y={TOP + 60} label="OPP" color={COLORS.OPP} />
          <Arrow x1={180} y1={252} x2={228} y2={TOP + 48} color="#2dd4bf" />
          <text x={214} y={165} fontSize={10} fill="#2dd4bf" fontWeight={700}>
            pass target
          </text>
        </CourtBase>
      );

    case "base-defense":
      return (
        <CourtBase>
          {/* double block on the left (defending opponent's right-side attack) */}
          <PlayerDot x={70} y={TOP + 24} label="B" color={COLORS.B} />
          <PlayerDot x={108} y={TOP + 24} label="B" color={COLORS.B} />
          {/* off blocker pulled off net */}
          <PlayerDot x={280} y={ATTACK + 14} label="B" color={COLORS.B} />
          {/* wing diggers + libero */}
          <PlayerDot x={62} y={backY + 22} label="D" color={COLORS.D} />
          <PlayerDot x={180} y={backY + 48} label="L" color={COLORS.L} />
          <PlayerDot x={298} y={backY + 12} label="D" color={COLORS.D} />
          <text x={89} y={TOP + 58} textAnchor="middle" fontSize={10} fill="#a78bfa" fontWeight={700}>
            double block
          </text>
          <text x={280} y={ATTACK + 44} textAnchor="middle" fontSize={10} fill="#a78bfa" fontWeight={700}>
            off-blocker (tips)
          </text>
          <text x={180} y={backY + 78} textAnchor="middle" fontSize={10} fill="#2dd4bf" fontWeight={700}>
            libero deep middle
          </text>
        </CourtBase>
      );

    case "attack-lines": {
      const hx = 60;
      const hy = TOP + 14;
      return (
        <CourtBase>
          <PlayerDot x={hx} y={hy} label="OH" color={COLORS.OH} />
          <Arrow x1={hx} y1={hy + 20} x2={44} y2={BOT - 24} color="#ff6b4a" />
          <Arrow x1={hx + 14} y1={hy + 16} x2={300} y2={BOT - 40} color="#2dd4bf" />
          <Arrow x1={hx + 16} y1={hy + 8} x2={230} y2={ATTACK - 20} color="#fbbf24" />
          <text x={40} y={BOT - 4} fontSize={10.5} fill="#ff6b4a" fontWeight={800}>
            LINE
          </text>
          <text x={262} y={BOT - 22} fontSize={10.5} fill="#2dd4bf" fontWeight={800}>
            CROSS
          </text>
          <text x={238} y={ATTACK - 28} fontSize={10.5} fill="#fbbf24" fontWeight={800}>
            CUT
          </text>
          <text x={hx} y={hy - 24} textAnchor="middle" fontSize={10} fill="#38bdf8" fontWeight={700}>
            attacker (zone 4)
          </text>
        </CourtBase>
      );
    }
  }
}
