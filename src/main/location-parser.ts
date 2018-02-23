export class LocationParser
{
    static baseUrl(url: string): string
    {
        const idx = url.lastIndexOf('/');
        return idx >= 0 ? url.substring(0, idx) : null;
    }
}
