import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WebsocketService } from '@app-shared/services';
import { IWsMessage } from '@app-shared/services/websocket/websocket.types';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent {
    constructor(private readonly websocketService: WebsocketService) {
        this.websocketService.on<IWsMessage<string>[]>('messages')?.subscribe((messages: IWsMessage<string>[]) => {
            console.log(messages);

            this.websocketService.send('text', 'Test Text!');
        });
    }
}
