import { Service, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Backend } from './backend';

const firebaseConfig = {
  apiKey: 'AIzaSyC20kunAcadjoK2e24_9JGxVp6ysxPj_fs',
  authDomain: 'icuweb-f09cf.firebaseapp.com',
  projectId: 'icuweb-f09cf',
  storageBucket: 'icuweb-f09cf.firebasestorage.app',
  messagingSenderId: '458907376626',
  appId: '1:458907376626:web:57dc82973f942fd063696b',
};

const vapidKey = 'BFUsBjy2sGwUU2YgpLcUQhfPObet2SA2bF00Rn7FHD6yDyiryaR0MHmlesr20yJyY4BBOSeO3f-GhmD-CcOnCgU';

@Service()
export class PushNotificationService {
  private readonly backend = inject(Backend);
  private messageListenerRegistered = false;

  async registerForPushNotifications(): Promise<void> {
    const [{ getApp, getApps, initializeApp }, { getMessaging, getToken, isSupported, onMessage }] = await Promise.all([
      import('firebase/app'),
      import('firebase/messaging'),
    ]);

    if (!(await isSupported()) || !('Notification' in window) || !('serviceWorker' in navigator)) {
      throw new Error('Questo browser non supporta le notifiche push.');
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permesso notifiche non concesso.');
    }

    const serviceWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration });
    if (!token) {
      throw new Error('Impossibile ottenere il token FCM.');
    }

    await firstValueFrom(this.backend.savePushToken(0, token));

    if (!this.messageListenerRegistered) {
      onMessage(messaging, (payload) => {
        const title = payload.notification?.title ?? 'Ivory Cross University';
        const options = { body: payload.notification?.body ?? '' };
        new Notification(title, options);
      });
      this.messageListenerRegistered = true;
    }
  }
}