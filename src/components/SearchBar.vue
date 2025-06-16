<template>
  <q-input
    v-model="searchQuery"
    dense
    outlined
    placeholder="Rechercher..."
    class="search-input"
    bg-color="white"
    @keyup.enter="performSearch"
  >
    <template v-slot:append>
      <q-icon name="search" @click="performSearch" />
    </template>
  </q-input>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/search', query: { q: this.searchQuery } })
      }
    }
  }
}
</script>

<style scoped>
.search-input {
  min-width: 300px;
  margin: 0 16px;
}
</style>