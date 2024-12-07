import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigContaComponent } from './config-conta.component';

describe('ConfigContaComponent', () => {
  let component: ConfigContaComponent;
  let fixture: ComponentFixture<ConfigContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigContaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
