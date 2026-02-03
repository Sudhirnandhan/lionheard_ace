import { motion } from "framer-motion";
import { Phone, Calendar, MessageSquare, MoreHorizontal } from "lucide-react";

interface Task {
  id: string;
  type: "call" | "meeting" | "follow-up";
  title: string;
  time: string;
  priority?: number;
}

const tasks: Task[] = [
  { id: "1", type: "call", title: "Call with Mike Spencer", time: "2:00 PM", priority: 93 },
  { id: "2", type: "meeting", title: "Demo with VisionTech", time: "4:00 PM", priority: 12 },
];

const TaskIcon = ({ type }: { type: Task["type"] }) => {
  const icons = {
    call: Phone,
    meeting: Calendar,
    "follow-up": MessageSquare,
  };

  const colors = {
    call: "bg-cyan-500/20 text-cyan-400",
    meeting: "bg-purple-500/20 text-purple-400",
    "follow-up": "bg-orange-500/20 text-orange-400",
  };

  const Icon = icons[type];

  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors[type]}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
};

const UpcomingTasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-5 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Upcoming Tasks</h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-all cursor-pointer group"
          >
            <TaskIcon type={task.type} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
              <p className="text-xs text-muted-foreground">{task.time}</p>
            </div>
            {task.priority && (
              <div className={`text-xs font-bold px-2 py-1 rounded ${task.priority > 80
                  ? "bg-green-500/20 text-green-400"
                  : "bg-orange-500/20 text-orange-400"
                }`}>
                {task.priority}%
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UpcomingTasks;
