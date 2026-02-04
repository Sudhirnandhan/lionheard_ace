// Analytics Service for Advanced Reporting
import { Lead, SalesExecutive, ConversionFunnel, SalesPerformance, ReportFilter } from '@/types';

export class AnalyticsService {
    // Calculate conversion funnel with drop-off analysis
    static calculateConversionFunnel(leads: Lead[]): ConversionFunnel[] {
        const stages = ['new', 'contacted', 'qualified', 'proposal', 'won'];
        const funnel: ConversionFunnel[] = [];

        stages.forEach((stage, index) => {
            const stageLeads = leads.filter(lead => {
                if (stage === 'won') {
                    return lead.status === 'won';
                }
                // Include leads at this stage or beyond
                const stageIndex = stages.indexOf(lead.status);
                return stageIndex >= index && lead.status !== 'lost';
            });

            const count = stageLeads.length;
            const value = stageLeads.reduce((sum, lead) => sum + lead.value, 0);

            const previousStageCount = index > 0 ? funnel[index - 1].count : leads.length;
            const conversionRate = previousStageCount > 0 ? (count / previousStageCount) * 100 : 0;
            const dropOffRate = 100 - conversionRate;

            funnel.push({
                stage: stage.charAt(0).toUpperCase() + stage.slice(1),
                count,
                value,
                conversionRate,
                dropOffRate,
            });
        });

        return funnel;
    }

    // Calculate sales performance by executive
    static calculateSalesPerformance(
        leads: Lead[],
        executives: SalesExecutive[]
    ): SalesPerformance[] {
        return executives.map(exec => {
            const execLeads = leads.filter(lead => lead.assignedTo === exec.id);
            const convertedLeads = execLeads.filter(lead => lead.status === 'won');
            const lostLeads = execLeads.filter(lead => lead.status === 'lost');

            const totalValue = execLeads.reduce((sum, lead) => sum + lead.value, 0);
            const wonValue = convertedLeads.reduce((sum, lead) => sum + lead.value, 0);
            const lostValue = lostLeads.reduce((sum, lead) => sum + lead.value, 0);

            return {
                executiveId: exec.id,
                executiveName: exec.name,
                totalLeads: execLeads.length,
                convertedLeads: convertedLeads.length,
                conversionRate: execLeads.length > 0
                    ? (convertedLeads.length / execLeads.length) * 100
                    : 0,
                avgResponseTime: exec.responseTime,
                totalValue,
                wonValue,
                lostValue,
            };
        });
    }

    // Filter leads based on custom criteria
    static filterLeads(leads: Lead[], filter: ReportFilter): Lead[] {
        return leads.filter(lead => {
            // Date range filter
            const leadDate = new Date(lead.createdAt);
            if (leadDate < filter.dateRange.start || leadDate > filter.dateRange.end) {
                return false;
            }

            // Source filter
            if (filter.source && filter.source.length > 0) {
                if (!filter.source.includes(lead.source)) {
                    return false;
                }
            }

            // Status filter
            if (filter.status && filter.status.length > 0) {
                if (!filter.status.includes(lead.status)) {
                    return false;
                }
            }

            // Assigned to filter
            if (filter.assignedTo && filter.assignedTo.length > 0) {
                if (!lead.assignedTo || !filter.assignedTo.includes(lead.assignedTo)) {
                    return false;
                }
            }

            // Priority filter
            if (filter.priority && filter.priority.length > 0) {
                if (!filter.priority.includes(lead.priority)) {
                    return false;
                }
            }

            return true;
        });
    }

    // Calculate bottleneck stages
    static identifyBottlenecks(funnel: ConversionFunnel[]): { stage: string; dropOff: number }[] {
        return funnel
            .map(stage => ({
                stage: stage.stage,
                dropOff: stage.dropOffRate,
            }))
            .filter(item => item.dropOff > 30) // Significant drop-off threshold
            .sort((a, b) => b.dropOff - a.dropOff);
    }

    // Calculate win/loss analysis
    static calculateWinLossAnalysis(leads: Lead[]) {
        const wonLeads = leads.filter(lead => lead.status === 'won');
        const lostLeads = leads.filter(lead => lead.status === 'lost');

        const wonBySource = this.groupByField(wonLeads, 'source');
        const lostBySource = this.groupByField(lostLeads, 'source');

        const wonValue = wonLeads.reduce((sum, lead) => sum + lead.value, 0);
        const lostValue = lostLeads.reduce((sum, lead) => sum + lead.value, 0);

        return {
            totalWon: wonLeads.length,
            totalLost: lostLeads.length,
            winRate: (wonLeads.length / (wonLeads.length + lostLeads.length)) * 100,
            wonValue,
            lostValue,
            wonBySource,
            lostBySource,
        };
    }

    // Group leads by a specific field
    private static groupByField(leads: Lead[], field: keyof Lead): Record<string, number> {
        return leads.reduce((acc, lead) => {
            const key = String(lead[field]);
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }

    // Calculate response time metrics
    static calculateResponseTimeMetrics(leads: Lead[], executives: SalesExecutive[]) {
        const metrics = executives.map(exec => {
            const execLeads = leads.filter(lead => lead.assignedTo === exec.id);

            return {
                executiveId: exec.id,
                executiveName: exec.name,
                avgResponseTime: exec.responseTime,
                totalLeads: execLeads.length,
            };
        });

        return metrics.sort((a, b) => a.avgResponseTime - b.avgResponseTime);
    }

    // Export data to CSV format
    static exportToCSV(leads: Lead[]): string {
        const headers = ['ID', 'Name', 'Company', 'Email', 'Phone', 'Status', 'Priority', 'Source', 'Value', 'Assigned To', 'Created At'];
        const rows = leads.map(lead => [
            lead.id,
            lead.name,
            lead.company,
            lead.email,
            lead.phone,
            lead.status,
            lead.priority,
            lead.source,
            lead.value.toString(),
            lead.assignedTo || '',
            lead.createdAt.toISOString(),
        ]);

        const csv = [headers, ...rows]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');

        return csv;
    }

    // Generate PDF report data
    static generateReportData(leads: Lead[], executives: SalesExecutive[], filter: ReportFilter) {
        const filteredLeads = this.filterLeads(leads, filter);
        const funnel = this.calculateConversionFunnel(filteredLeads);
        const performance = this.calculateSalesPerformance(filteredLeads, executives);
        const winLoss = this.calculateWinLossAnalysis(filteredLeads);
        const bottlenecks = this.identifyBottlenecks(funnel);

        return {
            summary: {
                totalLeads: filteredLeads.length,
                totalValue: filteredLeads.reduce((sum, lead) => sum + lead.value, 0),
                conversionRate: funnel[funnel.length - 1]?.conversionRate || 0,
                dateRange: filter.dateRange,
            },
            funnel,
            performance,
            winLoss,
            bottlenecks,
        };
    }
}
