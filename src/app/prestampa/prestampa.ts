import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Backend, Oggetto } from '../backend';

interface RigaPrestampa {
  idoggetto: number;
  nomeoggetto: string;
  selezionato: boolean;
  quantita: number;
}

@Component({
  imports: [FormsModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatInputModule],
  selector: 'app-prestampa',
  styleUrl: './prestampa.scss',
  templateUrl: './prestampa.html',
})
export class Prestampa {
  righe: RigaPrestampa[] = [];
  private readonly backend = inject(Backend);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.backend.listoggetti().subscribe((data: { oggetti: Oggetto[] }) => {
      this.righe = data.oggetti.map((oggetto) => ({
        idoggetto: oggetto.IDoggetto,
        nomeoggetto: oggetto.nomeoggetto,
        selezionato: false,
        quantita: 1,
      }));
      this.cdr.detectChanges();// Uncomment if you need to manually trigger change detection here
    });
  }

  get tuttiSelezionati(): boolean {
    return this.righe.length > 0 && this.righe.every((riga) => riga.selezionato);
  }

  get almenoUnoSelezionato(): boolean {
    return this.righe.some((riga) => riga.selezionato);
  }

  get selezionatiValidi(): boolean {
    return this.righe
      .filter((riga) => riga.selezionato)
      .every((riga) => Number.isInteger(Number(riga.quantita)) && Number(riga.quantita) >= 1 && Number(riga.quantita) <= 10);
  }

  toggleSelezionaTutti(): void {
    const seleziona = !this.tuttiSelezionati;
    this.righe.forEach((riga) => riga.selezionato = seleziona);
  }

  aggiornaSelezione(): void {
    // Il getter aggiorna automaticamente lo stato del checkbox principale.
  }

  stampa(): void {
    const righeSelezionate = this.righe
      .filter((riga) => riga.selezionato)
      .map((riga) => ({ IDoggetto: riga.idoggetto, quantita: Number(riga.quantita) }));

    this.backend.prestampa(righeSelezionate).subscribe(() => {
      const finestra = window.open('https://www.roma-by-night.it/ICU/stampaoggetti.php', '_blank');
      finestra?.focus();
    });
  }
}
