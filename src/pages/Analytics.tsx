import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RealTimeDashboard from "@/components/dashboard/RealTimeDashboard";
import ConversionFunnelChart from "@/components/dashboard/ConversionFunnelChart";
import SalesPerformanceDashboard from "@/components/dashboard/SalesPerformanceDashboard";
import WorkflowAutomation from "@/components/dashboard/WorkflowAutomation";
import CustomReportBuilder from "@/components/dashboard/CustomReportBuilder";
import { AnalyticsService } from "@/services/analytics";
import { Lead, SalesExecutive, ConversionFunnel, SalesPerformance } from "@/types";

const Analytics = () => {
    // Mock data for demonstration
    const mockLeads: Lead[] = [
        {
            id: "1",
            name: "John Carter",
            company: "TechFlow Systems",
            email: "john.carter@techflow.com",
            phone: "+1 (555) 123-4567",
            status: "new",
            priority: "high",
            source: "Website",
            lastContact: "2 days ago",
            value: 12000,
            assignedTo: "exec1",
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-17"),
        },
        {
            id: "2",
            name: "Sarah Miller",
            company: "Innovate Corp",
            email: "s.miller@innovate.co",
            phone: "+1 (555) 987-6543",
            status: "contacted",
            priority: "medium",
            source: "LinkedIn",
            lastContact: "1 day ago",
            value: 25000,
            assignedTo: "exec2",
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-18"),
        },
        {
            id: "3",
            name: "Michael Chen",
            company: "Future Dynamics",
            email: "m.chen@futuredyn.com",
            phone: "+1 (555) 456-7890",
            status: "qualified",
            priority: "hot",
            source: "Referral",
            lastContact: "4 hours ago",
            value: 8500,
            assignedTo: "exec1",
            createdAt: new Date("2024-01-12"),
            updatedAt: new Date("2024-01-19"),
        },
        {
            id: "4",
            name: "Jessica Davis",
            company: "Alpha Solutions",
            email: "j.davis@alpha.io",
            phone: "+1 (555) 234-5678",
            status: "proposal",
            priority: "high",
            source: "Conference",
            lastContact: "1 week ago",
            value: 45000,
            assignedTo: "exec3",
            createdAt: new Date("2024-01-05"),
            updatedAt: new Date("2024-01-15"),
        },
        {
            id: "5",
            name: "David Wilson",
            company: "Omega Group",
            email: "d.wilson@omega.inc",
            phone: "+1 (555) 876-5432",
            status: "won",
            priority: "high",
            source: "Direct",
            lastContact: "2 weeks ago",
            value: 150000,
            assignedTo: "exec1",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-20"),
        },
    ];

    const mockExecutives: SalesExecutive[] = [
        {
            id: "exec1",
            name: "Alex Johnson",
            email: "alex@company.com",
            workload: 15,
            expertise: ["Enterprise", "SaaS"],
            location: ["North America", "Europe"],
            conversionRate: 42.5,
            responseTime: 2.3,
            totalDeals: 45,
            wonDeals: 19,
            lostDeals: 8,
        },
        {
            id: "exec2",
            name: "Maria Garcia",
            email: "maria@company.com",
            workload: 12,
            expertise: ["SMB", "Retail"],
            location: ["North America"],
            conversionRate: 38.2,
            responseTime: 3.1,
            totalDeals: 38,
            wonDeals: 14,
            lostDeals: 10,
        },
        {
            id: "exec3",
            name: "James Lee",
            email: "james@company.com",
            workload: 18,
            expertise: ["Enterprise", "Finance"],
            location: ["Asia Pacific"],
            conversionRate: 45.8,
            responseTime: 1.9,
            totalDeals: 52,
            wonDeals: 24,
            lostDeals: 6,
        },
    ];

    const [funnelData, setFunnelData] = useState<ConversionFunnel[]>([]);
    const [performanceData, setPerformanceData] = useState<SalesPerformance[]>([]);

    useEffect(() => {
        // Calculate analytics data
        const funnel = AnalyticsService.calculateConversionFunnel(mockLeads);
        const performance = AnalyticsService.calculateSalesPerformance(mockLeads, mockExecutives);

        setFunnelData(funnel);
        setPerformanceData(performance);
    }, []);

    return (
        <div className="flex flex-col gap-6 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h2 className="text-2xl font-bold font-display text-glow">Advanced Analytics & Automation</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Real-time insights, performance tracking, and workflow automation
                    </p>
                </div>
            </motion.div>

            <Tabs defaultValue="realtime" className="w-full">
                <TabsList className="glass-card border-white/10 mb-6">
                    <TabsTrigger value="realtime">Real-Time Dashboard</TabsTrigger>
                    <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
                    <TabsTrigger value="performance">Sales Performance</TabsTrigger>
                    <TabsTrigger value="automation">Automation</TabsTrigger>
                    <TabsTrigger value="reports">Custom Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="realtime" className="space-y-6">
                    <RealTimeDashboard />
                </TabsContent>

                <TabsContent value="funnel" className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <ConversionFunnelChart data={funnelData} />
                    </motion.div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <SalesPerformanceDashboard data={performanceData} />
                    </motion.div>
                </TabsContent>

                <TabsContent value="automation" className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <WorkflowAutomation />
                    </motion.div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <CustomReportBuilder />
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Analytics;
