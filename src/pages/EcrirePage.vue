<template>
  <div class="story-editor" role="main">
    <nav class="navbar" aria-label="Navigation principale">
      <div class="navbar-right">
        <q-btn flat round icon="notifications" aria-label="Notifications" class="q-mr-sm notif">
          <q-badge floating color="red">{{ notificationsCount }}</q-badge>
          <q-tooltip>Notifications</q-tooltip>
        </q-btn>

        <q-btn flat round icon="account_circle" aria-label="Profil utilisateur" class="text-black">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item>
                <q-avatar size="50px" class="q-mr-md">
                  <q-img src="~assets/user-avatar.png" alt="Avatar utilisateur" />
                </q-avatar>
                <q-item-section>
                  <q-item-label class="text-h6">Thierry Nirere</q-item-label>
                  <q-item-label caption>Editeur</q-item-label>
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
              <q-item clickable v-ripple @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section class="text-negative">Déconnexion</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-tooltip>Profil utilisateur</q-tooltip>
        </q-btn>

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
      </div>
    </nav>
    <div class="navbar-left">
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

        <q-form @submit="saveDetails" class="details-form">
          <q-input
            v-model="storyDetails.title"
            label="Titre de l'histoire"
            filled
            clearable
            :rules="[(val) => !!val || 'Le titre est requis']"
          />

          <q-select
            v-model="storyDetails.category"
            :options="categories"
            label="Catégorie"
            filled
            clearable
          />

          <q-input
            v-model="storyDetails.mainCharacters"
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

          <q-toggle v-model="storyDetails.isPublic" label="Rendre cette histoire publique" />

          <div class="form-actions">
            <q-btn label="Enregistrer" type="submit" color="primary" :loading="isSaving" />
            <q-btn label="Réinitialiser" type="reset" flat color="grey" @click="resetDetails" />
          </div>
        </q-form>
      </div>

      <div class="editor-content" role="region" aria-label="Éditeur de texte">
        <div class="editor-header">
          <h1 class="title" v-if="!storyDetails.title">Raconter votre histoire...</h1>
          <h1 class="title" v-else>{{ storyDetails.title }}</h1>

          <div class="word-count">
            <q-chip dense>{{ wordCount }} mots</q-chip>
            <q-chip dense>{{ characterCount }} caractères</q-chip>
          </div>
        </div>

        <q-scroll-area style="height: calc(100% - 100px)">
          <q-input
            v-model="story"
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
  </div>
</template>

<script>
import { date } from 'quasar'
import jsPDF from 'jspdf'

export default {
  data() {
    return {
      story: '',
      showOptions: true,
      autoSave: true,
      isSaving: false,
      lastSaved: null,
      showShareDialog: false,
      shareUrl: '',
      notificationsCount: 3,
      storyDetails: {
        title: '',
        description: '',
        mainCharacters: '',
        category: '',
        isPublic: false,
      },
      categories: [
        'Aventure',
        'Romance',
        'Science-Fiction',
        'Fantasy',
        'Mystère',
        'Horreur',
        'Historique',
        'Contemporain',
      ],
      saveInterval: null,
    }
  },

  computed: {
    wordCount() {
      return this.story ? this.story.trim().split(/\s+/).length : 0
    },
    characterCount() {
      return this.story ? this.story.length : 0
    },
  },

  watch: {
    story() {
      this.handleAutoSave()
    },
    storyDetails: {
      handler() {
        this.handleAutoSave()
      },
      deep: true,
    },
  },

  created() {
    this.loadStoryFromLocalStorage()

    // Configurer l'intervalle de sauvegarde automatique
    this.saveInterval = setInterval(() => {
      if (this.autoSave && (this.story || this.storyDetails.title)) {
        this.saveStoryToLocalStorage()
      }
    }, 30000) // Sauvegarde toutes les 30 secondes
  },

  beforeUnmount() {
    clearInterval(this.saveInterval)
  },

  methods: {
    handleAutoSave() {
      if (this.autoSave) {
        this.saveStoryToLocalStorage()
      }
    },

    toggleOptions() {
      this.showOptions = !this.showOptions
    },

    toggleAutoSave() {
      this.autoSave = !this.autoSave
      if (this.autoSave) {
        this.$q.notify({
          message: 'Sauvegarde automatique activée',
          color: 'positive',
          icon: 'cloud_done',
        })
      }
    },

    async saveDetails() {
      this.isSaving = true
      try {
        await this.saveStoryToLocalStorage()
        this.$q.notify({
          message: 'Détails sauvegardés avec succès',
          color: 'positive',
          icon: 'check_circle',
        })
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error)
        this.$q.notify({
          message: 'Erreur lors de la sauvegarde: ' + error.message,
          color: 'negative',
          icon: 'error',
        })
      } finally {
        this.isSaving = false
      }
    },

    resetDetails() {
      this.$q
        .dialog({
          title: 'Confirmation',
          message: 'Voulez-vous vraiment réinitialiser les détails?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.storyDetails = {
            title: '',
            description: '',
            mainCharacters: '',
            category: '',
            isPublic: false,
          }
        })
    },

    async exportToPDF() {
      this.$q.loading.show({
        message: 'Génération du PDF en cours...',
      })

      try {
        const doc = new jsPDF()

        doc.setFontSize(20)
        doc.setTextColor(33, 150, 243)
        doc.text(this.storyDetails.title || 'Sans titre', 105, 20, { align: 'center' })

        if (this.storyDetails.description) {
          doc.setFontSize(12)
          doc.setTextColor(100, 100, 100)
          doc.text(this.storyDetails.description, 105, 30, { align: 'center', maxWidth: 180 })
        }

        doc.setFontSize(14)
        doc.setTextColor(0, 0, 0)
        const lines = doc.splitTextToSize(this.story, 180)
        doc.text(lines, 15, 50)

        doc.setProperties({
          title: this.storyDetails.title || 'Histoire sans titre',
          author: 'Thierry Nirere',
          creator: "Éditeur d'histoires",
        })

        doc.save(`${this.storyDetails.title || 'histoire'}.pdf`)
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error)
        this.$q.notify({
          message: 'Erreur lors de la génération du PDF: ' + error.message,
          color: 'negative',
          icon: 'error',
        })
      } finally {
        this.$q.loading.hide()
      }
    },

    async generateShareLink() {
      if (!this.storyDetails.title) {
        this.$q.notify({
          message: 'Veuillez donner un titre à votre histoire avant de partager',
          color: 'warning',
          icon: 'warning',
        })
        return
      }

      this.$q.loading.show()

      try {
        const shareData = {
          title: this.storyDetails.title,
          description: this.storyDetails.description,
          story: this.story,
          author: 'Thierry Nirere',
          createdAt: new Date().toISOString(),
        }

        const encodedData = btoa(JSON.stringify(shareData))
        this.shareUrl = `${window.location.origin}/shared-story?data=${encodedData}`
        this.showShareDialog = true
      } catch (error) {
        console.error('Erreur lors de la génération du lien:', error)
        this.$q.notify({
          message: 'Erreur lors de la génération du lien: ' + error.message,
          color: 'negative',
          icon: 'error',
        })
      } finally {
        this.$q.loading.hide()
      }
    },

    async copyShareUrl() {
      try {
        await navigator.clipboard.writeText(this.shareUrl)
        this.$q.notify({
          message: 'Lien copié dans le presse-papier!',
          color: 'positive',
          icon: 'content_copy',
        })
      } catch (error) {
        console.error('Erreur lors de la copie du lien:', error)
        this.$q.notify({
          message: 'Erreur lors de la copie du lien: ' + error.message,
          color: 'negative',
          icon: 'error',
        })
      }
    },

    async saveStoryToLocalStorage() {
      this.isSaving = true
      try {
        const storyData = {
          story: this.story,
          details: this.storyDetails,
          lastSaved: new Date().toISOString(),
        }
        localStorage.setItem('savedStory', JSON.stringify(storyData))
        this.lastSaved = new Date()
      } catch (error) {
        console.error('Erreur lors de la sauvegarde locale:', error)
        this.$q.notify({
          message: 'Erreur lors de la sauvegarde locale: ' + error.message,
          color: 'negative',
          icon: 'error',
        })
      } finally {
        this.isSaving = false
      }
    },

    loadStoryFromLocalStorage() {
      try {
        const savedStory = localStorage.getItem('savedStory')
        if (savedStory) {
          const parsedData = JSON.parse(savedStory)
          this.story = parsedData.story
          this.storyDetails = parsedData.details || {
            title: '',
            description: '',
            mainCharacters: '',
            category: '',
            isPublic: false,
          }
          this.lastSaved = parsedData.lastSaved ? new Date(parsedData.lastSaved) : null
        }
      } catch (error) {
        console.error('Erreur lors du chargement depuis le stockage local:', error)
        this.$q.notify({
          message: 'Erreur lors du chargement: ' + error.message,
          color: 'negative',
          icon: 'error',
        })
      }
    },

    formatDate(dateObj) {
      return date.formatDate(dateObj, 'DD/MM/YYYY HH:mm')
    },

    handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        this.saveStoryToLocalStorage()
        this.$q.notify({
          message: 'Histoire sauvegardée',
          color: 'positive',
          timeout: 1000,
          position: 'top',
        })
      }
    },

    logout() {
      this.$q
        .dialog({
          title: 'Déconnexion',
          message: 'Êtes-vous sûr de vouloir vous déconnecter?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$router.push('/login')
        })
    },
  },
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

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
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
  min-height: calc(100vh -300px);
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

  .story-textarea >>> .q-field__control {
    min-height: 300px;
  }
}

@media (max-width: 576px) {
  .navbar-right {
    display: flex;
    gap: 5px;
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
