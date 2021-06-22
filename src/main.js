import { createApp } from 'vue'
import App from './App.vue'
import VueHighlightJS from 'vue3-highlightjs' // vue3整合highlight.js
import 'highlight.js/styles/github-dark.css' // 引入highlight.js样式

createApp(App).use(VueHighlightJS).mount('#app') // 通过use使用VueHighlightJS插件
