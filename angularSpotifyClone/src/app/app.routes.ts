import { AutenticadoGuard } from './pages/guards/autenticado.guard';
import { PlayerModule } from './pages/player/player.module';
import { Routes } from "@angular/router";

export const appRotas: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
  },

  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
    canLoad: [AutenticadoGuard]

  }
]
