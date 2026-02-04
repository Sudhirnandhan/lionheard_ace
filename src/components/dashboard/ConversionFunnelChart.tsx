// Conversion Funnel Visualization Component
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConversionFunnel } from '@/types';

interface ConversionFunnelChartProps {
    data: ConversionFunnel[];
}

const ConversionFunnelChart = ({ data }: ConversionFunnelChartProps) => {
    const maxCount = Math.max(...data.map(d => d.count));

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <Card className="glass-card border-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Conversion Funnel Analysis
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Track lead progression through sales stages
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((stage, index) => {
                        const widthPercentage = (stage.count / maxCount) * 100;
                        const isBottleneck = stage.dropOffRate > 30;

                        return (
                            <motion.div
                                key={stage.stage}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Stage Header */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">
                                            {stage.stage}
                                        </span>
                                        {isBottleneck && (
                                            <AlertTriangle className="w-4 h-4 text-orange-400" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="text-muted-foreground">
                                            {stage.count} leads
                                        </span>
                                        <span className="text-cyan-400 font-mono">
                                            {formatCurrency(stage.value)}
                                        </span>
                                    </div>
                                </div>

                                {/* Funnel Bar */}
                                <div className="relative h-16 bg-white/5 rounded-lg overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${widthPercentage}%` }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                        className={`h-full rounded-lg relative ${isBottleneck
                                                ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30'
                                                : 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30'
                                            }`}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-bold text-lg">
                                                {stage.count}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Conversion & Drop-off Rates */}
                                <div className="flex items-center justify-between mt-2 text-xs">
                                    <div className="flex items-center gap-1 text-green-400">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>
                                            {stage.conversionRate.toFixed(1)}% conversion
                                        </span>
                                    </div>
                                    {stage.dropOffRate > 0 && (
                                        <div className={`flex items-center gap-1 ${isBottleneck ? 'text-orange-400' : 'text-muted-foreground'
                                            }`}>
                                            <TrendingDown className="w-3 h-3" />
                                            <span>
                                                {stage.dropOffRate.toFixed(1)}% drop-off
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Bottleneck Warning */}
                                {isBottleneck && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg"
                                    >
                                        <p className="text-xs text-orange-400">
                                            ⚠️ High drop-off rate detected. Review processes for this stage.
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Total Leads</p>
                        <p className="text-2xl font-bold text-cyan-400">{data[0]?.count || 0}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Converted</p>
                        <p className="text-2xl font-bold text-green-400">
                            {data[data.length - 1]?.count || 0}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">Overall Rate</p>
                        <p className="text-2xl font-bold text-purple-400">
                            {data[data.length - 1]?.conversionRate.toFixed(1)}%
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ConversionFunnelChart;
