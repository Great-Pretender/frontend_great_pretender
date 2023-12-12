import './assets/main.css'
import './assets/menu.css'
import './assets/header.css'



  // register globally
  
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
/* import Component from 'vue-class-component';
import 'vue-class-component/hooks'; 
 */
import App from './App.vue'
import router from './router'

// axios.defaults.baseURL="https://8080-greatpreten-backendgrea-loxpkzrcot8.ws-us105.gitpod.io"
// axios.defaults.baseURL="http://localhost:8080/"
//axios.defaults.baseURL="https://8080-leoadlerr-backendgreatp-2fuzv9zkxh0.ws-us105.gitpod.io/"
  axios.defaults.baseURL="http://localhost:8080/"
// Felipe
//axios.defaults.baseURL = "https://8080-greatpreten-backendgrea-fb3dqijycmz.ws-us106.gitpod.io"


// Guilherme
// axios.defaults.baseURL = "https://8080-greatpreten-backendgrea-li6fsirh6mo.ws-us105.gitpod.io"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
