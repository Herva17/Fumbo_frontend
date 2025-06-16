<template>
  <!-- SearchBar et bouton paramètres en haut, centrés -->
        <div class="search-bar-settings">
          <SearchBar class="search-bar-cairn" />
          <q-btn flat round dense icon="settings" class="settings-btn" aria-label="Paramètres" />
        </div>
  <q-tabs
    v-model="tab"
    inline-label
    class="bg-primary text-white shadow-2"
    align="center"
    narrow-indicator
  >
    <q-route-tab
      v-for="nav in navigationItems"
      :key="nav.route"
      :to="nav.route"
      :label="nav.label"
      :icon="nav.icon"
      exact
    />
  </q-tabs>
</template>

<script>
import SearchBar from './SearchBar.vue'
export default {
  components: {
    SearchBar
  },
  data() {
    return {
      tab: 'home',
      navigationItems: [
        { label: 'Accueil', icon: 'home', route: '/' },
        { label: 'Revues', icon: 'library_books', route: '/journals' },
        { label: 'Articles', icon: 'article', route: '/articles' },
        { label: 'Collections', icon: 'collections_bookmark', route: '/collections' },
        { label: 'À propos', icon: 'info', route: '/about' }
      ]
    }
  }
}
</script>
<style scoped>
.search-bar-settings {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100%;
  padding: 10px 10px;
}
.search-bar-cairn {
  min-width: 400px;
  max-width: 700px;
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s;
}
.settings-btn {
  color: #888;
  transition: color 0.2s;
}
.settings-btn:hover {
  color: #1976d2;
}
</style>
