import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './chat-page.component';
import { ChatPageRoutingModule } from './chat-page-routing.module';

@NgModule({
    imports: [CommonModule, ChatPageRoutingModule],
    declarations: [ChatPageComponent],
    exports: [ChatPageComponent],
})
export class ChatPageModule {}
