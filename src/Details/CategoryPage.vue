<template>
  <q-layout view="hHh lpR fFf">
     <Navbar />
    <q-page-container>
      <div class="q-pa-md">
        <q-btn
          flat
          color="primary"
          icon="arrow_back"
          label="Retour"
          @click="$router.push('/')"
          class="q-mb-md"
        />

        <h2 class="text-h4 q-mb-lg">
          {{ filterType === 'fandom' ? 'Fandom' : 'Catégorie' }}: {{ filterValue }}
        </h2>

        <div class="row q-col-gutter-md">
          <div v-for="story in filteredStories" :key="story.id" class="col-xs-12 col-sm-6 col-md-4">
            <q-card
              flat
              bordered
              class="my-card cursor-pointer"
              @click="$router.push(`/book/${story.id}`)"
            >
              <q-card-section horizontal>
                <q-img
                  class="col-4"
                  :src="`/img/covers/${story.cover}`"
                  :alt="story.title"
                  style="max-width: 200px"
                />

                <q-card-section>
                  <div class="text-h6">{{ story.title }}</div>
                  <div class="text-subtitle2 q-mt-xs">{{ story.author }}</div>
                  <div class="text-caption text-grey q-mt-sm text-ellipsis-2-lines">
                    {{ story.description }}
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div v-if="filteredStories.length === 0" class="text-center q-pa-lg">
          <q-icon name="menu_book" size="xl" color="grey" />
          <div class="text-h6 q-mt-md">Aucun livre trouvé dans cette catégorie</div>
        </div>
      </div>
    </q-page-container>
   <InfoSection />
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from 'src/components/MainNavbar.vue'

import InfoSection from 'src/components/InfoSection.vue'
import { api } from 'src/boot/axios'

const props = defineProps({
  filterType: {
    type: String,
    default: 'category',
  },
  filterValue: {
    type: String,
    required: true,
  },
})

const stories = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    // Charger tous les livres (ou filtrer directement via API)
    const response = await api.get('/books')
    stories.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des livres:', error)
  } finally {
    loading.value = false
  }
})

const filteredStories = computed(() => {
  if (!stories.value.length) return []

  return stories.value.filter((story) => {
    if (props.filterType === 'fandom') {
      return story.fandoms?.includes(props.filterValue)
    } else {
      return story.tags?.includes(props.filterValue) || story.genre === props.filterValue
    }
  })
})
</script>
