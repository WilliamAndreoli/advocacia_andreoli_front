import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireitoCivilComponent } from './direito-civil.component';

describe('DireitoCivilComponent', () => {
  let component: DireitoCivilComponent;
  let fixture: ComponentFixture<DireitoCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireitoCivilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DireitoCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
