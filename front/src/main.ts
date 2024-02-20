import { createApp } from 'vue'
import router from './routes/index.ts'
import App from './App.vue'
import '../node_modules/bulma/css/bulma.css'

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  console.error(`Error: ${err?.toString()}\nInfo: ${info}, \nComponent: ${JSON.stringify(vm)}`);
};

app.use(router).mount('#app')
