import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatPageComponent } from './chat-page.component';
import { ChatWindowComponent } from './components';
import { ChatHubServise } from './services';
import { USER_NAME } from './tokens';

const routes: Routes = [
    {
        path: '',
        component: ChatPageComponent,
        providers: [ChatHubServise],
        children: [
            { path: '', redirectTo: 'user-1', pathMatch: 'full' },
            { path: 'user-1', component: ChatWindowComponent, providers: [{ provide: USER_NAME, useValue: 'user1' }] },
            { path: 'user-2', component: ChatWindowComponent, providers: [{ provide: USER_NAME, useValue: 'user2' }] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChatPageRoutingModule {}
