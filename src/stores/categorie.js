import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useCategorieStore = defineStore('categorie', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get('http://localhost:81/Api_bibliotheque/categorie/select_all/?user=herva&mdp=mdp')
      categories.value = response.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories
  }
})
