import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainMenuComponent } from '.';
import { MainMenuService } from './services';

@NgModule({
  declarations: [MainMenuComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainMenuComponent],
  providers: [MainMenuService],
})
export class MainMenuModule {}
