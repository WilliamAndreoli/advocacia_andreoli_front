import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosClienteComponent } from './processos-cliente.component';

describe('ProcessosClienteComponent', () => {
  let component: ProcessosClienteComponent;
  let fixture: ComponentFixture<ProcessosClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessosClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
