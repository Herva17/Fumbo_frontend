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
      <div class="nav-btns flex items-center gap-4 q-xs-none q-sm-none" style="margin-top: 10PX">
        <q-btn flat label="Librairie" class="hover-underline-animation" to="/ecrire" />
        <q-btn flat label="Livres gratuit" class="hover-underline-animation" to="/ouvrage" />
        <q-btn flat label="Écrire" class="hover-underline-animation" to="/write" />
        <q-btn flat label="Publier" class="hover-underline-animation" to="/create-book" />
        <q-btn flat label="Raconter" class="hover-underline-animation" to="/raconter" />
        <q-btn flat label="Écouter" class="hover-underline-animation" to="/ecouter" />

        <!-- Partie droite - Actions utilisateur -->
        <div class="col-auto row items-center q-gutter-sm right-actions" style="">
          <LangSwitcher class="q-ml-md" />
          <q-space />

          <!-- Bouton Notifications -->
          <q-btn flat round icon="notifications" class="notif">
            <q-badge floating color="red">3</q-badge>
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
                    <div class="q-pa-sm">
                      <div class="text-subtitle2 q-mb-sm">
                        A Cure For Ice <span class="text-caption">par fuel line</span>
                      </div>
                      <div class="text-caption q-mb-sm">✧ ✧ ✧ ✧ ✧ ✧</div>
                      <div class="q-mb-sm">
                        <strong>Véronique:</strong> Super histoire, on attend la suite avec impatience, merci !!! 😊
                      </div>
                      <div class="text-caption text-primary">Lire la critique complète</div>
                    </div>
                    <q-separator spaced />
                    <div class="q-pa-sm">
                      <div class="text-subtitle2 q-mb-sm">
                        Au Clair de Lune, Tome 1 : La Lune Vengeresse
                      </div>
                      <div class="text-caption">par Laura B</div>
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
                <q-separator />
                <div class="row justify-center q-pa-sm">
                  <q-btn flat label="Afficher toutes les notifications" color="primary" dense />
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
import { ref, onMounted } from 'vue'
import LangSwitcher from 'src/components/LangSwitcher.vue'

const searchQuery = ref('')
const notifTab = ref('story')
const drawer = ref(false)
const user = ref({
  id: '',
  username: '',
  prenom: '',
  image: '',
  bio: '',
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
