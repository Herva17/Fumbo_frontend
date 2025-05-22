<template>
  <q-page class="dashboard-page">
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

    <HeaderPage />
    <q-separator />

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
          <br />
          <q-input
            v-model="book.titre_ouvrage"
            label="Titre de l'ouvrage *"
            dense
            outlined
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
          />
          <!-- <q-input
            v-model="book.id_user"
            label="Auteur (ID) *"
            dense
            outlined
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
            bg-color="grey-2"
            readonly
          /> -->
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
          <q-input
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
          <br />
          <q-file
            v-model="coverFile"
            label="Image de couverture *"
            accept="image/*"
            outlined
            dense
            class="q-mt-md"
            :rules="[(val) => !!val || 'Ce champ est obligatoire']"
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
import { ref, onMounted } from 'vue'
import HeaderPage from 'src/components/HeaderPage.vue'
import { useQuasar } from 'quasar'
import { useCategorieStore } from 'src/stores/categorie'
import { useEnregistreOuvrageStore } from 'src/stores/EnregistreOuvrage'
import { useRouter } from 'vue-router'
const router = useRouter()
const $q = useQuasar()
const enregistreOuvrageStore = useEnregistreOuvrageStore()
const categorieStore = useCategorieStore()
const searchQuery = ref('')
const user = ref({
  id_user: '',
  username: '',
  prenom: '',
  image: '',
  bio: '',
})

const book = ref({
  titre_ouvrage: '',
  id_user: '',
  id_categorie: null,
  annee_publication: '',
  langue: '',
  isbn: '',
  resume: '',
  format: '',
  Nb_pages: '',
  tags: [],
})

const coverFile = ref(null)
const bookFile = ref(null)
const loading = ref(false)
const categories = ref([])

onMounted(async () => {
  // Récupérer l'utilisateur pour l'auteur
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const userObj = JSON.parse(storedUser)
      user.value = userObj
      book.value.id_user = userObj.id_user || userObj.id || ''
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error)
    }
  }

  // Charger les catégories
  await categorieStore.fetchCategories()
  let rawCategories = categorieStore.categories?.response
  if (!Array.isArray(rawCategories)) {
    rawCategories = []
  }
  categories.value = rawCategories.map((cat) => ({
    label: cat.nom_categorie || cat.label || cat.nom || 'Catégorie',
    value: cat.id_categorie || cat.value || cat.id,
  }))
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
      titre_ouvrage: '',
      id_user: user.value.id_user || user.value.id || '',
      id_categorie: null,
      annee_publication: '',
      langue: '',
      isbn: '',
      resume: '',
      format: '',
      Nb_pages: '',
      tags: [],
    }
    coverFile.value = null
    bookFile.value = null
  })
}

const submitForm = async () => {
  if (
    !book.value.titre_ouvrage ||
    !book.value.id_user ||
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

  const formData = new FormData()
  formData.append('id_ouvrage', book.value.id_ouvrage)
  formData.append('titre_ouvrage', book.value.titre_ouvrage)
  formData.append('id_user', book.value.id_user) // <-- le bon nom ici
  formData.append('id_categorie', book.value.id_categorie)
  formData.append('annee_publication', book.value.annee_publication)
  formData.append('langue', book.value.langue)
  formData.append('isbn', book.value.isbn)
  formData.append('resume', book.value.resume)
  formData.append('format', book.value.format)
  formData.append('Nb_pages', book.value.Nb_pages)
  formData.append('tags', JSON.stringify(book.value.tags))
  formData.append('image', coverFile.value)
  formData.append('fichier_livre', bookFile.value)

  await enregistreOuvrageStore.enregistrerOuvrage(formData)

  loading.value = false

  if (enregistreOuvrageStore.error) {
    $q.notify({
      type: 'negative',
      message: "Erreur lors de l'enregistrement de l'ouvrage.",
    })
  } else {
    $q.notify({
      type: 'positive',
      message: 'Ouvrage publié avec succès!',
    })
    router.push('/ecrire')
    resetForm()
  }
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
