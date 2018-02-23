import * as rx from 'rxjs/Rx';
import * as core from '@angular/core';
import * as http from '@angular/http';

@core.Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./styles.css']
})
export class AppComponent implements core.AfterViewInit
{
    public title: string = 'Tour of Heroes';

    constructor(private _$http: http.Http)
    {
        console.error('AppComponent.constructor');
    }

    ngAfterViewInit(): void
    {
        console.error('AppComponent.ngAfterViewInit');

        rx.Observable.of(null)
        .delay(2000)
        .subscribe(() => this.title = 'Start');
    }
}
