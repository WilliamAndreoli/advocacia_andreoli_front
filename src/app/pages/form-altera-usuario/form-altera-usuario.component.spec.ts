import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlteraUsuarioComponent } from './form-altera-usuario.component';

describe('FormAlteraUsuarioComponent', () => {
  let component: FormAlteraUsuarioComponent;
  let fixture: ComponentFixture<FormAlteraUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAlteraUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAlteraUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
