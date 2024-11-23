import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosAdvogadoComponent } from './processos-advogado.component';

describe('ProcessosAdvogadoComponent', () => {
  let component: ProcessosAdvogadoComponent;
  let fixture: ComponentFixture<ProcessosAdvogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessosAdvogadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessosAdvogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
