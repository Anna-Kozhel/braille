import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrailleToEngComponent } from './braille-to-eng.component';

describe('BrailleToEngComponent', () => {
  let component: BrailleToEngComponent;
  let fixture: ComponentFixture<BrailleToEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrailleToEngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrailleToEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
