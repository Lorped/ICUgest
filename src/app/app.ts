import { Component, inject, Injector, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PushNotificationService } from './push-notification.service';


@Component({
  imports: [RouterLink, RouterOutlet, MatToolbarModule, MatIconModule, MatSidenavModule, MatCardModule, MatListModule, MatButtonModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ICUgest');
  protected readonly notificationsEnabled = signal(false);
  protected readonly notificationsPending = signal(false);
  protected readonly notificationsStatus = signal('');
  private readonly injector = inject(Injector);

  async enableNotifications(): Promise<void> {
    if (this.notificationsPending() || this.notificationsEnabled()) {
      return;
    }

    this.notificationsPending.set(true);
    this.notificationsStatus.set('');
    try {
      await this.injector.get(PushNotificationService).registerForPushNotifications();
      this.notificationsEnabled.set(true);
    } catch (error) {
      console.error('Attivazione notifiche non riuscita', error);
      this.notificationsStatus.set('Attivazione notifiche non riuscita');
    } finally {
      this.notificationsPending.set(false);
    }
  }
}
