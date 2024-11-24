import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasAdvogadoComponent } from './consultas-advogado.component';

describe('ConsultasAdvogadoComponent', () => {
  let component: ConsultasAdvogadoComponent;
  let fixture: ComponentFixture<ConsultasAdvogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasAdvogadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultasAdvogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
