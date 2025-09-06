import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-popup',
  imports: [MatButtonModule],
  template: `
    <div class="popup-container">
      <h3><strong> {{ message }} </strong></h3>
      <div class="button-header">
        <button mat-flat-button>Yes</button>
        <button mat-flat-button>No</button>
      </div>
    </div>
  `,
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  @Input() message: string = "Would you like to reset history";
}
