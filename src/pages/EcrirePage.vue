<template>
  <q-page class="story-editor" role="main">
    <div class="editor-header-container">
      <HeaderPage />
      <div class="header-actions">
        <q-btn flat round icon="share" aria-label="Partager" class="text-black">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-ripple @click="exportToPDF">
                <q-item-section avatar>
                  <q-icon name="picture_as_pdf" />
                </q-item-section>
                <q-item-section>Exporter en PDF</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="generateShareLink">
                <q-item-section avatar>
                  <q-icon name="link" />
                </q-item-section>
                <q-item-section>Créer un lien de publication</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="publishStory">
                <q-item-section avatar>
                  <q-icon name="publish" />
                </q-item-section>
                <q-item-section>Publier l'histoire</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-tooltip>Options de partage</q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          :icon="autoSave ? 'cloud_done' : 'cloud_off'"
          aria-label="Sauvegarde automatique"
          :color="autoSave ? 'positive' : 'grey'"
          @click="toggleAutoSave"
        >
          <q-tooltip>
            {{ autoSave ? 'Sauvegarde automatique activée' : 'Sauvegarde automatique désactivée' }}
          </q-tooltip>
        </q-btn>

        <button
          class="options-button"
          @click="toggleOptions"
          aria-expanded="showOptions"
          aria-controls="options-panel"
        >
          <q-icon :name="showOptions ? 'menu_open' : 'menu'" />
          {{ showOptions ? 'Masquer les détails' : 'Afficher les détails' }}
        </button>
      </div>
    </div>

    <div class="editor-container">
      <div
        id="options-panel"
        class="options-panel"
        :class="{ 'options-panel-open': showOptions }"
        role="region"
        aria-label="Détails de l'histoire"
      >
        <div class="panel-header">
          <h2>Détails de l'histoire</h2>
          <q-btn flat dense icon="close" @click="toggleOptions" aria-label="Fermer le panneau" />
        </div>

        <q-form @submit.prevent="handleSave" class="details-form">
    

          <q-select
            v-model="storyDetails.categorieId"
            :options="categoriesOptions"
            label="Catégorie"
            filled
            clearable
            :loading="categorieStore.loading"
            :error="!!categorieStore.error"
            :error-message="categorieStore.error ? 'Erreur de chargement des catégories' : ''"
            option-label="nom_categorie"
            option-value="id_categorie"
          />

          <q-input
            v-model="storyDetails.titre"
            label="Titre de l'histoire"
            filled
            clearable
            :rules="[(val) => !!val || 'Le titre est requis']"
          />

          <q-input
            v-model="storyDetails.personnages_principaux"
            label="Personnages principaux (séparés par des virgules)"
            filled
            clearable
          />

          <q-input
            v-model="storyDetails.description"
            label="Description"
            filled
            clearable
            type="textarea"
            autogrow
          />

          <q-input
            v-model="storyDetails.histoire"
            label="Votre histoire"
            filled
            clearable
            type="textarea"
            autogrow
          />

          <div class="form-actions">
            <q-btn label="Enregistrer" type="submit" color="primary" :loading="isSaving" />
            <q-btn label="Réinitialiser" type="reset" flat color="grey" @click="resetDetails" />
          </div>
        </q-form>
      </div>

      <div class="editor-content" role="region" aria-label="Éditeur de texte">
        <div class="editor-header">
          <h1 class="title" v-if="!storyDetails.titre">Raconter votre histoire...</h1>
          <h1 class="title" v-else>{{ storyDetails.titre }}</h1>

          <div class="word-count">
            <q-chip dense>{{ wordCount }} mots</q-chip>
            <q-chip dense>{{ characterCount }} caractères</q-chip>
          </div>
        </div>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-input
            v-model="storyDetails.histoire"
            placeholder="Commencer à raconter une histoire..."
            aria-label="Zone de texte pour raconter une histoire"
            type="textarea"
            filled
            autogrow
            class="story-textarea"
            @keydown="handleKeyDown"
          />
        </q-scroll-area>

        <div class="editor-footer">
          <q-linear-progress v-if="isSaving" indeterminate color="primary" class="q-mt-sm" />
          <div v-else class="save-status">
            <q-icon
              :name="lastSaved ? 'check_circle' : 'error'"
              :color="lastSaved ? 'positive' : 'grey'"
              size="sm"
            />
            <span v-if="lastSaved">Dernière sauvegarde: {{ formatDate(lastSaved) }}</span>
            <span v-else>Non sauvegardé</span>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="showShareDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Partager votre histoire</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="shareUrl" filled readonly label="Lien de partage">
            <template v-slot:append>
              <q-btn round dense flat icon="content_copy" @click="copyShareUrl" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fermer" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useQuasar, date } from 'quasar'
import jsPDF from 'jspdf'
import HeaderPage from '../components/HeaderPage.vue'
import { useCategorieStore } from '../stores/categorie'
import { useSaveHistoireStore } from '../stores/SaveHistoire'
import { useRouter } from 'vue-router'
const $q = useQuasar()
const categorieStore = useCategorieStore()
const saveHistoireStore = useSaveHistoireStore()

// Récupérer l'utilisateur depuis le localStorage/session
const user = ref({
  id_user: '',
})
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
  categorieStore.fetchCategories()
  loadStoryFromLocalStorage()
  // Toujours forcer l'id_user après le chargement local
  storyDetails.value.id_user = user.value.id_user || user.value.id || '' 
  saveInterval.value = setInterval(() => {
    if (autoSave.value && (storyDetails.value.histoire || storyDetails.value.titre)) {
      saveStoryToLocalStorage()
    }
  }, 30000)
})

onBeforeUnmount(() => {
  clearInterval(saveInterval.value)
})

const categoriesOptions = computed(() => {
  if (Array.isArray(categorieStore.categories)) {
    return categorieStore.categories
  }
  if (categorieStore.categories && Array.isArray(categorieStore.categories.response)) {
    return categorieStore.categories.response
  }
  return []
})

const showOptions = ref(true)
const autoSave = ref(true)
const isSaving = ref(false)
const lastSaved = ref(null)
const showShareDialog = ref(false)
const shareUrl = ref('')

const storyDetails = ref({
  id_user: '', // sera rempli au montage
  categorieId: '',
  titre: '',
  personnages_principaux: '',
  description: '',
  histoire: '',
})
watch(
  () => storyDetails.value,
  () => {
    handleAutoSave()
  },
  { deep: true },
)
const wordCount = computed(() => {
  return storyDetails.value.histoire ? storyDetails.value.histoire.trim().split(/\s+/).length : 0
})

const characterCount = computed(() => {
  return storyDetails.value.histoire ? storyDetails.value.histoire.length : 0
})

const saveInterval = ref(null)

const handleAutoSave = () => {
  if (autoSave.value) {
    saveStoryToLocalStorage()
  }
}

const toggleOptions = () => {
  showOptions.value = !showOptions.value
}

const toggleAutoSave = () => {
  autoSave.value = !autoSave.value
  if (autoSave.value) {
    $q.notify({
      message: 'Sauvegarde automatique activée',
      color: 'positive',
      icon: 'cloud_done',
    })
  }
}
const router = useRouter()

const handleSave = async () => {
  isSaving.value = true
  // N’envoie QUE les champs attendus par l’API
  const payload = {
    id_user: storyDetails.value.id_user,
    categorieId: typeof storyDetails.value.categorieId === 'object'
      ? storyDetails.value.categorieId.id_categorie
      : storyDetails.value.categorieId,
    titre: storyDetails.value.titre,
    personnages_principaux: storyDetails.value.personnages_principaux,
    description: storyDetails.value.description,
    histoire: storyDetails.value.histoire
  }
 
  const response = await saveHistoireStore.saveHistoire(payload)
  console.log('Réponse API:', response)
  isSaving.value = false
  if (saveHistoireStore.error) {
    $q.notify({ type: 'negative', message: 'Erreur lors de la sauvegarde' })
  } else {
    $q.notify({ type: 'positive', message: 'Histoire enregistrée avec succès' })
    clearFormAndRedirect()
  }
}

// Fonction pour vider les champs et rediriger
const clearFormAndRedirect = () => {
  storyDetails.value = {
    id_user: user.value.id || '',
    categorieId: '',
    titre: '',
    personnages_principaux: '',
    description: '',
    histoire: '',
  }
  // Redirection vers la route "ecrire"
   router.push('/ecrire') // Assure-toi que la route s'appelle bien 'ecrire'
}
const resetDetails = () => {
  $q.dialog({
    title: 'Confirmation',
    message: 'Voulez-vous vraiment réinitialiser les détails?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    storyDetails.value = {
      id_user: user.value.id || '',
      categorieId: '',
      titre: '',
      personnages_principaux: '',
      description: '',
      histoire: '',
    }
  })
}

const exportToPDF = async () => {
  $q.loading.show({
    message: 'Génération du PDF en cours...',
  })

  try {
    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.setTextColor(33, 150, 243)
    doc.text(storyDetails.value.titre || 'Sans titre', 105, 20, { align: 'center' })

    if (storyDetails.value.description) {
      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      doc.text(storyDetails.value.description, 105, 30, { align: 'center', maxWidth: 180 })
    }

    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    const lines = doc.splitTextToSize(storyDetails.value.histoire, 180)
    doc.text(lines, 15, 50)

    doc.setProperties({
      title: storyDetails.value.titre || 'Histoire sans titre',
      author: 'Thierry Nirere',
      creator: "Éditeur d'histoires",
    })

    doc.save(`${storyDetails.value.titre || 'histoire'}.pdf`)
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error)
    $q.notify({
      message: 'Erreur lors de la génération du PDF: ' + error.message,
      color: 'negative',
      icon: 'error',
    })
  } finally {
    $q.loading.hide()
  }
}

const generateShareLink = async () => {
  if (!storyDetails.value.titre) {
    $q.notify({
      message: 'Veuillez donner un titre à votre histoire avant de partager',
      color: 'warning',
      icon: 'warning',
    })
    return
  }

  $q.loading.show()

  try {
    const shareData = {
      titre: storyDetails.value.titre,
      description: storyDetails.value.description,
      histoire: storyDetails.value.histoire,
      author: 'Thierry Nirere',
      createdAt: new Date().toISOString(),
    }

    const encodedData = btoa(JSON.stringify(shareData))
    shareUrl.value = `${window.location.origin}/shared-story?data=${encodedData}`
    showShareDialog.value = true
  } catch (error) {
    console.error('Erreur lors de la génération du lien:', error)
    $q.notify({
      message: 'Erreur lors de la génération du lien: ' + error.message,
      color: 'negative',
      icon: 'error',
    })
  } finally {
    $q.loading.hide()
  }
}

const copyShareUrl = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    $q.notify({
      message: 'Lien copié dans le presse-papier!',
      color: 'positive',
      icon: 'content_copy',
    })
  } catch (error) {
    console.error('Erreur lors de la copie du lien:', error)
    $q.notify({
      message: 'Erreur lors de la copie du lien: ' + error.message,
      color: 'negative',
      icon: 'error',
    })
  }
}

const saveStoryToLocalStorage = async () => {
  isSaving.value = true
  try {
    const storyData = {
      details: storyDetails.value,
      lastSaved: new Date().toISOString(),
    }
    localStorage.setItem('savedStory', JSON.stringify(storyData))
    lastSaved.value = new Date()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde locale:', error)
    $q.notify({
      message: 'Erreur lors de la sauvegarde locale: ' + error.message,
      color: 'negative',
      icon: 'error',
    })
  } finally {
    isSaving.value = false
  }
}

const loadStoryFromLocalStorage = () => {
  try {
    const savedStory = localStorage.getItem('savedStory')
    if (savedStory) {
      const parsedData = JSON.parse(savedStory)
      storyDetails.value = parsedData.details || {
        id_user: user.value.id || '',
        categorieId: '',
        titre: '',
        personnages_principaux: '',
        description: '',
        histoire: '',
      }
      lastSaved.value = parsedData.lastSaved ? new Date(parsedData.lastSaved) : null
    }
  } catch (error) {
    console.error('Erreur lors du chargement depuis le stockage local:', error)
    $q.notify({
      message: 'Erreur lors du chargement: ' + error.message,
      color: 'negative',
      icon: 'error',
    })
  }
}

const formatDate = (dateObj) => {
  return date.formatDate(dateObj, 'DD/MM/YYYY HH:mm')
}

const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    saveStoryToLocalStorage()
    $q.notify({
      message: 'Histoire sauvegardée',
      color: 'positive',
      timeout: 1000,
      position: 'top',
    })
  }
}

const publishStory = () => {
  $q.notify({
    message: 'Fonctionnalité de publication à implémenter',
    color: 'info',
    icon: 'info',
  })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.story-editor {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', sans-serif;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
}

.editor-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.options-button {
  padding: 8px 16px;
  background-color: #3273dc;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.options-button:hover {
  background-color: #276cda;
  transform: translateY(-1px);
}

.editor-container {
  display: flex;
  gap: 20px;
  height: calc(100% - 70px);
}

.options-panel {
  width: 320px;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  transform: translateX(-100%);
  opacity: 0;
  position: relative;
  height: 100%;
  overflow-y: auto;
}

.options-panel-open {
  transform: translateX(0);
  opacity: 1;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.details-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.editor-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  padding: 20px;
  height: 100%;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.title {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
  font-weight: 700;
  flex-grow: 1;
}

.word-count {
  display: flex;
  gap: 8px;
}

.story-textarea {
  font-size: 16px;
  line-height: 1.6;
  min-height: 300px;
}

.story-textarea :deep(.q-field__control) {
  min-height: calc(100vh - 300px);
}

.editor-footer {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #666;
}

.save-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Animation pour la sauvegarde */
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.is-saving {
  animation: pulse 1.5s infinite;
}

/* Responsive design */
@media (max-width: 992px) {
  .editor-container {
    flex-direction: column;
    height: auto;
  }

  .options-panel {
    width: 100%;
    height: auto;
    max-height: 400px;
    position: static;
    transform: none;
    opacity: 1;
    display: none;
  }

  .options-panel-open {
    display: block;
  }

  .story-textarea :deep(.q-field__control) {
    min-height: 300px;
  }
}

@media (max-width: 576px) {
  .editor-header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .title {
    font-size: 1.4rem;
  }

  .editor-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
