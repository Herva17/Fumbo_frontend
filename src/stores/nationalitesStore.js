// stores/nationalitesStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useNationalitesStore = defineStore('nationalites', {
  state: () => ({
    nationalites: [],
    isLoading: false,
    error: null,
    message: '', // Pour stocker le message d'accueil
  }),
  actions: {
    async fetchNationalites() {
      this.isLoading = true
      try {
        const response = await axios.get(
          'http://localhost:81/bibliotheque_api/routes/api.php/nationalites',
        )

        // Log de la réponse brute pour vérification
        console.log("Réponse brute de l'API:", response.data)

        // Vérifiez si la réponse contient un message et un tableau de nationalités
        const message = response.data.match(/"message":"(.*?)"/)
        const nationalites = response.data.match(/\[.*?\]/) // Extraction de la partie du tableau

        if (message) {
          this.message = message[1] // Si le message est trouvé, on l'assigne
        }

        if (nationalites) {
          // Maintenant on peut parser les nationalités
          const parsedNationalites = JSON.parse(nationalites[0])
          if (Array.isArray(parsedNationalites)) {
            this.nationalites = parsedNationalites // Si la réponse est un tableau, on le stocke
          } else {
            console.error("La réponse n'est pas un tableau valide.")
            this.nationalites = []
          }
        } else {
          console.error('Aucune nationalité trouvée dans la réponse.')
          this.nationalites = []
        }
      } catch (err) {
        this.error = err.message
        console.error('Erreur lors de la récupération des nationalités:', err)
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    getNationalites: (state) => state.nationalites,
    getIsLoading: (state) => state.isLoading,
    getMessage: (state) => state.message, // Pour accéder au message
  },
})
