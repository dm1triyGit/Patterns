import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: ChatPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChatPageRoutingModule {}
