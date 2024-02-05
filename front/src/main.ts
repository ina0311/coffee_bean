import { createApp } from 'vue'
import router from './routes/index.ts'
import App from './App.vue'
import '../node_modules/bulma/css/bulma.css'
import '@creativebulma/bulma-collapsible'

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  // ここでエラーを処理します
  // `err` はエラーオブジェクト
  // `vm` はエラーが発生したコンポーネントのインスタンス
  // `info` はエラーが発生したVue特有のエラー情報 (例: ライフサイクルフック名)
  // @ts-ignore
  console.error(`Error: ${err.toString()}\nInfo: ${info}, \nComponent: ${vm}`);
};

app.use(router).mount('#app')
