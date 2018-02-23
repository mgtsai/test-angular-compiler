import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule}              from './app.module';
import * as config              from './config';
config.setLocation(location);
platformBrowserDynamic().bootstrapModule(AppModule);
