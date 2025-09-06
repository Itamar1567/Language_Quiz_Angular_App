import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  private authService: AuthService = inject(AuthService);
  async ngOnInit() {
    await this.authService.getClerk().load();

    this.container.nativeElement.innerHTML = '';

    if (this.authService.signedInSignalValue() == false) {
      {
        
        this.authService.setSignedInSignal(false);
        this.container.nativeElement.classList.add('centered');

        const signInDiv = document.createElement('div');

        signInDiv.className = 'signin-form';
        this.container.nativeElement.appendChild(signInDiv);

        this.authService.getClerk().mountSignIn(signInDiv);
      }
    }
  }
}
