import {LocationParser} from './location-parser';
var baseUrl = '';

export function getBaseUrl(): string {
    return baseUrl;
}

export function setLocation(location): void {
    baseUrl = LocationParser.baseUrl(location.href);
}
