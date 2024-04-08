import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page.component';
import { ImagePathPipeModule } from '@app-shared/pipes';

@NgModule({
  declarations: [StartPageComponent],
  imports: [CommonModule, ImagePathPipeModule],
})
export class StartPageModule {}
