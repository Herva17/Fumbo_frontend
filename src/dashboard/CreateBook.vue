<template>
  <q-page class="dashboard-page">
<<<<<<< HEAD
    <q-header elevated class="bg-white text-black shadow-sm">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-h5">Fumbo</q-toolbar-title>
        <q-space />
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
      </q-toolbar>
    </q-header>

    <q-separator />
=======
    <HeaderPage />
    <q-separator />

    <!-- Header animé -->
>>>>>>> aa45c0a4d9f8ff6d16e109309b6ef29813296eb0
    <q-card-section
      class="bg-blue-1 text-black rounded-borders section"
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
            v-model="book.titre_ouvrage"
            label="Titre de l'ouvrage *"
            dense
            outlined
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          />
          <q-input
            v-model="book.id_user"
            label="Auteur (ID) *"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
            readonly
          />
          <q-select
            v-model="book.id_categorie"
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
          />
          <q-input
            v-model="book.annee_publication"
            label="Année de publication *"
            type="number"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          />
          <q-input
            v-model="book.langue"
            label="Langue *"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          />
          <q-input
            v-model="book.isbn"
            label="ISBN *"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          />
          <q-input
            v-model="book.resume"
            label="Résumé"
            type="textarea"
            outlined
            autogrow
            class="q-mt-md"
            dense
            counter
            maxlength="500"
            bg-color="grey-2"
            hint="Maximum 500 caractères"
          />
        </div>

        <!-- Colonne droite -->
        <div class="col-12 col-md-6">
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
          />
          <q-input
            v-model="book.format"
            label="Format (ex: PDF, EPUB) *"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          />
          <q-input
            v-model="book.Nb_pages"
            label="Nombre de pages *"
            type="number"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          />
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
          />
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
          />
          <q-input
            v-model="book.datePub"
            label="Date de publication *"
            type="date"
            outlined
            dense
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
          />
        </div>
      </div>

      <!-- Boutons -->
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
  </q-page>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted } from 'vue'
=======
import { ref } from 'vue'
import HeaderPage from 'src/components/HeaderPage.vue'
>>>>>>> aa45c0a4d9f8ff6d16e109309b6ef29813296eb0
import { useQuasar } from 'quasar'

const $q = useQuasar()

const book = ref({
  id_ouvrage: null,
  titre_ouvrage: '',
  id_auteur: '', // L'ID de l'utilisateur connecté sera assigné ici
  id_categorie: null,
  annee_publication: '',
  image: '',
  langue: '',
  isbn: '',
  resume: '',
  format: '',
  Nb_pages: '',
  fichier_livre: null,
  tags: [],
  datePub: '',
})
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser)
      console.log('Utilisateur récupéré depuis localStorage :', user) // Vérifiez ici
      book.value.id_auteur = user.id_user || '' // Assigner l'ID de l'utilisateur à id_auteur
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error)
    }
  }
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
const bookFile = ref(null)
const loading = ref(false)

onMounted(() => {
  // Récupérer les informations de l'utilisateur connecté depuis le localStorage
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser)
      book.value.id_auteur = user.id || '' // Assigner l'ID de l'utilisateur à id_auteur
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error)
    }
  }
})

const createTag = (val, done) => {
  if (val.length > 0) {
    done(val, 'add')
  }
}

const resetForm = () => {
  $q.dialog({
    title: 'Confirmation',
    message: 'Êtes-vous sûr de vouloir réinitialiser le formulaire?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    book.value = {
      id_ouvrage: null,
      titre_ouvrage: '',
      id_auteur: '', // Réinitialiser l'ID de l'auteur
      id_categorie: null,
      annee_publication: '',
      image: '',
      langue: '',
      isbn: '',
      resume: '',
      format: '',
      Nb_pages: '',
      fichier_livre: null,
      tags: [],
      datePub: '',
    }
    coverFile.value = null
    bookFile.value = null

    // Réassigner l'ID de l'utilisateur connecté
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        book.value.id_auteur = user.id || ''
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error)
      }
    }
  })
}

const submitForm = () => {
  if (
    !book.value.titre_ouvrage ||
    !book.value.id_auteur ||
    !book.value.id_categorie ||
    !book.value.annee_publication ||
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
    $q.notify({
      type: 'positive',
      message: 'Ouvrage publié avec succès!',
    })
  }, 2000)
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
.section {
  margin-top: 10px;
}

.q-img {
  transition: filter 0.3s ease;
}
</style>
