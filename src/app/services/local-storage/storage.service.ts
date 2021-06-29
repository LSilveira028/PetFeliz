import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { Usuario } from '../usuario.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _stotage: Storage | null = null;

  constructor(private storage: Storage) {
      this.init();
   }


   async init()
   {
      const storage = await this.storage.create();
      this._stotage = storage;
   }

   public async gravarNome(nomeP: string)
   {
      await this.storage.set('name', nomeP)
    //  const nome = await this.storage.get('name');
    //  return nome; 
   }

   public async mostrarNome()
   {
     const nome = await this.storage.get('name');
     console.log(nome)
   }

   public async gravarToken(token: string)
   {
     await this.storage.set('token', token);
   }

   public async apagarToken()
   {
     let string: string = "a"
     await this.storage.set('token', string);
   }

   public async buscarToken()
   {
     const token = await this.storage.get('token');
     return token;
   }

   public async gravarInformacoesUsuario(usuario: Usuario)
   {
     await this.storage.set('infoUsu', usuario);  
   }

  public async buscarInformacoesUsuario()
  {
    const usu = await this.storage.get('infoUsu');
    return usu;
  }

  public async apagarInformacoesUsuario()
  {
    await this.storage.remove('infoUsu')
  }

  //Gravará valores booleanos para verificar e o usuário está logado
  public async gravarLogin(logado: boolean)
  {
    await this.storage.set('logado', logado)
  }

  public async verificarLogin()
  {
    return await this.storage.get('logado');
  }

  public async gravarReload(recarregar: boolean)
  {
    await this.storage.set('reload', recarregar)
  }

  public async verificarReload()
  {
    return await this.storage.get('reload');
  }
   
  public async criarKeyFavorito()
   {
     let usuarios: Usuario[];
    await this.storage.set('favoritos', usuarios);
    return "Criado!";
   }

   public async buscarFavoritos()
   {
     return await this.storage.get('favoritos'); 
   }

   public async adicionarFavorito(usuarios: Usuario[])
   {
     await this.storage.set('favoritos', usuarios);
     return await this.storage.get('favoritos');
   }
}
