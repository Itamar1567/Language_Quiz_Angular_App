import { Injectable, signal } from '@angular/core';
import { Clerk } from '@clerk/clerk-js';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private clerk: any;
  private signedInSignal = signal(false);
  private clerkLoaded = false;

  constructor() {}

  private async loadClerk(): Promise<void> {
    if (this.clerkLoaded) return;

    const { Clerk } = await import('@clerk/clerk-js');
    this.clerk = new Clerk(environment.CLERK_PUBLISHABLE_KEY);
    await this.clerk.load();

    this.signedInSignal.set(this.clerk.user != null);
    this.clerkLoaded = true;
  }

  // Returns a Promise that resolves to the Clerk instance
  async getClerk(): Promise<Clerk> {
    await this.loadClerk();
    return this.clerk;
  }

  signedInSignalValue(): boolean {
    return this.signedInSignal();
  }

  setSignedInSignal(status: boolean) {
    this.signedInSignal.set(status);
  }
}
