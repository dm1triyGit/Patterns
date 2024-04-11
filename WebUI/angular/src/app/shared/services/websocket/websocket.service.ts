import { Inject, Injectable, OnDestroy } from '@angular/core';
import { IWebsocketService, IWsMessage, WebSocketConfig } from './websocket.types';
import {
    Observable,
    Observer,
    Subject,
    SubscriptionLike,
    distinctUntilChanged,
    filter,
    interval,
    map,
    share,
    takeWhile,
} from 'rxjs';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { WEBSOCKET_CONFIG } from './websocket.config';

@Injectable()
export class WebsocketService implements IWebsocketService, OnDestroy {
    public status$: Observable<boolean>;

    private config: WebSocketSubjectConfig<IWsMessage<any>>;

    private websocketSub: SubscriptionLike;
    private statusSub: SubscriptionLike;

    private wsMessages$ = new Subject<IWsMessage<any>>();
    private reconnection$: Observable<number> | null;
    private websocket$: WebSocketSubject<IWsMessage<any>> | null;
    private connection$: Observer<boolean>;

    private reconnectInterval = this.wsConfig.reconnectInterval || 5000;
    private reconnectAttempts = this.wsConfig.reconnectAttempts || 10;
    private isConnected = false;

    constructor(@Inject(WEBSOCKET_CONFIG) private wsConfig: WebSocketConfig) {
        this.init();
    }

    ngOnDestroy(): void {
        this.websocketSub.unsubscribe();
        this.statusSub.unsubscribe();
    }

    public on<T>(event: string): Observable<T> | undefined {
        if (event) {
            return this.wsMessages$.pipe(
                filter((message: IWsMessage<T>) => message.event === event),
                map((message: IWsMessage<T>) => message.data),
            );
        }

        return undefined;
    }

    /*
     * on message to server
     * */
    public send(event: string, data: any = {}): void {
        if (event && this.isConnected) {
            this.websocket$?.next(<any>JSON.stringify({ event, data }));
        } else {
            console.error('Send error!');
        }
    }

    private init() {
        this.config = {
            url: this.wsConfig.url,
            closeObserver: {
                next: (_: CloseEvent) => {
                    this.websocket$ = null;
                    this.connection$.next(false);
                },
            },
            openObserver: {
                next: (_: Event) => {
                    console.log('WebSocket connected!');
                    this.connection$.next(true);
                },
            },
        };

        this.status$ = new Observable<boolean>(observer => {
            this.connection$ = observer;
        }).pipe(share(), distinctUntilChanged());

        this.statusSub = this.status$.subscribe(isConnected => {
            this.isConnected = isConnected;

            if (!this.reconnection$ && typeof isConnected === 'boolean' && !isConnected) {
                this.reconnect();
            }
        });

        this.websocketSub = this.wsMessages$.subscribe(null, (error: ErrorEvent) =>
            console.error('WebSocket error!', error),
        );

        this.connect();
    }

    private connect(): void {
        this.websocket$ = new WebSocketSubject(this.config);

        this.websocket$.subscribe(
            message => this.wsMessages$.next(message),
            (error: Event) => {
                if (!this.websocket$) {
                    // run reconnect if errors
                    this.reconnect();
                }
            },
        );
    }

    private reconnect(): void {
        this.reconnection$ = interval(this.reconnectInterval).pipe(
            takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$),
        );

        this.reconnection$.subscribe(
            () => this.connect(),
            null,
            () => {
                // Subject complete if reconnect attemts ending
                this.reconnection$ = null;

                if (!this.websocket$) {
                    this.wsMessages$.complete();
                    this.connection$.complete();
                }
            },
        );
    }
}
