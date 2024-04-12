import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatPageComponent } from './chat-page.component';
import { ChatWindowComponent } from './components';
import { ChatWindowServise } from './services';

const routes: Routes = [
    {
        path: '',
        component: ChatPageComponent,
        children: [
            { path: '', redirectTo: 'person-1', pathMatch: 'full' },
            { path: 'person-1', component: ChatWindowComponent, providers: [ChatWindowServise] },
            //{ path: 'person-2', component: ChatWindowComponent, providers: [ChatWindowServise] },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChatPageRoutingModule {}
