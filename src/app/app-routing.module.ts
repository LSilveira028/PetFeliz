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
    loadChildren: () => import('./cao/petsjacadastrados/petsjacadastrados.module').then( m => m.PetsjacadastradosPageModule)
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
    path: 'historicoservicos',
    loadChildren: () => import('./historicoservicos/historicoservicos.module').then( m => m.HistoricoservicosPageModule)
  },
  {
    path: 'caesservicopage',
    loadChildren: () => import('./componentes/caesservicopage/caesservicopage.module').then( m => m.CaesservicopagePageModule)
  },
  {
    path: 'alterarperfil',
    loadChildren: () => import('./alterarperfil/alterarperfil.module').then( m => m.AlterarperfilPageModule)
  },
  {
    path: 'avaliacoes',
    loadChildren: () => import('./menu/avaliacoes/avaliacoes.module').then( m => m.AvaliacoesPageModule)
  },
  {
    path: 'deletarconta',
    loadChildren: () => import('./deletarconta/deletarconta.module').then( m => m.DeletarcontaPageModule)
  },
  {
    path: 'avaliar-servico',
    loadChildren: () => import('./avaliar-servico/avaliar-servico.module').then( m => m.AvaliarServicoPageModule)
  },
  {
    path: 'listar-cursos',
    loadChildren: () => import('./curso/listar-cursos/listar-cursos.module').then( m => m.ListarCursosPageModule)
  },
  {
    path: 'cadastrar-curso',
    loadChildren: () => import('./curso/cadastrar-curso/cadastrar-curso.module').then( m => m.CadastrarCursoPageModule)
  },
  {
    path: 'alterar-curso',
    loadChildren: () => import('./curso/alterar-curso/alterar-curso.module').then( m => m.AlterarCursoPageModule)
  },
  {
    path: 'alterar-cao',
    loadChildren: () => import('./cao/alterar-cao/alterar-cao.module').then( m => m.AlterarCaoPageModule)
  },  {
    path: 'alterar-dados-pessoais',
    loadChildren: () => import('./componentes/conta/alterar-dados-pessoais/alterar-dados-pessoais.module').then( m => m.AlterarDadosPessoaisPageModule)
  }







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
