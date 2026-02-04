// Core Types for CRM System

export interface Lead {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
    priority: "low" | "medium" | "high" | "hot";
    source: string;
    lastContact: string;
    value: number;
    assignedTo?: string;
    location?: string;
    expertise?: string;
    createdAt: Date;
    updatedAt: Date;
    stageEnteredAt?: Date;
}

export interface SalesExecutive {
    id: string;
    name: string;
    email: string;
    workload: number; // Number of active leads
    expertise: string[];
    location: string[];
    conversionRate: number;
    responseTime: number; // in hours
    totalDeals: number;
    wonDeals: number;
    lostDeals: number;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    type: "call" | "email" | "meeting" | "follow-up";
    leadId: string;
    assignedTo: string;
    dueDate: Date;
    status: "pending" | "completed" | "overdue";
    priority: "low" | "medium" | "high";
    createdAt: Date;
}

export interface WorkflowTrigger {
    id: string;
    name: string;
    condition: {
        field: string;
        operator: "equals" | "greater_than" | "less_than" | "contains";
        value: any;
        duration?: number; // in days
    };
    action: {
        type: "notify" | "assign" | "create_task" | "escalate";
        target: string;
        message?: string;
    };
    active: boolean;
}

export interface Notification {
    id: string;
    type: "new_lead" | "status_change" | "task_reminder" | "escalation";
    title: string;
    message: string;
    leadId?: string;
    taskId?: string;
    priority: "low" | "medium" | "high";
    read: boolean;
    createdAt: Date;
}

export interface ConversionFunnel {
    stage: string;
    count: number;
    value: number;
    conversionRate: number;
    dropOffRate: number;
}

export interface SalesPerformance {
    executiveId: string;
    executiveName: string;
    totalLeads: number;
    convertedLeads: number;
    conversionRate: number;
    avgResponseTime: number;
    totalValue: number;
    wonValue: number;
    lostValue: number;
}

export interface ReportFilter {
    dateRange: {
        start: Date;
        end: Date;
    };
    source?: string[];
    status?: string[];
    assignedTo?: string[];
    priority?: string[];
}
