import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightExampleComponent } from './highlight-example.component';

describe('HighlightExampleComponent', () => {
  let component: HighlightExampleComponent;
  let fixture: ComponentFixture<HighlightExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighlightExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
