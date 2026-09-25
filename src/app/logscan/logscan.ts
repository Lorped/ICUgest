import { AfterViewInit, Component, ChangeDetectorRef, inject, ViewChild } from '@angular/core';
import { Backend, LogscanItem } from '../backend';
import { OnInit } from '@angular/core';
//import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card'; 
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  imports: [ MatTableModule, MatSortModule, MatDividerModule, MatCardModule, MatIconModule ],
  selector: 'app-logscan',
  styleUrl: './logscan.scss',
  templateUrl: './logscan.html',
})


export class Logscan implements OnInit, AfterViewInit {

  private backend = inject(Backend);
  private cdr = inject(ChangeDetectorRef);

  logscan: LogscanItem[] = [];
  dataSource = new MatTableDataSource<LogscanItem>(this.logscan);
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['IDoggetto' , 'nomepg',  'datascan', 'nomeoggetto', 'descrizione', 'paired_nomeoggetto'];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.backend.getlogscan().subscribe(
      (data: any) => {
        this.logscan = data.logscan;
        this.dataSource.data = this.logscan;
        this.cdr.detectChanges();
        console.log(this.logscan);
      }
    );
  }


}


