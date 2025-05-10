<template>
  <q-layout view="hHh lpR fFf">
    <HeaderPage />
    <q-page-container>
      <div class="q-pa-md">
        <q-btn
          flat
          color="primary"
          icon="arrow_back"
          label="Retour"
          @click="$router.go(-1)"
          class="q-mb-md"
        />

        <q-card class="book-details-card">
          <q-card-section horizontal>
            <!-- Image de couverture -->
            <q-img
              class="col-4"
              :src="`/img/covers/${book.cover}`"
              :alt="book.title"
              style="max-width: 300px"
            />

            <!-- Détails du livre -->
            <q-card-section class="col-8">
              <div class="text-h4 q-mb-sm">{{ book.title }}</div>
              <div class="text-subtitle1 text-grey q-mb-md">Par {{ book.author }}</div>

              <div class="text-body1 q-mb-lg">{{ book.description }}</div>

              <div class="q-mb-md">
                <q-badge
                  v-for="tag in book.tags"
                  :key="tag"
                  color="primary"
                  class="q-mr-xs q-mb-xs"
                >
                  {{ tag }}
                </q-badge>
              </div>

              <div class="text-caption">
                <q-icon name="star" color="yellow-8" />
                <span class="q-ml-xs">{{ book.rating }}/5</span>
                <q-icon name="menu_book" color="grey" class="q-ml-sm" />
                <span class="q-ml-xs">{{ book.chapters }} chapitres</span>
                <span class="text-grey q-ml-sm">• {{ book.status }}</span>
              </div>
            </q-card-section>
          </q-card-section>

          <!-- Contenu du livre -->
          <q-card-section>
            <q-tabs v-model="tab" class="text-primary">
              <q-tab name="chapters" label="Chapitres" />
              <q-tab name="comments" label="Commentaires" />
              <q-tab name="info" label="Informations" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="chapters">
                <q-list bordered>
                  <q-item
                    v-for="chapter in book.chapters"
                    :key="chapter.number"
                    clickable
                    v-ripple
                    @click="readChapter(chapter.number)"
                  >
                    <q-item-section>
                      <q-item-label>Chapitre {{ chapter.number }}</q-item-label>
                      <q-item-label caption>{{ chapter.title }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="comments">
                <!-- Section commentaires -->
              </q-tab-panel>

              <q-tab-panel name="info">
                <!-- Informations supplémentaires -->
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeaderPage from 'src/components/HeaderPage.vue'
import { api } from 'src/boot/axios'

const route = useRoute()
const book = ref({})
const tab = ref('chapters')

onMounted(async () => {
  // Charger les détails du livre depuis l'API
  try {
    const response = await api.get(`/books/${route.params.id}`)
    book.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement du livre:', error)
  }
})

const readChapter = (chapterNumber) => {
  // Naviguer vers le chapitre
  console.log('Lire le chapitre', chapterNumber)
}
</script>

<style scoped>
.book-details-card {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
