<template>
  <q-header elevated class="bg-white text-black shadow-sm" style="height: 80px">
    <q-toolbar class="q-px-lg header-toolbar">
      <!-- Logo -->
      <q-avatar size="80px" class="logo-avatar">
        <img src="/img/fumbo_logo.png" style="background: none" />
      </q-avatar>
      <q-space />

      <!-- Champ de recherche (masqué sur mobile) -->
      <q-input
        dense
        filled
        rounded
        placeholder="Rechercher..."
        class="q-mr-md animate__animated animate__fadeInRight search-input q-xs-none q-sm-none"
        v-model="searchQuery"
        style="max-width: 150px; margin-top: 5px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <!-- Liens de navigation (masqués sur mobile) -->
      <div class="nav-btns flex items-center gap-4 q-xs-none q-sm-none" style="margin-top: 10px">
        <q-btn flat label="Librairie" class="hover-underline-animation" to="/ecrire" />
        <q-btn flat label="Livres gratuit" class="hover-underline-animation" to="/ouvrage" />
        <q-btn flat label="Écrire" class="hover-underline-animation" to="/write" />
        <q-btn flat label="Publier" class="hover-underline-animation" to="/create-book" />
        <q-btn flat label="Raconter" class="hover-underline-animation" to="/raconter" />
        <q-btn flat label="Écouter" class="hover-underline-animation" to="/ecouter" />

        <!-- Partie droite - Actions utilisateur -->
        <div class="col-auto row items-center q-gutter-sm right-actions">
          <LangSwitcher class="q-ml-md" />
          <q-space />

          <!-- Bouton Notifications -->
          <!-- Bouton Notifications -->
          <q-btn flat round icon="notifications" class="notif">
            <q-badge v-if="unreadCount" floating color="red">{{ unreadCount }}</q-badge>
            <q-menu anchor="bottom right" self="top right">
              <q-card style="width: 400px; max-width: 100vw">
                <q-tabs
                  v-model="notifTab"
                  dense
                  class="text-grey-8"
                  active-color="primary"
                  indicator-color="primary"
                >
                  <q-tab name="story" label="Histoire" />
                  <q-tab name="community" label="Communauté" />
                  <q-tab name="system" label="Système" />
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="notifTab" animated>
                  <q-tab-panel name="story">
                    <template v-if="recentBooks.length">
                      <div
                        v-for="ouvrage in recentBooks"
                        :key="ouvrage.id_ouvrage"
                        class="q-pa-sm row items-center"
                        style="align-items: flex-start"
                      >
                        <!-- Ligne principale : avatar user, titre, nom auteur, badge, image ouvrage -->
                        <div class="row items-center col-12" style="gap: 10px">
                          <!-- Avatar utilisateur -->
                          <q-avatar size="40px">
                            <img :src="getUserImage(ouvrage.user_image)" alt="Auteur" />
                          </q-avatar>
                          <!-- Titre et auteur -->
                          <div class="column" style="flex: 1">
                            <div
                              class="text-subtitle2"
                              style="display: flex; align-items: center; gap: 8px"
                            >
                              <span>{{ ouvrage.titre_ouvrage }}</span>
                              <span class="text-caption"
                                >par {{ ouvrage.username }} {{ ouvrage.prenom }}</span
                              >
                              <q-badge
                                v-if="!readNotifs.includes(ouvrage.id_ouvrage)"
                                color="red"
                                rounded
                                label="Nouveau"
                                class="q-ml-sm"
                              />
                            </div>
                          </div>
                          <!-- Image de l'ouvrage -->
                          <q-avatar size="48px" square>
                            <img
                              :src="
                                ouvrage.ouvrage_image
                                  ? getUserImage(ouvrage.ouvrage_image)
                                  : '/img/default-book.jpg'
                              "
                              alt="Ouvrage"
                            />
                          </q-avatar>
                        </div>
                        <!-- Infos complémentaires -->
                        <div class="col-12 q-ml-lg">
                          <div class="text-caption q-mb-xs">
                            Publié il y a {{ timeSince(ouvrage.datePub) }}
                          </div>
                          <div class="q-mb-xs">
                            <strong>Catégorie :</strong> {{ ouvrage.nom_categorie }}
                          </div>
                          <div class="text-caption text-primary">
                            <q-btn
                              flat
                              dense
                              color="primary"
                              label="Voir le livre"
                              :to="`/ouvrage/${ouvrage.id_ouvrage}`"
                              @click="markOneAsRead(ouvrage.id_ouvrage)"
                            />
                          </div>
                          <hr />
                        </div>
                        <q-separator spaced class="col-12" />
                      </div>
                    </template>
                    <div v-else class="q-pa-sm text-center text-grey-6">
                      Aucun nouveau livre publié aujourd'hui
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="community">
                    <div class="q-pa-sm text-center text-grey-6">
                      Aucune notification communautaire
                    </div>
                  </q-tab-panel>
                  <q-tab-panel name="system">
                    <div class="q-pa-sm text-center text-grey-6">Aucune notification système</div>
                  </q-tab-panel>
                </q-tab-panels>
                <div class="row justify-center q-pa-sm">
                  <q-btn
                    flat
                    label="Afficher toutes les notifications"
                    color="primary"
                    dense
                    @click="markAllAsRead"
                  />
                </div>
              </q-card>
            </q-menu>
          </q-btn>

          <!-- Menu Profil -->
          <q-btn flat round>
            <q-avatar size="32px">
              <img :src="getUserImage(user.image)" alt="Profil" />
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item>
                  <q-avatar size="30px" class="q-mr-md">
                    <img :src="getUserImage(user.image)" />
                  </q-avatar>
                  <q-item-section>
                    <q-item-label class="text-h8">
                      {{ user.username }} {{ user.prenom }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ user.bio || 'Biographie non disponible' }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-ripple to="/profil">
                  <q-item-section avatar>
                    <q-icon name="person" />
                  </q-item-section>
                  <q-item-section>Profil</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-ripple to="/parametre">
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>Paramètre</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-ripple @click="logout">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section class="text-negative">Déconnexion</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-toolbar>

    <!-- Drawer pour mobile -->
    <q-drawer
      v-model="drawer"
      side="right"
      overlay
      class="bg-white text-black"
      :width="220"
      breakpoint="600"
    >
      <q-list>
        <q-item clickable to="/ecrire"><q-item-section>Librairie</q-item-section></q-item>
        <q-item clickable to="/ouvrage"><q-item-section>Livres gratuit</q-item-section></q-item>
        <q-item clickable to="/write"><q-item-section>Écrire</q-item-section></q-item>
        <q-item clickable to="/create-book"><q-item-section>Publier</q-item-section></q-item>
        <q-item clickable to="/raconter"><q-item-section>Raconter</q-item-section></q-item>
        <q-item clickable to="/ecouter"><q-item-section>Écouter</q-item-section></q-item>
        <q-separator />
        <q-item>
          <LangSwitcher />
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="notifications" />
          </q-item-section>
          <q-item-section>Notifications</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>Profil</q-item-section>
        </q-item>
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section class="text-negative">Déconnexion</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </q-header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import LangSwitcher from 'src/components/LangSwitcher.vue'
import { useAfficherOuvrageStore } from 'src/stores/AfficherOuvrage'

const ouvrageStore = useAfficherOuvrageStore()

function timeSince(dateString) {
  if (!dateString) return ''
  const now = new Date()
  const date = new Date(dateString.replace(' ', 'T'))
  const seconds = Math.floor((now - date) / 1000)
  if (seconds < 60) return 'quelques secondes'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} heure${hours > 1 ? 's' : ''}`
  const days = Math.floor(hours / 24)
  return `${days} jour${days > 1 ? 's' : ''}`
}

// Livres publiés il y a moins d'un jour
const recentBooks = computed(() =>
  (ouvrageStore.ouvrages || []).filter((o) => {
    if (!o.datePub) return false
    const now = new Date()
    const pub = new Date(o.datePub.replace(' ', 'T'))
    const diff = (now - pub) / (1000 * 60 * 60 * 24)
    return diff < 1
  }),
)

// Gestion des notifications lues/non lues via localStorage
const NOTIF_KEY = 'fumbo_read_notifs'
const notifTab = ref('story')
const searchQuery = ref('')
const drawer = ref(false)
const user = ref({
  id: '',
  username: '',
  prenom: '',
  image: '',
  bio: '',
})

// Récupère la liste des IDs de notifications déjà lues
function getReadNotifs() {
  try {
    return JSON.parse(localStorage.getItem(NOTIF_KEY)) || []
  } catch {
    return []
  }
}

// Marquer toutes les notifications comme lues
function markAllAsRead() {
  const ids = recentBooks.value.map((o) => o.id_ouvrage)
  localStorage.setItem(NOTIF_KEY, JSON.stringify(ids))
  readNotifs.value = ids
}

// Marquer une notification comme lue
function markOneAsRead(id) {
  const current = getReadNotifs()
  if (!current.includes(id)) {
    current.push(id)
    localStorage.setItem(NOTIF_KEY, JSON.stringify(current))
    readNotifs.value = current
  }
}

// Marquer toutes comme lues à l'ouverture du menu

// Liste réactive des notifications lues
const readNotifs = ref(getReadNotifs())

// Notifications non lues
const unreadRecentBooks = computed(() =>
  recentBooks.value.filter((o) => !readNotifs.value.includes(o.id_ouvrage)),
)
const unreadCount = computed(() => unreadRecentBooks.value.length)

// Synchronise readNotifs si localStorage change ailleurs
window.addEventListener('storage', () => {
  readNotifs.value = getReadNotifs()
})

// Adapter ici selon l'emplacement réel de tes images utilisateurs
const BASE_URL = 'http://localhost/' // Mets l'URL de base de ton serveur

function getUserImage(path) {
  if (!path) return '/img/user-avatar.png'
  if (path.startsWith('http')) return path
  return BASE_URL + path.replace(/^(\.\.\/|\.\/)+/, '')
}

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

const logout = () => {
  localStorage.removeItem('user')
  window.location.reload()
}
</script>
