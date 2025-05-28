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

    <div class="stories-list">
      <!-- Ouvrages dynamiques -->
      <template v-if="sort === 'ouvrage'">
        <q-card
          v-for="ouvrage in filteredOuvrages"
          :key="ouvrage.id_ouvrage"
          class="story-card q-mb-lg"
          @mouseenter="loadAbonnes(ouvrage)"
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
                <q-badge color="primary" class="q-ml-sm">
                  {{ abonnésCount[ouvrage.id_user || ouvrage.id_auteur] || 0 }} abonnés
                </q-badge>
                <q-btn
                  v-if="!isSelf(ouvrage)"
                  flat
                  dense
                  :color="isAbonne(ouvrage) ? 'primary' : 'grey-7'"
                  :label="isAbonne(ouvrage) ? 'Abonné' : 'S’abonner'"
                  icon="person_add"
                  @click="toggleAbonnement(ouvrage)"
                  class="q-ml-sm"
                />
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

      <!-- Histoires dynamiques -->
      <template v-else-if="sort === 'histoire'">
        <q-card
          v-for="histoire in filteredHistoires"
          :key="histoire.id_histoire"
          class="story-card q-mb-lg"
          @mouseenter="loadAbonnes(histoire)"
        >
          <q-card-section>
            <div class="row items-center q-mb-sm">
              <q-avatar color="primary" text-color="white" size="40px" class="q-mr-md">
                <img :src="getFullUrl(histoire.image)" alt="Auteur" v-if="histoire.image" />
                <q-icon v-else name="menu_book" />
              </q-avatar>
              <div>
                <div class="text-h6 ouvrage-title">{{ histoire.titre }}</div>
                <div class="text-caption text-grey-7">
                  Publiée {{ timeSince(histoire.date_creation) }}
                </div>
              </div>
            </div>
            <div class="q-mb-xs">
              <q-chip dense color="primary" text-color="white">
                {{ histoire.nom_categorie || 'Histoire' }}
              </q-chip>
              <span class="text-caption text-grey-8 q-ml-sm">
                Auteur : {{ histoire.username }} {{ histoire.prenom }}
              </span>
              <q-chip dense class="q-ml-sm">{{ histoire.nom_nationalite }}</q-chip>
              <q-badge color="primary" class="q-ml-sm">
                {{ abonnésCount[histoire.id_user || histoire.id_auteur] || 0 }} abonnés
              </q-badge>
              <q-btn
                v-if="!isSelf(histoire)"
                flat
                dense
                :color="isAbonne(histoire) ? 'primary' : 'grey-7'"
                :label="isAbonne(histoire) ? 'Abonné' : 'S’abonner'"
                icon="person_add"
                @click="toggleAbonnement(histoire)"
                class="q-ml-sm"
              />
            </div>
            <div class="q-mb-xs" v-if="histoire.personnages_principaux">
              <span class="text-caption text-grey-7">
                Personnages : {{ histoire.personnages_principaux }}
              </span>
            </div>
            <div class="q-mb-md">
              <span class="story-description">
                {{ histoire.description }}
              </span>
            </div>
            <div class="row q-mt-sm q-gutter-sm">
              <q-btn flat round icon="favorite_border" color="pink" @click="onLike(histoire)" />
              <q-btn
                flat
                round
                icon="chat_bubble_outline"
                color="primary"
                @click="onComment(histoire)"
              />
              <q-btn flat round icon="share" color="teal" @click="onShare(histoire)" />
            </div>
            <div class="q-mt-md">
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

    <!-- Modal lecture histoire -->
    <q-dialog v-model="showHistoireModal">
      <q-card style="max-width: 600px">
        <q-card-section>
          <div class="text-h6 q-mb-sm">{{ selectedHistoire?.titre }}</div>
          <div class="text-caption text-grey-7 q-mb-xs">
            Publiée {{ timeSince(selectedHistoire?.date_creation) }}
          </div>
          <div class="q-mb-xs">
            <q-chip dense color="primary" text-color="white">
              {{ selectedHistoire?.nom_categorie || 'Histoire' }}
            </q-chip>
            <span class="text-caption text-grey-8 q-ml-sm">
              Auteur : {{ selectedHistoire?.username }} {{ selectedHistoire?.prenom }}
            </span>
            <q-chip dense class="q-ml-sm">{{ selectedHistoire?.nom_nationalite }}</q-chip>
          </div>
          <div class="q-mb-md">
            <span class="text-caption text-grey-7" v-if="selectedHistoire?.personnages_principaux">
              Personnages : {{ selectedHistoire?.personnages_principaux }}
            </span>
          </div>
          <div class="q-mb-md">
            <span class="story-description">
              {{ selectedHistoire?.histoire }}
            </span>
          </div>
          <div class="q-mb-md">
            <span class="text-caption text-grey-8">
              Email : {{ selectedHistoire?.email }}
            </span>
          </div>
          <div class="q-mb-md">
            <span class="text-caption text-grey-8">
              Bio : {{ selectedHistoire?.bio }}
            </span>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fermer" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <FooterPage />

    <!-- Notification pour nouvelle histoire -->
    <q-notification
      v-model="showNotif"
      color="primary"
      icon="menu_book"
      :message="notifMessage"
      position="top-right"
      timeout="3000"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import BannerSection from 'src/components/BannerSection.vue'
import HeaderPage from 'src/components/HeaderPage.vue'
import FooterPage from 'src/components/FooterPage.vue'
import { useCategorieStore } from 'src/stores/categorie'
import { useAfficherOuvrageStore } from 'src/stores/AfficherOuvrage'
import { useAfficherHistoireStore } from 'src/stores/AfficherHistoire'
import { useAbonnementStore } from 'src/stores/gestionAbonnement'

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

const categorieStore = useCategorieStore()
const ouvrageStore = useAfficherOuvrageStore()
const histoireStore = useAfficherHistoireStore()
const abonnementStore = useAbonnementStore()

const showBioModal = ref(false)
const selectedOuvrage = ref(null)
const selectedHistoire = ref(null)
const showHistoireModal = ref(false)

// Notification pour nouvelle histoire
const showNotif = ref(false)
const notifMessage = ref('')

// Utilise le store pour la liste des abonnements et le nombre d'abonnés
const abonnements = abonnementStore.abonnements
const abonnésCount = abonnementStore.abonnésCount

// Récupérer l'utilisateur courant depuis le localStorage
const user = ref(null)
onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})

function isAbonne(item) {
  return (abonnements.value || []).includes(item.id_user)
}
function isSelf(item) {
  return user.value && (String(user.value.id) === String(item.id_user))
}

async function loadAbonnes(item) {
  const id = item.id_user || item.id_auteur
  if (id) {
    await abonnementStore.compterAbonnesAuteur(id)
  }
}

async function toggleAbonnement(item) {
  const idAuteur = item.id_user
  const idAbonne = user.value?.id
  if (!idAuteur || !idAbonne) {
    $q.notify({ type: 'negative', message: "Aucun auteur ou abonné trouvé pour l'abonnement" })
    return
  }
  if (isAbonne(item)) {
    abonnements.value = abonnements.value.filter(a => a !== idAuteur)
    $q.notify({ type: 'info', message: `Désabonné de ${item.username} ${item.prenom}` })
    await loadAbonnes(item)
  } else {
    const res = await abonnementStore.ajouterAbonnement(idAuteur, idAbonne)
    if (res && res.succes) {
      if (!abonnements.value.includes(idAuteur)) {
        abonnements.value.push(idAuteur)
      }
      $q.notify({ type: 'positive', message: 'Abonnement ajouté' })
      await loadAbonnes(item)
    } else {
      $q.notify({ type: 'negative', message: res?.message || "Erreur lors de l'abonnement" })
    }
  }
}

function showBio(ouvrage) {
  selectedOuvrage.value = ouvrage
  showBioModal.value = true
}

function showHistoire(histoire) {
  selectedHistoire.value = histoire
  showHistoireModal.value = true
}

// Simule la notification lors de la publication d'une histoire
function notifyNewHistoire(histoire) {
  notifMessage.value = `Nouvelle histoire publiée : "${histoire.titre}" par ${histoire.username} ${histoire.prenom}`
  showNotif.value = true
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
  await histoireStore.fetchHistoires()
  // Notification si nouvelle histoire (exemple : la dernière du tableau)
  if (histoireStore.histoires.length > 0) {
    notifyNewHistoire(histoireStore.histoires[histoireStore.histoires.length - 1])
  }
})

const filteredOuvrages = computed(() => {
  let list = ouvrageStore.ouvrages
  if (filter.value && filter.value !== 'Tous') {
    list = list.filter(o =>
      o.nom_categorie && o.nom_categorie.toLowerCase() === filter.value.toLowerCase()
    )
  }
  return list
})

// Filtrage par catégorie pour les histoires
const filteredHistoires = computed(() => {
  let list = histoireStore.histoires
  if (!Array.isArray(list)) return []
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

function onLike(item) {
  $q.notify({ type: 'positive', message: `Vous aimez "${item.titre || item.titre_ouvrage}" !` })
}
function onComment(item) {
  $q.notify({ type: 'info', message: `Commenter "${item.titre || item.titre_ouvrage}"` })
}
function onShare(item) {
  $q.notify({ type: 'primary', message: `Partager "${item.titre || item.titre_ouvrage}"` })
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