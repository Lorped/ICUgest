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
});
