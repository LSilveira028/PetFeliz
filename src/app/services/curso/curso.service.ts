import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Curso{
  id: number;
  nome: string;
  anoConclusao: Date;

}

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private api_url = "http://pet-feliz.somee.com/PetFeliz/Curso/";

  // private api_url = "http://localhost:5000/Curso/";

  constructor(private http: HttpClient) { }

  adicionarCurso(curso: Curso, header: HttpHeaders)
  {
    return this.http.post(this.api_url + "AdicionarCurso", curso, { headers: header });
  }

  listarCursos(idDogW: number, header: HttpHeaders)
  {
    return this.http.get<Curso[]>(this.api_url + "ListarCursos/" + idDogW, { headers: header});
  }

  alterarCurso(idCurso: number, curso: Curso, header: HttpHeaders)
  {
    return this.http.put(this.api_url + "AlterarCurso/" +  idCurso, curso, { headers: header} )
  }

  removerCurso(idCurso: number, header: HttpHeaders)
  {
    return this.http.delete(this.api_url + "RemoverCurso/" + idCurso, { headers: header })
  }

}
