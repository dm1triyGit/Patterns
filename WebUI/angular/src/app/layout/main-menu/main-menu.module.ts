import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainMenuService } from './services';
import { MainMenuComponent } from './main-menu.component';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainMenuComponent],
  providers: [MainMenuService],
})
export class MainMenuModule {}
