import { Component, inject} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChallengeService } from '../challenge.service';
import { MCQuestionsComponent } from '../mcquestions.component/mcquestions.component';
import { ChallengeInterface } from '../challenge.interface';
import { QuotaResponseInterface } from '../quota-response.interface';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home.component',
  imports: [MatSelectModule, MatFormFieldModule, MatButtonModule, MCQuestionsComponent],
  template: ` <div class="challenge-container">
    <h2>Language Challenge Generator</h2>
    <div class="quota-display">
      <h3>
        Quota Remaining: @if(quotaRemainingText == ''){{{loadingText}}} @else{{{ quotaRemainingText
        }}}
      </h3>
      <h3>
        Next Reset Date: @if(resetCountDownText == ''){{{loadingText}}} @else{{{ resetCountDownText
        }}}
      </h3>
    </div>
    <div class="difficulty-select">
      <mat-form-field appearance="fill">
        <mat-label>Select Difficulty</mat-label>
        <mat-select [(value)]="selectedDifficulty">
          <mat-option value="easy">Easy</mat-option>
          <mat-option value="medium">Medium</mat-option>
          <mat-option value="hard">Hard</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Select Language</mat-label>
        <mat-select [(value)]="selectedLanguage">
          <mat-option value="spanish">Spanish</mat-option>
          <mat-option value="french">French</mat-option>
          <mat-option value="german">German</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <button mat-raised-button="elevated" id="generate-button" (click)="onGenerateChallenge()">
      Generate
    </button>
    @if(calledGenerate){<app-mcquestions
      [challengeInfo]="mCQuestionsInfo"
      [answered]="false"
      [message]="generateMessage"
    />}
  </div>`,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  challengeService: ChallengeService = inject(ChallengeService);
  selectedDifficulty: string = '';
  selectedLanguage: string = '';

  quotaRemainingText: string = '';
  loadingText: string = 'Loading...';
  resetCountDownText: string = '';

  private resetAt?: number;
  private timerSub?: Subscription;

  mCQuestionsInfo: ChallengeInterface | null = null;
  calledGenerate = false;
  generateMessage = '';

  async ngOnInit() {
    await this.onGetQuota();
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
  }

  async onGetQuota() {
    var quota: QuotaResponseInterface | null = await this.challengeService.getUserQuota();

    if (quota == null) {
      this.quotaRemainingText = 'Failed to fetch user quota';
    } else {
      this.quotaRemainingText = quota.quotaRemaining.toString();
      this.resetAt = new Date(quota.resetCountDown).getTime();

      this.timerSub?.unsubscribe();
      this.timerSub = interval(1000).subscribe(() => this.updateCountDown());
    }
  }
  async onGenerateChallenge() {
    this.calledGenerate = true;
    if (this.selectedDifficulty === '' || this.selectedLanguage === '') {
      this.generateMessage = 'Please select a Difficulty and Language';
    } else {
      this.generateMessage = 'Loading...';
      this.mCQuestionsInfo = await this.challengeService.generateChallenge(
        this.selectedDifficulty,
        this.selectedLanguage
      );
      await this.onGetQuota();
    }
  }

  private updateCountDown() {
    if (!this.resetAt) {
      this.quotaRemainingText = 'Loading...';
      return;
    } else {
      //gives the remaining time until reset i.e the distance/difference
      const diff = this.resetAt - Date.now();
      if (diff <= 0) {
        this.resetCountDownText = 'Reset!';
        //Stops the timer
        this.timerSub?.unsubscribe();
        return;
      } else {
        //Converts from milliseconds to appropraite time unit, / so we can have a number to plug into Math.floor
        const hours = Math.floor(diff / (1000 * 60 * 60));
        //Modulus retireves only the left over minutes
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        //creates a string of hours and second, ensuring each is only 2 digits
        this.resetCountDownText =
          `${hours.toString().padStart(2, '0')}:` +
          `${minutes.toString().padStart(2, '0')}:` +
          `${seconds.toString().padStart(2, '0')}`;
      }
    }
  }
}
