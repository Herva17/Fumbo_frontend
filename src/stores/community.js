import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useCommunityStore = defineStore('community', {
  state: () => ({
    groups: [],
    currentGroup: null,
    discussions: [],
    userMemberships: [],
  }),

  actions: {
    // Récupère tous les groupes
    async fetchGroups(category = null) {
      const params = category ? { category } : {}
      const { data } = await api.get('/groups', { params })
      this.groups = data
    },

    // Rejoindre/quitter un groupe
    async toggleGroupMembership(groupId) {
      const { data } = await api.post(`/groups/${groupId}/toggle-membership`)
      const index = this.userMemberships.findIndex((m) => m.groupId === groupId)

      if (index >= 0) {
        this.userMemberships.splice(index, 1)
      } else {
        this.userMemberships.push(data)
      }
    },

    // Créer une discussion
    async createDiscussion(payload) {
      const { data } = await api.post('/discussions', payload)
      this.discussions.unshift(data)
      return data
    },
  },
})
