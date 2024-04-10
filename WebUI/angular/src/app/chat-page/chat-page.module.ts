import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './chat-page.component';
import { WebSocketModule } from '@app-shared/modules';
import { environment } from '@app-environment';

@NgModule({
    declarations: [ChatPageComponent],
    imports: [CommonModule, WebSocketModule.config({ url: environment.chatUrl })],
})
export class ChatPageModule {}
