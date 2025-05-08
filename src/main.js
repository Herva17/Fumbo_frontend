import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import '@quasar/extras/animate/fadeIn.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import App from './App.vue'

// Importez les styles et icônes ESSENTIELS
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import router from './router'

// Créez l'application
const app = createApp(App)

// Configurez Quasar
app.use(createPinia)
app.use(router)
app.use(Quasar, {
  plugins: {}, // Ajoutez les plugins Quasar nécessaires
  config: {
    brand: {
      primary: '#1976d2',
      // ... autres couleurs
    },
  },
})

// Montez l'application
app.mount('#app')
