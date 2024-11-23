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
import { FormAlteraUsuarioComponent } from './pages/form-altera-usuario/form-altera-usuario.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { AdvogadoComponent } from './pages/advogado/advogado.component';
import { ClientesAdvogadoComponent } from './pages/clientes-advogado/clientes-advogado.component';
import { FormCriaClienteComponent } from './pages/form-cria-cliente/form-cria-cliente.component';
import { ProcessosClienteComponent } from './pages/processos-cliente/processos-cliente.component';
import { authGuard } from './auth.guard';
import { ClientesAdvogadoDetailsComponent } from './pages/clientes-advogado-details/clientes-advogado-details.component';

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
        path: 'admin', 
        component: AdminComponent,
        canActivate: [authGuard] 
    },
    { 
        path: 'criar-usuario', 
        component: CriarUsuarioComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'form-altera-usuario', 
        component: FormAlteraUsuarioComponent,
        canActivate: [authGuard] 
    },
    { 
        path: 'cliente', 
        component: ClienteComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'advogado', 
        component: AdvogadoComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'clientes-advogado', 
        component: ClientesAdvogadoComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'form-cria-cliente', 
        component: FormCriaClienteComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'processos-cliente', 
        component: ProcessosClienteComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'clientes-advogado-details', 
        component: ClientesAdvogadoDetailsComponent,
        canActivate: [authGuard]
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
