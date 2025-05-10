<template>
  <q-page class="dashboard-page">
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
          <q-btn flat label="Ecrire" class="hover-underline-animation" to="/write" />
          <q-btn flat label="Publier" class="hover-underline-animation" to="/create-book" />
          <q-btn flat label="Raconter" class="hover-underline-animation" to="/raconter" />
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
                      <q-img
                        :src="getFullImageUrl(user.image)"
                        alt="Image de profil"
                        @error="handleImageError"
                      />
                    </q-avatar>
                    <q-item-section>
                      <q-item-label class="text-h8"
                        >{{ user.username }} {{ user.prenom }}</q-item-label
                      >
                      <q-item-label caption>{{
                        user.bio || 'Biographie non disponible'
                      }}</q-item-label>
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
              tranquille jusqu'à ce qu'IL arrive et chamboule absolument tout...
            </p>
            <div class="row q-mt-md">
              <q-chip v-for="tag in ['Fantasy', 'Aventure', 'Loup-Garou']" :key="tag" dense>{{
                tag
              }}</q-chip>
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
import { ref, onMounted } from 'vue';
import BannerSection from 'src/components/BannerSection.vue';
import LangSwitcher from 'src/components/LangSwitcher.vue';

const searchQuery = ref(''); // Définition de la propriété searchQuery
const filter = ref('Tous');
const sort = ref('recent');
const filterOptions = ['Tous', 'Fantasy', 'Aventure', 'Romance', 'Drame', 'Horreur', 'Mystère'];

const user = ref({
  username: '',
  prenom: '',
  image: '',
  bio: '',
});

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser); // Récupère les informations de l'utilisateur depuis le localStorage
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
  }
});

const logout = () => {
  localStorage.removeItem('user'); // Supprime les informations de l'utilisateur du localStorage
  window.location.reload(); // Recharge la page pour réinitialiser l'état
};

const getFullImageUrl = (imagePath) => {
  const baseUrl = 'http://localhost/Api_Bibliotheque/uploads/users/';

  // Vérifie si le chemin de l'image est valide
  if (!imagePath) {
    // Retourne une image par défaut si aucun chemin n'est fourni
    return `${baseUrl}Capture.PNG`;
  }

  // Retourne l'URL complète si le chemin ne commence pas par "http"
  return imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
};

const handleImageError = (event) => {
  // Remplace l'image par défaut en cas d'erreur de chargement
  event.target.src = 'http://localhost/Api_Bibliotheque/uploads/users/';
};
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
</style>
