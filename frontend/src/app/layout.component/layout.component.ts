import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <section class="layout-container">
      <ul class="layout-links">
        <li><img src="images/language_app_logo.png" alt="logo" id="logo" /></li>
        <li id="hamburger-menu">
          <nav id="hamburger-nav">
            <img
              [class]="HamburgerIconClicked"
              src="images/hamburger-menu.png"
              alt="hamburger menu"
              (click)="toggleMenu()"
            />
            <div [className]="hamburgerLinksClass">
              <li><a (click)="moveToHome()">Home</a></li>
              <li><a (click)="moveToHistory()">History</a></li>
              <li #userButtonContainerHamburger id="user-button-hamburger"></li>
            </div>
          </nav>
        </li>
        <li id="link-button">
          <button mat-raised-button color="primary" extended (click)="moveToHome()">Home</button>
        </li>
        <li id="link-button"><button mat-raised-button="elevated" (click)="moveToHistory()">History</button></li>
        <li id="link-button" #userButtonContainer></li>
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
  @ViewChild('userButtonContainerHamburger', { static: true })
  userButtonContainerHamburger!: ElementRef<HTMLDivElement>;

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  HamburgerIconClicked: string = "/images/hamburger-menu.png"
  hamburgerToggle: boolean = false;
  hamburgerLinksClass: string = 'menu-links-invis';

  toggleMenu() {
    this.hamburgerToggle = !this.hamburgerToggle;
    if (this.hamburgerToggle == true) {
      this.hamburgerLinksClass = 'menu-links-invis';
      this.HamburgerIconClicked = 'hamburger-icon'
      
    } else {
      this.hamburgerLinksClass = 'menu-links';
      this.HamburgerIconClicked = 'hamburger-icon-clicked'
    }
  }

  moveToHome() {
    this.router.navigate(['/home']);
  }
  moveToHistory() {
    this.router.navigate(['/history']);
  }

  async setSignInButton() {
    this.userButtonContainer.nativeElement.innerHTML = '';

    var clerkService = await this.authService.getClerk();

    clerkService.mountUserButton(this.userButtonContainer.nativeElement);
    clerkService.mountUserButton(this.userButtonContainerHamburger.nativeElement);
  }

  async ngOnInit() {
    if (this.authService.signedInSignalValue() == true) {
      this.router.navigate(['/home']);

      this.authService.setSignedInSignal(true);

      this.setSignInButton();
    }
  }
}
