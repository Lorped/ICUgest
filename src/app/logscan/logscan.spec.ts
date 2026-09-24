import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Logscan } from './logscan';

describe('Logscan', () => {
  let component: Logscan;
  let fixture: ComponentFixture<Logscan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logscan],
    }).compileComponents();

    fixture = TestBed.createComponent(Logscan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
