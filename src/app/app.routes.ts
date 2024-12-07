import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './home/home.component';
import { DireitoCivilComponent } from './pages/direito-civil/direito-civil.component'; 
import { DireitoTrabalhoComponent } from './pages/direito-trabalho/direito-trabalho.component';
import { DireitoPreviComponent } from './pages/direito-previ/direito-previ.component';
import { DireitoConsumidorComponent } from './pages/direito-consumidor/direito-consumidor.component';
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
import { ProcessosAdvogadoComponent } from './pages/processos-advogado/processos-advogado.component';
import { ConsultasAdvogadoComponent } from './pages/consultas-advogado/consultas-advogado.component';
import { ClienteEdicaoComponent } from './pages/cliente-edicao/cliente-edicao.component';
import { FormCriaProcessoComponent } from './pages/form-cria-processo/form-cria-processo.component';
import { ProcessosAdvogadoDetailsComponent } from './pages/processos-advogado-details/processos-advogado-details.component';
import { ProcessoEdicaoComponent } from './pages/processo-edicao/processo-edicao.component';
import { CriaConsultaComponent } from './pages/cria-consulta/cria-consulta.component';
import { ConsultaAdvogadoDetailsComponent } from './pages/consulta-advogado-details/consulta-advogado-details.component';
import { ConsultaEdicaoComponent } from './pages/consulta-edicao/consulta-edicao.component';
import { ClienteAgendarConsultaComponent } from './pages/cliente-agendar-consulta/cliente-agendar-consulta.component';
import { ConfigContaComponent } from './pages/config-conta/config-conta.component';

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
        path: 'cliente-edicao', 
        component: ClienteEdicaoComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'cria-processo', 
        component: FormCriaProcessoComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'processos-advogado', 
        component: ProcessosAdvogadoComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'processos-advogado-details', 
        component: ProcessosAdvogadoDetailsComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'processos-edicao', 
        component: ProcessoEdicaoComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'consultas-advogado', 
        component: ConsultasAdvogadoComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'cria-consulta', 
        component: CriaConsultaComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'consulta-details', 
        component: ConsultaAdvogadoDetailsComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'consulta-edicao', 
        component: ConsultaEdicaoComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'agendar-consulta', 
        component: ClienteAgendarConsultaComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'config-conta', 
        component: ConfigContaComponent,
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
