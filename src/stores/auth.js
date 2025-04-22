import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  function login(userData) {
    user.value = userData
    // Ici vous pourriez aussi sauvegarder le token dans localStorage
  }

  function logout() {
    user.value = null
    // Nettoyer le localStorage si nécessaire
  }

  return { user, isAuthenticated, login, logout }
})
