<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <div class="q-pa-md">
        <!-- Section Catégories/Genres -->
        <section class="q-mb-xl">
          <h2 class="text-h5 q-mb-md">Genres</h2>
          <div class="row q-col-gutter-md">
            <div
              v-for="genre in genres"
              :key="genre.name"
              class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
            >
              <q-card flat class="genre-card cursor-pointer" @click="filterByGenre(genre.name)">
                <q-img
                  :src="`/img/genres/${genre.image}`"
                  :alt="genre.name"
                  ratio="1"
                  class="rounded-borders"
                >
                  <div class="absolute-full flex flex-center">
                    <div class="genre-label text-white text-subtitle1 text-weight-bold text-center">
                      {{ genre.name }}
                    </div>
                  </div>
                </q-img>
              </q-card>
            </div>
          </div>
        </section>

        <!-- Section Fanfictions -->
        <section class="q-mb-xl">
          <h2 class="text-h5 q-mb-md">Fanfiction</h2>
          <div class="row q-col-gutter-md">
            <div
              v-for="fandom in fandoms"
              :key="fandom.name"
              class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
            >
              <q-card flat class="fandom-card cursor-pointer" @click="filterByFandom(fandom.name)">
                <q-img
                  :src="`/img/fandoms/${fandom.image}`"
                  :alt="fandom.name"
                  ratio="1"
                  class="rounded-borders"
                >
                  <div class="absolute-full flex flex-center">
                    <div
                      class="fandom-label text-white text-subtitle1 text-weight-bold text-center"
                    >
                      {{ fandom.name }}
                    </div>
                  </div>
                </q-img>
              </q-card>
            </div>
          </div>
          <q-btn
            flat
            label="Plus de fanfictions →"
            color="primary"
            class="q-mt-sm"
            to="/fanfictions"
          />
        </section>

        <!-- Section Thèmes Tendance -->

        <section class="q-mb-xl">
          <h2 class="text-h5 q-mb-md">Thèmes Tendance</h2>
          <div class="q-gutter-sm">
            <q-chip v-for="tag in trendingTags" :key="tag" clickable @click="filterByTag(tag)">
              {{ tag }}
            </q-chip>
          </div>
        </section>

        <!-- Section Livres -->
        <section>
          <div class="row items-center justify-between q-mb-md">
            <h2 class="text-h5 q-my-none">Dernières publications</h2>
            <q-btn
              flat
              label="Voir plus"
              color="primary"
              icon-right="chevron_right"
              to="/explorer"
            />
          </div>

          <div class="row q-col-gutter-md">
            <div v-for="story in stories" :key="story.id" class="col-xs-12">
              <q-card
                flat
                bordered
                class="my-card cursor-pointer"
                @click="$router.push(`/book/${story.id}`)"
              >
                <q-card-section horizontal>
                  <!-- Image de couverture réduite -->
                  <q-img
                    class="col-2"
                    :src="`/img/covers/${story.cover}`"
                    :alt="story.title"
                    ratio="1"
                    style="width: 200px"
                  />

                  <!-- Contenu texte -->
                  <q-card-section class="col-10">
                    <div class="text-h6">{{ story.title }}</div>
                    <div class="text-subtitle2 q-mt-xs">{{ story.author }}</div>
                    <div class="text-caption text-grey q-mt-sm text-ellipsis-3-lines">
                      {{ story.description }}
                    </div>

                    <div class="q-mt-md">
                      <q-badge
                        v-for="tag in story.tags"
                        :key="tag"
                        color="primary"
                        class="q-mr-xs q-mb-xs"
                      >
                        {{ tag }}
                      </q-badge>
                    </div>

                    <div class="text-caption q-mt-md">
                      <q-icon name="star" color="yellow-8" size="sm" />
                      <span class="q-ml-xs">{{ story.rating }}/5</span>
                      <q-icon name="menu_book" color="grey" size="sm" class="q-ml-sm" />
                      <span class="q-ml-xs">{{ story.chapters }} chapitres</span>
                      <span class="text-grey q-ml-sm">• {{ story.status }}</span>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </section>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const filterByGenre = (genre) => {
  router.push(`/category/${genre.toLowerCase()}`)
}

const filterByFandom = (fandom) => {
  router.push(`/fandom/${fandom.toLowerCase()}`)
}

// Données avec images
const genres = ref([
  { name: 'Sci-Fi', image: 'sci-fi.jpg' },
  { name: 'Fantasy', image: 'fantasy.jpg' },
  { name: 'Aventure', image: 'adventure.jpg' },
  { name: 'Mystère', image: 'mystery.jpg' },
  { name: 'Action', image: 'action.jpg' },
  { name: 'Horreur', image: 'horror.jpg' },
  { name: 'Humour', image: 'comedy.jpg' },
  { name: 'Erotique', image: 'erotic.jpg' },
  { name: 'Poésie', image: 'poetry.jpg' },
  { name: 'Autre', image: 'other.jpg' },
  { name: 'Thriller', image: 'thriller.jpg' },
  { name: 'Romance', image: 'romance.jpg' },
  { name: 'Enfants', image: 'children.jpg' },
  { name: 'Drame', image: 'drama.jpg' },
])

const fandoms = ref([
  { name: 'Harry Potter', image: 'harry-potter.jpg' },
  { name: 'Nautuo', image: 'nautuo.jpg' },
  { name: 'Supernatural', image: 'supernatural.jpg' },
  { name: 'Glee', image: 'glee.jpg' },
  { name: 'Lord of the rings', image: 'lotr.jpg' },
])

const trendingTags = ref([
  'Historique',
  'Sexe',
  'Sexe Explicite',
  'Érotique',
  'Romances',
  'Amouradolescent',
  'Romance Lycéenne',
  'Desfictions',
])

const stories = ref([
  {
    id: 1,
    title: 'Sous un ciel sauvage',
    author: 'Elia_MORGAN',
    description: "On m'a tout pris. Mon innocence, ma maison, mes désirs. Même celle de vivre...",
    tags: ['Sauvage', 'Aventures'],
    rating: 5,
    chapters: 11,
    status: 'En cours',
    cover: 'sous-un-ciel-sauvage.jpg', // Ajout de la propriété cover
  },
  {
    id: 2,
    title: "Le loup-garou civilisé: l'enlèvement",
    author: 'Jean_WOLF',
    description: 'Une histoire de loup-garou dans un monde moderne...',
    tags: ['Fantasy', 'Drame'],
    rating: 4,
    chapters: 7,
    status: 'En cours',
    cover: 'loup-garou.jpg', // Ajout de la propriété cover
  },
  // Ajoutez plus d'histoires ici...
])
</script>

<style lang="scss" scoped>
.genre-card,
.fandom-card {
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }

  .q-img {
    height: 120px; /* Taille réduite des images */
    width: 100%;
    object-fit: cover;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      border-radius: inherit;
    }
  }

  .genre-label,
  .fandom-label {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    padding: 8px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .genre-card .q-img,
  .fandom-card .q-img {
    height: 100px;
  }

  .genre-label,
  .fandom-label {
    font-size: 0.9rem;
  }
}
.my-card {
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .q-img {
    border-radius: 4px;
    object-fit: cover;
    margin-right: 50px;
  }

  .text-ellipsis-3-lines {
    display: -webkit-box;

    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    .q-card-section--horizontal {
      flex-direction: row;
      align-items: flex-start;

      .q-img {
        width: 80px;
        min-width: 80px;
        margin-right: 12px;
      }
    }
  }
}
</style>
