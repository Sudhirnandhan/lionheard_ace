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
    <div className="flex flex-col gap-4">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-4 gap-4">
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
      </div>

      {/* Main Content Grid */}
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-6">
        {/* Left Column - Main Operational Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Lead Pipeline */}
          <LeadPipeline />

          {/* Recent Activities */}
          <RecentActivities />
        </div>

        {/* Right Column - Support & Metrics */}
        <div className="flex flex-col gap-6">
          {/* Upcoming Tasks */}
          <UpcomingTasks />

          {/* Team Performance */}
          <TeamPerformance />

          {/* AI Lead Scoring */}
          <AILeadScoring />

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-between py-3 px-4 glass-card rounded-xl"
      >
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <FileText className="w-4 h-4" />
          <span>Export Report</span>
        </button>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">© 2026 Lead Management ACE</span>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
