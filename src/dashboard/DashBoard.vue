<template>
  <q-page class="dashboard-page">
    <!-- Section "Lives gratuits" et autres onglets -->
    <div class="row q-mb-md items-center justify-between">
      <!-- Partie gauche - Onglets de navigation -->
      <div class="col">
        <q-tabs
          v-model="tab"
          inline-label
          class="text-grey-8"
          active-color="primary"
          indicator-color="primary"
          align="left"
        >
          <q-tab name="trending" icon="trending_up" label="Histoires tendance" />
          <q-tab name="free" icon="live_tv" label="Lives gratuits" />
          <q-tab name="write" icon="edit" label="Écrire" />
          <q-tab name="community" icon="groups" label="Communauté" />
          <q-tab name="contests" icon="emoji_events" label="Concours d'écriture" />
          <!-- Sélecteur de langue -->
          <!-- <LangSwitcher class="q-ml-md" /> -->
        </q-tabs>
      </div>

      <!-- Partie droite - Actions utilisateur -->
      <div class="col-auto row items-center q-gutter-sm">
        <!-- Sélecteur de langue -->
        <LangSwitcher class="q-ml-md" />
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

        <!-- Bouton Plus -->
        <q-btn flat round icon="more_vert"> </q-btn>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-ripple to="/module">
              <q-item-section>Comment ça marche</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple to="/support">
              <q-item-section>Support</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple to="/condition">
              <q-item-section>Conditions générales</q-item-section>
            </q-item>

            <q-separator />
          </q-list>
        </q-menu>
      </div>
    </div>

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
          { label: 'Mieux notés', value: 'top' },
        ]"
      />
    </div>

    <!-- Liste des histoires -->
    <div class="stories-list">
      <!-- Histoire 1 -->
      <q-card class="story-card q-mb-lg">
        <q-card-section horizontal>
          <q-img class="col-3" src="/img/wild-sky.jpg" alt="Au Clair de Lune" />

          <q-card-section>
            <div class="text-h6">Au Clair de Lune, Tome 1 : La Lune Vengeresse</div>
            <div class="text-subtitle2 q-mb-sm">★★★★☆</div>
            <p class="story-description">
              Je m'appelle Louva Wild, une Loup-Garou de rang Delta qui mène une vie simple et
              tranquille jusqu'à ce qu'IL arrive et chamboule absolument tout. Il va s'imposer dans
              ma vie et la changer pour le m...
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

      <!-- Histoire 2 -->
      <q-card class="story-card q-mb-lg">
        <q-card-section horizontal>
          <q-img class="col-3" src="/img/werewolf.jpg" alt="Sous un ciel sauvage" />

          <q-card-section>
            <div class="text-h6">Sous un ciel sauvage</div>
            <div class="text-subtitle2 q-mb-sm">★★★★☆</div>
            <p class="story-description">
              On m'a tout pris. Mon innocence, ma maison, mes désirs. Même celle de vivre. À quoi
              bon ? Depuis toujours, je lutte dans un monde qui ne me laisse pas de place. Un monde
              sans pitié, où il faut sur...
            </p>

            <div class="row q-mt-md">
              <q-chip v-for="tag in ['Aventure', 'Drame', 'Sauvage']" :key="tag" dense>
                {{ tag }}
              </q-chip>
            </div>

            <div class="row items-center q-mt-sm">
              <div class="col">
                <span class="text-caption">Par Ella, MORGAN • En cours • 11 chapitres</span>
              </div>
              <div class="col-auto">
                <q-btn flat color="primary" label="Lire" />
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <!-- Histoire 3 -->
      <q-card class="story-card q-mb-lg">
        <q-card-section horizontal>
          <q-img class="col-3" src="/img/moon-story.jpg" alt="Le loup-garou civilisé" />

          <q-card-section>
            <div class="text-h6">Le loup-garou civilisé: l'enlèvement</div>
            <div class="text-subtitle2 q-mb-sm">★★★★☆</div>
            <p class="story-description">
              Dans un monde où les loups-garous sont censés être sauvages et incontrôlables, moi, je
              suis différent. J'ai été élevé parmi les humains, éduqué, "civilisé". Mais quand ma
              sœur est enlevée par une meute rivale, toute ma civilisation s'effondre...
            </p>

            <div class="row q-mt-md">
              <q-chip v-for="tag in ['Fantasy', 'Loup-Garou', 'Mystère']" :key="tag" dense>
                {{ tag }}
              </q-chip>
            </div>

            <div class="row items-center q-mt-sm">
              <div class="col">
                <span class="text-caption">Par Jean D. • En cours • 23 chapitres</span>
              </div>
              <div class="col-auto">
                <q-btn flat color="primary" label="Lire" />
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
// import LangSwitcher from 'src/components/LangSwitcher.vue'

const tab = ref('trending')
const filter = ref('Tous')
const sort = ref('recent')

const filterOptions = ['Tous', 'Fantasy', 'Aventure', 'Romance', 'Drame', 'Horreur', 'Mystère']
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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
</style>
