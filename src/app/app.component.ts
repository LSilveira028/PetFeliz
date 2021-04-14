import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Procurar', url: '/procurar', icon: 'location' },
    { title: 'Meus cães', url: '/meuscaes', icon: 'paw' },
    { title: 'Favoritos', url: '/favoritos', icon: 'heart' },
    { title: 'Conta', url: '/conta', icon: 'cog' },
    { title: 'Sair', url: '/sair', icon: 'log-out' },
    { title: 'Termos de Uso', url: '/termosdeuso', icon: 'book' },
    { title: 'Política de Privacidade', url: '/politicadeprivacidade', icon: 'lock-closed' },
  ];
  //public labels = ['Termos de Uso', 'Política de Privacidade'];
  constructor() {}
  
}
