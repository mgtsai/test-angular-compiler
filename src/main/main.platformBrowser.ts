import {platformBrowser}    from '@angular/platform-browser';
import {AppModuleNgFactory} from './app.module.ngfactory';
import * as config          from './config';
config.setLocation(location);
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
