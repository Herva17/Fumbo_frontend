<template>
  <q-page class="dashboard-page">
    <HeaderPage />

    <q-separator />
    <BannerSection class="banner" />
    <q-separator />

    <!-- Filtres -->
    <div class="row q-mb-lg">
      <q-select
        v-model="filter"
        :options="filterOptions"
        label="Filtrer par"
        dense
        outlined
        class="col-3"
      />
      <q-space />
      <q-btn-toggle
        v-model="sort"
        toggle-color="primary"
        flat
        :options="[
          { label: 'Récent', value: 'recent' },
          { label: 'Populaire', value: 'popular' },
          { label: 'Mieux notés', value: 'top' }
        ]"
      />
    </div>

    <!-- Liste des histoires -->
    <div class="stories-list">
  <q-card
    v-for="ouvrage in ouvrageStore.ouvrages"
    :key="ouvrage.id_ouvrage"
    class="story-card q-mb-lg"
  >
    <q-card-section horizontal>
      <q-img
        class="col-3"
        :src="getFullUrl(ouvrage.ouvrage_image)"
        :alt="ouvrage.titre_ouvrage"
      />
      <q-card-section>
        <div class="text-h6">{{ ouvrage.titre_ouvrage }}</div>
        <div class="text-subtitle2 q-mb-xs">
          Par {{ ouvrage.username }} {{ ouvrage.prenom }}
          <q-chip dense>{{ ouvrage.nom_nationalite }}</q-chip>
        </div>
        <div class="q-mb-xs">
          <q-chip dense>{{ ouvrage.nom_categorie }}</q-chip>
        </div>
        <p class="story-description">
          {{ ouvrage.resume }}
        </p>
        <div class="row items-center q-mt-sm">
          <div class="col">
            <span class="text-caption">
              Année : {{ ouvrage.annee_publication }} • {{ ouvrage.Nb_pages }} pages
            </span>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              color="primary"
              label="Lire"
              :href="getFullUrl(ouvrage.fichier_livre)"
              target="_blank"
            />
          </div>
        </div>
        <!-- Boutons Like, Commenter, Partager -->
        <div class="row q-mt-sm q-gutter-sm">
          <q-btn flat round icon="favorite_border" color="pink" @click="onLike(ouvrage)" />
          <q-btn flat round icon="chat_bubble_outline" color="primary" @click="onComment(ouvrage)" />
          <q-btn flat round icon="share" color="teal" @click="onShare(ouvrage)" />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</div>

    <!-- Footer -->
    <FooterPage />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BannerSection from 'src/components/BannerSection.vue'
import HeaderPage from 'src/components/HeaderPage.vue'
import FooterPage from 'src/components/FooterPage.vue'
import { useCategorieStore } from 'src/stores/categorie'
import { useAfficherOuvrageStore } from 'src/stores/AfficherOuvrage'

const filter = ref('Tous')
const sort = ref('recent')
const filterOptions = ref(['Tous'])

const user = ref({
  username: '',
})

const categorieStore = useCategorieStore()
const ouvrageStore = useAfficherOuvrageStore()

// Chemin de base pour les fichiers/images (adapte si besoin)
const BASE_URL = 'http://localhost/'

// Fonction utilitaire pour corriger les chemins relatifs
function getFullUrl(path) {
  if (!path) return '/img/default-book.jpg'
  if (path.startsWith('http')) return path
  return BASE_URL + path.replace(/^(\.\.\/)+/, '')
}

onMounted(async () => {
  // Récupération utilisateur
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error)
    }
  }

  // Récupération des catégories
  await categorieStore.fetchCategories()
  let rawCategories = categorieStore.categories?.response
  if (!Array.isArray(rawCategories)) {
    rawCategories = []
  }
  filterOptions.value = [
    'Tous',
    ...rawCategories.map(cat => cat.nom_categorie || cat.label || cat.nom || 'Catégorie')
  ]

  // Récupération des ouvrages
  await ouvrageStore.fetchOuvrages()
})
function onLike(ouvrage) {
  // Ajoute ici la logique pour aimer
  console.log('Like', ouvrage.id_ouvrage)
}
function onComment(ouvrage) {
  // Ajoute ici la logique pour commenter
  console.log('Comment', ouvrage.id_ouvrage)
}
function onShare(ouvrage) {
  // Ajoute ici la logique pour partager
  console.log('Share', ouvrage.id_ouvrage)
}
</script>

<style scoped>
.dashboard-page {
  padding: 0px;
  padding-left: 5px;
  padding-right: 5px;
  max-width: 1500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.q-avatar img {
  object-fit: cover;
  border-radius: 50%;
}

.story-card {
  border-radius: 8px;
  transition: transform 0.2s;
}

.story-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.story-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stories-list {
  flex: 1;
}

.q-footer {
  margin-top: auto;
}
</style>
