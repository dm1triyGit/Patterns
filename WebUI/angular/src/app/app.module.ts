import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuModule } from './layout/main-menu';
import { FooterModule } from './layout/footer';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, MainMenuModule, FooterModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
