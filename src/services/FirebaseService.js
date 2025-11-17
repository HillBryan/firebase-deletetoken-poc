import { initializeApp } from "@firebase/app";
import { getMessaging, onMessage, getToken, deleteToken } from "@firebase/messaging";

const firebaseConfig = {
  apiKey: "...",
  projectId: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "...",
};

const VAPID_KEY =
    "...";

const app = initializeApp(firebaseConfig);

let messaging = null;
try {
  messaging = getMessaging(app);
  console.log("Firebase Messaging initialized from LOCAL TGZ v0.12.23");
} catch (error) {
  console.error("Firebase Messaging initialization failed:", error);
  console.log("This is expected if running in an unsupported environment");
}

let serviceWorkerRegistration = null;

// Register service worker on load
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(async (registration) => {
      await navigator.serviceWorker.ready;
      serviceWorkerRegistration = registration;
      console.log('Service worker registered successfully on load');
    })
    .catch((error) => {
      console.error('Service worker registration failed:', error);
    });
}

export async function registerAndGetToken() {
  try {
    // Check if messaging is available
    if (!messaging) {
      throw new Error('Firebase Messaging is not available in this environment');
    }

    // Wait for service worker to be ready if not already
    if (!serviceWorkerRegistration) {
      await navigator.serviceWorker.ready;
      const registrations = await navigator.serviceWorker.getRegistrations();
      serviceWorkerRegistration = registrations.find(reg => reg.active?.scriptURL.includes('sw.js'));

      if (!serviceWorkerRegistration) {
        throw new Error('Service worker not registered');
      }
    }

    // Request notification permission
    console.log('Requesting notification permission...');
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      throw new Error('Notification permission denied');
    }

    console.log('Notification permission granted');

    // Get FCM token with custom service worker
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration
    });

    if (!token) {
      throw new Error('No FCM token available');
    }

    console.log('FCM token retrieved:', token);
    return token;
  } catch (error) {
    console.error('Error registering and getting token:', error);
    throw error;
  }
}

export async function removeToken() {
  try {
    if (!messaging) {
      throw new Error('Firebase Messaging is not available');
    }

    // Wait for service worker to be ready if not already registered
    let swReg = serviceWorkerRegistration;
    if (!swReg) {
      console.log('Service worker registration not cached, waiting for service worker to be ready...');
      await navigator.serviceWorker.ready;
      const registrations = await navigator.serviceWorker.getRegistrations();
      swReg = registrations.find(reg => reg.active?.scriptURL.includes('sw.js'));

      if (swReg) {
        console.log('Found sw.js service worker registration');
        serviceWorkerRegistration = swReg; // Cache it for future use
      } else {
        console.warn('No sw.js service worker registration found');
      }
    }

    await deleteToken(messaging, {
        serviceWorkerRegistration: swReg
    });
    console.log('Token deleted successfully');
  } catch (error) {
    console.error('Error deleting token:', error);
    throw error;
  }
}

if (messaging) {
  onMessage(messaging, (payload) => {
    console.log('Message received:', payload);

    const notificationTitle = payload.notification?.title || 'New Message';
    const notificationOptions = {
      body: payload.notification?.body || 'You have a new message',
      icon: './favicon.ico',
    };

    new Notification(notificationTitle, notificationOptions);
  });
} else {
  console.warn('⚠Firebase Messaging not available - message listener not registered');
}

