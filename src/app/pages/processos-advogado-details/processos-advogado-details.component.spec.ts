import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessosAdvogadoDetailsComponent } from './processos-advogado-details.component';

describe('ProcessosAdvogadoDetailsComponent', () => {
  let component: ProcessosAdvogadoDetailsComponent;
  let fixture: ComponentFixture<ProcessosAdvogadoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessosAdvogadoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessosAdvogadoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
