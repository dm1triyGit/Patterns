import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '@app-environment';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserMessage } from '../types';

@Injectable()
export class ChatHubServise implements OnDestroy {
    private hubConnection?: HubConnection | null;

    private readonly userMessages: UserMessage[] = [];
    public readonly userMessages$ = new BehaviorSubject<UserMessage[]>([]);

    constructor() {
        if (
            this.hubConnection?.state === HubConnectionState.Connected ||
            this.hubConnection?.state === HubConnectionState.Connecting
        ) {
            return;
        }

        this.start();
    }

    ngOnDestroy(): void {
        this.hubConnection?.stop().finally(() => {
            this.hubConnection = null;
        });
    }

    private start(): void {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(environment.CHAT_API, {
                transport: HttpTransportType.WebSockets,
                skipNegotiation: true,
            })
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connected to SignalR hub'))
            .catch(err => console.error('Error connecting to SignalR hub:', err));

        this.recieve();
    }

    private recieve(): void {
        this.hubConnection?.on('Receive', (message: string, userName: string) => {
            this.userMessages.push({ name: userName, message });
            this.userMessages$.next(this.userMessages);
        });
    }

    public send(message: string, userName: string): void {
        this.hubConnection?.invoke('Send', message, userName);
    }

    public refresh(): void {
        if (this.userMessages?.length > 0) {
            this.userMessages$.next(this.userMessages);
        }
    }
}
