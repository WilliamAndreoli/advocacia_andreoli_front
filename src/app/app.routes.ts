import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './home/home.component';
import { DireitoCivilComponent } from './pages/direito-civil/direito-civil.component'; 
import { DireitoTrabalhoComponent } from './pages/direito-trabalho/direito-trabalho.component';
import { DireitoPreviComponent } from './pages/direito-previ/direito-previ.component';
import { DireitoConsumidorComponent } from './pages/direito-consumidor/direito-consumidor.component';
import { EsqueciMinhaSenhaComponent } from './pages/esqueci-minha-senha/esqueci-minha-senha.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CriarUsuarioComponent } from './pages/criar-usuario/criar-usuario.component';

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
        path: 'direito-civil', 
        component: DireitoCivilComponent 
    },
    { 
        path: 'direito-trabalho', 
        component: DireitoTrabalhoComponent 
    },
    { 
        path: 'direito-previ', 
        component: DireitoPreviComponent 
    },
    { 
        path: 'direito-consumidor', 
        component: DireitoConsumidorComponent 
    },
    { 
        path: 'esqueci-minha-senha', 
        component: EsqueciMinhaSenhaComponent 
    },
    { 
        path: 'admin', 
        component: AdminComponent 
    },
    { 
        path: 'criar-usuario', 
        component: CriarUsuarioComponent 
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
