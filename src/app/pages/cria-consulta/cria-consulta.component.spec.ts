import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriaConsultaComponent } from './cria-consulta.component';

describe('CriaConsultaComponent', () => {
  let component: CriaConsultaComponent;
  let fixture: ComponentFixture<CriaConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriaConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
