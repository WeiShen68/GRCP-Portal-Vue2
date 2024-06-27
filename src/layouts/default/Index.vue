<template>
  <div>
    <default-bar />

    <default-drawer />

    <default-view />

    <default-footer />

    <!-- <default-settings /> -->
  </div>
</template>

<script>
// import { firebaseApi } from '@/api/firebase';
export default {
  name: 'DefaultLayout',

  components: {
    DefaultBar: () =>
      import(
        /* webpackChunkName: "default-app-bar" */
        './AppBar'
      ),
    DefaultDrawer: () =>
      import(
        /* webpackChunkName: "default-drawer" */
        './Drawer'
      ),
    DefaultFooter: () =>
      import(
        /* webpackChunkName: "default-footer" */
        './Footer'
      ),
    // DefaultSettings: () =>
    //   import(
    //     /* webpackChunkName: "default-settings" */
    //     './Settings'
    //   ),
    DefaultView: () =>
      import(
        /* webpackChunkName: "default-view" */
        './View'
      ),
  },
  created() {
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    // if (window.env.firebase.vapidKey) {
    //   this.$messaging.getToken({ vapidKey: window.env.firebase.vapidKey }).then((currentToken) => {
    //     console.log('currentToken', currentToken);
    //     if (currentToken) {
    //       // Send the token to your server and update the UI if necessary
    //       // ...
    //       return firebaseApi.registerToken({ token: currentToken });
    //     } else {
    //       // Show permission request UI
    //       console.log('No registration token available. Request permission to generate one.');
    //       // ...
    //     }
    //   }).catch((err) => {
    //     console.log('An error occurred while retrieving token. ', err);
    //     // ...
    //   });
    //   this.$messaging.onMessage((payload) => {
    //     console.log('Message received. ', payload);
    //     // Update the UI to include the received message.
    //   });
    //   this.$messaging.requestPermission().then(res => {
    //       console.log('have permission');
    //   }).catch(() => {
    //       console.log('no permission');
    //   });
    // }
  }
};
</script>
