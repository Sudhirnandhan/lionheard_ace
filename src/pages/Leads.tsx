import { motion } from "framer-motion";
import { Users, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Leads = () => {
    return (
        <div className="flex flex-col gap-6 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <h2 className="text-2xl font-bold font-display text-glow">Leads Management</h2>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Lead
                </Button>
            </motion.div>

            <div className="flex gap-4 items-center bg-card/50 p-4 rounded-xl border border-border/50">
                <Input placeholder="Search leads..." className="max-w-xs bg-background/50" />
                <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                </Button>
            </div>

            <div className="glass-card rounded-xl p-6 min-h-[400px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Lead list will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default Leads;
