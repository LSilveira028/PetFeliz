import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'entraroucadastrar',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./menu/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'procurar',
    loadChildren: () => import('./menu/procurar/procurar.module').then( m => m.ProcurarPageModule)
  },
  {
    path: 'meuscaes',
    loadChildren: () => import('./menu/meuscaes/meuscaes.module').then( m => m.MeuscaesPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./menu/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'conta',
    loadChildren: () => import('./menu/conta/conta.module').then( m => m.ContaPageModule)
  },
  {
    path: 'sair',
    loadChildren: () => import('./menu/sair/sair.module').then( m => m.SairPageModule)
  },
  {
    path: 'termosdeuso',
    loadChildren: () => import('./menu/termosdeuso/termosdeuso.module').then( m => m.TermosdeusoPageModule)
  },
  {
    path: 'politicadeprivacidade',
    loadChildren: () => import('./menu/politicadeprivacidade/politicadeprivacidade.module').then( m => m.PoliticadeprivacidadePageModule)
  },
  {
    path: 'petsjacadastrados',
    loadChildren: () => import('./petsjacadastrados/petsjacadastrados.module').then( m => m.PetsjacadastradosPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'entraroucadastrar',
    loadChildren: () => import('./entraroucadastrar/entraroucadastrar.module').then( m => m.EntraroucadastrarPageModule)
  },
  {
    path: 'solicitarservicodw',
    loadChildren: () => import('./solicitarservicodw/solicitarservicodw.module').then( m => m.SolicitarservicodwPageModule)
  },
  {
    path: 'solicitacoesdw',
    loadChildren: () => import('./solicitacoesdw/solicitacoesdw.module').then( m => m.SolicitacoesdwPageModule)
  },
  {
    path: 'perfildwproprietario',
    loadChildren: () => import('./perfildwproprietario/perfildwproprietario.module').then( m => m.PerfildwproprietarioPageModule)
  },
  {
    path: 'historicoservicos',
    loadChildren: () => import('./historicoservicos/historicoservicos.module').then( m => m.HistoricoservicosPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
