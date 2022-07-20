import {
    createApp
} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import Markdown from 'vue3-markdown-it';



const app = createApp(App);
app.use(PrimeVue);
app.mount('#app');
app.use(Markdown);