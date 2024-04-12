import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebsocketService } from '@app-shared/services';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent {
    constructor(private readonly websocketService: WebsocketService) {}
}
