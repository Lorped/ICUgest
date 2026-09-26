import { AfterViewInit, Component, ChangeDetectorRef, inject, ViewChild } from '@angular/core';
import { Backend, MessaggiFull } from '../backend';
import { OnInit } from '@angular/core';
//import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card'; 
//import { MatIconModule } from '@angular/material/icon'; 

@Component({
  imports: [ MatTableModule, MatSortModule, MatDividerModule, MatCardModule],
  selector: 'app-messaggifull',
  styleUrl: './messaggifull.scss',
  templateUrl: './messaggifull.html',
})
export class Messaggifull implements OnInit, AfterViewInit {

  private backend = inject(Backend);
  private cdr = inject(ChangeDetectorRef);

  messaggifull: MessaggiFull[] = [];
  dataSource = new MatTableDataSource<MessaggiFull>(this.messaggifull);
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['ID', 'nomepg', 'Ora', 'Testo', 'Nomedestinatario'];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.backend.getMessaggiFull().subscribe(
      (data: any) => {
        this.messaggifull = data.messaggi;
        this.dataSource.data = this.messaggifull;
        this.cdr.detectChanges();
        console.log(this.messaggifull);
      }
    );
  }


}
