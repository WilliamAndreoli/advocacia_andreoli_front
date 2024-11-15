import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtuacaoComponent } from './atuacao.component';

describe('AtuacaoComponent', () => {
  let component: AtuacaoComponent;
  let fixture: ComponentFixture<AtuacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtuacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
