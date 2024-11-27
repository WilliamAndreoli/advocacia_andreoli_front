import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessoEdicaoComponent } from './processo-edicao.component';

describe('ProcessoEdicaoComponent', () => {
  let component: ProcessoEdicaoComponent;
  let fixture: ComponentFixture<ProcessoEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessoEdicaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
