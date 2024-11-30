import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAdvogadoDetailsComponent } from './consulta-advogado-details.component';

describe('ConsultaAdvogadoDetailsComponent', () => {
  let component: ConsultaAdvogadoDetailsComponent;
  let fixture: ComponentFixture<ConsultaAdvogadoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaAdvogadoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaAdvogadoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
