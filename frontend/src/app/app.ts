import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout.component/layout.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent, CommonModule],
  template: '<app-layout *ngIf="clerkService.signedInSignalValue()" /> <router-outlet />',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');

  clerkService: AuthService = inject(AuthService);

}
