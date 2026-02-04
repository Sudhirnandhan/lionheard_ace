import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Filter, Plus, Search, MoreHorizontal, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Lead {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
    source: string;
    lastContact: string;
    value: string;
}

const mockLeads: Lead[] = [
    {
        id: "1",
        name: "John Carter",
        company: "TechFlow Systems",
        email: "john.carter@techflow.com",
        phone: "+1 (555) 123-4567",
        status: "new",
        source: "Website",
        lastContact: "2 days ago",
        value: "$12,000",
    },
    {
        id: "2",
        name: "Sarah Miller",
        company: "Innovate Corp",
        email: "s.miller@innovate.co",
        phone: "+1 (555) 987-6543",
        status: "contacted",
        source: "LinkedIn",
        lastContact: "1 day ago",
        value: "$25,000",
    },
    {
        id: "3",
        name: "Michael Chen",
        company: "Future Dynamics",
        email: "m.chen@futuredyn.com",
        phone: "+1 (555) 456-7890",
        status: "qualified",
        source: "Referral",
        lastContact: "4 hours ago",
        value: "$8,500",
    },
    {
        id: "4",
        name: "Jessica Davis",
        company: "Alpha Solutions",
        email: "j.davis@alpha.io",
        phone: "+1 (555) 234-5678",
        status: "proposal",
        source: "Conference",
        lastContact: "1 week ago",
        value: "$45,000",
    },
    {
        id: "5",
        name: "David Wilson",
        company: "Omega Group",
        email: "d.wilson@omega.inc",
        phone: "+1 (555) 876-5432",
        status: "won",
        source: "Direct",
        lastContact: "2 weeks ago",
        value: "$150,000",
    },
];

const StatusBadge = ({ status }: { status: Lead["status"] }) => {
    const styles = {
        new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        contacted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
        qualified: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        proposal: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        won: "bg-green-500/20 text-green-400 border-green-500/30",
        lost: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    return (
        <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]} capitalize`}
        >
            {status}
        </span>
    );
};

const Leads = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLeads = mockLeads.filter(
        (lead) =>
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-6 p-4 h-full">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h2 className="text-2xl font-bold font-display text-glow">Leads Management</h2>
                    <p className="text-muted-foreground text-sm">
                        Track and manage your potential opportunities
                    </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Lead
                </Button>
            </motion.div>

            {/* Filters & Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-card/30 backdrop-blur-md p-4 rounded-xl border border-white/5">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search leads by name or company..."
                        className="pl-9 bg-background/50 border-white/10 focus:border-primary/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-white/10 hover:bg-white/5">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none border-white/10 hover:bg-white/5">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Leads Table */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card flex-1 overflow-hidden flex flex-col"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-muted-foreground font-medium uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Lead Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Value</th>
                                <th className="px-6 py-4">Contact Info</th>
                                <th className="px-6 py-4">Last Contact</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredLeads.map((lead, index) => (
                                <motion.tr
                                    key={lead.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.05 }}
                                    className="group hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                                                <Users className="w-4 h-4 text-cyan-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{lead.name}</p>
                                                <p className="text-xs text-muted-foreground">{lead.company}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={lead.status} />
                                    </td>
                                    <td className="px-6 py-4 font-mono text-cyan-400">{lead.value}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-cyan-400 transition-colors cursor-pointer">
                                                <Mail className="w-3 h-3" />
                                                {lead.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-cyan-400 transition-colors cursor-pointer">
                                                <Phone className="w-3 h-3" />
                                                {lead.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{lead.lastContact}</td>
                                    <td className="px-6 py-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-card border-white/10">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredLeads.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p>No leads found matching "{searchTerm}"</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
