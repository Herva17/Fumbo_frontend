<template>
  <div class="carousel">
    <!-- Image principale -->
    <div class="carousel-background-image">
      <img :src="currentSlide.image" :alt="currentSlide.title" />
      <div class="overlay">
        <h2>{{ currentSlide.title }}</h2>
        <p>Par {{ currentSlide.author }}</p>
        <button class="view-button">Voir l'ouvrage</button>
      </div>
    </div>

    <!-- Flèches de navigation -->
    <button class="nav-button left" @click="prevSlide">&#10094;</button>
    <button class="nav-button right" @click="nextSlide">&#10095;</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const slides = ref([
  {
    image: '/img/book6.jpg',
    title: 'La révolution du numérique de notre ère',
    author: 'Thierry Nirere',
  },
  {
    image: '/img/book5.jpg',
    title: 'L’intelligence artificielle et son impact',
    author: 'Sophie Durant',
  },
  {
    image: '/img/book7.jpg',
    title: 'Les nouvelles technologies et l’éducation',
    author: 'Jean Dupont',
  },
])

const currentIndex = ref(0)
const currentSlide = ref(slides.value[currentIndex.value])

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
  currentSlide.value = slides.value[currentIndex.value]
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
  currentSlide.value = slides.value[currentIndex.value]
}
</script>

<style scoped>
/* Importer Animate.css */
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

/* Importer Hover.css */
@import 'https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css';
/* carrousel */
.carousel {
  position: relative;
  width: 100vw; /* Prend toute la largeur de l'écran */
  height: 80vh; /* Ajuste la hauteur (peut être modifié selon le besoin) */
  overflow: hidden;
}

.carousel-image {
  position: relative;
}

.carousel-image img {
  width: 100vw; /* L'image prend toute la largeur de l'écran */
  height: 100%; /* Prend toute la hauteur du conteneur */
  object-fit: cover; /* Recadre l'image pour qu'elle remplisse l'espace sans déformation */
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centre parfaitement */
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4); /* Léger fond assombri pour améliorer la lisibilité */
  padding: 20px;
  border-radius: 5px;
}
.overlay h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}
.overlay p {
  font-size: 16px;
  margin-bottom: 10px;
}

.view-button {
  background: black;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  transition: background 0.3s ease;
}
.view-button:hover {
  background: #333;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 20px;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.nav-button:hover {
  background: black;
}
</style>
