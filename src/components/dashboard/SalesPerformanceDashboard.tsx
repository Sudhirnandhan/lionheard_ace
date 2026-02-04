// Sales Performance Dashboard Component
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SalesPerformance } from '@/types';

interface SalesPerformanceDashboardProps {
    data: SalesPerformance[];
}

const SalesPerformanceDashboard = ({ data }: SalesPerformanceDashboardProps) => {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(value);
    };

    // Sort by conversion rate
    const sortedData = [...data].sort((a, b) => b.conversionRate - a.conversionRate);
    const topPerformer = sortedData[0];

    return (
        <Card className="glass-card border-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Sales Team Performance
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Executive-wise conversion rates and metrics
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {sortedData.map((exec, index) => {
                        const isTopPerformer = exec.executiveId === topPerformer?.executiveId;
                        const winRate = exec.totalLeads > 0
                            ? (exec.convertedLeads / exec.totalLeads) * 100
                            : 0;

                        return (
                            <motion.div
                                key={exec.executiveId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-4 rounded-xl border ${isTopPerformer
                                        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                                        : 'bg-white/5 border-white/10'
                                    }`}
                            >
                                {/* Executive Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isTopPerformer
                                                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50'
                                                : 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10'
                                            }`}>
                                            <span className="text-lg font-bold">
                                                {exec.executiveName.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold flex items-center gap-2">
                                                {exec.executiveName}
                                                {isTopPerformer && (
                                                    <Trophy className="w-4 h-4 text-yellow-400" />
                                                )}
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                {exec.totalLeads} total leads
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-lg font-bold">
                                            {winRate >= 50 ? (
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-orange-400" />
                                            )}
                                            <span className={winRate >= 50 ? 'text-green-400' : 'text-orange-400'}>
                                                {exec.conversionRate.toFixed(1)}%
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">conversion rate</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2 text-xs">
                                        <span className="text-muted-foreground">Win Rate Progress</span>
                                        <span className="text-cyan-400">
                                            {exec.convertedLeads} / {exec.totalLeads} won
                                        </span>
                                    </div>
                                    <Progress
                                        value={winRate}
                                        className="h-2"
                                    />
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Clock className="w-3 h-3 text-blue-400" />
                                            <span className="text-xs text-muted-foreground">Avg Response</span>
                                        </div>
                                        <p className="text-sm font-semibold">
                                            {exec.avgResponseTime.toFixed(1)}h
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <DollarSign className="w-3 h-3 text-green-400" />
                                            <span className="text-xs text-muted-foreground">Won Value</span>
                                        </div>
                                        <p className="text-sm font-semibold text-green-400">
                                            {formatCurrency(exec.wonValue)}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Target className="w-3 h-3 text-purple-400" />
                                            <span className="text-xs text-muted-foreground">Total Value</span>
                                        </div>
                                        <p className="text-sm font-semibold text-purple-400">
                                            {formatCurrency(exec.totalValue)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Team Summary */}
                <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-semibold mb-4">Team Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">Total Leads</p>
                            <p className="text-xl font-bold text-cyan-400">
                                {data.reduce((sum, exec) => sum + exec.totalLeads, 0)}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">Converted</p>
                            <p className="text-xl font-bold text-green-400">
                                {data.reduce((sum, exec) => sum + exec.convertedLeads, 0)}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">Team Avg Rate</p>
                            <p className="text-xl font-bold text-purple-400">
                                {(data.reduce((sum, exec) => sum + exec.conversionRate, 0) / data.length).toFixed(1)}%
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">Total Won Value</p>
                            <p className="text-xl font-bold text-yellow-400">
                                {formatCurrency(data.reduce((sum, exec) => sum + exec.wonValue, 0))}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalesPerformanceDashboard;
