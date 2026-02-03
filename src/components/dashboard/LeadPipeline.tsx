import { motion } from "framer-motion";
import { User, MoreVertical } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  status: "follow-up" | "meeting-set" | "pending";
  avatar?: string;
}

interface PipelineStage {
  name: string;
  count: number;
  color: string;
  leads: Lead[];
}

const stages: PipelineStage[] = [
  {
    name: "New",
    count: 42,
    color: "from-cyan-500 to-cyan-600",
    leads: [
      { id: "1", name: "John Carter", company: "TechFlow", status: "follow-up" },
    ],
  },
  {
    name: "Contacted",
    count: 28,
    color: "from-blue-500 to-blue-600",
    leads: [
      { id: "4", name: "Global Solutions", company: "Global", status: "follow-up" },
    ],
  },
  {
    name: "Qualified",
    count: 18,
    color: "from-purple-500 to-purple-600",
    leads: [
      { id: "5", name: "Global Solutions", company: "Global Solutions", status: "meeting-set" },
    ],
  },
  {
    name: "Won",
    count: 12,
    color: "from-green-500 to-green-600",
    leads: [],
  },
  {
    name: "Lost",
    count: 5,
    color: "from-red-500/70 to-red-600/70",
    leads: [],
  },
];

const StatusBadge = ({ status }: { status: Lead["status"] }) => {
  const styles = {
    "follow-up": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "meeting-set": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    pending: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const labels = {
    "follow-up": "Follow Up",
    "meeting-set": "Meeting Set",
    pending: "Pending",
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const LeadCard = ({ lead, index }: { lead: Lead; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 + index * 0.1 }}
    className="bg-background/40 backdrop-blur-sm rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-all group cursor-pointer"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-foreground">{lead.name}</span>
      </div>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
    <div className="flex items-center gap-2">
      <StatusBadge status={lead.status} />
    </div>
  </motion.div>
);

const LeadPipeline = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-5"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-primary pulse-live" />
        <h3 className="font-display text-lg font-semibold text-foreground">Lead Pipeline</h3>
      </div>

      {/* Columns Container */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="grid grid-cols-5 gap-2 min-w-[600px]">
          {stages.map((stage, i) => (
            <div key={stage.name} className="flex flex-col gap-3 min-w-0">
              {/* Stage Header */}
              <div
                className={`relative bg-gradient-to-r ${stage.color} py-2 px-1 text-center text-sm font-medium text-white rounded-md shadow-lg`}
              >
                <span className="relative z-10 truncate block px-1">{stage.name}</span>
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {stage.count}
                </span>
              </div>

              {/* Leads List */}
              <div className="space-y-3">
                {stage.leads.map((lead, leadIndex) => (
                  <LeadCard key={lead.id} lead={lead} index={i + leadIndex} />
                ))}
                {stage.leads.length === 0 && (
                  <div className="h-24 rounded-lg border border-dashed border-border/30 flex items-center justify-center bg-background/20">
                    <span className="text-xs text-muted-foreground">No leads</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LeadPipeline;
