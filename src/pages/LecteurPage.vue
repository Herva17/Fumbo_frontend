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
          <q-btn flat label="Ecrire" class="hover-underline-animation" to="/ouvrage" />
          <q-btn flat label="Publier" class="hover-underline-animation" to="/create-book" />
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

    <!-- Conteneur principal du lecteur audio -->
    <div class="audio-player-container">
      <!-- Section principale du lecteur audio -->
      <div class="player-section">
        <!-- Informations sur la piste en cours de lecture -->
        <div class="track-info">
          <h2 class="track-title">{{ currentAudio.title }}</h2>
          <p class="track-meta">
            <span>Durée : {{ formatDuration(duration) }}</span> |
            <span>Genre : {{ currentAudio.genre }}</span>
          </p>

          <!-- Barre de progression de la piste -->
          <q-slider v-model="progress" :min="0" :max="duration" @change="seekAudio" />

          <!-- Contrôles du lecteur audio -->
          <div class="controls">
            <q-btn round flat icon="skip_previous" @click="prevTrack" />
            <q-btn round flat :icon="isPlaying ? 'pause' : 'play_arrow'" @click="togglePlay" />
            <q-btn round flat icon="skip_next" @click="nextTrack" />
            <q-btn
              round
              flat
              icon="shuffle"
              :class="{ active: isShuffle }"
              @click="toggleShuffle"
            />
            <q-btn round flat icon="repeat" :class="{ active: isRepeat }" @click="toggleRepeat" />
            <q-btn
              round
              flat
              icon="star"
              :color="isFavorite ? 'yellow' : 'grey'"
              @click="toggleFavorite"
            />
            <q-btn round flat icon="picture_in_picture" @click="enablePiP" />

            <!-- Sélecteur de vitesse de lecture -->
            <q-select
              dense
              filled
              v-model="playbackRate"
              :options="[0.5, 1, 1.5, 2]"
              label="Vitesse"
              @update:model-value="changeSpeed"
              class="speed-select"
            />
          </div>
        </div>

        <!-- Couverture de la piste et informations de l'artiste -->
        <div class="track-cover">
          <!-- Image de couverture de la piste -->
          <q-img :src="getImageUrl(currentAudio.cover)" class="cover-img" />
          <p class="author-name">by {{ currentAudio.artist }}</p>
          <!-- Notation de la piste -->
          <q-rating v-model="rating" max="5" size="20px" color="yellow" />
        </div>
      </div>

      <!-- Barre de recherche et filtre par genre -->
      <div class="search-bar">
        <q-input filled rounded v-model="searchQuery" placeholder="Rechercher un podcast...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-select v-model="selectedGenre" :options="genres" label="Filtrer par genre" />
      </div>

      <!-- Liste des pistes disponibles -->
      <q-list class="playlist">
        <q-item
          v-for="(audio, index) in filteredPlaylist"
          :key="index"
          clickable
          @click="selectTrack(index)"
          :class="{ 'active-track': currentIndex === index }"
        >
          <q-item-section avatar>
            <q-avatar><img :src="getImageUrl(audio.cover)" /></q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ audio.title }}</q-item-label>
            <q-item-label caption>{{ audio.artist }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ formatDuration(audio.duration) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Élément audio pour la lecture -->
      <audio
        ref="audioPlayer"
        :src="currentAudio.src"
        @timeupdate="updateProgress"
        @ended="handleEnd"
      ></audio>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

// Référence à l'élément audio
const audioPlayer = ref(null)
// État de lecture
const isPlaying = ref(false)
// Progression de la lecture
const progress = ref(0)
// Durée totale de la piste
const duration = ref(0)
// Requête de recherche
const searchQuery = ref('')
// Genre sélectionné pour le filtrage
const selectedGenre = ref(null)
// État du mode aléatoire
const isShuffle = ref(false)
// État du mode répétition
const isRepeat = ref(false)
// État du favori
const isFavorite = ref(false)
// Notation de la piste
const rating = ref(0)
// Vitesse de lecture
const playbackRate = ref(1)

// Liste des pistes disponibles
const playlist = ref([
  {
    title: 'Podcast 1',
    artist: 'Auteur 1',
    genre: 'Motivation',
    src: '/audios/podcast1.mp3',
    cover: '/img/cover1.jpg',
    duration: 567,
  },
  {
    title: 'Podcast 2',
    artist: 'Auteur 2',
    genre: 'Histoire',
    src: '/audios/podcast2.mp3',
    cover: '/img/cover2.jpg',
    duration: 612,
  },
])

// Liste des genres disponibles
const genres = computed(() => ['Tous', ...new Set(playlist.value.map((p) => p.genre))])

// Index de la piste en cours de lecture
const currentIndex = ref(0)
// Piste en cours de lecture
const currentAudio = computed(() => playlist.value[currentIndex.value])

// Fonction pour basculer entre lecture et pause
const togglePlay = () => {
  isPlaying.value ? audioPlayer.value.pause() : audioPlayer.value.play()
  isPlaying.value = !isPlaying.value
}

// Fonction pour passer à la piste précédente
const prevTrack = () => {
  currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length
  loadTrack()
}

// Fonction pour passer à la piste suivante
const nextTrack = () => {
  if (isShuffle.value) {
    currentIndex.value = Math.floor(Math.random() * playlist.value.length)
  } else {
    currentIndex.value = (currentIndex.value + 1) % playlist.value.length
  }
  loadTrack()
}

// Fonction appelée à la fin de la lecture
const handleEnd = () => {
  if (isRepeat.value) {
    loadTrack()
  } else {
    nextTrack()
  }
}

// Fonction pour activer/désactiver le mode aléatoire
const toggleShuffle = () => {
  isShuffle.value = !isShuffle.value
}

// Fonction pour activer/désactiver le mode répétition
const toggleRepeat = () => {
  isRepeat.value = !isRepeat.value
}

// Fonction pour activer/désactiver le favori
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

// Fonction pour changer la vitesse de lecture
const changeSpeed = () => {
  audioPlayer.value.playbackRate = playbackRate.value
}

// Fonction pour sélectionner une piste
const selectTrack = (index) => {
  currentIndex.value = index
  loadTrack()
}

// Fonction pour charger la piste sélectionnée
const loadTrack = () => {
  isPlaying.value = false
  audioPlayer.value.load()
  togglePlay()
}

// Fonction pour mettre à jour la progression de la lecture
const updateProgress = () => {
  progress.value = audioPlayer.value.currentTime
  duration.value = audioPlayer.value.duration
}

// Fonction pour rechercher une position spécifique dans la piste
const seekAudio = () => {
  audioPlayer.value.currentTime = progress.value
}

// Fonction pour formater la durée en minutes et secondes
const formatDuration = (seconds) => {
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)
  return `${min}m ${sec}s`
}

// Fonction pour obtenir l'URL complète de l'image
const getImageUrl = (path) => {
  return new URL(path, import.meta.url).href
}

// Liste filtrée des pistes en fonction de la recherche et du genre sélectionné
const filteredPlaylist = computed(() => {
  return playlist.value.filter((audio) => {
    return (
      (!searchQuery.value || audio.title.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (!selectedGenre.value ||
        selectedGenre.value === 'Tous' ||
        audio.genre === selectedGenre.value)
    )
  })
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
.audio-player-container {
  max-width: 1000px;
  margin: auto;
  background: #a7abadff;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
}
.controls .active {
  color: yellow;
}
.speed-select {
  width: 100px;
  margin-left: 30px;
}
.track-cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.cover-img {
  max-width: 50%;
  max-height: 500px;
  border-radius: 10px;
  object-fit: cover;
}
</style>
