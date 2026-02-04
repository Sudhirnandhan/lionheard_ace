// Real-Time Notification Component
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { wsService } from '@/services/websocket';
import { Notification } from '@/types';

const NotificationPanel = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Connect to WebSocket
        wsService.connect();

        // Listen for new notifications
        const handleNewNotification = (notification: Notification) => {
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);

            // Show browser notification if permitted
            if (Notification.permission === 'granted') {
                new Notification(notification.title, {
                    body: notification.message,
                    icon: '/logo.png',
                });
            }
        };

        wsService.on('notification', handleNewNotification);

        return () => {
            wsService.off('notification', handleNewNotification);
        };
    }, []);

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
        setUnreadCount(0);
    };

    const removeNotification = (id: string) => {
        const notification = notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            setUnreadCount(prev => Math.max(0, prev - 1));
        }
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'new_lead':
                return <TrendingUp className="w-4 h-4 text-cyan-400" />;
            case 'status_change':
                return <Info className="w-4 h-4 text-blue-400" />;
            case 'task_reminder':
                return <AlertCircle className="w-4 h-4 text-orange-400" />;
            case 'escalation':
                return <AlertCircle className="w-4 h-4 text-red-400" />;
            default:
                return <Info className="w-4 h-4 text-gray-400" />;
        }
    };

    const getPriorityColor = (priority: Notification['priority']) => {
        switch (priority) {
            case 'high':
                return 'border-l-red-500';
            case 'medium':
                return 'border-l-orange-500';
            case 'low':
                return 'border-l-blue-500';
            default:
                return 'border-l-gray-500';
        }
    };

    return (
        <div className="relative">
            {/* Notification Bell */}
            <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                )}
            </Button>

            {/* Notification Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-12 w-96 glass-card border border-white/10 shadow-2xl z-50"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">Notifications</h3>
                                {unreadCount > 0 && (
                                    <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                                        {unreadCount} new
                                    </Badge>
                                )}
                            </div>
                            {notifications.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={markAllAsRead}
                                    className="text-xs text-cyan-400 hover:text-cyan-300"
                                >
                                    Mark all read
                                </Button>
                            )}
                        </div>

                        {/* Notifications List */}
                        <ScrollArea className="h-[400px]">
                            {notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                                    <CheckCircle className="w-12 h-12 mb-4 opacity-20" />
                                    <p>No notifications</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {notifications.map((notification) => (
                                        <motion.div
                                            key={notification.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className={`p-4 hover:bg-white/5 transition-colors cursor-pointer border-l-2 ${getPriorityColor(notification.priority)} ${!notification.read ? 'bg-white/5' : ''
                                                }`}
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex gap-3">
                                                <div className="flex-shrink-0 mt-1">
                                                    {getIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className="font-medium text-sm text-foreground">
                                                            {notification.title}
                                                        </h4>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 flex-shrink-0"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeNotification(notification.id);
                                                            }}
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground/60 mt-2">
                                                        {new Date(notification.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationPanel;
