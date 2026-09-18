import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cambiaoggetto } from './cambiaoggetto';

describe('Cambiaoggetto', () => {
  let component: Cambiaoggetto;
  let fixture: ComponentFixture<Cambiaoggetto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cambiaoggetto],
    }).compileComponents();

    fixture = TestBed.createComponent(Cambiaoggetto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
