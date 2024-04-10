import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebsocketService } from '@app-shared/modules/websocket/websocket.service';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {
    constructor(private readonly websocketService: WebsocketService) {}
}
