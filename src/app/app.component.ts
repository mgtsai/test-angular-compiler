import * as rx from 'rxjs/Rx';
import * as core from '@angular/core';
import * as http from '@angular/http';

@core.Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: 'app.component.html'
})
export class AppComponent implements core.AfterViewInit
{
    public title: string = 'Tour of Heroes';

    constructor(private _$http: http.Http)
    { }

    ngAfterViewInit(): void
    {
        rx.Observable.of(null)
        .delay(2000)
        .subscribe(() => this.title = 'Start');
    }
}
