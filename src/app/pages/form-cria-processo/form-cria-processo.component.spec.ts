import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCriaProcessoComponent } from './form-cria-processo.component';

describe('FormCriaProcessoComponent', () => {
  let component: FormCriaProcessoComponent;
  let fixture: ComponentFixture<FormCriaProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCriaProcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCriaProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
