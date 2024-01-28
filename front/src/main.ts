import { createApp } from 'vue'
import router from './routes/index.ts'
import App from './App.vue'
import '../node_modules/bulma/css/bulma.css'

createApp(App).use(router).mount('#app')
