<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-white text-black shadow-sm">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-h5">
          Fumbo
        </q-toolbar-title>
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
        <q-btn
          flat
          label="A propos"
          class="hover-underline-animation"
          to="/Ecrire"
        />
        <q-btn
          flat
          label="Publier"
          class="hover-underline-animation"
          to="/ouvrage"
        />
        <q-btn
          flat
          label="Ecrire"
          class="hover-underline-animation"
          to="/Ecrire"
        />
        <q-btn
          flat
          label="Ouvrages"
          class="hover-underline-animation"
          to="/ouvrage"
        />
        <q-btn flat label="Romans" class="hover-underline-animation" />
        <q-btn
          rounded
          unelevated
          color="black"
          label="S'inscrire"
          class="q-ml-md text-white hover-grow"
          to="/Enregistrer"
        />
      </q-toolbar>
    </q-header>

    <q-separator spaced />

    <!-- SECTIONS PAR CATÉGORIE -->
    <div class="q-pa-md">
      <CategorySection title="Histoires d'amour" :books="loveStories" />
      <q-separator class="q-my-md" />
      <CategorySection title="Romans policiers" :books="detectiveNovels" />
      <q-separator class="q-my-md" />
      <CategorySection title="Science-fiction" :books="scifiBooks" />
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import CategorySection from "src/components/CategorySection.vue"; // Composant réutilisable

const loveStories = ref([
  {
    title: "Un amour éternel",
    author: "Sophie Laurent",
    imageUrl: "/img/love1.jpg",
  },
  {
    title: "Les battements du cœur",
    author: "Marc Dupuis",
    imageUrl: "/img/love2.jpg",
  },
  {
    title: "À jamais ensemble",
    author: "Elodie Martin",
    imageUrl: "/img/love3.jpg",
  },
]);

const detectiveNovels = ref([
  {
    title: "L'ombre du crime",
    author: "Henri Clément",
    imageUrl: "/img/detective1.jpg",
  },
  {
    title: "Enquête fatale",
    author: "Julie Verne",
    imageUrl: "/img/detective2.jpg",
  },
  {
    title: "Mystère à Paris",
    author: "François Leblanc",
    imageUrl: "/img/detective3.jpg",
  },
]);

const scifiBooks = ref([
  {
    title: "Les mondes parallèles",
    author: "Arthur Nelson",
    imageUrl: "/img/scifi1.jpg",
  },
  {
    title: "L’ère des cyborgs",
    author: "Claire Fontaine",
    imageUrl: "/img/scifi2.jpg",
  },
  {
    title: "Le voyage interstellaire",
    author: "Paul Rivière",
    imageUrl: "/img/scifi3.jpg",
  },
]);
</script>
