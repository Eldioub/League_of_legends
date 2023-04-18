import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../components/login/login.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { UserGuard } from '../guard/user.guard';

const routes :Routes = [
    { path: '' , redirectTo: 'login', pathMatch: 'full'  },
    { path: 'login', component: LoginComponent },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: 'notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RoutingModule{ }