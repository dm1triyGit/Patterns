import { Observable } from 'rxjs';

export interface WebSocketConfig {
    url: string;
    reconnectInterval?: number;
    reconnectAttempts?: number;
}

export interface IWsMessage<T> {
    event: string;
    data: T;
}

export interface IWebsocketService {
    on<T>(event: string): Observable<T> | undefined;
    send(event: string, data: any): void;
    status$: Observable<boolean>;
}
