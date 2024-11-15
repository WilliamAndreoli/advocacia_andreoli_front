import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoRapidoComponent } from './acesso-rapido.component';

describe('AcessoRapidoComponent', () => {
  let component: AcessoRapidoComponent;
  let fixture: ComponentFixture<AcessoRapidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoRapidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
