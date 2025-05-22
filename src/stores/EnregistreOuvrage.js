import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useEnregistreOuvrageStore = defineStore('enregistreOuvrage', () => {
  const loading = ref(false)
  const error = ref(null)
  const response = ref(null)

  async function enregistrerOuvrage(data) {
    loading.value = true
    error.value = null
    response.value = null
    try {
      const res = await axios.post(
        'http://localhost/Api_bibliotheque/ouvrage/enregistrer/?user=herva&mdp=mdp',
        data
      )
      response.value = res.data
      return res.data
    } catch (err) {
      error.value = err
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, response, enregistrerOuvrage }
})