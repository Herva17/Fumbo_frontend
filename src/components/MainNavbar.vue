<template>
  <!-- Afficher la navbar uniquement si la route n'est pas /inscription -->
  <q-header v-if="!isInscriptionPage" elevated class="bg-white text-black shadow-sm">
    <q-toolbar>
      <!-- Titre -->
      <q-toolbar-title class="text-weight-bold text-h5"> Fumbo </q-toolbar-title>

      <!-- Espace flexible -->
      <q-space />

      <!-- Champ de recherche -->
      <q-input
        dense
        filled
        rounded
        placeholder="Rechercher..."
        class="q-mr-md animate__animated animate__fadeInRight"
        v-model="searchQuery"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- Liens de navigation -->
      <div class="flex items-center gap-4">
        <q-btn flat label="A propos" class="hover-underline-animation" to="/about" />
        <q-btn flat label="Ouvrages" class="hover-underline-animation" to="/ouvrage" />
        <q-btn flat label="Publier" class="hover-underline-animation" to="/Enregistrer" />
        <q-btn flat label="Ecrire" class="hover-underline-animation" to="/ecrire" />

        <!-- Sélecteur de langue -->
        <LangSwitcher class="q-ml-md" />

        <!-- Bouton "S'inscrire" -->
        <q-btn
          rounded
          unelevated
          color="black"
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import LangSwitcher from 'src/components/LangSwitcher.vue'

const searchQuery = ref('')

// Détecter la route actuelle
const route = useRoute()
const isInscriptionPage = route.path === '/Enregistrer' // Vérifie si la route est /inscription
</script>

<style scoped>
/* Animation de soulignement au survol */
.hover-underline-animation {
  position: relative;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: black;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* Animation de grossissement au survol */
.hover-grow {
  transition: transform 0.2s ease-in-out;
}

.hover-grow:hover {
  transform: scale(1.05);
}
</style>
