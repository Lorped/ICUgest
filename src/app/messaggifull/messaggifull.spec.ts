import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Messaggifull } from './messaggifull';

describe('Messaggifull', () => {
  let component: Messaggifull;
  let fixture: ComponentFixture<Messaggifull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messaggifull],
    }).compileComponents();

    fixture = TestBed.createComponent(Messaggifull);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
