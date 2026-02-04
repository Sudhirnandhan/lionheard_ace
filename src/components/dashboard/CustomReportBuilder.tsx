// Custom Report Builder Component
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ReportFilter } from '@/types';
import { format } from 'date-fns';

const CustomReportBuilder = () => {
    const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
        start: new Date(new Date().setDate(new Date().getDate() - 30)),
        end: new Date(),
    });
    const [selectedSources, setSelectedSources] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
    const [reportType, setReportType] = useState<'summary' | 'detailed' | 'funnel' | 'performance'>('summary');

    const sources = ['Website', 'LinkedIn', 'Referral', 'Conference', 'Direct', 'Email Campaign'];
    const statuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'];
    const priorities = ['low', 'medium', 'high', 'hot'];

    const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
        if (list.includes(item)) {
            setter(list.filter(i => i !== item));
        } else {
            setter([...list, item]);
        }
    };

    const clearFilters = () => {
        setSelectedSources([]);
        setSelectedStatuses([]);
        setSelectedPriorities([]);
        setDateRange({
            start: new Date(new Date().setDate(new Date().getDate() - 30)),
            end: new Date(),
        });
    };

    const generateReport = (exportFormat: 'pdf' | 'excel' | 'csv') => {
        const filter: ReportFilter = {
            dateRange,
            source: selectedSources.length > 0 ? selectedSources : undefined,
            status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
            priority: selectedPriorities.length > 0 ? selectedPriorities : undefined,
        };

        console.log('Generating report:', { reportType, filter, exportFormat });
        // This would integrate with the analytics service to generate the actual report
    };

    const activeFiltersCount =
        selectedSources.length +
        selectedStatuses.length +
        selectedPriorities.length;

    return (
        <Card className="glass-card border-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    Custom Report Builder
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Create custom reports with advanced filtering
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Report Type Selection */}
                    <div>
                        <Label className="mb-2 block">Report Type</Label>
                        <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
                            <SelectTrigger className="bg-background/50 border-white/10">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="summary">Summary Report</SelectItem>
                                <SelectItem value="detailed">Detailed Lead Report</SelectItem>
                                <SelectItem value="funnel">Conversion Funnel Analysis</SelectItem>
                                <SelectItem value="performance">Sales Performance Report</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Range */}
                    <div>
                        <Label className="mb-2 block">Date Range</Label>
                        <div className="flex gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="flex-1 justify-start bg-background/50 border-white/10">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {format(dateRange.start, 'MMM dd, yyyy')}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="glass-card border-white/10 p-0">
                                    <CalendarComponent
                                        mode="single"
                                        selected={dateRange.start}
                                        onSelect={(date) => date && setDateRange({ ...dateRange, start: date })}
                                    />
                                </PopoverContent>
                            </Popover>
                            <span className="flex items-center text-muted-foreground">to</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="flex-1 justify-start bg-background/50 border-white/10">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {format(dateRange.end, 'MMM dd, yyyy')}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="glass-card border-white/10 p-0">
                                    <CalendarComponent
                                        mode="single"
                                        selected={dateRange.end}
                                        onSelect={(date) => date && setDateRange({ ...dateRange, end: date })}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Filters</Label>
                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="text-xs text-red-400 hover:text-red-300"
                                >
                                    <X className="w-3 h-3 mr-1" />
                                    Clear all ({activeFiltersCount})
                                </Button>
                            )}
                        </div>

                        {/* Source Filter */}
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <Label className="mb-3 block text-xs text-muted-foreground">Lead Source</Label>
                            <div className="flex flex-wrap gap-2">
                                {sources.map(source => (
                                    <Badge
                                        key={source}
                                        variant={selectedSources.includes(source) ? 'default' : 'outline'}
                                        className={`cursor-pointer transition-all ${selectedSources.includes(source)
                                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                                                : 'border-white/20 hover:bg-white/10'
                                            }`}
                                        onClick={() => toggleSelection(source, selectedSources, setSelectedSources)}
                                    >
                                        {source}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <Label className="mb-3 block text-xs text-muted-foreground">Status</Label>
                            <div className="flex flex-wrap gap-2">
                                {statuses.map(status => (
                                    <Badge
                                        key={status}
                                        variant={selectedStatuses.includes(status) ? 'default' : 'outline'}
                                        className={`cursor-pointer transition-all capitalize ${selectedStatuses.includes(status)
                                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                                                : 'border-white/20 hover:bg-white/10'
                                            }`}
                                        onClick={() => toggleSelection(status, selectedStatuses, setSelectedStatuses)}
                                    >
                                        {status}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Priority Filter */}
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <Label className="mb-3 block text-xs text-muted-foreground">Priority</Label>
                            <div className="flex flex-wrap gap-2">
                                {priorities.map(priority => (
                                    <Badge
                                        key={priority}
                                        variant={selectedPriorities.includes(priority) ? 'default' : 'outline'}
                                        className={`cursor-pointer transition-all capitalize ${selectedPriorities.includes(priority)
                                                ? 'bg-orange-500/20 text-orange-400 border-orange-500/50'
                                                : 'border-white/20 hover:bg-white/10'
                                            }`}
                                        onClick={() => toggleSelection(priority, selectedPriorities, setSelectedPriorities)}
                                    >
                                        {priority}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Export Options */}
                    <div className="pt-4 border-t border-white/10">
                        <Label className="mb-3 block">Export Format</Label>
                        <div className="flex gap-2">
                            <Button
                                className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                                onClick={() => generateReport('pdf')}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export PDF
                            </Button>
                            <Button
                                className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                                onClick={() => generateReport('excel')}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export Excel
                            </Button>
                            <Button
                                className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                                onClick={() => generateReport('csv')}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* Preview Info */}
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        <p className="text-sm text-cyan-400">
                            📊 Report will include data from {format(dateRange.start, 'MMM dd, yyyy')} to {format(dateRange.end, 'MMM dd, yyyy')}
                            {activeFiltersCount > 0 && ` with ${activeFiltersCount} active filter(s)`}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CustomReportBuilder;
