import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import toaster from '@meforma/vue-toaster';
import Firebase from './plugins/firebase';

(async () => {
    loadFonts();
    await Firebase.initialize();
    createApp(App).use(router).use(vuetify).use(toaster, { position: 'top-right' }).mount('#app');
})();
