<template>
  <q-page class="dashboard-page">
    <HeaderPage />

    <q-separator />
    <BannerSection class="banner" />
    <q-separator />

    <!-- Filtres dynamiques -->
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
        :options="toggleOptions"
      />
    </div>

    <!-- Liste dynamique selon le bouton sélectionné et le filtre -->
    <div class="stories-list">
      <!-- Ouvrages -->
      <template v-if="sort === 'ouvrage'">
        <q-card
          v-for="ouvrage in filteredOuvrages"
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
              <div class="text-h6 ouvrage-title q-mb-xs">
                {{ ouvrage.titre_ouvrage }}
              </div>
              <div class="text-subtitle2 q-mb-xs">
                <q-img
                  class="col-3"
                  :src="getFullUrl(ouvrage.user_image)"
                  :alt="ouvrage.titre_ouvrage"
                  style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;"
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
              <div v-if="ouvrage.tags && parseTags(ouvrage.tags).length" class="q-mb-xs">
                <q-chip
                  v-for="(tag, idx) in parseTags(ouvrage.tags)"
                  :key="idx"
                  dense
                  color="primary"
                  text-color="white"
                  class="q-mr-xs"
                >{{ tag }}</q-chip>
              </div>
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
      </template>

      <!-- Histoires -->
      <template v-else-if="sort === 'histoire'">
        <q-card
          v-for="histoire in filteredHistoires"
          :key="histoire.id_histoire || histoire.id || histoire.titre"
          class="story-card q-mb-lg"
        >
          <q-card-section>
            <div class="row items-center q-mb-sm">
              <q-avatar color="primary" text-color="white" size="40px" class="q-mr-md">
                <q-icon name="menu_book" />
              </q-avatar>
              <div>
                <div class="text-h6 ouvrage-title">{{ histoire.titre }}</div>
                <div class="text-caption text-grey-7">
                  Publiée {{ timeSince(histoire.datePub) }}
                </div>
              </div>
            </div>
            <div class="q-mb-xs">
              <q-chip dense color="primary" text-color="white">
                {{ histoire.nom_categorie || 'Histoire' }}
              </q-chip>
              <span class="text-caption text-grey-8 q-ml-sm">
                Auteur : {{ histoire.username || user.username }}
              </span>
            </div>
            <div class="q-mb-md">
              <span class="story-description">
                {{ histoire.description }}
              </span>
            </div>
            <div>
              <q-btn
                flat
                color="primary"
                label="Lire l'histoire"
                @click="showHistoire(histoire)"
              />
            </div>
          </q-card-section>
        </q-card>
        <template v-if="!filteredHistoires.length">
          <q-banner dense>Aucune histoire publiée pour cette catégorie.</q-banner>
        </template>
      </template>

      <!-- Autres catégories -->
      <template v-else>
        <q-banner dense>Aucun résultat pour cette catégorie.</q-banner>
      </template>
    </div>

    <!-- Modal biographie auteur -->
    <q-dialog v-model="showBioModal">
      <!-- ...inchangé... -->
    </q-dialog>

    <FooterPage />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BannerSection from 'src/components/BannerSection.vue'
import HeaderPage from 'src/components/HeaderPage.vue'
import FooterPage from 'src/components/FooterPage.vue'
import { useCategorieStore } from 'src/stores/categorie'
import { useAfficherOuvrageStore } from 'src/stores/AfficherOuvrage'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const filter = ref('Tous')
const sort = ref('ouvrage')
const filterOptions = ref(['Tous', 'Conte', 'Roman', 'Nouvelle'])

const toggleOptions = [
  { label: 'Ouvrages', value: 'ouvrage' },
  { label: 'Histoires', value: 'histoire' },
  { label: 'Blagues', value: 'blague' },
  { label: 'Poesies', value: 'Posies' },
  { label: 'Poémes', value: 'Poemes' },
  { label: 'Recits', value: 'Recits' },
  { label: 'Contes', value: 'Contes' },
  { label: 'Romans', value: 'Romans' },
  { label: 'Autres', value: 'Autres' }
]

const user = ref({
  username: 'Auteur1',
})

// --- Ouvrages dynamiques ---
const categorieStore = useCategorieStore()
const ouvrageStore = useAfficherOuvrageStore()

// --- Histoires statiques pour test ---
const histoires = ref([
  {
    id_histoire: 1,
    titre: "La légende du baobab",
    description: "Il était une fois, au cœur de l'Afrique, un baobab magique qui... ",
    nom_categorie: "Conte",
    username: "Fatou N'Diaye",
    datePub: "2024-06-01 12:00:00"
  },
  {
    id_histoire: 2,
    titre: "Le lion et le chasseur",
    description: "Un conte sur le courage et la sagesse...",
    nom_categorie: "Conte",
    username: "Mamadou Diallo",
    datePub: "2024-06-02 15:30:00"
  }
])

const showBioModal = ref(false)
const selectedOuvrage = ref(null)

function showBio(ouvrage) {
  selectedOuvrage.value = ouvrage
  showBioModal.value = true
}

function showHistoire(histoire) {
  $q.notify({
    type: 'info',
    message: histoire.description || 'Aperçu de l\'histoire'
  })
}

const BASE_URL = 'http://localhost/'

function getFullUrl(path) {
  if (!path) return '/img/default-book.jpg'
  if (path.startsWith('http')) return path
  return BASE_URL + path.replace(/^(\.\.\/)+/, '')
}

function parseTags(tags) {
  if (Array.isArray(tags)) return tags
  try {
    return JSON.parse(tags)
  } catch {
    if (typeof tags === 'string') {
      return tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    }
    return []
  }
}

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
  await categorieStore.fetchCategories()
  let rawCategories = categorieStore.categories?.response
  if (!Array.isArray(rawCategories)) {
    rawCategories = []
  }
  filterOptions.value = [
    'Tous',
    ...rawCategories.map((cat) => cat.nom_categorie || cat.label || cat.nom || 'Catégorie'),
  ]

  await ouvrageStore.fetchOuvrages()
})

// Ouvrages dynamiques
const filteredOuvrages = computed(() => {
  let list = ouvrageStore.ouvrages
  if (filter.value && filter.value !== 'Tous') {
    list = list.filter(o =>
      o.nom_categorie && o.nom_categorie.toLowerCase() === filter.value.toLowerCase()
    )
  }
  return list
})

// Histoires statiques (à remplacer par store ou API plus tard)
const filteredHistoires = computed(() => {
  let list = histoires.value
  if (filter.value && filter.value !== 'Tous') {
    list = list.filter(h =>
      h.nom_categorie && h.nom_categorie.toLowerCase() === filter.value.toLowerCase()
    )
  }
  return list
})

watch(sort, () => {
  filter.value = 'Tous'
})

function onLike(ouvrage) {
  console.log('Like', ouvrage.id_ouvrage)
}
function onComment(ouvrage) {
  console.log('Comment', ouvrage.id_ouvrage)
}
function onShare(ouvrage) {
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
.story-description {
  font-size: 1rem;
  color: #444;
}
</style>