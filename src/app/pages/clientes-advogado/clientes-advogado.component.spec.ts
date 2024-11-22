import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAdvogadoComponent } from './clientes-advogado.component';

describe('ClientesAdvogadoComponent', () => {
  let component: ClientesAdvogadoComponent;
  let fixture: ComponentFixture<ClientesAdvogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesAdvogadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesAdvogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
