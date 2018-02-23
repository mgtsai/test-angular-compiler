import * as core from '@angular/core';
import * as http from '@angular/http';
import * as browser from '@angular/platform-browser';
import * as config from './config';
import {AppComponent} from './app.component';

@core.NgModule({
    bootstrap: [AppComponent],
    imports: [http.HttpModule, browser.BrowserModule],
    declarations: [AppComponent]
})
export class AppModule {
    constructor() {
        console.error('AppModule.constructor', config.getBaseUrl());
    }
}
