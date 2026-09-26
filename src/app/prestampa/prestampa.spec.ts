import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Prestampa } from './prestampa';

describe('Prestampa', () => {
  let component: Prestampa;
  let fixture: ComponentFixture<Prestampa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Prestampa],
    }).compileComponents();

    fixture = TestBed.createComponent(Prestampa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the master checkbox indeterminate for a partial selection', () => {
    component.righe = [
      { idoggetto: 1, nomeoggetto: 'Primo', selezionato: true, quantita: 1 },
      { idoggetto: 2, nomeoggetto: 'Secondo', selezionato: false, quantita: 1 },
    ];

    expect(component.selezioneIndeterminata).toBe(true);
    expect(component.tuttiSelezionati).toBe(false);
  });
});
