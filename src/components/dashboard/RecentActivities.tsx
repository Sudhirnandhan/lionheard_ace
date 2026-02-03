import { motion } from "framer-motion";
import { Phone, Mail, Calendar, Check, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface Activity {
  id: string;
  type: "call" | "email" | "meeting";
  title: string;
  completed: boolean;
}

const activities: Activity[] = [
  { id: "1", type: "call", title: "Called Mark Johnson", completed: true },
  { id: "2", type: "email", title: "Email Sent to EcoDynamics", completed: true },
];

const chartData = [
  { value: 30 }, { value: 50 }, { value: 45 }, { value: 70 },
  { value: 55 }, { value: 80 }, { value: 60 }, { value: 90 },
  { value: 75 }, { value: 85 }, { value: 70 }, { value: 40 },
];

const ActivityIcon = ({ type }: { type: Activity["type"] }) => {
  const icons = { call: Phone, email: Mail, meeting: Calendar };
  const colors = {
    call: "bg-cyan-500/20 text-cyan-400",
    email: "bg-purple-500/20 text-purple-400",
    meeting: "bg-orange-500/20 text-orange-400",
  };
  const Icon = icons[type];

  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[type]}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
};

const RecentActivities = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-green-500 pulse-live" />
        <h3 className="font-display text-lg font-semibold text-foreground">Recent Activities</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Activities List */}
        <div className="flex-1 space-y-3">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-background/20 hover:bg-background/40 border border-transparent hover:border-primary/20 transition-all cursor-pointer"
            >
              <ActivityIcon type={activity.type} />
              <span className="flex-1 text-sm text-foreground font-medium">{activity.title}</span>
              {activity.completed && (
                <div className="bg-green-500/20 p-1 rounded-full">
                  <Check className="w-3 h-3 text-green-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Funnel Chart Visualization */}
        <div className="w-full md:w-48 flex justify-center items-center p-4 bg-background/20 rounded-xl border border-white/5">
          <div className="relative w-full max-w-[120px]">
            <div className="w-full h-8 bg-cyan-500/80 rounded-t-sm mb-1 shadow-lg shadow-cyan-500/20" />
            <div className="w-[85%] mx-auto h-8 bg-blue-500/80 mb-1 shadow-lg shadow-blue-500/20" />
            <div className="w-[70%] mx-auto h-8 bg-purple-500/80 mb-1 shadow-lg shadow-purple-500/20" />
            <div className="w-[55%] mx-auto h-8 bg-orange-500/80 rounded-b-sm shadow-lg shadow-orange-500/20" />

            <div className="mt-2 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Conversion</p>
              <p className="text-sm font-bold text-foreground">4.5%</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentActivities;
