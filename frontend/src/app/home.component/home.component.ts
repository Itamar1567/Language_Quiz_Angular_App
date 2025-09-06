import { Component, inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChallengeService } from '../challenge.service';
import { MCQuestionsComponent } from '../mcquestions.component/mcquestions.component';
import { ChallengeInterface } from '../challenge.interface';
import { QuotaResponseInterface } from '../quota-response.interface';

@Component({
  selector: 'app-home.component',
  imports: [MatSelectModule, MatFormFieldModule, MatButtonModule, MCQuestionsComponent],
  template: ` <div class="challenge-container">
    <h2>Language Challenge Generator</h2>
    <div class="quota-display">
      <h3>Quota Remaining: 
        @if(quotaRemainingText == null){{{quotaLoadingText}}} 
        @else{{{ quotaRemainingText }} <br> Next Reset Date: {{resetCountDownText}}}</h3>
        
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

  quotaRemainingText: string = "";
  quotaLoadingText: string = 'Loading...';
  resetCountDownText: string = "";

  mCQuestionsInfo: ChallengeInterface | null = null;
  calledGenerate = false;
  generateMessage = '';

  async ngOnInit() {
    await this.onGetQuota();
  }

  async onGetQuota() {
    
    var quota: QuotaResponseInterface | null = await this.challengeService.getUserQuota();

    if (quota == null) {
      this.quotaRemainingText = 'Failed to fetch user quota';
    } else {
      this.quotaRemainingText = quota.quotaRemaining.toString();
      this.resetCountDownText = quota.resetCountDown.toString();
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
}
