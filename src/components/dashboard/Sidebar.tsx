import { motion } from "framer-motion";
import { LayoutDashboard, Users, CheckSquare, BarChart3, Settings, Layers } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/", active: true },
  { icon: Users, label: "Leads", path: "/leads", active: false },
  { icon: CheckSquare, label: "Tasks", path: "/tasks", active: false },
  { icon: BarChart3, label: "Analytics", path: "/analytics", active: false },
  { icon: Settings, label: "Settings", path: "/settings", active: false },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-56 glass-card rounded-2xl p-4 flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <span className="font-display text-lg font-bold text-foreground">ACE Portal</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item, i) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.label}
              to={item.path}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/30"
                  }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
