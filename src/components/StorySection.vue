<template>
  <!-- Section Écouter des Histoires -->
  <div class="q-mt-xl section-container animate__animated animate__fadeInUp">
    <h4 class="text-center text-weight-bold q-mb-lg">Écouter des histoires</h4>
    <div class="row q-col-gutter-lg justify-center">
      <q-card
        v-for="(story, index) in stories"
        :key="index"
        class="col-12 col-md-3 animate__animated animate__zoomIn hover-shadow story-card"
      >
        <q-img :src="story.imageUrl" class="q-mt-md story-image" />
        <q-card-section>
          <div class="text-weight-bold">{{ story.title }}</div>
          <div class="text-caption text-grey">{{ story.author }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Écouter l'histoire" color="black" class="hover-pop" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <q-separator spaced />
</template>

<script setup>
import { ref } from 'vue'
const stories = ref([
  {
    title: 'Le cœur a ses raisons',
    author: 'Josué Ipaka',
    imageUrl: new URL('/img/book1.jpg', import.meta.url).href,
  },
  {
    title: 'Rencontre avec le mal',
    author: 'Henri Iyogi',
    imageUrl: new URL('/img/book2.jpg', import.meta.url).href,
  },
  {
    title: 'Mon porte bonheur',
    author: 'Furaha Nziere',
    imageUrl: new URL('/img/book3.jpg', import.meta.url).href,
  },
])
</script>

<style scoped>
.story-section {
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
