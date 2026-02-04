// WebSocket Service for Real-Time Updates
import { Notification } from '@/types';

type MessageHandler = (data: any) => void;

class WebSocketService {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 3000;
    private handlers: Map<string, MessageHandler[]> = new Map();
    private isConnecting = false;

    connect(url: string = 'ws://localhost:3001') {
        if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
            return;
        }

        this.isConnecting = true;

        try {
            this.ws = new WebSocket(url);

            this.ws.onopen = () => {
                console.log('✅ WebSocket Connected');
                this.reconnectAttempts = 0;
                this.isConnecting = false;
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.handleMessage(data);
                } catch (error) {
                    console.error('Failed to parse WebSocket message:', error);
                }
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.isConnecting = false;
            };

            this.ws.onclose = () => {
                console.log('WebSocket disconnected');
                this.isConnecting = false;
                this.attemptReconnect(url);
            };
        } catch (error) {
            console.error('Failed to create WebSocket:', error);
            this.isConnecting = false;
        }
    }

    private attemptReconnect(url: string) {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            setTimeout(() => this.connect(url), this.reconnectDelay);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }

    private handleMessage(data: any) {
        const { type, payload } = data;
        const handlers = this.handlers.get(type);

        if (handlers) {
            handlers.forEach(handler => handler(payload));
        }

        // Broadcast to all handlers
        const allHandlers = this.handlers.get('*');
        if (allHandlers) {
            allHandlers.forEach(handler => handler(data));
        }
    }

    on(event: string, handler: MessageHandler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, []);
        }
        this.handlers.get(event)!.push(handler);
    }

    off(event: string, handler: MessageHandler) {
        const handlers = this.handlers.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    send(type: string, payload: any) {
        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, payload }));
        } else {
            console.warn('WebSocket is not connected');
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}

export const wsService = new WebSocketService();
