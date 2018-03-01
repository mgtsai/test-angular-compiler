import * as config       from './config';
import { NgModule }      from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule }    from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage }    from './login.page';

@NgModule({
    bootstrap: [AppComponent],
    imports: [HttpModule, BrowserModule, AppRoutingModule],
    providers: [
        { provide: APP_BASE_HREF, useFactory: config.getBaseUrl },
    ],
    declarations: [AppComponent, LoginPage]
})
export class AppModule {
    constructor() {
        console.error('AppModule.constructor', config.getBaseUrl());
    }
}
