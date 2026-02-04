import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckSquare,
    Plus,
    Search,
    Calendar,
    Clock,
    MoreHorizontal,
    AlertCircle,
    Filter,
    CheckCircle2,
    Circle,
    User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
    id: string;
    title: string;
    project: string;
    priority: "high" | "medium" | "low";
    dueDate: string;
    assignee: string;
    status: "pending" | "in-progress" | "completed";
}

const mockTasks: Task[] = [
    {
        id: "1",
        title: "Update landing page hero section",
        project: "Website Redesign",
        priority: "high",
        dueDate: "Today",
        assignee: "Alex M.",
        status: "in-progress",
    },
    {
        id: "2",
        title: "Prepare Q1 sales report presentation",
        project: "Internal Ops",
        priority: "high",
        dueDate: "Tomorrow",
        assignee: "Sarah K.",
        status: "pending",
    },
    {
        id: "3",
        title: "Client meeting with TechFlow",
        project: "Sales",
        priority: "medium",
        dueDate: "Feb 12",
        assignee: "John D.",
        status: "pending",
    },
    {
        id: "4",
        title: "Fix navigation bug on mobile",
        project: "App Dev",
        priority: "low",
        dueDate: "Feb 15",
        assignee: "Mike R.",
        status: "completed",
    },
    {
        id: "5",
        title: "Draft proposal for Innovate Corp",
        project: "Sales",
        priority: "medium",
        dueDate: "Feb 10",
        assignee: "Jessica T.",
        status: "in-progress",
    },
];

const PriorityBadge = ({ priority }: { priority: Task["priority"] }) => {
    const styles = {
        high: "text-red-400 bg-red-500/10 border-red-500/20",
        medium: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        low: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    };

    return (
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${styles[priority]}`}>
            {priority}
        </span>
    );
};

const TaskCard = ({ task }: { task: Task }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="group relative glass-card p-4 hover:bg-white/5 transition-all border border-white/5 hover:border-primary/20"
    >
        <div className="flex items-start gap-3">
            <button className="mt-1 text-muted-foreground hover:text-primary transition-colors">
                {task.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                    <Circle className="w-5 h-5" />
                )}
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h4 className={`font-medium text-sm truncate pr-4 ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {task.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{task.project}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-white/10">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Reassign</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center gap-3 mt-3">
                    <PriorityBadge priority={task.priority} />

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{task.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-medium border border-primary/20">
                            {task.assignee.charAt(0)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

const Tasks = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTasks = mockTasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        if (activeTab === "all") return matchesSearch;
        return matchesSearch && task.status === activeTab;
    });

    return (
        <div className="flex flex-col gap-6 p-4 h-full">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h2 className="text-2xl font-bold font-display text-glow">Tasks & Activities</h2>
                    <p className="text-muted-foreground text-sm">
                        Manage your daily priorities and team workflow
                    </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                </Button>
            </motion.div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center bg-card/30 backdrop-blur-md p-4 rounded-xl border border-white/5">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search tasks..."
                        className="pl-9 bg-background/50 border-white/10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Tabs defaultValue="all" className="w-full lg:w-auto" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4 lg:w-[400px] bg-background/50">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">Todo</TabsTrigger>
                        <TabsTrigger value="in-progress">Doing</TabsTrigger>
                        <TabsTrigger value="completed">Done</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Task Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                    {filteredTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredTasks.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground min-h-[200px]">
                    <CheckSquare className="w-12 h-12 mb-4 opacity-20" />
                    <p>No tasks found</p>
                </div>
            )}
        </div>
    );
};

export default Tasks;
