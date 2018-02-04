//import * as utilities from './utilities';

var baseUrl = '';

export class Config
{
    static getBaseUrl(): string {
        return baseUrl;
    }

    static setLocation(location): void {
        //baseUrl = utilities.LocationParser.baseUrl(location.pathname);
    }
}
