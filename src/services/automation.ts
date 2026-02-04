// Automation Service for Lead Assignment and Workflow Triggers
import { Lead, SalesExecutive, WorkflowTrigger, Task } from '@/types';

export class AutomationService {
    // Auto-assign lead based on workload, priority, location, and expertise
    static assignLead(lead: Lead, executives: SalesExecutive[]): string {
        // Filter executives by location and expertise match
        let candidates = executives.filter(exec => {
            const locationMatch = !lead.location || exec.location.includes(lead.location);
            const expertiseMatch = !lead.expertise || exec.expertise.includes(lead.expertise);
            return locationMatch && expertiseMatch;
        });

        // If no match, use all executives
        if (candidates.length === 0) {
            candidates = executives;
        }

        // Sort by workload (ascending) and conversion rate (descending)
        candidates.sort((a, b) => {
            // Priority: lower workload first
            if (a.workload !== b.workload) {
                return a.workload - b.workload;
            }
            // Secondary: higher conversion rate
            return b.conversionRate - a.conversionRate;
        });

        // For high priority leads, prefer executives with better conversion rates
        if (lead.priority === 'hot' || lead.priority === 'high') {
            candidates.sort((a, b) => b.conversionRate - a.conversionRate);
        }

        return candidates[0]?.id || executives[0]?.id || '';
    }

    // Check workflow triggers and execute actions
    static checkWorkflowTriggers(lead: Lead, triggers: WorkflowTrigger[]): Task[] {
        const tasksToCreate: Task[] = [];

        triggers.forEach(trigger => {
            if (!trigger.active) return;

            const shouldTrigger = this.evaluateTriggerCondition(lead, trigger.condition);

            if (shouldTrigger) {
                // Execute trigger action
                switch (trigger.action.type) {
                    case 'create_task':
                        tasksToCreate.push(this.createTaskFromTrigger(lead, trigger));
                        break;
                    case 'notify':
                        this.sendNotification(lead, trigger);
                        break;
                    case 'escalate':
                        this.escalateLead(lead, trigger);
                        break;
                }
            }
        });

        return tasksToCreate;
    }

    private static evaluateTriggerCondition(lead: Lead, condition: WorkflowTrigger['condition']): boolean {
        const fieldValue = (lead as any)[condition.field];

        switch (condition.operator) {
            case 'equals':
                return fieldValue === condition.value;
            case 'greater_than':
                return fieldValue > condition.value;
            case 'less_than':
                return fieldValue < condition.value;
            case 'contains':
                return String(fieldValue).includes(condition.value);
            default:
                return false;
        }
    }

    private static createTaskFromTrigger(lead: Lead, trigger: WorkflowTrigger): Task {
        return {
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: trigger.action.message || `Follow up on ${lead.name}`,
            description: `Automated task created by workflow: ${trigger.name}`,
            type: 'follow-up',
            leadId: lead.id,
            assignedTo: lead.assignedTo || '',
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
            status: 'pending',
            priority: lead.priority === 'hot' ? 'high' : 'medium',
            createdAt: new Date(),
        };
    }

    private static sendNotification(lead: Lead, trigger: WorkflowTrigger) {
        // This would integrate with the notification system
        console.log(`Notification: ${trigger.action.message} for lead ${lead.name}`);
    }

    private static escalateLead(lead: Lead, trigger: WorkflowTrigger) {
        // This would escalate to manager
        console.log(`Escalating lead ${lead.name} to ${trigger.action.target}`);
    }

    // Generate smart follow-up reminders
    static generateFollowUpReminders(leads: Lead[], tasks: Task[]): Task[] {
        const newTasks: Task[] = [];
        const now = new Date();

        leads.forEach(lead => {
            const lastContactDate = new Date(lead.lastContact);
            const daysSinceContact = Math.floor((now.getTime() - lastContactDate.getTime()) / (1000 * 60 * 60 * 24));

            // Check if there's already a pending task for this lead
            const hasPendingTask = tasks.some(
                task => task.leadId === lead.id && task.status === 'pending'
            );

            if (hasPendingTask) return;

            // Create follow-up based on status and time
            let shouldCreateTask = false;
            let taskType: Task['type'] = 'follow-up';
            let priority: Task['priority'] = 'medium';

            switch (lead.status) {
                case 'new':
                    if (daysSinceContact >= 1) {
                        shouldCreateTask = true;
                        taskType = 'call';
                        priority = 'high';
                    }
                    break;
                case 'contacted':
                    if (daysSinceContact >= 3) {
                        shouldCreateTask = true;
                        taskType = 'email';
                        priority = 'high';
                    }
                    break;
                case 'qualified':
                    if (daysSinceContact >= 2) {
                        shouldCreateTask = true;
                        taskType = 'meeting';
                        priority = 'high';
                    }
                    break;
                case 'proposal':
                    if (daysSinceContact >= 5) {
                        shouldCreateTask = true;
                        taskType = 'call';
                        priority = 'high';
                    }
                    break;
            }

            if (shouldCreateTask) {
                newTasks.push({
                    id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    title: `Follow up with ${lead.name}`,
                    description: `No contact for ${daysSinceContact} days. Current status: ${lead.status}`,
                    type: taskType,
                    leadId: lead.id,
                    assignedTo: lead.assignedTo || '',
                    dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
                    status: 'pending',
                    priority: lead.priority === 'hot' ? 'high' : priority,
                    createdAt: now,
                });
            }
        });

        return newTasks;
    }
}
