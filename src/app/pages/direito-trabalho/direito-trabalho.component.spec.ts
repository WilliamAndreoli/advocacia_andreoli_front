import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireitoTrabalhoComponent } from './direito-trabalho.component';

describe('DireitoTrabalhoComponent', () => {
  let component: DireitoTrabalhoComponent;
  let fixture: ComponentFixture<DireitoTrabalhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireitoTrabalhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireitoTrabalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
