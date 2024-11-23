import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAdvogadoDetailsComponent } from './clientes-advogado-details.component';

describe('ClientesAdvogadoDetailsComponent', () => {
  let component: ClientesAdvogadoDetailsComponent;
  let fixture: ComponentFixture<ClientesAdvogadoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesAdvogadoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesAdvogadoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
