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
      <!-- Exemple d'histoire -->
      <q-card class="story-card q-mb-lg">
        <q-card-section horizontal>
          <q-img class="col-3" src="/img/wild-sky.jpg" alt="Au Clair de Lune" />
          <q-card-section>
            <div class="text-h6">Au Clair de Lune, Tome 1 : La Lune Vengeresse</div>
            <div class="text-subtitle2 q-mb-sm">★★★★☆</div>
            <p class="story-description">
              Je m'appelle Louva Wild, une Loup-Garou de rang Delta qui mène une vie simple et
              tranquille jusqu'à ce qu'IL arrive et chamboule absolument tout...
            </p>
            <div class="row q-mt-md">
              <q-chip v-for="tag in ['Fantasy', 'Aventure', 'Loup-Garou']" :key="tag" dense>
                {{ tag }}
              </q-chip>
            </div>
            <div class="row items-center q-mt-sm">
              <div class="col">
                <span class="text-caption">Par Laura B • Terminé • 54 chapitres</span>
              </div>
              <div class="col-auto">
                <q-btn flat color="primary" label="Lire" />
              </div>
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
import { useCategorieStore } from 'src/stores/categorie' // <-- Import du store

const filter = ref('Tous')
const sort = ref('recent')
const filterOptions = ref(['Tous']) // On commence par "Tous"

const user = ref({
  username: '',
})

// Store Pinia pour les catégories
const categorieStore = useCategorieStore()

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
  // Ajout dynamique des catégories dans filterOptions
  filterOptions.value = [
    'Tous',
    ...rawCategories.map(cat => cat.nom_categorie || cat.label || cat.nom || 'Catégorie')
  ]
})
</script>

<style scoped>
.dashboard-page {
  padding: 0px;
  padding-left: 5px;
  padding-right: 5px;
  max-width: 1500px;
  margin: 0 auto;
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

.dashboard-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Assure que la page occupe toute la hauteur de l'écran */
}

.stories-list {
  flex: 1; /* Permet au contenu principal de prendre tout l'espace disponible */
}

.q-footer {
  margin-top: auto; /* Positionne le footer en bas de la page */
}
</style>
