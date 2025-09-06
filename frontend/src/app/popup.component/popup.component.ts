import { Component, Input, Output, EventEmitter} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-popup',
  imports: [MatButtonModule],
  template: `
    <div class="popup-container">
      <h3><strong> {{ message }} </strong></h3>
      <div class="button-header">
        <button mat-flat-button (click)="triggerResetHistory()">Yes</button>
        <button mat-flat-button (click)="closePopup()">No</button>
      </div>
    </div>
  `,
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  @Input() message: string = "";

  @Output() popupChange = new EventEmitter<{ isPopupChild: boolean, resetHistoryChild: boolean }>();
  
  closePopup() {
    //Returns isPopup to the parent 
    this.popupChange.emit({ isPopupChild: false, resetHistoryChild: false});
  }

    triggerResetHistory() {
    this.popupChange.emit({ isPopupChild: false, resetHistoryChild: true });
  }
}
