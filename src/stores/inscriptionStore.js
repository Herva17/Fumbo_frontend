// stores/inscriptionStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useInscriptionStore = defineStore('inscription', {
  state: () => ({
    isLoading: false,
    error: null,
    successMessage: '',
  }),
  actions: {
    async registerUser(formData) {
      this.isLoading = true
      this.error = null
      this.successMessage = ''

      try {
        // Assurez-vous que vous envoyez les données en JSON, et non en FormData
        const response = await axios.post(
          'http://localhost:81/bibliotheque_api/routes/api.php/users',
          formData,
          {
            headers: {
              'Content-Type': 'application/json', // Ici, vous spécifiez que les données sont au format JSON
            },
          },
        )

        // Vérification de la réponse de l'API
        if (response.data.success) {
          this.successMessage = 'Inscription réussie !'
        } else {
          this.error = response.data.message || 'Une erreur est survenue.'
        }
      } catch (err) {
        this.error = err.message || "Une erreur est survenue lors de l'inscription."
        console.error("Erreur lors de l'inscription:", err)
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getSuccessMessage: (state) => state.successMessage,
  },
})
