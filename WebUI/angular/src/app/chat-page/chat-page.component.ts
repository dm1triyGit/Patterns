import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebsocketService } from '@app-shared/services';

@Component({
    selector: 'app-chat-page',
    templateUrl: './chat-page.component.html',
    styleUrl: './chat-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {
    constructor(private readonly websocketService: WebsocketService) {}
}
