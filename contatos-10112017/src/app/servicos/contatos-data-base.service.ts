import { EventEmitter, Injectable } from '@angular/core';
import { ContatoModel } from '../modelos/contato-model';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class ContatosDataBaseService {

  urlAPI = "http://localhost:3000/contatos";
  meuContatos: ContatoModel [] = [];
  enviarContato = new EventEmitter();  

  constructor(private http : Http) { 
    /*let c1 : ContatoModel = new ContatoModel("Ana", "123456", "ana@gmail.com", "Trabalho");
    let c2 : ContatoModel = new ContatoModel("Ana", "123456", "ana@gmail.com", "Trabalho");
    this.meuContatos.push(c1);
    this.meuContatos.push(c2);
    this.enviarContato.emit(this.meuContatos);
    console.log(this.meuContatos);*/

    this.obterContatosAPI();
  }

  getProximoId() : number{
    return (this.meuContatos.length + 1);
  }

  setContato(novoContato: ContatoModel): void {
    this.meuContatos.push(novoContato);

    let body = JSON.stringify(novoContato);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    // Cadastrando o contato via API, usando o método POST (HTTP)
    this.http.post(this.urlAPI, body, options)
        .map(response => response.json())
        .subscribe(response => console.log('Cadastrado'))

    this.enviarContato.emit(this.meuContatos);
  }


  getContato(id: number): ContatoModel {
    let contato: ContatoModel;
    contato = this.meuContatos[id];
    return contato;
  }

  excluirContato(id: number){
    this.http.delete(this.urlAPI + '/' + id)
             .map(response => response.json())
             // .subscribe(response => this.enviarContato.emit(this.meuContatos))
             .subscribe(response => this.obterContatosAPI())
  }

  obterContatosAPI(){
    // Obtendo os contatos cadastrados via API, usando o método GET (HTTP)
    this.http.get(this.urlAPI)
             .map(response => this.meuContatos = response.json())
             .subscribe(response => this.enviarContato.emit(this.meuContatos))
  }
}