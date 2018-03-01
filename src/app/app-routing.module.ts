import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPage }    from './login.page';

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot([
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'login', component: LoginPage }
    ])]
})
export class AppRoutingModule { }
