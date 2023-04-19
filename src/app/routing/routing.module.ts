import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { UserGuard } from '../guard/user.guard';
import { ChampionComponent } from '../components/champion/champion.component';
import { LoginGuard } from '../guard/login.guard';
import { CreateChampionComponent } from '../components/create-champion/create-champion.component';

const routes :Routes = [
    { path: '' , component: ChampionComponent , canActivate:[UserGuard]},
    { path: 'champion/create', component: CreateChampionComponent, canActivate: [UserGuard] },
    { path: 'login', component: LoginComponent , canActivate:[LoginGuard]},
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: 'notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RoutingModule{ }