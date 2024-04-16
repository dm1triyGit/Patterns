import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page';
import { environment } from '@app-environment';
import { WEBSOCKET_CONFIG, WebsocketService } from '@app-shared/services';

const routes: Routes = [
    { path: 'start', component: StartPageComponent },
    {
        path: 'chat',
        providers: [{ provide: WEBSOCKET_CONFIG, useValue: { url: environment.CHAT_API } }, WebsocketService],
        loadChildren: () => import('./chat-page/chat-page.module').then(m => m.ChatPageModule),
    },
    { path: '**', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
