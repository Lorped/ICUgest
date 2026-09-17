import { Component } from '@angular/core';
import { Backend, Oggetto, Condizione } from '../backend';
import { inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';


interface RigaBase {
  tipo: 'oggetto';
  oggetto: Oggetto;
}
interface RigaCondizione {
  tipo: 'condizione';
  parentID: number;
  dettaglio: Condizione;
}

type Riga = | RigaBase | RigaCondizione;

@Component({
  imports: [FormsModule, MatInputModule, MatCardModule, MatButtonModule, MatRadioModule, MatDividerModule, MatTableModule, MatGridListModule ],
  selector: 'app-oggetti',
  styleUrl: './oggetti.scss',
  templateUrl: './oggetti.html',
})
export class Oggetti {
  listaoggetti: Oggetto[] = [];
  displayedColumns: string[] = ['IDoggetto', 'Barcode', 'Nomeoggetto', 'Descrizione', 'Fissomobile', 'Cancella'];
  detailColumns: string[] = ['Dummy', 'Tipocond', 'Valcond', 'descrX'];

  datasource = new MatTableDataSource<Riga>( this.creaRighe(this.listaoggetti) ); 


  newnomeoggetto = '';
  newdescrizione = '';
  newfissomobile = 'M';
    listafissomobile: { id: string, nome: string }[] = [
    {id: 'F', nome: 'Fisso'} ,
    {id: 'M', nome: 'Mobile'} ,
    {id: 'E', nome: 'Esterno'}
  ];

  private backend = inject(Backend);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit() {
    this.backend.listoggetti().subscribe(
      (data: any) => {
        this.listaoggetti = data.oggetti;
        this.datasource.data = this.creaRighe(this.listaoggetti);
        this.cdr.detectChanges();
      }
    );
  }

  creaRighe(listaoggetti: Oggetto[]): Riga[] {
    return listaoggetti.flatMap((oggetto): Riga[] => [
      {
        tipo: 'oggetto',
        oggetto
      },
      ...oggetto.condizioni.map((condizioni): Riga => ({
        tipo: 'condizione',
        parentID: oggetto.IDoggetto,
        dettaglio: condizioni
      })) 
    ]);
  }


  isOggetto (_index: number, row: Riga){
    return row.tipo === 'oggetto';
  }

  isCondizione (_index: number, row: Riga){
    return row.tipo === 'condizione';
  }


  cancellaoggetto(IDoggetto: number) {}
  aggiungioggetto() {}
  modifica(IDoggetto: number, item: Oggetto) {}
  stampa() {}
}
