<template>
  <q-page class="q-pa-md">
    <!-- En-tête de la bibliothèque -->
    <div class="row items-center q-mb-md">
      <div class="col">
        <h2 class="text-h4 text-weight-bold text-primary">Ma Bibliothèque</h2>
        <div class="text-subtitle1 text-grey-8">
          Vos ouvrages publiés ({{ filteredBooks.length > 0 ? filteredBooks.length : 'Aucun' }})
        </div>
      </div>
      <div class="col-auto">
        <q-btn label="Ajouter un livre" icon="add" color="primary" unelevated to="/creer-ouvrage" />
      </div>
    </div>

    <!-- Filtres et recherche -->
    <q-card flat bordered class="q-mb-md bg-grey-1">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6">
            <q-input
              v-model="searchQuery"
              outlined
              dense
              placeholder="Rechercher un livre..."
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-6">
            <q-select
              v-model="selectedCategory"
              outlined
              dense
              :options="categories"
              label="Filtrer par catégorie"
              clearable
              emit-value
              map-options
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Liste des livres -->
    <div v-if="filteredBooks.length > 0" class="row q-col-gutter-md">
      <div v-for="book in filteredBooks" :key="book.id" class="col-12 col-sm-6 col-md-4">
        <q-card bordered class="book-card">
          <q-img
            :src="book.cover || 'https://via.placeholder.com/300x400?text=Couverture'"
            :ratio="3 / 4"
            class="book-cover"
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ book.title }}
            </div>
          </q-img>

          <q-card-section>
            <div class="text-subtitle1 text-weight-bold">{{ book.title }}</div>
            <div class="text-caption text-grey-8 q-mt-xs">
              <q-icon name="person" size="xs" /> {{ book.author }}
            </div>
            <div class="text-caption text-grey-8 q-mt-xs">
              <q-icon name="category" size="xs" /> {{ getCategoryLabel(book.category) }}
            </div>
            <q-chip
              v-for="tag in book.tags"
              :key="tag"
              dense
              color="primary"
              text-color="white"
              size="sm"
              class="q-mt-xs q-mr-xs"
            >
              {{ tag }}
            </q-chip>
          </q-card-section>

          <q-card-actions align="between" class="q-px-md">
            <q-btn flat round color="primary" icon="share" @click="openShareDialog(book)">
              <q-tooltip>Partager ce livre</q-tooltip>
            </q-btn>

            <div>
              <q-btn flat round color="grey" icon="visibility" :to="`/livre/${book.id}`">
                <q-tooltip>Voir les détails</q-tooltip>
              </q-btn>
              <q-btn flat round color="grey" icon="edit" @click="editBook(book)">
                <q-tooltip>Modifier</q-tooltip>
              </q-btn>
              <q-btn flat round color="negative" icon="delete" @click="confirmDelete(book.id)">
                <q-tooltip>Supprimer</q-tooltip>
              </q-btn>
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Aucun livre trouvé -->
    <q-card v-else flat bordered class="text-center q-pa-xl">
      <q-icon name="menu_book" size="xl" color="grey-5" />
      <div class="text-h6 q-mt-md text-grey-7">Aucun livre trouvé</div>
      <q-btn
        label="Ajouter votre premier livre"
        color="primary"
        unelevated
        class="q-mt-md"
        to="/creer-ouvrage"
      />
    </q-card>

    <!-- Dialogue de partage -->
    <q-dialog v-model="shareDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Partager "{{ selectedBook.title }}"</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-sm justify-center">
            <q-btn round color="blue" icon="facebook" @click="shareOnSocial('facebook')" />
            <q-btn round color="light-blue" icon="twitter" @click="shareOnSocial('twitter')" />
            <q-btn round color="red" icon="mail" @click="shareOnSocial('email')" />
            <q-btn round color="green" icon="whatsapp" @click="shareOnSocial('whatsapp')" />
          </div>

          <q-input v-model="shareLink" readonly class="q-mt-md" outlined dense>
            <template v-slot:append>
              <q-btn flat icon="content_copy" @click="copyShareLink" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Exporter en PDF" color="primary" flat @click="exportToPDF" />
          <q-btn label="Fermer" color="primary" flat v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()

// Données simulées - à remplacer par un appel API réel
const books = ref([
  {
    id: 1,
    title: 'Mon premier roman',
    author: 'Moi-même',
    category: 'novel',
    description: 'Une histoire passionnante sur...',
    tags: ['aventure', 'amour'],
    cover: '/img/book1',
    file: '/sample.pdf',
    isPublic: true,
    allowComments: true,
    publicationDate: '2023-05-15',
    price: 9.99,
  },
  {
    id: 2,
    title: 'Voyage fantastique',
    author: 'Moi-même',
    category: 'fantasy',
    description: 'Un voyage dans un monde imaginaire...',
    tags: ['fantasy', 'magie'],
    cover: 'https://via.placeholder.com/300x400?text=Couverture+2',
    file: '/sample.pdf',
    isPublic: true,
    allowComments: false,
    publicationDate: '2023-06-20',
    price: 12.5,
  },
])

// Récupérer les livres depuis le localStorage
onMounted(() => {
  const savedBooks = localStorage.getItem('userBooks')
  if (savedBooks) {
    books.value = JSON.parse(savedBooks)
  }
})

// Catégories (doit correspondre à celles du formulaire de création)
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

const searchQuery = ref('')
const selectedCategory = ref(null)
const shareDialog = ref(false)
const selectedBook = ref({})
const shareLink = ref('')

// Filtrer les livres selon la recherche et la catégorie
const filteredBooks = computed(() => {
  let result = books.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  if (selectedCategory.value) {
    result = result.filter((book) => book.category === selectedCategory.value)
  }

  return result
})

// Obtenir le libellé de la catégorie
const getCategoryLabel = (categoryValue) => {
  const category = categories.find((cat) => cat.value === categoryValue)
  return category ? category.label : 'Non catégorisé'
}

// Ouvrir le dialogue de partage
const openShareDialog = (book) => {
  selectedBook.value = book
  shareLink.value = `${window.location.origin}/livre/${book.id}`
  shareDialog.value = true
}

// Partager sur les réseaux sociaux
const shareOnSocial = (platform) => {
  let url = ''
  const text = `Découvrez mon livre "${selectedBook.value.title}"`

  switch (platform) {
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink.value)}`
      break
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareLink.value)}`
      break
    case 'whatsapp':
      url = `https://wa.me/?text=${encodeURIComponent(`${text} ${shareLink.value}`)}`
      break
    case 'email':
      url = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${shareLink.value}`)}`
      break
  }

  window.open(url, '_blank')
}

// Copier le lien de partage
const copyShareLink = () => {
  navigator.clipboard.writeText(shareLink.value)
  $q.notify({
    type: 'positive',
    message: 'Lien copié dans le presse-papier!',
  })
}

// Exporter en PDF (simulé)
const exportToPDF = () => {
  $q.notify({
    type: 'info',
    message: 'Export PDF en cours... (fonctionnalité à implémenter)',
  })
  // Ici, vous pourriez utiliser une librairie comme jsPDF ou faire un appel API
}

// Modifier un livre
const editBook = (book) => {
  router.push(`/modifier-ouvrage/${book.id}`)
}

// Supprimer un livre
const confirmDelete = (bookId) => {
  $q.dialog({
    title: 'Confirmer la suppression',
    message: 'Êtes-vous sûr de vouloir supprimer ce livre?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    books.value = books.value.filter((book) => book.id !== bookId)
    localStorage.setItem('userBooks', JSON.stringify(books.value))
    $q.notify({
      type: 'positive',
      message: 'Livre supprimé avec succès',
    })
  })
}
</script>

<style scoped>
.book-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 100%;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.book-cover {
  height: 250px;
  object-fit: cover;
}

.q-chip {
  cursor: default;
}
</style>
