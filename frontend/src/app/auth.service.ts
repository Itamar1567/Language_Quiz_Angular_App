import { Injectable, signal } from '@angular/core';
import { Clerk } from '@clerk/clerk-js';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private clerk: Clerk;
  private signedInSignal = signal(false);

  constructor() {

    this.clerk = new Clerk(environment.CLERK_PUBLISHABLE_KEY);
    console.log("Called auth constructor")
    this.clerk.load().then(() => {
      this.signedInSignal.set(this.clerk.user != null)
      console.log(this.signedInSignal());
      console.log('Clerk loaded. Current user:', this.clerk.user);
    });
  }

  signedIn(): boolean {
    return this.signedInSignal();
  }


  signedInSignalValue() {
    
    return this.signedInSignal();
  }

  getUser() {
    return this.clerk.user;
  }
  setSignedInSignal(status: boolean)
  {
    this.signedInSignal.set(status);
  }
  async signOut() {
    await this.clerk.signOut();
    console.log('User signed out');
  }
  
  getClerk(): Clerk{
    return this.clerk;
  }
}