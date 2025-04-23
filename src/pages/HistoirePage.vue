<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-white text-black shadow-sm">
      <!-- Section "Lives gratuits" et autres onglets -->
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-h5">Fumbo</q-toolbar-title>
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
          <q-btn flat label="Livres gratuit" class="hover-underline-animation" to="/ouvrage" />
          <q-btn flat label="Ecrire" class="hover-underline-animation" to="/ouvrage" />
          <q-btn flat label="Publier" class="hover-underline-animation" to="/create-books" />
          <q-btn flat label="Raconter" class="hover-underline-animation" to="/Ecrire" />
          <q-btn flat label="Ecouter" class="hover-underline-animation" to="/ecouter" />

          <!-- Partie droite - Actions utilisateur -->
          <div class="col-auto row items-center q-gutter-sm">
            <!-- Sélecteur de langue -->
            <LangSwitcher class="q-ml-md" />
            <q-space ref="30px" />
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
                    <!-- Onglet Histoire -->
                    <q-tab-panel name="story">
                      <div class="q-pa-sm">
                        <div class="text-subtitle2 q-mb-sm">
                          A Cure For Ice <span class="text-caption">par fuel line</span>
                        </div>
                        <div class="text-caption q-mb-sm">✧ ✧ ✧ ✧ ✧ ✧</div>
                        <div class="q-mb-sm">
                          <strong>Véronique:</strong> Super histoire, on attend la suite avec
                          impatience, merci !!! 😊
                        </div>
                        <div class="text-caption text-primary">Live la critique complète</div>
                      </div>

                      <q-separator spaced />

                      <div class="q-pa-sm">
                        <div class="text-subtitle2 q-mb-sm">
                          Au Clair de Lune, Tome 1 : La Lune Vengeresse
                        </div>
                        <div class="text-caption">par Laura B</div>
                      </div>
                    </q-tab-panel>

                    <!-- Onglet Communauté -->
                    <q-tab-panel name="community">
                      <div class="q-pa-sm text-center text-grey-6">
                        Aucune notification communautaire
                      </div>
                    </q-tab-panel>

                    <!-- Onglet Système -->
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
            <q-btn flat round icon="account_circle" class="text-black">
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item>
                    <q-avatar size="30px" class="q-mr-md">
                      <q-img src="~assets/user-avatar.png" />
                    </q-avatar>
                    <q-item-section>
                      <q-item-label class="text-h8">Thierry Nirere</q-item-label>
                      <q-item-label caption>utilisateur</q-item-label>
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
        <q-separator spaced />
      </q-toolbar>
    </q-header>

    <q-separator spaced />

    <!-- SECTIONS PAR CATÉGORIE -->
    <div class="q-pa-md">
      <CategorySection title="Histoires d'amour" :books="loveStories" />
      <q-separator class="q-my-md" />
      <CategorySection title="Romans policiers" :books="detectiveNovels" />
      <q-separator class="q-my-md" />
      <CategorySection title="Science-fiction" :books="scifiBooks" />
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import CategorySection from 'src/components/CategorySection.vue' // Composant réutilisable

const loveStories = ref([
  {
    title: 'Un amour éternel',
    author: 'Sophie Laurent',
    imageUrl: '/img/love1.jpg',
  },
  {
    title: 'Les battements du cœur',
    author: 'Marc Dupuis',
    imageUrl: '/img/love2.jpg',
  },
  {
    title: 'À jamais ensemble',
    author: 'Elodie Martin',
    imageUrl: '/img/love3.jpg',
  },
])

const detectiveNovels = ref([
  {
    title: "L'ombre du crime",
    author: 'Henri Clément',
    imageUrl: '/img/detective1.jpg',
  },
  {
    title: 'Enquête fatale',
    author: 'Julie Verne',
    imageUrl: '/img/detective2.jpg',
  },
  {
    title: 'Mystère à Paris',
    author: 'François Leblanc',
    imageUrl: '/img/detective3.jpg',
  },
])

const scifiBooks = ref([
  {
    title: 'Les mondes parallèles',
    author: 'Arthur Nelson',
    imageUrl: '/img/scifi1.jpg',
  },
  {
    title: 'L’ère des cyborgs',
    author: 'Claire Fontaine',
    imageUrl: '/img/scifi2.jpg',
  },
  {
    title: 'Le voyage interstellaire',
    author: 'Paul Rivière',
    imageUrl: '/img/scifi3.jpg',
  },
])
</script>
