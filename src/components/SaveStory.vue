<template>
  <!-- Contenu principal avec animations -->
  <q-page class="savestory">
    <HeaderPage />
    <!-- Section de description avec gradient -->
    <section class="description q-pa-lg rounded-borders shadow-2">
      <h3 class="text-h4 text-weight-bold text-center q-mb-md text-gradient">
        Partagez Votre Histoire !
      </h3>
      <p class="text-body1 text-center q-mb-none">
        Chaque histoire mérite d'être entendue. Enregistrez votre récit et il pourrait être
        sélectionné pour notre émission phare ou développé pour un de nos grands événements.
      </p>
    </section>

    <!-- Section d'enregistrement améliorée -->
    <section class="record-story q-pa-lg rounded-borders shadow-2">
      <h3 class="text-h4 text-weight-bold text-center q-mb-md">Enregistrez Votre Histoire</h3>

      <div class="audio-visualizer" ref="visualizer">
        <canvas v-show="isRecording" class="full-width"></canvas>
      </div>

      <div class="text-center q-mt-lg">
        <transition name="scale" mode="out-in">
          <div v-if="!isRecording && !audioBlob" key="ready">
            <p class="text-body1 q-mb-lg">
              Prêt à partager votre histoire ? Cliquez sur le micro pour commencer.
            </p>
            <q-btn
              fab
              color="red"
              icon="mic"
              size="lg"
              @click="startRecording"
              class="animate__animated animate__pulse animate__infinite"
            />
          </div>

          <div v-else-if="isRecording" key="recording">
            <p class="text-body1 q-mb-lg">
              Enregistrement en cours... <span class="text-red">{{ recordingTime }}</span>
            </p>
            <div class="flex justify-center q-gutter-sm">
              <q-btn fab color="red" icon="stop" size="lg" @click="stopRecording" />
              <q-btn
                fab
                color="grey"
                icon="pause"
                size="lg"
                @click="togglePause"
                v-if="!isPaused"
              />
              <q-btn fab color="grey" icon="play_arrow" size="lg" @click="togglePause" v-else />
            </div>
            <p class="text-caption text-grey q-mt-sm">
              L'enregistrement s'arrêtera automatiquement après 5 minutes ou 6 secondes de silence.
            </p>
          </div>

          <div v-else key="recorded">
            <p class="text-body1 q-mb-lg">
              Votre enregistrement est prêt ! Écoutez-le avant de continuer.
            </p>
            <audio controls class="full-width q-mb-md" :src="audioUrl"></audio>
            <div class="flex justify-center q-gutter-sm">
              <q-btn color="primary" icon="save" label="Sauvegarder" @click="saveRecording" />
              <q-btn color="grey" icon="delete" label="Recommencer" @click="resetRecording" />
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- Section d'écriture avec compteur de mots -->
    <section class="write-story q-pa-lg rounded-borders shadow-2">
      <h4 class="text-h4 text-weight-bold text-center q-mb-md">Écrivez Votre Histoire</h4>

      <div class="text-center q-mb-md">
        <q-img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          alt="Écriture"
          class="rounded-borders"
          style="height: 150px"
        />
      </div>

      <q-input
        v-model="storyText"
        type="textarea"
        placeholder="Racontez votre histoire ici (250 mots maximum)"
        class="q-mb-sm"
        counter
        maxlength="1500"
        @input="updateWordCount"
        autogrow
      />
      <div class="text-right text-caption text-grey">{{ wordCount }}/250 mots</div>

      <q-btn
        color="primary"
        label="Soumettre"
        @click="submitStory"
        class="full-width q-mt-md"
        :disable="!isFormValid"
      />
    </section>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import HeaderPage from 'src/components/HeaderPage.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const storyText = ref('')
const wordCount = ref(0)

// Audio recording
const isRecording = ref(false)
const isPaused = ref(false)
const audioBlob = ref(null)
const audioUrl = ref('')
const recordingTime = ref('00:00')
const mediaRecorder = ref(null)
const audioChunks = ref([])
const visualizer = ref(null)
const audioContext = ref(null)
const analyser = ref(null)
const dataArray = ref(null)
const animationId = ref(null)

const updateWordCount = () => {
  if (!storyText.value.trim()) {
    wordCount.value = 0
    return
  }
  wordCount.value = storyText.value.trim().split(/\s+/).length
}

const isFormValid = computed(() => {
  return wordCount.value > 0 && wordCount.value <= 250
})

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    setupAudioContext(stream)

    mediaRecorder.value = new MediaRecorder(stream)
    audioChunks.value = []

    mediaRecorder.value.ondataavailable = (e) => {
      audioChunks.value.push(e.data)
    }

    mediaRecorder.value.onstop = () => {
      const audioBlobValue = new Blob(audioChunks.value, { type: 'audio/wav' })
      audioBlob.value = audioBlobValue
      audioUrl.value = URL.createObjectURL(audioBlobValue)
      stream.getTracks().forEach((track) => track.stop())
      cancelAnimationFrame(animationId.value)
    }

    mediaRecorder.value.start()
    isRecording.value = true
    startTimer()
    drawVisualizer()
  } catch (error) {
    console.error('Error accessing microphone:', error)
    $q.notify({
      type: 'negative',
      message: "Accès au microphone refusé. Veuillez autoriser l'accès pour enregistrer.",
    })
  }
}

const setupAudioContext = (stream) => {
  audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
  analyser.value = audioContext.value.createAnalyser()
  const source = audioContext.value.createMediaStreamSource(stream)
  source.connect(analyser.value)
  analyser.value.connect(audioContext.value.destination)
  analyser.value.fftSize = 256

  const bufferLength = analyser.value.frequencyBinCount
  dataArray.value = new Uint8Array(bufferLength)
}

const drawVisualizer = () => {
  if (!isRecording.value || !visualizer.value) return

  const canvas = visualizer.value.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  const width = (canvas.width = visualizer.value.offsetWidth)
  const height = (canvas.height = 100)

  analyser.value.getByteFrequencyData(dataArray.value)

  ctx.fillStyle = 'rgb(200, 200, 200)'
  ctx.fillRect(0, 0, width, height)

  const barWidth = (width / dataArray.value.length) * 2.5
  let x = 0

  for (let i = 0; i < dataArray.value.length; i++) {
    const barHeight = dataArray.value[i] / 2

    ctx.fillStyle = `rgb(50, 50, ${barHeight + 100})`
    ctx.fillRect(x, height - barHeight, barWidth, barHeight)

    x += barWidth + 1
  }

  animationId.value = requestAnimationFrame(drawVisualizer)
}

const startTimer = () => {
  let seconds = 0
  const timer = setInterval(() => {
    if (!isRecording.value || isPaused.value) {
      clearInterval(timer)
      return
    }

    seconds++
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    recordingTime.value = `${mins}:${secs}`

    // Auto-stop after 5 minutes
    if (seconds >= 300) {
      stopRecording()
    }
  }, 1000)
}

const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
    isPaused.value = false
  }
}

const togglePause = () => {
  if (!mediaRecorder.value) return

  if (isPaused.value) {
    mediaRecorder.value.resume()
    isPaused.value = false
    drawVisualizer()
  } else {
    mediaRecorder.value.pause()
    isPaused.value = true
    cancelAnimationFrame(animationId.value)
  }
}

const resetRecording = () => {
  audioBlob.value = null
  audioUrl.value = ''
  recordingTime.value = '00:00'
}

const saveRecording = () => {
  $q.notify({
    type: 'positive',
    message: 'Votre enregistrement a été sauvegardé avec succès!',
  })
  // Ici vous pourriez ajouter la logique pour envoyer l'audio au serveur
}

const submitStory = () => {
  if (!isFormValid.value) return

  $q.notify({
    type: 'positive',
    message: 'Votre histoire a été soumise avec succès!',
  })

  // Reset form
  storyText.value = ''
  wordCount.value = 0
  audioBlob.value = null
  audioUrl.value = ''
}

onMounted(() => {
  // Set canvas size when component mounts
  if (visualizer.value) {
    const canvas = visualizer.value.querySelector('canvas')
    canvas.width = visualizer.value.offsetWidth
    canvas.height = 100
  }
})
</script>

<style scoped>
.savestory {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.description,
.record-story,
.write-story {
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.description:hover,
.record-story:hover,
.write-story:hover {
  transform: translateY(-5px);
}

.description {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.record-story {
  background: linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%);
}

.write-story {
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
}

.text-gradient {
  background: -webkit-linear-gradient(45deg, #6a11cb, #2575fc);
  /* -webkit-background-clip: text; */
  -webkit-text-fill-color: transparent;
}

.audio-visualizer {
  width: 100%;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.audio-visualizer canvas {
  display: block;
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

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Responsive Design */
@media (max-width: 600px) {
  .savestory {
    padding: 10px;
  }

  .description,
  .record-story,
  .write-story {
    padding: 20px;
    margin-bottom: 30px;
  }

  .audio-visualizer {
    height: 80px;
  }
}
</style>
