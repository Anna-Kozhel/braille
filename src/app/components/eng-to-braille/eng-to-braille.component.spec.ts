import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngToBrailleComponent } from './eng-to-braille.component';

describe('EngToBrailleComponent', () => {
  let component: EngToBrailleComponent;
  let fixture: ComponentFixture<EngToBrailleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngToBrailleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngToBrailleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
