<template>
  <q-page class="dashboard-page">
    <HeaderPage />
    <q-separator />
    <BannerSection class="banner" />
    <q-separator />

    <!-- Filtres -->
    <div class="row q-mb-lg">
      <q-select
        v-model="filter"
        :options="filterOptions"
        label="Filtrer par"
        dense
        outlined
        class="col-3"
      />
      <q-space />
      <q-btn-toggle
        v-model="sort"
        toggle-color="primary"
        flat
        :options="[
          { label: 'Récent', value: 'recent' },
          { label: 'Populaire', value: 'popular' },
          { label: 'Mieux notés', value: 'top' },
        ]"
      />
    </div>

    <!-- Liste des histoires -->
    <div class="stories-list">
      <!-- Histoire 1 -->
      <q-card class="story-card q-mb-lg">
        <q-card-section horizontal>
          <q-img class="col-3" src="/img/wild-sky.jpg" alt="Au Clair de Lune" />

          <q-card-section>
            <div class="text-h6">Au Clair de Lune, Tome 1 : La Lune Vengeresse</div>
            <div class="text-subtitle2 q-mb-sm">★★★★☆</div>
            <p class="story-description">
              Je m'appelle Louva Wild, une Loup-Garou de rang Delta qui mène une vie simple et
              tranquille jusqu'à ce qu'IL arrive et chamboule absolument tout. Il va s'imposer dans
              ma vie et la changer pour le m...
            </p>

            <div class="row q-mt-md">
              <q-chip v-for="tag in ['Fantasy', 'Aventure', 'Loup-Garou']" :key="tag" dense>
                {{ tag }}
              </q-chip>
            </div>

            <div class="row items-center q-mt-sm">
              <div class="col">
                <span class="text-caption">Par Laura B • Terminé • 54 chapitres</span>
              </div>
              <div class="col-auto">
                <q-btn flat color="primary" label="Lire" />
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <!-- Histoire 2 -->
      <q-card class="story-card q-mb-lg">
        <q-card-section horizontal>
          <q-img class="col-3" src="/img/werewolf.jpg" alt="Sous un ciel sauvage" />

          <q-card-section>
            <div class="text-h6">Sous un ciel sauvage</div>
            <div class="text-subtitle2 q-mb-sm">★★★★☆</div>
            <p class="story-description">
              On m'a tout pris. Mon innocence, ma maison, mes désirs. Même celle de vivre. À quoi
              bon ? Depuis toujours, je lutte dans un monde qui ne me laisse pas de place. Un monde
              sans pitié, où il faut sur...
            </p>

            <div class="row q-mt-md">
              <q-chip v-for="tag in ['Aventure', 'Drame', 'Sauvage']" :key="tag" dense>
                {{ tag }}
              </q-chip>
            </div>

            <div class="row items-center q-mt-sm">
              <div class="col">
                <span class="text-caption">Par Ella, MORGAN • En cours • 11 chapitres</span>
              </div>
              <div class="col-auto">
                <q-btn flat color="primary" label="Lire" />
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <!-- Histoire 3 -->
      <q-card class="story-card q-mb-lg">
        <q-card-section horizontal>
          <q-img class="col-3" src="/img/moon-story.jpg" alt="Le loup-garou civilisé" />

          <q-card-section>
            <div class="text-h6">Le loup-garou civilisé: l'enlèvement</div>
            <div class="text-subtitle2 q-mb-sm">★★★★☆</div>
            <p class="story-description">
              Dans un monde où les loups-garous sont censés être sauvages et incontrôlables, moi, je
              suis différent. J'ai été élevé parmi les humains, éduqué, "civilisé". Mais quand ma
              sœur est enlevée par une meute rivale, toute ma civilisation s'effondre...
            </p>

            <div class="row q-mt-md">
              <q-chip v-for="tag in ['Fantasy', 'Loup-Garou', 'Mystère']" :key="tag" dense>
                {{ tag }}
              </q-chip>
            </div>

            <div class="row items-center q-mt-sm">
              <div class="col">
                <span class="text-caption">Par Jean D. • En cours • 23 chapitres</span>
              </div>
              <div class="col-auto">
                <q-btn flat color="primary" label="Lire" />
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import HeaderPage from 'src/components/HeaderPage.vue'
import BannerSection from 'src/components/BannerSection.vue'

const filter = ref('Tous')
const sort = ref('recent')

const filterOptions = ['Tous', 'Fantasy', 'Aventure', 'Romance', 'Drame', 'Horreur', 'Mystère']
</script>

<style scoped>
.dashboard-page {
  padding: 0px;
  padding-left: 5px;
  padding-right: 5px;
  max-width: 1500px;
  margin: 0 auto;
}

.banner {
  max-width: 1800px;
}

.story-card {
  border-radius: 8px;
  transition: transform 0.2s;
}

.story-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.story-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
