import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ChallengeService } from '../challenge.service';
import { ChallengeInterface } from '../challenge.interface';
import { PopupComponent } from '../popup.component/popup.component';
import { MCQuestionsComponent } from '../mcquestions.component/mcquestions.component';

@Component({
  selector: 'app-history',
  imports: [MatButtonModule, CommonModule, MCQuestionsComponent, PopupComponent],
  template: `
    @if(isPopup) { <app-popup message="Would you like to reset history" (popupChange)="handlePopUpChange($event)" />}
    <div class="main-container">
      <div class="history-container">
        <div class="history-header">
          <h2>History</h2>
          <section class="button-holder">
            <button mat-flat-button (click)="resetHistoryCall()">Reset History</button>
            <button mat-flat-button (click)="generateUserChallenges()">Reset Selection</button>
          </section>
        </div>
        <ul class="history-challenges-container">
          <li *ngFor="let i of challenges; index as key">
            <app-mcquestions [challengeInfo]="challenges[key]" [answered]="false" />
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  isPopup: boolean = false;
  resetHistory: boolean = false;

  challenges: ChallengeInterface[] = [];

  challengeService: ChallengeService = inject(ChallengeService);

  async ngOnInit() {
    await this.generateUserChallenges();
  }

  handlePopUpChange(event: { isPopupChild: boolean; resetHistoryChild: boolean }) {
    this.isPopup = event.isPopupChild;
    this.resetHistory = event.resetHistoryChild;
    if (this.resetHistory == true) {
      this.onResetHistory();
    }
  }
  resetHistoryCall() {
    this.isPopup = true;
  }
  async onResetHistory() {
    if (this.resetHistory == false) {
      return;
    }
    var tempChallengesHolder = await this.challengeService.resetUserChallenges();
    this.resetHistory = false;
    if (tempChallengesHolder == null) {
      console.log('Could not fetch challegnes');
    } else {
      this.challenges = tempChallengesHolder;
    }

    this.generateUserChallenges();
  }
  async generateUserChallenges() {
    var tempChallengesHolder = await this.challengeService.getAllUserChallenges();

    if (tempChallengesHolder == null) {
      console.log('Could not fetch challegnes');
    } else {
      this.challenges = tempChallengesHolder;
    }
  }
}
