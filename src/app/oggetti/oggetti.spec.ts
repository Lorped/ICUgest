import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Oggetti } from './oggetti';

describe('Oggetti', () => {
  let component: Oggetti;
  let fixture: ComponentFixture<Oggetti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oggetti],
    }).compileComponents();

    fixture = TestBed.createComponent(Oggetti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
