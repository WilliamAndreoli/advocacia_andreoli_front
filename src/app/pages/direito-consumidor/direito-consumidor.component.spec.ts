import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireitoConsumidorComponent } from './direito-consumidor.component';

describe('DireitoConsumidorComponent', () => {
  let component: DireitoConsumidorComponent;
  let fixture: ComponentFixture<DireitoConsumidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireitoConsumidorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireitoConsumidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
