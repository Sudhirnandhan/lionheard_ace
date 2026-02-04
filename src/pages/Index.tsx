import { motion } from "framer-motion";
import { Users, UserPlus, Flame, TrendingUp, FileText } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import LeadPipeline from "@/components/dashboard/LeadPipeline";
import UpcomingTasks from "@/components/dashboard/UpcomingTasks";
import TeamPerformance from "@/components/dashboard/TeamPerformance";
import AILeadScoring from "@/components/dashboard/AILeadScoring";
import RecentActivities from "@/components/dashboard/RecentActivities";
import QuickActions from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* KPI Cards Row - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KPICard
          title="Total Leads"
          value="1,250"
          icon={Users}
          trend="up"
          trendValue="12%"
          chartData={[40, 70, 55, 80]}
          glowColor="cyan"
          delay={0}
        />
        <KPICard
          title="New Leads"
          value="320"
          icon={UserPlus}
          trend="up"
          trendValue="8%"
          chartData={[50, 45, 70, 65]}
          glowColor="purple"
          delay={0.1}
        />
        <KPICard
          title="Hot Leads"
          value="85"
          icon={Flame}
          trend="up"
          trendValue="15%"
          chartData={[50, 90, 70, 85]}
          glowColor="orange"
          delay={0.2}
        />
        <KPICard
          title="Conversion Rate"
          value="45%"
          icon={TrendingUp}
          trend="up"
          trendValue="5%"
          chartData={[65, 55, 70, 60]}
          glowColor="green"
          delay={0.3}
        />
      </motion.div>

      {/* Main Dashboard Grid - Optimized Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section - Takes 8 columns on large screens */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Lead Pipeline - Full Width */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <LeadPipeline />
          </motion.div>

          {/* Bottom Row - Team Performance & AI Scoring Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TeamPerformance />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AILeadScoring />
            </motion.div>
          </div>
        </div>

        {/* Right Sidebar - Takes 4 columns on large screens */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <UpcomingTasks />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuickActions />
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <RecentActivities />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-between py-4 px-6 glass-card rounded-xl border border-white/10"
      >
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-400 transition-colors group">
          <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Export Report</span>
        </button>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">© 2026 Lead Management ACE • Powered by AI</span>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
