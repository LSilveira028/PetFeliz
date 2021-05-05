import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NumericValueAccessor } from '@ionic/angular';

export class Usuario
{
    tipoConta: number;
    nome: string;
    DataNascimento: Date;
    dataCadastro: Date;
    fotoPerfil: ImageData; //Para verificação
    email: string;
    whatsApp: string;
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
    
    //nao mapeado
    distancia: number;
    textoCartao: string;
    textoDisponivel: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  tokenAnderson = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4IiwibmFtZSI6IkFuZGVyc29uIiwibmJmIjoxNjE5MjA1NjQyLCJleHAiOjE2MjA0MTUyNDIsImlhdCI6MTYxOTIwNTY0Mn0.vxze4DpFdTwHjOEGZ4tsjTIRL8JoV5PA-yTLEv9-GCbYiyXEm_PSipjOQloJsEli2OiIVgez0TSY5q-NOioRVw"

  header = new HttpHeaders({
    'Authorization': 'Bearer ' + this.tokenAnderson
  })

  

  private api_url = 'http://pet-feliz.somee.com/PetFeliz/Usuario/'

  //private api_url = "http://localhost:5000/Usuario/"
  
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
    return this.http.get<Usuario[]>(this.api_url + 'DogWalkers', { headers: this.header})
  }


}
