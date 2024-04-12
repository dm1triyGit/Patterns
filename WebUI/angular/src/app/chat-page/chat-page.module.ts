import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './chat-page.component';
import { ChatPageRoutingModule } from './chat-page-routing.module';
import { ChatWindowComponent } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, ChatPageRoutingModule, RouterModule],
    declarations: [ChatPageComponent, ChatWindowComponent],
    exports: [ChatPageComponent],
})
export class ChatPageModule {}
