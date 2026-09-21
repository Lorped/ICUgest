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
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


interface RigaBase {
  tipo: 'oggetto';
  oggetto: Oggetto;
}
interface RigaCondizione {
  tipo: 'condizione';
  parentID: number;
  dettaglio: Condizione;
}
interface RigaCondizione2 {
  tipo: 'condizione2';
  parentID: number;
  dettaglio: Condizione;
}
interface RigaRisposta {
  tipo: 'risposta';
  parentID: number;
  domanda: string;
  si: string;
  no: string; 
}
interface RigaPaired {
  tipo: 'paired';
  parentID: number;
  oggettoPaired: string;
  descrizionePaired: string;
}
interface RigaEfetto {
  tipo: 'effetto';
  parentID: number;
  adddisciplina: string;
}


type Riga = | RigaBase | RigaCondizione| RigaCondizione2 | RigaRisposta | RigaPaired | RigaEfetto;

@Component({
  imports: [FormsModule, MatInputModule, MatCardModule, MatButtonModule, MatRadioModule, MatDividerModule, MatTableModule, MatGridListModule, MatIconModule ],
  selector: 'app-oggetti',
  styleUrl: './oggetti.scss',
  templateUrl: './oggetti.html',
})
export class Oggetti {
  listaoggetti: Oggetto[] = [];
  displayedColumns: string[] = ['IDoggetto', 'Barcode', 'Nomeoggetto', 'Descrizione', 'Fissomobile', 'Incremento', 'Cancella'];
  detailColumns: string[] = ['Dummy', 'Tipocond', 'Valcond', 'descrX'];
  detailColumns2: string[] = ['Risp', 'Tipocond', 'Valcond', 'descrX'];
  rispostaColumns: string[] = ['Dummy', 'Domanda', 'Si', 'No'];
  pairedColumns: string[] = ['Dummy', 'OggettoPaired', 'DescrizionePaired'];
  effettoColumns: string[] = ['Dummy', 'Dummy', 'AddDisciplina'];
  

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
  private route = inject(Router);

  constructor() {}

  ngOnInit() {
    this.backend.listoggetti().subscribe(
      (data: any) => {
        this.listaoggetti = data.oggetti;
        this.datasource.data = this.creaRighe(this.listaoggetti);
        console.log(this.datasource.data);

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
      ...((oggetto.adddisciplina ?? '').trim() !== '' ? [{
        tipo: 'effetto' as const,
        parentID: oggetto.IDoggetto,
        adddisciplina: oggetto.adddisciplina
      }] : []),    
      ...oggetto.condizioni.map((condizioni): Riga => ({
        tipo: 'condizione',
        parentID: oggetto.IDoggetto,
        dettaglio: condizioni
      })),
      ...((oggetto.domanda ?? '').trim() !== '' ? [{
        tipo: 'risposta' as const,
        parentID: oggetto.IDoggetto,
        domanda: oggetto.domanda,
        si: oggetto.r1,
        no: oggetto.r2
      }] : []),  
      ...oggetto.condizioni2.map((condizioni): Riga => ({
        tipo: 'condizione2',
        parentID: oggetto.IDoggetto,
        dettaglio: condizioni
      })),
      ...((oggetto.paired.idpaired !== 0 ) ? [{
        tipo: 'paired' as const,
        parentID: oggetto.IDoggetto,
        oggettoPaired: oggetto.paired.nomepaired,
        descrizionePaired: oggetto.paired.descpaired
      }] : [])
    ]);
  }


  isOggetto = (_index: number, row: Riga) => row.tipo === 'oggetto';
  isCondizione = (_index: number, row: Riga) => row.tipo === 'condizione';
  isCondizione2 = (_index: number, row: Riga) => row.tipo === 'condizione2';
  isRisposta = (_index: number, row: Riga) => row.tipo === 'risposta';
  isPaired = (_index: number, row: Riga) => row.tipo === 'paired';
  isEffetto = (_index: number, row: Riga) => row.tipo === 'effetto';


  cancellaoggetto(IDoggetto: number) {
    this.backend.cancellaoggetto(IDoggetto).subscribe(
      (data: any) => {
        console.log(data);
        this.ngOnInit(); // Refresh the list after deleting
      }
    );
  }
  aggiungioggetto() {
    this.backend.addoggetto(this.newnomeoggetto, this.newdescrizione, this.newfissomobile).subscribe(
      (data: any) => {
        console.log(data);
        this.ngOnInit(); // Refresh the list after adding
      }
    );
  }

  modifica(IDoggetto: number, item: Oggetto) {
    this.route.navigate(['/cambiaoggetto', IDoggetto]);
  }
  
  stampa() {
    var win = window.open("https://www.roma-by-night.it/ICU/stampaoggetti.php", '_blank');
    if (win) {
      win.focus();
    }
  }
}
