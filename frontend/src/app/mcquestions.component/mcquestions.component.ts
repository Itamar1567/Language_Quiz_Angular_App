import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeInterface } from '../challenge.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mcquestions',
  imports: [CommonModule, MatButtonModule],
  template: `
    @if (challengeInfo){
    <div class="mcq-main">
      <section class="questions-container">
        <ul class="stats-list">
          <li>
            <p><strong>Difficulty: </strong>{{ challengeInfo.difficulty }}</p>
          </li>
          <li>
            <p><strong>Language: </strong>{{ challengeInfo.language }}</p>
          </li>
        </ul>
        <p id="title">{{ challengeInfo.title }}</p>
        <p>{{ challengeInfo.title }}</p>
        <ul class="options">
          <li *ngFor="let i of challengeInfo?.options; index as key">
            <div [class]="handleOptionClass(key)" (click)="handleSelection(key)">
              {{ challengeInfo.options.at(key) }}
            </div>
          </li>
        </ul>
        @if(answered) {
        <h1>Explanation</h1>
        <p>{{ challengeInfo.explanation }}</p>
        }
      </section>
    </div>
    } @else{
    <div class="wait-container">
      <p>
        <strong>{{ message }}</strong>
      </p>
    </div>
    }
  `,
  styleUrl: './mcquestions.component.css',
})
export class MCQuestionsComponent implements OnChanges {
  @Input() answered: boolean = false;
  @Input() message: string = 'Loading...';
  @Input() challengeInfo: ChallengeInterface | null = null;

  selectedKey: number = -1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['challengeInfo']) {
      this.answered = false;
      this.selectedKey = -1;
    }
  }

  handleOptionClass(currentKey: number): string {
    if (this.selectedKey == -1) {
      return 'option-active';
    } else if (String(currentKey) == this.challengeInfo?.correctAnswerId) {
      return 'option-inactive correct';
    } else if (this.selectedKey == currentKey) {
      return 'option-inactive incorrect';
    }
    return 'option-inactive';
  }
  handleSelection(selectedOption: number) {
    this.answered = true;
    this.selectedKey = selectedOption;
  }
}
