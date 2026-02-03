import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ScoreCard {
  label: string;
  score: number;
  type: "hot" | "warm" | "cold";
}

const scores: ScoreCard[] = [
  { label: "Hot Lead", score: 92, type: "hot" },
  { label: "Warm Lead", score: 68, type: "warm" },
];

const ScoreCircle = ({ score, type }: { score: number; type: ScoreCard["type"] }) => {
  const colors = {
    hot: { bg: "from-red-500 to-orange-500", text: "text-red-400", glow: "shadow-red-500/30" },
    warm: { bg: "from-orange-500 to-yellow-500", text: "text-orange-400", glow: "shadow-orange-500/30" },
    cold: { bg: "from-blue-500 to-cyan-500", text: "text-blue-400", glow: "shadow-blue-500/30" },
  };

  const color = colors[type];
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="hsl(217 33% 17%)"
          strokeWidth="6"
        />
        <motion.circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={type === "hot" ? "#ef4444" : type === "warm" ? "#f97316" : "#3b82f6"} />
            <stop offset="100%" stopColor={type === "hot" ? "#f97316" : type === "warm" ? "#eab308" : "#22d3ee"} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-2xl font-bold ${color.text}`}>{score}</span>
      </div>
    </div>
  );
};

const AILeadScoring = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground">AI Lead Scoring</h3>
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-around h-32">
        {scores.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <ScoreCircle score={item.score} type={item.type} />
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-xs font-medium text-foreground">Score</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AILeadScoring;
