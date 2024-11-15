import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:"login",
        component: LoginComponent
    },
    { 
        path: 'index', 
        component: HomeComponent 
    },
    { 
        path: '', 
        redirectTo: '/index', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: '/index' 
    }
];
