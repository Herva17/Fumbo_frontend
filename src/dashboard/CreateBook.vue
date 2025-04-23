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
    <q-separator />
    <!-- Header animé -->
    <q-separator />
    <q-card-section
      class="bg-blue-1 text-black rounded-borders"
      style="border-radius: 10px 10px 0 0"
    >
      <div class="text-h5 q-mb-xs text-weight-bold">Créer un nouvel ouvrage</div>
      <div class="text-subtitle2">Remplissez les détails pour publier votre ouvrage</div>
      <q-linear-progress v-if="loading" indeterminate color="white" class="q-mt-sm" />
    </q-card-section>

    <q-separator spaced />

    <q-form @submit.prevent="submitForm" class="q-gutter-md q-mt-sm">
      <div class="row q-col-gutter-md">
        <!-- Colonne gauche -->
        <div class="col-12 col-md-6">
          <q-input
            v-model="book.title"
            label="Titre de l'ouvrage *"
            dense
            outlined
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          >
            <template v-slot:prepend>
              <q-icon name="title" color="primary" flat />
            </template>
          </q-input>

          <q-input
            v-model="book.author"
            label="Auteur *"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="primary" />
            </template>
          </q-input>

          <q-select
            v-model="book.category"
            label="Catégorie *"
            :options="categories"
            dense
            outlined
            emit-value
            map-options
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          >
            <template v-slot:prepend>
              <q-icon name="category" color="primary" />
            </template>
          </q-select>

          <q-input
            v-model="book.description"
            label="Description"
            type="textarea"
            outlined
            autogrow
            class="q-mt-md"
            dense
            counter
            maxlength="500"
            bg-color="grey-2"
            hint="Maximum 500 caractères"
          >
            <template v-slot:prepend>
              <q-icon name="description" color="primary" />
            </template>
          </q-input>

          <!-- Tags -->
          <q-select
            v-model="book.tags"
            label="Mots-clés"
            dense
            outlined
            use-input
            use-chips
            multiple
            input-debounce="0"
            new-value-mode="add"
            class="q-mt-md"
            bg-color="grey-2"
            @new-value="createTag"
          >
            <template v-slot:prepend>
              <q-icon name="local_offer" color="primary" />
            </template>
          </q-select>
        </div>

        <!-- Colonne droite -->
        <div class="col-12 col-md-6">
          <!-- Upload couverture avec drag and drop -->
          <q-uploader
            v-model="coverFile"
            label="Image de couverture *"
            accept="image/*"
            max-file-size="5120000"
            max-files="1"
            class="full-width q-mb-md"
            style="border: 2px dashed #1976d2; border-radius: 8px"
            @added="previewCover"
            @removed="coverPreview = null"
            hide-upload-btn
          >
            <template v-slot:header="scope">
              <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                  <q-uploader-add-trigger />
                  <q-tooltip>Ajouter une image</q-tooltip>
                </q-btn>
                <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                <div class="col">
                  <div class="q-uploader__title">
                    Glissez-déposez une image ou cliquez pour sélectionner
                  </div>
                  <div class="q-uploader__subtitle">JPG, PNG (Max 5MB)</div>
                </div>
              </div>
            </template>
          </q-uploader>

          <!-- Aperçu dynamique juste en dessous de l'upload -->
          <div v-if="coverPreview" class="q-mt-md">
            <q-card flat bordered class="bg-grey-2 rounded-borders">
              <q-card-section class="text-center">
                <div class="text-subtitle1 text-weight-medium q-mb-sm">Aperçu de la couverture</div>
                <q-img
                  :src="coverPreview"
                  :style="`filter: brightness(${coverBrightness}%)`"
                  class="rounded-borders"
                  style="max-height: 300px; max-width: 100%; object-fit: contain"
                  spinner-color="primary"
                />
              </q-card-section>
              <q-card-actions align="between">
                <q-slider
                  v-model="coverBrightness"
                  :min="50"
                  :max="150"
                  label
                  label-always
                  :label-value="`${coverBrightness}%`"
                  color="primary"
                  class="col-grow"
                />
                <q-btn
                  icon="close"
                  round
                  dense
                  flat
                  color="negative"
                  @click="removeCover"
                  class="q-ml-md"
                >
                  <q-tooltip>Supprimer l'image</q-tooltip>
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>

          <!-- Upload fichier avec progression -->
          <q-file
            v-model="bookFile"
            label="Fichier de l'ouvrage * (.pdf, .docx)"
            outlined
            dense
            class="q-mt-md"
            accept=".pdf,.doc,.docx"
            bg-color="grey-2"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" color="primary" />
            </template>
          </q-file>

          <!-- Options de publication -->
          <q-expansion-item
            v-model="expanded"
            icon="settings"
            label="Options avancées"
            class="q-mt-md bg-grey-2"
            header-class="text-primary"
          >
            <q-card>
              <q-card-section>
                <q-toggle v-model="book.isPublic" label="Rendre ce livre public" color="primary" />
                <q-toggle
                  v-model="book.allowComments"
                  label="Autoriser les commentaires"
                  color="primary"
                  class="q-mt-sm"
                />
                <q-input
                  v-model="book.publicationDate"
                  label="Date de publication"
                  type="date"
                  outlined
                  dense
                  class="q-mt-sm"
                />
                <q-input
                  v-model="book.price"
                  label="Prix (€)"
                  type="number"
                  outlined
                  dense
                  class="q-mt-sm"
                  min="0"
                  step="0.50"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>

      <!-- Boutons avec feedback -->
      <div class="row justify-end q-mt-lg q-gutter-sm">
        <q-btn
          label="Réinitialiser"
          icon="refresh"
          color="negative"
          flat
          size="md"
          @click="resetForm"
        />
        <q-btn
          label="Publier l'ouvrage"
          icon="publish"
          color="primary"
          flat
          size="md"
          unelevated
          class="q-ml-sm"
          type="submit"
          :loading="loading"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Publication en cours...
          </template>
        </q-btn>
      </div>
    </q-form>

    <!-- Notification de succès -->
    <q-dialog v-model="successDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="positive" text-color="white" />
          <span class="q-ml-sm">Votre ouvrage a été publié avec succès!</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
          <q-btn flat label="Voir l'ouvrage" color="primary" @click="viewBook" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const book = ref({
  title: '',
  author: '',
  category: null,
  description: '',
  tags: [],
  isPublic: true,
  allowComments: true,
  publicationDate: new Date().toISOString().substr(0, 10),
  price: 0,
})

const categories = [
  { label: 'Roman', value: 'novel' },
  { label: 'Science-Fiction', value: 'sci-fi' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Biographie', value: 'biography' },
  { label: 'Poésie', value: 'poetry' },
  { label: 'Thriller', value: 'thriller' },
  { label: 'Développement personnel', value: 'self-help' },
  { label: 'Autres', value: 'other' },
]

const coverFile = ref(null)
const coverPreview = ref(null)
const bookFile = ref(null)
const coverBrightness = ref(100)
const expanded = ref(false)
const loading = ref(false)
const successDialog = ref(false)

const createTag = (val, done) => {
  if (val.length > 0) {
    done(val, 'add')
  }
}

const previewCover = (files) => {
  if (files && files.length > 0) {
    const file = files[0]
    if (file.size > 5120000) {
      $q.notify({
        type: 'negative',
        message: 'Le fichier est trop volumineux (max 5MB)',
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      coverPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeCover = () => {
  coverFile.value = null
  coverPreview.value = null
}

const resetForm = () => {
  $q.dialog({
    title: 'Confirmation',
    message: 'Êtes-vous sûr de vouloir réinitialiser le formulaire?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    book.value = {
      title: '',
      author: '',
      category: null,
      description: '',
      tags: [],
      isPublic: true,
      allowComments: true,
      publicationDate: new Date().toISOString().substr(0, 10),
      price: 0,
    }
    coverFile.value = null
    coverPreview.value = null
    coverBrightness.value = 100
    bookFile.value = null
    expanded.value = false
  })
}

const submitForm = () => {
  if (
    !book.value.title ||
    !book.value.author ||
    !book.value.category ||
    !coverFile.value ||
    !bookFile.value
  ) {
    $q.notify({
      type: 'negative',
      message: 'Veuillez remplir tous les champs obligatoires.',
    })
    return
  }

  loading.value = true

  setTimeout(() => {
    loading.value = false
    successDialog.value = true
  }, 2000)
}

const viewBook = () => {
  successDialog.value = false
  // Rediriger ou afficher une vue détaillée (à personnaliser selon ton app)
  $q.notify({
    type: 'info',
    message: 'Redirection vers la page de l’ouvrage (à implémenter)',
  })
}
</script>
<style scoped>
.dashboard-page {
  padding: 0px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.q-card-section.bg-primary {
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
}

.q-btn[flat] {
  transition: all 0.3s ease;
}
.q-btn[flat]:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.q-img {
  transition: filter 0.3s ease;
}
</style>
