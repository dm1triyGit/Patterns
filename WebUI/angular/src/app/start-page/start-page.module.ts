import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePathPipeModule } from '@app-shared/pipes';
import { StartPageComponent } from './start-page.component';

@NgModule({
  declarations: [StartPageComponent],
  imports: [CommonModule, ImagePathPipeModule],
})
export class StartPageModule {}
