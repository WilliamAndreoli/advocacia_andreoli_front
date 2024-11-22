import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvLayoutComponent } from './adv-layout.component';

describe('AdvLayoutComponent', () => {
  let component: AdvLayoutComponent;
  let fixture: ComponentFixture<AdvLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
