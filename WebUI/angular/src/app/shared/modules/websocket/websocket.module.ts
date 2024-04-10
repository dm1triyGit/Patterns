import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketConfig } from './websocket.types';
import { webSocketConfig } from './websocket.config';
import { WebsocketService } from './websocket.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [WebsocketService],
})
export class WebSocketModule {
    public static config(wsConfig: WebSocketConfig): ModuleWithProviders<WebSocketModule> {
        return {
            ngModule: WebSocketModule,
            providers: [{ provide: webSocketConfig, useValue: wsConfig }],
        };
    }
}
