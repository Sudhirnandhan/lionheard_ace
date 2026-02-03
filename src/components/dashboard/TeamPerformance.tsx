import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Line, ComposedChart, Area } from "recharts";

const data = [
  { name: "Prospects", value: 85, trend: 70 },
  { name: "Qualified", value: 65, trend: 55 },
  { name: "Closed", value: 45, trend: 40 },
];

const colors = {
  prospects: "#22d3ee",
  qualified: "#a855f7",
  closed: "#22c55e",
};

const TeamPerformance = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Team Performance</h3>
        <div className="flex items-end gap-1">
          {[40, 60, 80, 50, 70, 90, 65].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="w-1.5 rounded-t bg-gradient-to-t from-purple-500/50 to-cyan-400"
              style={{ height: `${h * 0.3}px`, transformOrigin: "bottom" }}
            />
          ))}
        </div>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(222 47% 11% / 0.9)',
                border: '1px solid hsl(217 33% 20%)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
              labelStyle={{ color: '#e2e8f0' }}
              itemStyle={{ color: '#22d3ee' }}
            />
            <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
            <Area
              type="monotone"
              dataKey="trend"
              fill="url(#areaGradient)"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TeamPerformance;
