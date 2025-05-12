<template>
  <!-- Afficher la navbar uniquement si la route n'est pas /inscription -->
  <q-header v-if="!isInscriptionPage" elevated class="bg-white text-black shadow-lg q-py-md">
    <q-toolbar class="q-px-lg">
      <!-- Titre -->
      <q-toolbar-title class="text-weight-bold ">Fumbo</q-toolbar-title>

      <!-- Espace flexible -->
      <q-space />
      <q-input
        dense
        filled
        rounded
        placeholder="Rechercher..."
        v-model="searchQuery"
        class="q-mr-md"
        style="max-width: 200px;"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <!-- Toggle Bar pour petits écrans -->
      <q-btn flat dense round icon="menu" class="toggle-btn" @click="toggleMenu" />

      <!-- Liens de navigation (affichés uniquement sur grands écrans) -->
      <div class="nav-links flex items-center gap-4 q-mr-md" v-if="!isSmallScreen || isMenuOpen">
        <q-btn flat label="Accueil" class="hover-underline-animation text-weight-bold" to="/" />
        <q-btn
          flat
          label="A propos"
          class="hover-underline-animation text-weight-bold"
          to="/about"
        />
        <q-btn
          flat
          label="Ouvrages"
          class="hover-underline-animation text-weight-bold"
          to="/ouvrage"
        />
        <q-btn
          flat
          label="Publier"
          class="hover-underline-animation text-weight-bold"
          to="/Enregistrer"
        />
        <q-btn
          flat
          label="Ecrire"
          class="hover-underline-animation text-weight-bold"
          to="/enregistrer"
        />

        <!-- Sélecteur de langue -->
        <LangSwitcher class="q-ml-md" />

        <!-- Bouton "Se Connecter" -->
        <q-btn
          rounded
          unelevated
          color="primary"
          label="Se Connecter"
          class="q-ml-md text-white hover-grow"
          to="/connection"
        />
      </div>
    </q-toolbar>
  </q-header>

  <!-- Séparateur -->
  <q-separator v-if="!isInscriptionPage" spaced />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import LangSwitcher from 'src/components/LangSwitcher.vue'

const searchQuery = ref('')
const isMenuOpen = ref(false)

// Détecter la route actuelle
const route = useRoute()
const isInscriptionPage = route.path === '/Enregistrer'

// Détecter si l'écran est petit
const isSmallScreen = computed(() => window.innerWidth <= 768)

// Fonction pour basculer le menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
/* --- NAVBAR --- */
.q-header {
  height: 80px; /* Augmente la hauteur de la barre de navigation */
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Ajoute une ombre subtile */
}

/* --- TOGGLE BUTTON --- */
.toggle-btn {
  display: none; /* Masqué par défaut */
}

/* Afficher le bouton toggle sur petits écrans */
@media (max-width: 768px) {
  .toggle-btn {
    display: block;
  }
  .nav-links {
    display: none; /* Masquer les liens par défaut */
    flex-direction: column;
    background-color: white;
    position: absolute;
    top: 80px;
    right: 0;
    width: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  .nav-links > * {
    margin: 10px 0;
  }
}

/* --- CHAMP DE RECHERCHE --- */
.search-bar {
  max-width: 300px; /* Limite la largeur du champ de recherche */
  transition: all 0.3s ease-in-out;
}
.search-bar:focus-within {
  max-width: 400px; /* Agrandit le champ de recherche au focus */
}

/* --- ANIMATION DE SOULIGNEMENT --- */
.hover-underline-animation {
  position: relative;
  font-size: 16px;
  transition: color 0.3s ease-in-out;
}
.hover-underline-animation:hover {
  color: #007bff; /* Change la couleur au survol */
}
.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #007bff;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* --- ANIMATION DE GROSSISSEMENT --- */
.hover-grow {
  transition: transform 0.2s ease-in-out;
}
.hover-grow:hover {
  transform: scale(1.1);
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .q-toolbar {
    flex-wrap: wrap;
  }
  .search-bar {
    max-width: 100%;
  }
}
</style>
