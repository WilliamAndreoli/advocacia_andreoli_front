import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireitoPreviComponent } from './direito-previ.component';

describe('DireitoPreviComponent', () => {
  let component: DireitoPreviComponent;
  let fixture: ComponentFixture<DireitoPreviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireitoPreviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireitoPreviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
