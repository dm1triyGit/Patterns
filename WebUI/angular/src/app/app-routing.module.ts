import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from './start-page';
import { ChatPageComponent } from './chat-page';

const routes: Routes = [
  { path: 'start', component: StartPageComponent },
  { path: 'chat', component: ChatPageComponent },
  { path: '**', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
