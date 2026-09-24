import { Component, OnInit, inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PersonaggiList , Backend} from '../backend';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AfterViewInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  imports: [CommonModule, MatCardModule, MatDividerModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatCheckboxModule, MatSortModule, MatGridListModule],
  selector: 'app-messaggi',
  styleUrl: './messaggi.scss',
  templateUrl: './messaggi.html',
})



export class Messaggi implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  private backend = inject(Backend);
  private cdr = inject(ChangeDetectorRef);
  currentSortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';


  listapersonaggi: PersonaggiList[] = [];
  dataSource = new MatTableDataSource<PersonaggiList>(this.listapersonaggi);
  displayedColumns: string[] = ['select', 'user_id', 'nomepg', 'nomeclan', 'nomedominio', 'nomesocieta'];
  selection = new SelectionModel<PersonaggiList>(true, []);


  constructor() {}

  ngOnInit() {
    this.backend.listPersonaggi().subscribe(
      (data: any) => {
        this.listapersonaggi = data.personaggi  ;
        this.dataSource.data = this.listapersonaggi;
        this.cdr.detectChanges();
        //console.log(this.listapersonaggi);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  inviaMessaggio(form: NgForm) {
    const messaggio = (form.value.messaggio ?? '').trim();
    if (!messaggio) {
      return;
    }
    // Logica per inviare il messaggio
    const userIdsSelezionati = this.selection.selected.map(obj => obj.user_id);
    this.backend.inviaMessaggio(messaggio, userIdsSelezionati).subscribe(
      (response: any) => {
        //console.log('Risposta dal backend:', response);
        //console.log('Messaggio inviato', messaggio);
        form.resetForm();
      }
    );

  }



  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataSource.data);
    }
  }

}
