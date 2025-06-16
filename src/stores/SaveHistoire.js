import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useSaveHistoireStore = defineStore('saveHistoire', () => {
  const loading = ref(false)
  const error = ref(null)
  const success = ref(false)

  /**
   * data doit contenir :
   * {
   *   id_user: number,
   *   categorieId: number,
   *   titre: string,
   *   personnages_principaux: string,
   *   description: string,
   *   histoire: string
   * }
   */
const saveHistoire = async (data) => {
  loading.value = true
  error.value = null
  success.value = false
  try {
    // Construction du formData
    const formData = new FormData()
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key])
      }
    }
    const response = await axios.post(
      'http://localhost:81/Api_bibliotheque/histoire/save/?user=herva&mdp=mdp',
      formData
    )
    success.value = true
    return response.data
  } catch (err) {
    error.value = err
    return null
  } finally {
    loading.value = false
  }
}

  return {
    loading,
    error,
    success,
    saveHistoire,
  }
})
