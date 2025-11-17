import { createApp } from "vue";
import App from "./App.vue";

// async function registerFCMServiceWorker() {
//   if ("serviceWorker" in navigator) {
//     try {
//       // Register your service worker file for FCM (update the path if needed)
//       await navigator.serviceWorker.register("/sw.js");
//       getPermissionAndToken();
//     } catch (error) {
//       console.error(
//         "Failed to register service worker or retrieve FCM token:",
//         error
//       );
//     }
//   } else {
//     console.error("Service workers are not supported in this browser.");
//   }
// }

createApp(App).mount("#app");
