import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEdicaoComponent } from './consulta-edicao.component';

describe('ConsultaEdicaoComponent', () => {
  let component: ConsultaEdicaoComponent;
  let fixture: ComponentFixture<ConsultaEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaEdicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
