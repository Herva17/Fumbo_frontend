<template>
  <q-page class="dashboard-page bg-grey-1">
    <HeaderPage />
    <div class="media-player-container bg-white shadow-5">
      <!-- Onglets pour basculer entre audio et vidéo -->
      <q-tabs
        v-model="mediaType"
        dense
        class="text-grey-7"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="audio" icon="audiotrack" label="Audio" />
        <q-tab name="video" icon="videocam" label="Vidéo" />
        <q-tab name="podcast" icon="podcasts" label="Podcasts" />
      </q-tabs>

      <!-- Lecteur vidéo (visible uniquement pour le type vidéo) -->
      <div v-if="mediaType === 'video'" class="video-container q-mb-md">
        <video
          ref="videoPlayer"
          class="video-player"
          :src="currentVideo.src"
          controls
          @timeupdate="updateVideoProgress"
          @loadedmetadata="updateVideoDuration"
          @ended="handleVideoEnd"
        ></video>
      </div>

      <!-- Visualiseur audio (visible uniquement pour le type audio/podcast) -->
      <div v-if="mediaType !== 'video'" class="audio-visualizer" ref="visualizer">
        <canvas v-show="isPlaying" class="full-width"></canvas>
      </div>

      <!-- Contrôles principaux -->
      <div class="player-section row items-center">
        <!-- Couverture et infos -->
        <div class="media-cover col-md-3 col-sm-12 text-center">
          <q-img
            :src="currentMedia.cover"
            class="cover-img shadow-3"
            ratio="1"
            :style="mediaType === 'video' ? 'cursor: pointer' : ''"
            @click="mediaType === 'video' ? toggleVideoPlay() : null"
          >
            <template v-if="mediaType === 'video' && !isVideoPlaying">
              <div class="video-play-overlay flex flex-center">
                <q-icon name="play_circle_filled" size="64px" color="white" />
              </div>
            </template>
          </q-img>
          <div class="q-mt-sm">
            <q-rating
              v-model="rating"
              max="5"
              size="2em"
              color="yellow"
              @update:model-value="rateMedia"
            />
          </div>
        </div>

        <!-- Contrôles et infos -->
        <div class="media-info col-md-9 col-sm-12 q-pl-md">
          <h2 class="media-title text-h5 text-weight-bold">
            {{ currentMedia.title }}
            <q-btn
              round
              flat
              :icon="isFavorite ? 'favorite' : 'favorite_border'"
              :color="isFavorite ? 'red' : 'grey'"
              @click="toggleFavorite"
              size="sm"
            />
          </h2>
          <p class="media-author text-subtitle1 text-grey-8">
            {{ currentMedia.artist || currentMedia.author }} • {{ currentMedia.genre }} •
            {{ formatDate(currentMedia.date) }}
          </p>

          <!-- Barre de progression améliorée -->
          <div class="q-my-md">
            <q-slider
              v-model="progress"
              :min="0"
              :max="duration"
              @change="mediaType === 'video' ? seekVideo() : seekAudio()"
              color="primary"
              label
              :label-value="`${formatTime(progress)} / ${formatTime(duration)}`"
            />
          </div>

          <!-- Contrôles principaux -->
          <div class="controls row justify-center items-center">
            <q-btn
              round
              flat
              icon="shuffle"
              :color="isShuffle ? 'primary' : 'grey'"
              @click="toggleShuffle"
              size="md"
              v-if="mediaType !== 'podcast'"
            />
            <q-btn round flat icon="skip_previous" color="black" @click="prevMedia" size="lg" />
            <q-btn
              round
              color="primary"
              :icon="
                mediaType === 'video'
                  ? isVideoPlaying
                    ? 'pause'
                    : 'play_arrow'
                  : isPlaying
                    ? 'pause'
                    : 'play_arrow'
              "
              @click="mediaType === 'video' ? toggleVideoPlay() : togglePlay()"
              size="xl"
              class="q-mx-sm"
            />
            <q-btn round flat icon="skip_next" color="black" @click="nextMedia" size="lg" />
            <q-btn
              round
              flat
              icon="repeat"
              :color="isRepeat ? 'primary' : 'grey'"
              @click="toggleRepeat"
              size="md"
            />
          </div>

          <!-- Contrôles secondaires -->
          <div class="secondary-controls row justify-between items-center q-mt-md">
            <div class="volume-control">
              <q-icon name="volume_up" size="sm" />
              <q-slider
                v-model="volume"
                :min="0"
                :max="1"
                :step="0.1"
                style="width: 100px"
                @change="setVolume"
              />
            </div>
            <q-select
              dense
              filled
              v-model="playbackRate"
              :options="speedOptions"
              label="Vitesse"
              style="width: 120px"
              @update:model-value="changeSpeed"
              v-if="mediaType !== 'video'"
            />
            <q-btn flat icon="more_vert" round @click="showMediaMenu = true" />
          </div>
        </div>
      </div>

      <!-- Liste de lecture -->
      <div class="playlist-section q-mt-xl">
        <div class="row justify-between items-center q-mb-md">
          <h3 class="text-h6 q-my-none">
            {{
              mediaType === 'audio'
                ? 'Liste de lecture'
                : mediaType === 'video'
                  ? 'Vidéos'
                  : 'Podcasts'
            }}
          </h3>
          <q-input
            filled
            rounded
            dense
            v-model="searchQuery"
            placeholder="Rechercher..."
            class="search-input"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <q-table
          flat
          :rows="filteredMediaList"
          :columns="mediaColumns"
          row-key="id"
          hide-pagination
          :pagination="{ rowsPerPage: 0 }"
          :rows-per-page-options="[0]"
          @row-click="(evt, row) => selectMedia(row.__index)"
        >
          <template v-slot:body-cell-duration="props">
            <q-td :props="props">
              {{ formatTime(props.row.duration) }}
            </q-td>
          </template>
          <template v-slot:body-cell-type="props">
            <q-td :props="props">
              <q-icon :name="getMediaTypeIcon(props.row)" size="sm" />
              {{ props.row.type || 'audio' }}
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat round icon="more_vert" size="sm" @click.stop="openMediaMenu(props.row)" />
            </q-td>
          </template>
        </q-table>
      </div>

      <!-- Élément audio caché -->
      <audio
        ref="audioPlayer"
        :src="currentMedia.src"
        @timeupdate="updateProgress"
        @ended="handleEnd"
        @loadedmetadata="updateDuration"
        @volumechange="updateVolume"
        v-show="false"
      ></audio>
    </div>

    <!-- Menu contextuel pour les médias -->
    <q-dialog v-model="showMediaMenu">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ selectedMedia?.title }}</div>
          <div class="text-caption">{{ selectedMedia?.artist || selectedMedia?.author }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <q-list>
            <q-item clickable v-ripple @click="addToPlaylist(selectedMedia)">
              <q-item-section avatar>
                <q-icon name="playlist_add" />
              </q-item-section>
              <q-item-section>Ajouter à une playlist</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="downloadMedia(selectedMedia)">
              <q-item-section avatar>
                <q-icon name="download" />
              </q-item-section>
              <q-item-section>Télécharger</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="shareMedia(selectedMedia)">
              <q-item-section avatar>
                <q-icon name="share" />
              </q-item-section>
              <q-item-section>Partager</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="showMediaInfo(selectedMedia)">
              <q-item-section avatar>
                <q-icon name="info" />
              </q-item-section>
              <q-item-section>Informations</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialogue d'informations sur le média -->
    <q-dialog v-model="showMediaInfoDialog">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ currentMediaInfo?.title }}</div>
          <div class="text-subtitle2 q-mb-sm">
            {{ currentMediaInfo?.artist || currentMediaInfo?.author }} •
            {{ formatDate(currentMediaInfo?.date) }}
          </div>
          <q-img :src="currentMediaInfo?.cover" style="max-height: 200px" />
          <p class="q-mt-md">{{ currentMediaInfo?.description }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fermer" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import HeaderPage from 'src/components/HeaderPage.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const audioPlayer = ref(null)
const videoPlayer = ref(null)
const visualizer = ref(null)
const searchQuery = ref('')
const mediaType = ref('audio') // 'audio', 'video', ou 'podcast'

// États du lecteur
const isPlaying = ref(false)
const isVideoPlaying = ref(false)
const progress = ref(0)
const duration = ref(0)
const volume = ref(0.7)
const isShuffle = ref(false)
const isRepeat = ref(false)
const isFavorite = ref(false)
const rating = ref(3)
const playbackRate = ref(1)
const showMediaMenu = ref(false)
const selectedMedia = ref(null)
const showMediaInfoDialog = ref(false)
const currentMediaInfo = ref(null)

// Options de vitesse
const speedOptions = [
  { label: '0.5x', value: 0.5 },
  { label: '1.0x', value: 1 },
  { label: '1.5x', value: 1.5 },
  { label: '2.0x', value: 2 },
]

// Liste de médias (audio, vidéo, podcasts)
const mediaList = ref([
  // Audios
  {
    id: 1,
    type: 'audio',
    title: 'Les mystères de la forêt',
    artist: 'Marie Dubois',
    genre: 'Aventure',
    src: '/audios/foret.mp3',
    cover: '/img/covers/foret.jpg',
    duration: 354,
    date: '2023-05-15',
    description: "Une histoire captivante sur les secrets d'une forêt ancienne",
  },
  {
    id: 2,
    type: 'audio',
    title: 'Le voyage interstellaire',
    artist: 'Jean Star',
    genre: 'Science-fiction',
    src: '/audios/espace.mp3',
    cover: '/img/covers/espace.jpg',
    duration: 421,
    date: '2023-06-22',
    description: 'Un périple à travers les étoiles et les galaxies lointaines',
  },
  // Vidéos
  {
    id: 3,
    type: 'video',
    title: 'Tutoriel Vue.js avancé',
    author: 'Tech Academy',
    genre: 'Éducation',
    src: '/videos/tutoriel-vue.mp4',
    cover: '/img/covers/vue.jpg',
    duration: 587,
    date: '2023-07-10',
    description: 'Un tutoriel complet sur les concepts avancés de Vue.js',
  },
  {
    id: 4,
    type: 'video',
    title: 'Documentaire sur la nature',
    author: 'National Geographic',
    genre: 'Documentaire',
    src: '/videos/nature.mp4',
    cover: '/img/covers/nature.jpg',
    duration: 1254,
    date: '2023-08-05',
    description: 'Un magnifique documentaire sur les merveilles de la nature',
  },
  // Podcasts
  {
    id: 5,
    type: 'podcast',
    title: 'Les dernières tendances tech',
    author: 'Tech Talk',
    genre: 'Technologie',
    src: '/audios/podcast-tech.mp3',
    cover: '/img/covers/podcast.jpg',
    duration: 1860,
    date: '2023-09-12',
    description: 'Discussion sur les dernières tendances technologiques',
    episode: 42,
    season: 3,
  },
])

const currentIndex = ref(0)
const currentMedia = computed(() => filteredMediaList.value[currentIndex.value])
const currentVideo = computed(() => (mediaType.value === 'video' ? currentMedia.value : null))

// Colonnes de la table de médias
const mediaColumns = [
  { name: 'type', label: 'Type', field: 'type', align: 'left', sortable: true },
  { name: 'title', label: 'Titre', field: 'title', align: 'left', sortable: true },
  {
    name: 'artist',
    label: 'Auteur',
    field: (row) => row.artist || row.author,
    align: 'left',
    sortable: true,
  },
  { name: 'genre', label: 'Genre', field: 'genre', align: 'left', sortable: true },
  { name: 'duration', label: 'Durée', field: 'duration', align: 'right' },
  { name: 'actions', label: '', field: '', align: 'right' },
]

// Initialisation du visualiseur audio
let audioContext, analyser, dataArray, animationId

const initAudioContext = () => {
  audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const source = audioContext.createMediaElementSource(audioPlayer.value)
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 256
  source.connect(analyser)
  analyser.connect(audioContext.destination)
  const bufferLength = analyser.frequencyBinCount
  dataArray = new Uint8Array(bufferLength)
}

const drawVisualizer = () => {
  if (!isPlaying.value || !visualizer.value) return

  const canvas = visualizer.value.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const width = (canvas.width = visualizer.value.offsetWidth)
  const height = (canvas.height = 100)

  analyser.getByteFrequencyData(dataArray)
  ctx.fillStyle = 'rgb(200, 200, 200)'
  ctx.fillRect(0, 0, width, height)

  const barWidth = (width / dataArray.length) * 2.5
  let x = 0

  for (let i = 0; i < dataArray.length; i++) {
    const barHeight = dataArray[i] / 2
    const hue = (i / dataArray.length) * 360
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.fillRect(x, height - barHeight, barWidth, barHeight)
    x += barWidth + 1
  }

  animationId = requestAnimationFrame(drawVisualizer)
}

// Fonctions du lecteur
const togglePlay = async () => {
  if (!audioContext) {
    initAudioContext()
  }

  if (isPlaying.value) {
    audioPlayer.value.pause()
    cancelAnimationFrame(animationId)
  } else {
    try {
      await audioPlayer.value.play()
      drawVisualizer()
    } catch (err) {
      console.error('Erreur de lecture:', err)
      $q.notify({
        type: 'negative',
        message: 'Erreur lors de la lecture audio',
      })
    }
  }
  isPlaying.value = !isPlaying.value
}

// Fonctions du lecteur vidéo améliorées
const toggleVideoPlay = async () => {
  if (isVideoPlaying.value) {
    videoPlayer.value.pause()
  } else {
    try {
      await videoPlayer.value.play()
      // Pour les vidéos, nous activons le mode picture-in-picture si disponible
      if (document.pictureInPictureEnabled && !videoPlayer.value.disablePictureInPicture) {
        videoPlayer.value.requestPictureInPicture().catch((error) => {
          console.log('Picture-in-Picture error:', error)
        })
      }
    } catch (err) {
      console.error('Erreur de lecture vidéo:', err)
      $q.notify({
        type: 'negative',
        message: 'Erreur lors de la lecture vidéo',
      })
    }
  }
  isVideoPlaying.value = !isVideoPlaying.value
}

const nextMedia = () => {
  if (filteredMediaList.value.length === 0) return

  if (isShuffle.value && mediaType.value !== 'podcast') {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * filteredMediaList.value.length)
    } while (newIndex === currentIndex.value && filteredMediaList.value.length > 1)
    currentIndex.value = newIndex
  } else {
    currentIndex.value = (currentIndex.value + 1) % filteredMediaList.value.length
  }
  loadMedia()
}

const prevMedia = () => {
  if (filteredMediaList.value.length === 0) return

  if (isShuffle.value && mediaType.value !== 'podcast') {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * filteredMediaList.value.length)
    } while (newIndex === currentIndex.value && filteredMediaList.value.length > 1)
    currentIndex.value = newIndex
  } else {
    currentIndex.value =
      (currentIndex.value - 1 + filteredMediaList.value.length) % filteredMediaList.value.length
  }
  loadMedia()
}

const loadMedia = () => {
  if (filteredMediaList.value.length === 0) return

  // Arrêter le média en cours
  if (mediaType.value === 'video') {
    isVideoPlaying.value = false
    videoPlayer.value.pause()
  } else {
    isPlaying.value = false
    audioPlayer.value.pause()
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }

  // Charger le nouveau média
  if (mediaType.value === 'video') {
    // Petite pause pour permettre au DOM de se mettre à jour
    setTimeout(() => {
      videoPlayer.value.load()
      if (isVideoPlaying.value) {
        videoPlayer.value.play().catch((err) => {
          console.error('Erreur de lecture vidéo:', err)
        })
      }
    }, 50)
  } else {
    audioPlayer.value.load()
    if (isPlaying.value) {
      audioPlayer.value
        .play()
        .then(() => {
          if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume()
          }
          drawVisualizer()
        })
        .catch((err) => {
          console.error('Erreur de lecture audio:', err)
        })
    }
  }
}

const handleVideoEnd = () => {
  if (isRepeat.value) {
    videoPlayer.value.currentTime = 0
    videoPlayer.value.play()
  } else {
    nextMedia()
  }
}

const toggleShuffle = () => {
  isShuffle.value = !isShuffle.value
}

const toggleRepeat = () => {
  isRepeat.value = !isRepeat.value
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  $q.notify({
    message: isFavorite.value ? 'Ajouté aux favoris' : 'Retiré des favoris',
    icon: isFavorite.value ? 'favorite' : 'favorite_border',
    color: isFavorite.value ? 'red' : 'grey',
  })
}

const rateMedia = () => {
  $q.notify({
    message: `Note ${rating.value} étoiles enregistrée`,
    icon: 'star',
    color: 'yellow-8',
  })
}

const selectMedia = (index) => {
  currentIndex.value = index
  loadMedia()
}

const openMediaMenu = (media) => {
  selectedMedia.value = media
  showMediaMenu.value = true
}

const showMediaInfo = (media) => {
  currentMediaInfo.value = media
  showMediaInfoDialog.value = true
  showMediaMenu.value = false
}

const getMediaTypeIcon = (media) => {
  switch (media.type) {
    case 'video':
      return 'videocam'
    case 'podcast':
      return 'podcasts'
    default:
      return 'audiotrack'
  }
}

// Fonctions utilitaires
const formatTime = (seconds) => {
  if (!seconds) return '00:00'
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')
  return `${mins}:${secs}`
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR')
}

const filteredMediaList = computed(() => {
  return mediaList.value
    .filter((media) => {
      if (mediaType.value === 'audio') return media.type === 'audio'
      if (mediaType.value === 'video') return media.type === 'video'
      if (mediaType.value === 'podcast') return media.type === 'podcast'
      return true
    })
    .filter((media) => {
      const query = searchQuery.value.toLowerCase()
      return (
        media.title.toLowerCase().includes(query) ||
        (media.artist && media.artist.toLowerCase().includes(query)) ||
        (media.author && media.author.toLowerCase().includes(query))
      )
    })
})

// Réinitialiser l'état lors du changement de type de média
watch(mediaType, (newType) => {
  currentIndex.value = 0
  isPlaying.value = false
  isVideoPlaying.value = false
  progress.value = 0
  duration.value = 0

  if (newType === 'video') {
    // Pour les vidéos, nous utilisons les contrôles natifs mais gardons notre barre de progression
    if (videoPlayer.value) {
      videoPlayer.value.volume = volume.value
    }
  } else {
    // Pour l'audio/podcast
    if (audioPlayer.value) {
      audioPlayer.value.volume = volume.value
    }
  }
})

// Initialisation
onMounted(() => {
  audioPlayer.value.volume = volume.value
  if (videoPlayer.value) {
    videoPlayer.value.volume = volume.value
  }
  if (visualizer.value) {
    const canvas = visualizer.value.querySelector('canvas')
    canvas.width = visualizer.value.offsetWidth
    canvas.height = 100
  }
})
</script>

<style scoped>
.dashboard-page {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
}

.media-player-container {
  border-radius: 16px;
  padding: 24px;
  margin: 16px;
}

.video-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background-color: #000;
}

.video-player {
  width: 100%;
  max-height: 500px;
  display: block;
}

.audio-visualizer {
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
}

.cover-img {
  max-width: 250px;
  border-radius: 12px;
  transition: transform 0.3s ease;
  position: relative;
}

.cover-img:hover {
  transform: scale(1.03);
}

.video-play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.media-title {
  margin-bottom: 4px;
}

.media-author {
  margin-bottom: 16px;
}

.controls {
  gap: 12px;
}

.secondary-controls {
  padding: 0 20px;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.playlist-section {
  margin-top: 32px;
}

.search-input {
  width: 250px;
}

.active-row {
  background-color: rgba(25, 118, 210, 0.08);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.video-controls-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-container:hover .video-controls-overlay {
  opacity: 1;
}

.video-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

/* Style pour le bouton plein écran */
.fullscreen-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
}

/* Responsive */
@media (max-width: 768px) {
  .player-section {
    flex-direction: column;
  }

  .media-info {
    padding-left: 0;
    margin-top: 20px;
  }

  .cover-img {
    max-width: 200px;
  }

  .search-input {
    width: 100%;
    margin-top: 10px;
  }

  .video-player {
    max-height: 300px;
  }
}

@media (max-width: 480px) {
  .video-player {
    max-height: 200px;
  }
}
</style>
