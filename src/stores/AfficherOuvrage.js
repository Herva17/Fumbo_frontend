import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAfficherOuvrageStore = defineStore('afficherOuvrage', () => {
  const ouvrages = ref([]) // La liste affichée
  const loading = ref(false)
  const error = ref(null)

  async function fetchOuvrages() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('http://localhost/Api_bibliotheque/ouvrage/afficher_livres/?user=herva&mdp=mdp')
      // Correction ici : va chercher dans response.Livres
      ouvrages.value = res.data?.response?.Livres || []
    } catch (err) {
      error.value = err
      ouvrages.value = []
    } finally {
      loading.value = false
    }
  }

  return { ouvrages, loading, error, fetchOuvrages }
})
