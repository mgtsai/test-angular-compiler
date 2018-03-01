import { Observable } from 'rxjs/Rx';
import { AfterViewInit, Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    templateUrl: './login.page.html',
    styleUrls: ['./styles.css']
})
export class LoginPage implements AfterViewInit {
    public title: string = 'Tour of Heroes';

    constructor(private _$http: Http) {
        console.error('LoginPage.constructor');
    }

    ngAfterViewInit(): void {
        console.error('LoginPage.ngAfterViewInit');

        Observable.of(null)
        .delay(2000)
        .subscribe(() => this.title = 'Start');
    }
}
