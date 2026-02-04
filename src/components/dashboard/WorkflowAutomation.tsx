// Workflow Automation Management Component
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Edit, Trash2, Power, PowerOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { WorkflowTrigger } from '@/types';

const WorkflowAutomation = () => {
    const [workflows, setWorkflows] = useState<WorkflowTrigger[]>([
        {
            id: '1',
            name: 'Stale Lead Alert',
            condition: {
                field: 'status',
                operator: 'equals',
                value: 'contacted',
                duration: 3,
            },
            action: {
                type: 'notify',
                target: 'manager',
                message: 'Lead has been in "Contacted" status for 3 days',
            },
            active: true,
        },
        {
            id: '2',
            name: 'Hot Lead Instant Alert',
            condition: {
                field: 'priority',
                operator: 'equals',
                value: 'hot',
            },
            action: {
                type: 'notify',
                target: 'sales_team',
                message: 'New hot lead requires immediate attention',
            },
            active: true,
        },
        {
            id: '3',
            name: 'Auto Follow-up Task',
            condition: {
                field: 'status',
                operator: 'equals',
                value: 'qualified',
                duration: 2,
            },
            action: {
                type: 'create_task',
                target: 'assigned_executive',
                message: 'Schedule follow-up meeting',
            },
            active: true,
        },
    ]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingWorkflow, setEditingWorkflow] = useState<WorkflowTrigger | null>(null);

    const toggleWorkflow = (id: string) => {
        setWorkflows(prev =>
            prev.map(wf =>
                wf.id === id ? { ...wf, active: !wf.active } : wf
            )
        );
    };

    const deleteWorkflow = (id: string) => {
        setWorkflows(prev => prev.filter(wf => wf.id !== id));
    };

    const getActionIcon = (type: WorkflowTrigger['action']['type']) => {
        switch (type) {
            case 'notify':
                return '🔔';
            case 'create_task':
                return '📋';
            case 'assign':
                return '👤';
            case 'escalate':
                return '⚠️';
            default:
                return '⚡';
        }
    };

    const getActionColor = (type: WorkflowTrigger['action']['type']) => {
        switch (type) {
            case 'notify':
                return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'create_task':
                return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'assign':
                return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
            case 'escalate':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <Card className="glass-card border-none">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            Workflow Automation
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Automate lead management and follow-ups
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90">
                                <Plus className="w-4 h-4 mr-2" />
                                New Workflow
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card border-white/10 max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Create Workflow Trigger</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                                <div>
                                    <Label>Workflow Name</Label>
                                    <Input
                                        placeholder="e.g., Stale Lead Alert"
                                        className="bg-background/50 border-white/10"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Condition Field</Label>
                                        <Select>
                                            <SelectTrigger className="bg-background/50 border-white/10">
                                                <SelectValue placeholder="Select field" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="status">Status</SelectItem>
                                                <SelectItem value="priority">Priority</SelectItem>
                                                <SelectItem value="value">Value</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Operator</Label>
                                        <Select>
                                            <SelectTrigger className="bg-background/50 border-white/10">
                                                <SelectValue placeholder="Select operator" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="equals">Equals</SelectItem>
                                                <SelectItem value="greater_than">Greater Than</SelectItem>
                                                <SelectItem value="less_than">Less Than</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label>Duration (days)</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g., 3"
                                        className="bg-background/50 border-white/10"
                                    />
                                </div>
                                <div>
                                    <Label>Action Type</Label>
                                    <Select>
                                        <SelectTrigger className="bg-background/50 border-white/10">
                                            <SelectValue placeholder="Select action" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="notify">Send Notification</SelectItem>
                                            <SelectItem value="create_task">Create Task</SelectItem>
                                            <SelectItem value="assign">Assign Lead</SelectItem>
                                            <SelectItem value="escalate">Escalate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Action Message</Label>
                                    <Input
                                        placeholder="Message to send or task description"
                                        className="bg-background/50 border-white/10"
                                    />
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button className="bg-primary hover:bg-primary/90">
                                        Create Workflow
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {workflows.map((workflow, index) => (
                        <motion.div
                            key={workflow.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-xl border transition-all ${workflow.active
                                    ? 'bg-white/5 border-white/10'
                                    : 'bg-white/5 border-white/5 opacity-50'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">{getActionIcon(workflow.action.type)}</span>
                                        <div>
                                            <h4 className="font-semibold">{workflow.name}</h4>
                                            <p className="text-xs text-muted-foreground">
                                                When {workflow.condition.field} {workflow.condition.operator} "{workflow.condition.value}"
                                                {workflow.condition.duration && ` for ${workflow.condition.duration} days`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Badge className={`${getActionColor(workflow.action.type)} border`}>
                                            {workflow.action.type.replace('_', ' ')}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                            → {workflow.action.target}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {workflow.action.message}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={workflow.active}
                                        onCheckedChange={() => toggleWorkflow(workflow.id)}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => deleteWorkflow(workflow.id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Total Workflows</p>
                        <p className="text-2xl font-bold text-cyan-400">{workflows.length}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Active</p>
                        <p className="text-2xl font-bold text-green-400">
                            {workflows.filter(wf => wf.active).length}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Inactive</p>
                        <p className="text-2xl font-bold text-gray-400">
                            {workflows.filter(wf => !wf.active).length}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default WorkflowAutomation;
