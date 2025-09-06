import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCQuestionsComponent } from './mcquestions.component';

describe('MCQuestionsComponent', () => {
  let component: MCQuestionsComponent;
  let fixture: ComponentFixture<MCQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
