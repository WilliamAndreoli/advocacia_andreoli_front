import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCriaClienteComponent } from './form-cria-cliente.component';

describe('FormCriaClienteComponent', () => {
  let component: FormCriaClienteComponent;
  let fixture: ComponentFixture<FormCriaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCriaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCriaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
