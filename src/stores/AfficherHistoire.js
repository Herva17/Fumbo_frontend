import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAfficherHistoireStore = defineStore('afficherHistoire', () => {
  const histoires = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchHistoires() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('http://localhost:81/Api_bibliotheque/histoire/details/?user=herva&mdp=mdp')
      console.log('Réponse API histoires:', res.data)
      // Correction : copie le tableau pour la réactivité
      const arr = res.data?.me?.Histoires
      if (Array.isArray(arr)) {
        histoires.value = [...arr]
      } else {
        histoires.value = []
      }
      console.log('Histoires stockées:', histoires.value)
    } catch (err) {
      error.value = err
      histoires.value = []
    } finally {
      loading.value = false
    }
  }

  return { histoires, loading, error, fetchHistoires }
})
