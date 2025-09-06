import { Routes } from '@angular/router';
import { LoginComponent } from './login.component/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home.component/home.component';
import { HistoryComponent } from './history.component/history.component';
import { PopupComponent } from './popup.component/popup.component';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
];

