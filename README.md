# Firebase Messaging `deleteToken()` with Custom Service Worker - Proof of Concept

## Overview

This project proves that **you can call `deleteToken()` with a custom service worker registration without having to call `getToken()` first**.

It uses a locally built `@firebase/messaging` package (v0.12.23) from the [firebase-js-sdk](https://github.com/firebase/firebase-js-sdk) repository.

## The Problem

**Before this change:** If you wanted to use a custom service worker (not the default `firebase-messaging-sw.js`), you had to call `getToken()` first before you could call `deleteToken()`.

**After this change:** You can directly call `deleteToken()` with your custom service worker registration, skipping `getToken()` entirely.

## The Solution

Simply pass your custom service worker registration to `deleteToken()`:

```javascript
// Get your custom service worker registration
const swReg = await navigator.serviceWorker.register('/sw.js');

// Call deleteToken directly - no getToken() needed!
await deleteToken(messaging, {
  serviceWorkerRegistration: swReg
});
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the dev server:**
   ```bash
   npm run serve
   ```

3. **Open in browser:**
   ```
   http://localhost:8080
   ```

## Usage

1. Click **"Generate FCM Token"** - this registers the custom `sw.js` service worker
2. Click **"Delete FCM Token"** - this calls `deleteToken()` with the custom service worker registration

The key point: `deleteToken()` works with your custom service worker without needing to call `getToken()` beforehand.

## Why Use a Local TGZ?

This project uses `firebase-messaging-v0.12.23.tgz` (a local build from firebase-js-sdk) to test this functionality before it's published to npm.

## Building Your Own TGZ

If you want to build your own TGZ file:

1. **Clone firebase-js-sdk:**
   ```bash
   git clone https://github.com/firebase/firebase-js-sdk.git
   cd firebase-js-sdk
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Build the messaging package:**
   ```bash
   yarn build:messaging
   ```

4. **Create TGZ:**
   ```bash
   cd packages/messaging
   npm pack
   ```

5. **Copy the generated .tgz file** to your project root

6. **Update package.json** with the new filename

## Requirements

- HTTPS or localhost (service workers require secure context)
- Modern browser with Service Worker support
- Notification permission

## Related Links

- [Firebase JS SDK Repository](https://github.com/firebase/firebase-js-sdk)
- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging/js/client)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

