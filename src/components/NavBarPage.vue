<template>
  <div v-if="!isInscriptionPage" class="bg-white text-black shadow-lg">
    <nav class="main-navbar-cairn">
      <div class="navbar-content-vertical">
        <!-- SearchBar et bouton paramètres en haut, centrés -->
        <div class="search-bar-settings">
          <SearchBar class="search-bar-cairn" />
          <q-btn flat round dense icon="settings" class="settings-btn" aria-label="Paramètres" />
        </div>
        <!-- Boutons de navigation centrés sous la barre de recherche -->
        <div class="nav-links-cairn">
          <q-btn
            flat
            label="Librairie"
            icon="local_library"
            class="nav-btn-cairn"
            to="/ecrire"
          />
          <q-btn
            flat
            label="Livres gratuits"
            icon="menu_book"
            class="nav-btn-cairn"
            to="/ouvrage"
          />
          <q-btn
            flat
            label="Publier"
            icon="publish"
            class="nav-btn-cairn"
            to="/create-book"
          />
          <q-btn
            flat
            label="Ecrire"
            icon="edit"
            class="nav-btn-cairn"
            to="/write"
          />
          <q-btn
            flat
            label="Raconter"
            icon="record_voice_over"
            class="nav-btn-cairn"
            to="/raconter"
          />
          <q-btn
            flat
            label="Ecouter"
            icon="hearing"
            class="nav-btn-cairn"
            to="/ecouter"
          />
        </div>
        <q-separator spaced />
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import SearchBar from './SearchBar.vue'

const route = useRoute()
const isInscriptionPage = route.path === '/Enregistrer'
</script>
<style scoped>
.main-navbar-cairn {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03);
  padding: 0;
}
.navbar-content-vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1rem 0.5rem 1rem;
}
.search-bar-settings {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 18px;
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
.nav-links-cairn {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 10px;
}
.nav-btn-cairn {
  font-weight: 500;
  color: #333;
  transition: color 0.2s;
  background: transparent;
}
.nav-btn-cairn:hover {
  color: #1976d2;
  background: #f0f4fa;
}
@media (max-width: 900px) {
  .search-bar-cairn {
    min-width: 180px;
    max-width: 100%;
  }
}
@media (max-width: 700px) {
  .navbar-content-vertical {
    padding: 0.5rem 0.2rem;
  }
  .search-bar-cairn {
    min-width: 120px;
    max-width: 100%;
  }
  .nav-links-cairn {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    align-items: center;
  }
}
</style>