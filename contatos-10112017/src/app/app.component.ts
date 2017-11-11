import { Component } from '@angular/core';
import { ContatosDataBaseService } from './servicos/contatos-data-base.service';
import { ContatoModel } from './modelos/contato-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Contatos';

  contatoclicado: ContatoModel;
  
  constructor(private dataBaseService: ContatosDataBaseService){}

  enviarDetalhe(id): void {
    this.contatoclicado = this.dataBaseService.getContato(id);
  }
}
