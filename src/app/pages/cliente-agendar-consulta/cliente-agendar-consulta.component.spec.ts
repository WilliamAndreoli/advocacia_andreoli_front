import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteAgendarConsultaComponent } from './cliente-agendar-consulta.component';

describe('ClienteAgendarConsultaComponent', () => {
  let component: ClienteAgendarConsultaComponent;
  let fixture: ComponentFixture<ClienteAgendarConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteAgendarConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteAgendarConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
