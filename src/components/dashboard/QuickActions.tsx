import { motion } from "framer-motion";
import { UserPlus, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  const actions = [
    { icon: UserPlus, label: "Add New Lead", variant: "default" as const },
    { icon: Phone, label: "Schedule Call", variant: "secondary" as const },
    { icon: Mail, label: "Send Email", variant: "secondary" as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg font-semibold text-foreground">Quick Actions</h3>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500/60" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {actions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            <Button
              variant={action.variant}
              size="sm"
              className={`w-full h-auto py-3 flex flex-col gap-1 ${action.variant === "default"
                ? "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                : "bg-background/30 hover:bg-background/50 text-foreground border border-border/50"
                }`}
            >
              <action.icon className="w-4 h-4" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
