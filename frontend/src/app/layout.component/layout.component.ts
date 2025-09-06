import { Component, ElementRef, inject, ViewChild, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [MatButtonModule],
  template: `
    <section class="layout-container">
      <ul class="layout-links">
        <li><img src="images/favicon.ico" alt="logo" id="logo" /></li>
        <li><button mat-raised-button color="primary" extended (click)="moveToHome()">Home</button></li>
        <li><button mat-raised-button="elevated" (click)="moveToHistory()">History</button></li>
        <li #userButtonContainer></li>
      </ul>
    </section>
    <div class="copyright">
      <p id="copyright-text">@Copyright: Itamar1567</p>
      <div></div>
    </div>
  `,
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  @ViewChild('userButtonContainer', { static: true })
  userButtonContainer!: ElementRef<HTMLDivElement>;

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  moveToHome()
  {
    this.router.navigate(["/home"]);
  }
  moveToHistory()
  {
    this.router.navigate(["/history"]);
  }
  ngOnInit() {

    if (this.authService.signedInSignalValue() == true) {

      this.router.navigate(["/home"])

      this.authService.setSignedInSignal(true);

      this.userButtonContainer.nativeElement.innerHTML = '';

      this.authService.getClerk().mountUserButton(this.userButtonContainer.nativeElement);
    }
  }
}
