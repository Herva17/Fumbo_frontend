<template>
  <q-page class="dashboard-page bg-grey-1">
    <!-- Header amélioré avec transitions -->
    <HeaderPage />
    <!-- Lecteur audio amélioré -->
    <div class="audio-player-container bg-white shadow-5">
      <!-- Visualiseur audio -->
      <div class="audio-visualizer" ref="visualizer">
        <canvas v-show="isPlaying" class="full-width"></canvas>
      </div>

      <!-- Contrôles principaux -->
      <div class="player-section row items-center">
        <!-- Couverture et infos -->
        <div class="track-cover col-md-3 col-sm-12 text-center">
          <q-img :src="currentAudio.cover" class="cover-img shadow-3" ratio="1" />
          <div class="q-mt-sm">
            <q-rating
              v-model="rating"
              max="5"
              size="2em"
              color="yellow"
              @update:model-value="rateTrack"
            />
          </div>
        </div>

        <!-- Contrôles et infos -->
        <div class="track-info col-md-9 col-sm-12 q-pl-md">
          <h2 class="track-title text-h5 text-weight-bold">
            {{ currentAudio.title }}
            <q-btn
              round
              flat
              :icon="isFavorite ? 'favorite' : 'favorite_border'"
              :color="isFavorite ? 'red' : 'grey'"
              @click="toggleFavorite"
              size="sm"
            />
          </h2>
          <p class="track-author text-subtitle1 text-grey-8">
            {{ currentAudio.artist }} • {{ currentAudio.genre }} •
            {{ formatDate(currentAudio.date) }}
          </p>

          <!-- Barre de progression améliorée -->
          <div class="q-my-md">
            <q-slider
              v-model="progress"
              :min="0"
              :max="duration"
              @change="seekAudio"
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
            />
            <q-btn round flat icon="skip_previous" color="black" @click="prevTrack" size="lg" />
            <q-btn
              round
              color="primary"
              :icon="isPlaying ? 'pause' : 'play_arrow'"
              @click="togglePlay"
              size="xl"
              class="q-mx-sm"
            />
            <q-btn round flat icon="skip_next" color="black" @click="nextTrack" size="lg" />
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
            />
            <q-btn flat icon="more_vert" round @click="showTrackMenu = true" />
          </div>
        </div>
      </div>

      <!-- Liste de lecture -->
      <div class="playlist-section q-mt-xl">
        <div class="row justify-between items-center q-mb-md">
          <h3 class="text-h6 q-my-none">Liste de lecture</h3>
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
          :rows="filteredPlaylist"
          :columns="playlistColumns"
          row-key="id"
          hide-pagination
          :pagination="{ rowsPerPage: 0 }"
          :rows-per-page-options="[0]"
          @row-click="(evt, row) => selectTrack(row.__index)"
        >
          <template v-slot:body-cell-duration="props">
            <q-td :props="props">
              {{ formatTime(props.row.duration) }}
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat round icon="more_vert" size="sm" @click.stop="openTrackMenu(props.row)" />
            </q-td>
          </template>
        </q-table>
      </div>

      <!-- Élément audio caché -->
      <audio
        ref="audioPlayer"
        :src="currentAudio.src"
        @timeupdate="updateProgress"
        @ended="handleEnd"
        @loadedmetadata="updateDuration"
        @volumechange="updateVolume"
      ></audio>
    </div>

    <!-- Menu contextuel pour les pistes -->
    <q-dialog v-model="showTrackMenu">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ selectedTrack?.title }}</div>
          <div class="text-caption">{{ selectedTrack?.artist }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <q-list>
            <q-item clickable v-ripple @click="addToPlaylist(selectedTrack)">
              <q-item-section avatar>
                <q-icon name="playlist_add" />
              </q-item-section>
              <q-item-section>Ajouter à une playlist</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="downloadTrack(selectedTrack)">
              <q-item-section avatar>
                <q-icon name="download" />
              </q-item-section>
              <q-item-section>Télécharger</q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="shareTrack(selectedTrack)">
              <q-item-section avatar>
                <q-icon name="share" />
              </q-item-section>
              <q-item-section>Partager</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import HeaderPage from 'src/components/HeaderPage.vue'
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const audioPlayer = ref(null)
const visualizer = ref(null)
const searchQuery = ref('') // Ajouté car manquant dans l'original

// États du lecteur
const isPlaying = ref(false)
const progress = ref(0)
const duration = ref(0)
const volume = ref(0.7)
const isShuffle = ref(false)
const isRepeat = ref(false)
const isFavorite = ref(false)
const rating = ref(3)
const playbackRate = ref(1)
const showTrackMenu = ref(false)
const selectedTrack = ref(null)

// Options de vitesse
const speedOptions = [
  { label: '0.5x', value: 0.5 },
  { label: '1.0x', value: 1 },
  { label: '1.5x', value: 1.5 },
  { label: '2.0x', value: 2 },
]

// Liste de lecture
const playlist = ref([
  {
    id: 1,
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
    title: 'Le voyage interstellaire',
    artist: 'Jean Star',
    genre: 'Science-fiction',
    src: '/audios/espace.mp3',
    cover: '/img/covers/espace.jpg',
    duration: 421,
    date: '2023-06-22',
    description: 'Un périple à travers les étoiles et les galaxies lointaines',
  },
  {
    id: 3,
    title: "L'héritage du pharaon",
    artist: 'Ali Moustafa',
    genre: 'Historique',
    src: '/audios/pharaon.mp3',
    cover: '/img/covers/pharaon.jpg',
    duration: 287,
    date: '2023-04-10',
    description: "La découverte d'un tombeau caché révèle des secrets millénaires",
  },
])

const currentIndex = ref(0)
const currentAudio = computed(() => playlist.value[currentIndex.value])

// Colonnes de la table de playlist
const playlistColumns = [
  { name: 'title', label: 'Titre', field: 'title', align: 'left', sortable: true },
  { name: 'artist', label: 'Auteur', field: 'artist', align: 'left', sortable: true },
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

const prevTrack = () => {
  currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length
  loadTrack()
}

const nextTrack = () => {
  if (isShuffle.value) {
    currentIndex.value = Math.floor(Math.random() * playlist.value.length)
  } else {
    currentIndex.value = (currentIndex.value + 1) % playlist.value.length
  }
  loadTrack()
}

const loadTrack = () => {
  audioPlayer.value.load()
  if (isPlaying.value) {
    audioPlayer.value.play().then(() => {
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      drawVisualizer()
    })
  }
}

const seekAudio = () => {
  audioPlayer.value.currentTime = progress.value
}

const setVolume = () => {
  audioPlayer.value.volume = volume.value
}

const updateVolume = () => {
  volume.value = audioPlayer.value.volume
}

const changeSpeed = () => {
  audioPlayer.value.playbackRate = playbackRate.value
}

const updateProgress = () => {
  progress.value = audioPlayer.value.currentTime
}

const updateDuration = () => {
  duration.value = audioPlayer.value.duration
}

const handleEnd = () => {
  if (isRepeat.value) {
    audioPlayer.value.currentTime = 0
    audioPlayer.value.play()
  } else {
    nextTrack()
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

const rateTrack = () => {
  $q.notify({
    message: `Note ${rating.value} étoiles enregistrée`,
    icon: 'star',
    color: 'yellow-8',
  })
}

const selectTrack = (index) => {
  currentIndex.value = index
  loadTrack()
}

const openTrackMenu = (track) => {
  selectedTrack.value = track
  showTrackMenu.value = true
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

const filteredPlaylist = computed(() => {
  return playlist.value.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

// Initialisation
onMounted(() => {
  audioPlayer.value.volume = volume.value
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

.audio-player-container {
  border-radius: 16px;
  padding: 24px;
  margin: 16px;
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
}

.cover-img:hover {
  transform: scale(1.03);
}

.track-title {
  margin-bottom: 4px;
}

.track-author {
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

.hover-underline-animation {
  position: relative;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
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

/* Responsive */
@media (max-width: 768px) {
  .player-section {
    flex-direction: column;
  }

  .track-info {
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
}
</style>
