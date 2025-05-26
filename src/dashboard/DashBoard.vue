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
          { label: 'Ouvrages', value: 'ouvrage' },
          { label: 'Histoires', value: 'histoire' },
          { label: 'Blagues', value: 'blague' },
          { label: 'Poesies', value: 'Posies' },
          { label: 'Poémes', value: 'Poemes' },
          { label: 'Recits', value: 'Recits' },
          { label: 'Contes', value: 'Contes' },
          { label: 'Romans', value: 'Romans' },
          { label: 'Autres', value: 'Autres' }
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
          <div
  class="text-h6 ouvrage-title q-mb-xs"
>
  {{ ouvrage.titre_ouvrage }}
</div>
            <div class="text-subtitle2 q-mb-xs">
                   <q-img
            class="col-3"
            :src="getFullUrl(ouvrage.user_image)"
            :alt="ouvrage.titre_ouvrage" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;"
            :style="{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }"
          />
              {{ ouvrage.username }} {{ ouvrage.prenom }}
              <q-chip dense>{{ ouvrage.nom_nationalite }}</q-chip>
            </div>
            <div class="q-mb-xs">
              <q-chip dense>{{ ouvrage.nom_categorie }}</q-chip>
              <span class="text-caption text-grey-7 q-ml-sm" v-if="ouvrage.datePub">
                • {{ timeSince(ouvrage.datePub) }}
              </span>
            </div>
            <!-- Affichage des mots clés -->
            <div v-if="ouvrage.tags && parseTags(ouvrage.tags).length" class="q-mb-xs">
              <q-chip
                v-for="(tag, idx) in parseTags(ouvrage.tags)"
                :key="idx"
                dense
                color="primary"
                text-color="white"
                class="q-mr-xs"
                >{{ tag }}</q-chip
              >
            </div>
            <!-- Bouton pour voir la vie de l'auteur -->
            <div v-if="ouvrage.bio" class="q-mb-xs">
              <q-btn
                flat
                dense
                color="primary"
                icon="person"
                label="Voir la vie de l'auteur"
                @click="showBio(ouvrage)"
                class="q-mr-xs"
              />
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
              <q-btn
                flat
                round
                icon="chat_bubble_outline"
                color="primary"
                @click="onComment(ouvrage)"
              />
              <q-btn flat round icon="share" color="teal" @click="onShare(ouvrage)" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <!-- Modal biographie auteur -->
    <q-dialog v-model="showBioModal">
      <q-card style="max-width: 400px">
        <q-card-section>
          <div class="text-h6 q-mb-sm">Biographie de l'auteur</div>
          <div class="text-subtitle2 q-mb-xs row items-center">
            <q-avatar size="40px" class="q-mr-md">
              <img :src="getFullUrl(selectedOuvrage?.user_image)" alt="Photo de l'auteur" />
            </q-avatar>
            <div>
              {{ selectedOuvrage?.username }} {{ selectedOuvrage?.prenom }}
              <q-chip dense>{{ selectedOuvrage?.nom_nationalite }}</q-chip>
            </div>
          </div>
          <div class="q-mb-md">
            <span class="text-caption text-grey-8">
              {{ selectedOuvrage?.bio }}
            </span>
            <div v-if="selectedOuvrage?.email" class="q-mt-sm">
              <q-btn
                flat
                color="primary"
                icon="email"
                :label="`Contacter l'auteur`"
                :href="`mailto:${selectedOuvrage.email}`"
                target="_blank"
                class="q-mt-xs"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fermer" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

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

// Pour la modale biographie
const showBioModal = ref(false)
const selectedOuvrage = ref(null)

function showBio(ouvrage) {
  selectedOuvrage.value = ouvrage
  showBioModal.value = true
}

// Chemin de base pour les fichiers/images (adapte si besoin)
const BASE_URL = 'http://localhost/'

// Fonction utilitaire pour corriger les chemins relatifs
function getFullUrl(path) {
  if (!path) return '/img/default-book.jpg'
  if (path.startsWith('http')) return path
  return BASE_URL + path.replace(/^(\.\.\/)+/, '')
}

// Affichage des mots clés (tags)
function parseTags(tags) {
  if (Array.isArray(tags)) return tags
  try {
    return JSON.parse(tags)
  } catch {
    // Si ce n'est pas du JSON, on tente de splitter par virgule
    if (typeof tags === 'string') {
      return tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    }
    return []
  }
}

// Fonction pour afficher le temps passé depuis la publication
function timeSince(dateString) {
  if (!dateString) return ''
  const now = new Date()
  const date = new Date(dateString.replace(' ', 'T'))
  const seconds = Math.floor((now - date) / 1000)

  if (seconds < 60) return 'il y a quelques secondes'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `il y a ${minutes} min${minutes > 1 ? 's' : ''}`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`
  const days = Math.floor(hours / 24)
  if (days < 30) return `il y a ${days} jour${days > 1 ? 's' : ''}`
  const months = Math.floor(days / 30)
  if (months < 12) return `il y a ${months} mois`
  const years = Math.floor(months / 12)
  return `il y a ${years} an${years > 1 ? 's' : ''}`
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
    ...rawCategories.map((cat) => cat.nom_categorie || cat.label || cat.nom || 'Catégorie'),
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
.ouvrage-title {
  color: #1976d2;
  font-weight: bold;
  letter-spacing: 0.5px;
  font-size: 1.35rem;
  text-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  transition: color 0.2s;
}
.ouvrage-title:hover {
  color: #0d47a1;
}
</style>
