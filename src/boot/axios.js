import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' })

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

// Mock pour le développement
if (process.env.DEV) {
  api.interceptors.response.use((response) => {
    // Simulez vos données de réponse ici
    if (response.config.url.includes('/books')) {
      return {
        data: [
          {
            id: 1,
            title: 'Sous un ciel sauvage',
            author: 'Elia_MORGAN',
            description: "On m'a tout pris...",
            tags: ['Sauvage', 'Aventures'],
            genre: 'Aventure',
            fandoms: [],
            rating: 5,
            chapters: 11,
            status: 'En cours',
            cover: 'sous-un-ciel-sauvage.jpg',
            chapter: [
              { number: 1, title: 'Le commencement' },
              { number: 2, title: 'La rencontre' },
            ],
          },
          // ... autres livres
        ],
      }
    }
    return response
  })
}

export { api }
