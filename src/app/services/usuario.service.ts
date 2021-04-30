import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NumericValueAccessor } from '@ionic/angular';

export interface Usuario
{
    tipoConta: number;
    nome: string;
    DataNascimento: Date;
    dataCadastro: Date;
    fotoPerfil: ImageData; //Para verificação
    email: string;
    whatsapp: string;
    PasswordString: string;
    disponivel: number;
    servicoDogWalker: {
      avaliacaoMedia: Float32Array;
      sobre: string;
      preferencias: string;
      valorServico: number;
      aceitaCartao: boolean;
    }
    latitude: number;
    longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  tokenAnderson = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwibmFtZSI6IkFuZGVyc29uIiwibmJmIjoxNjE4NzYwODgyLCJleHAiOjE2MTkxOTI4ODIsImlhdCI6MTYxODc2MDg4Mn0.4QawpGiCFmhwDwJtekKdgHBV8ljHGeNpRoRI-D9E64wOf0RvhUnBwcYw26Mn7GTYv_TZ6xHwIUZNc7DnRnxd0A"

  header = new HttpHeaders({
    'Authorization': 'Bearer ' + this.tokenAnderson
  })


  private api_url = 'http://pet-feliz.somee.com/PetFeliz/Usuario/'

  // private api_url = "http://localhost:5000/Usuario/"
  
  private proprietario = 1;
  private dogWalker = 2;

  constructor(private http: HttpClient) { }

  //Este método vai receber as informações do usuario e o tipo de conta
  cadastrarUsuario(usuario: Usuario, tipoU: number)
  {
    //O tipo da conta do usuário vai ser de acordo com o que foi passado
    usuario.tipoConta = tipoU;

    //Faz a requisição para cadastrar o usuário
    return this.http.post(this.api_url + 'Cadastrar', usuario);
  }

  procurarDogWalkers()
  {
    return this.http.get<[Usuario]>(this.api_url + 'DogWalkers', { headers: this.header})//{headers: this.headers})
  }


}