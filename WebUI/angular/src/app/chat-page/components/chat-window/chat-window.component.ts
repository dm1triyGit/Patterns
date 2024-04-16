import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ChatHubServise } from '../../services';
import { USER_NAME } from '../../tokens';
import { UserMessage } from '../../types';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWindowComponent {
    public readonly userMessages$ = this.chatHubService.userMessages$;

    constructor(
        private readonly chatHubService: ChatHubServise,
        @Inject(USER_NAME) private readonly userName: string,
    ) {}

    public send(): void {
        this.chatHubService.send('mes', this.userName);
    }

    public isOutgoingMessage({ name }: UserMessage): boolean {
        return name === this.userName;
    }
}
