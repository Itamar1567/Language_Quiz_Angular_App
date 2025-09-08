import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { QuotaResponseInterface } from './quota-response.interface';
import { ChallengeInterface } from './challenge.interface';
@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  clerkClient: AuthService = inject(AuthService);

  backendURL: string = 'https//:lang-quiz-be-ecc6dbawgxf4gea0.canadacentral-01.azurewebsites.net/api/';

  async getSession() {
    try {
      const clerk = await this.clerkClient.getClerk();
      if (!clerk.session) {
        console.log('No active session');
        return null;
      } else {
        return clerk.session;
      }
    } catch (err) {
      console.log('Failed to retieve clerk session: ', err);
      return null;
    }
  }
  async getUserQuota(): Promise<QuotaResponseInterface | null> {
    try {
      {
        var session = await this.getSession();
        if (session == null) {
          return null;
        } else {
          const token = await session.getToken();
          var response = await fetch(`${this.backendURL}challenge/user-quota`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data: QuotaResponseInterface = await response.json();

          console.log('Quota Remaining: ' + data.quotaRemaining);
          console.log('Countdown Remaining: ' + data.resetCountDown);
          return data;
        }
      }
    } catch (err) {
      console.log('Failed to fetch user quota, Error: ', err);
      return null;
    }
  }
  async generateChallenge(
    difficulty: string,
    language: string
  ): Promise<ChallengeInterface | null> {
    try {
      var session = await this.getSession();
      if (session == null) {
        return null;
      } else {
        const token = await session.getToken();

        var response = await fetch(`${this.backendURL}challenge/generate-challenge`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ difficulty, language }),
        });

        const data: ChallengeInterface = await response.json();
        return data;
      }
    } catch (err) {
      console.log('Could not retrieve challenge: ', err);
      return null;
    }
  }

  async getAllUserChallenges(): Promise<ChallengeInterface[] | null> {
    try {
      var session = await this.getSession();
      if (session == null) {
        return null;
      } else {
        const token = await session.getToken();

        var response = await fetch(`${this.backendURL}challenge/get-challenges`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Fetched challenges');
        const data: ChallengeInterface[] = await response.json();

        console.log(data);
        return data;
      }
    } catch (err) {
      console.log('Encountered an error when fetching challenges: ', err);
      return null;
    }
  }
  async resetUserChallenges(): Promise<ChallengeInterface[] | null> {
    try {
      var session = await this.getSession();
        if (session == null) {
          return null;
        } else {
          const token = await session.getToken();
        var response = await fetch(`${this.backendURL}challenge/reset-challenges`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });

        const data: ChallengeInterface[] = await response.json();

        return data;
      }
    } catch (err) {
      console.log('Failed to reset histroy, err: ', err);
      return null;
    }
  }
}
