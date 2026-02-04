// Real-Time Dashboard with Live Updates
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Users, DollarSign, Zap, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { wsService } from '@/services/websocket';

interface LiveMetric {
    label: string;
    value: string | number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
}

const RealTimeDashboard = () => {
    const [metrics, setMetrics] = useState<LiveMetric[]>([
        { label: 'Active Leads', value: 127, change: 5.2, trend: 'up' },
        { label: 'Today\'s Conversions', value: 8, change: 12.5, trend: 'up' },
        { label: 'Revenue (Today)', value: '$24,500', change: -2.1, trend: 'down' },
        { label: 'Avg Response Time', value: '2.3h', change: -15.3, trend: 'up' },
    ]);

    const [recentActivities, setRecentActivities] = useState<Array<{
        id: string;
        type: string;
        message: string;
        timestamp: Date;
    }>>([]);

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Connect to WebSocket
        wsService.connect();
        setIsConnected(wsService.isConnected());

        // Listen for real-time updates
        const handleMetricUpdate = (data: any) => {
            setMetrics(prev =>
                prev.map(metric =>
                    metric.label === data.label
                        ? { ...metric, value: data.value, change: data.change, trend: data.trend }
                        : metric
                )
            );
        };

        const handleActivity = (data: any) => {
            setRecentActivities(prev => [
                { id: Date.now().toString(), ...data, timestamp: new Date() },
                ...prev.slice(0, 9) // Keep last 10 activities
            ]);
        };

        wsService.on('metric_update', handleMetricUpdate);
        wsService.on('activity', handleActivity);

        // Simulate real-time updates for demo
        const interval = setInterval(() => {
            const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
            const randomChange = (Math.random() - 0.5) * 10;

            handleMetricUpdate({
                label: randomMetric.label,
                value: typeof randomMetric.value === 'number'
                    ? randomMetric.value + Math.floor(Math.random() * 3 - 1)
                    : randomMetric.value,
                change: randomChange,
                trend: randomChange > 0 ? 'up' : randomChange < 0 ? 'down' : 'neutral',
            });
        }, 5000);

        return () => {
            clearInterval(interval);
            wsService.off('metric_update', handleMetricUpdate);
            wsService.off('activity', handleActivity);
        };
    }, []);

    const getMetricIcon = (label: string) => {
        if (label.includes('Leads')) return Users;
        if (label.includes('Revenue')) return DollarSign;
        if (label.includes('Conversions')) return TrendingUp;
        return Activity;
    };

    const getMetricColor = (trend: 'up' | 'down' | 'neutral') => {
        switch (trend) {
            case 'up': return 'text-green-400';
            case 'down': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            {/* Connection Status */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Real-Time Dashboard</h3>
                <Badge
                    variant={isConnected ? 'default' : 'secondary'}
                    className={isConnected
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }
                >
                    <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                    {isConnected ? 'Live' : 'Offline'}
                </Badge>
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => {
                    const Icon = getMetricIcon(metric.label);
                    return (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass-card border-none hover:bg-white/5 transition-all">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {metric.label}
                                    </CardTitle>
                                    <Icon className="h-4 w-4 text-cyan-400" />
                                </CardHeader>
                                <CardContent>
                                    <motion.div
                                        key={metric.value.toString()}
                                        initial={{ scale: 1.1, color: '#06b6d4' }}
                                        animate={{ scale: 1, color: '#ffffff' }}
                                        transition={{ duration: 0.3 }}
                                        className="text-2xl font-bold"
                                    >
                                        {metric.value}
                                    </motion.div>
                                    <p className={`text-xs flex items-center gap-1 mt-1 ${getMetricColor(metric.trend)}`}>
                                        {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                                        {Math.abs(metric.change).toFixed(1)}% from yesterday
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Recent Activities Stream */}
            <Card className="glass-card border-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-400" />
                        Live Activity Stream
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {recentActivities.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                Waiting for activity updates...
                            </p>
                        ) : (
                            recentActivities.map((activity, index) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 animate-pulse" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm">{activity.message}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {activity.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {activity.type}
                                    </Badge>
                                </motion.div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RealTimeDashboard;
