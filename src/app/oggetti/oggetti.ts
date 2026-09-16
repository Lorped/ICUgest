import { Component } from '@angular/core';
import { Backend, Oggetto } from '../backend';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  imports: [FormsModule, MatInputModule, MatCardModule, MatButtonModule, MatRadioModule, MatDividerModule ],
  selector: 'app-oggetti',
  styleUrl: './oggetti.scss',
  templateUrl: './oggetti.html',
})
export class Oggetti {
  listaoggetti: Oggetto[] = [];

  nomeoggetto = '';
  descrizione = '';
  fissomobile = 'M';
    listafissomobile: { id: string, nome: string }[] = [
    {id: 'F', nome: 'Fisso'} ,
    {id: 'M', nome: 'Mobile'} ,
    {id: 'E', nome: 'Esterno'}
  ];

  private backend = inject(Backend);

  constructor() {}

  ngOnInit() {
    this.backend.listoggetti().subscribe(
      (data: any) => {
        this.listaoggetti = data.oggetti;
        console.log(this.listaoggetti);
      }
    );
  }


  cancellaoggetto(IDoggetto: number) {}
  aggiungioggetto() {}
  modifica(IDoggetto: number, item: Oggetto) {}
  stampa() {}
}
