import { motion } from "framer-motion";
import { CheckSquare, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Tasks = () => {
    return (
        <div className="flex flex-col gap-6 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <h2 className="text-2xl font-bold font-display text-glow">Tasks & Activities</h2>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                </Button>
            </motion.div>

            <div className="glass-card rounded-xl p-6 min-h-[400px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                    <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Task board will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
