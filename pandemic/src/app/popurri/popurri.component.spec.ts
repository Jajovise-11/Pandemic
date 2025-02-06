import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopurriComponent } from './popurri.component';

describe('PopurriComponent', () => {
  let component: PopurriComponent;
  let fixture: ComponentFixture<PopurriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopurriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopurriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
