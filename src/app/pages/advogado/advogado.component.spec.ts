import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvogadoComponent } from './advogado.component';

describe('AdvogadoComponent', () => {
  let component: AdvogadoComponent;
  let fixture: ComponentFixture<AdvogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvogadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
