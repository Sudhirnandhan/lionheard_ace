import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  chartData?: number[];
  glowColor?: "cyan" | "purple" | "orange" | "green";
  delay?: number;
}

const KPICard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  chartData = [40, 60, 45, 80, 65, 90, 75],
  glowColor = "cyan",
  delay = 0,
}: KPICardProps) => {
  const glowClasses = {
    cyan: "from-cyan-500/20 to-cyan-500/5 shadow-cyan-500/20",
    purple: "from-purple-500/20 to-purple-500/5 shadow-purple-500/20",
    orange: "from-orange-500/20 to-orange-500/5 shadow-orange-500/20",
    green: "from-green-500/20 to-green-500/5 shadow-green-500/20",
  };

  const barColors = {
    cyan: "from-cyan-500/50 to-cyan-400",
    purple: "from-purple-500/50 to-purple-400",
    orange: "from-orange-500/50 to-orange-400",
    green: "from-green-500/50 to-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card p-5 glow-border bg-gradient-to-br ${glowClasses[glowColor]} shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-muted-foreground text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        {/* Mini bar chart */}
        <div className="flex items-end gap-1 h-8">
          {chartData.map((height, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: delay + i * 0.05 }}
              className={`w-2 rounded-t bg-gradient-to-t ${barColors[glowColor]}`}
              style={{ height: `${height}%`, transformOrigin: "bottom" }}
            />
          ))}
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center gap-1 text-sm ${
            trend === "up" ? "text-green-400" : "text-red-400"
          }`}>
            <span>{trend === "up" ? "↑" : "↓"}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default KPICard;
