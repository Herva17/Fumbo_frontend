<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-white text-black shadow-sm">
      <q-toolbar>
        <q-btn flat class="text-weight-bold text-h5" to="/"> Fumbo </q-btn>
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
          to="/about"
        />
        <q-btn
          flat
          label="Publier"
          class="hover-underline-animation"
          to="/enregistrer"
        />
        <q-btn
          flat
          label="Ecrire"
          class="hover-underline-animation"
          to="enregistrer"
        />
        <q-btn
          flat
          label="Ouvrages"
          class="hover-underline-animation"
          to="/ouvrage"
        />

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

    <!-- CONTENU DE LA PAGE -->
    <div class="q-pa-md flex flex-center">
      <div class="book-preview q-pa-lg shadow-5 rounded-borders">
        <div class="row q-mb-md">
          <div class="col-3">
            <q-img :src="book.imageUrl" class="book-cover" />
          </div>
          <div class="col-9 q-pl-md">
            <h2 class="text-h4 text-weight-bold">{{ book.title }}</h2>
            <p class="text-subtitle1 text-grey-8">{{ book.author }}</p>
            <div class="q-mt-md">
              <q-btn
                flat
                color="White"
                label=" lire"
                icon="play_arrow"
                class="q-mr-md"
                to="/lire"
              />
              <q-btn flat label="Enregistrer" icon="bookmark" class="q-mr-md" />
              <q-btn flat label="Télécharger" icon="download" />
            </div>
          </div>
        </div>

        <q-separator class="q-my-md" />

        <!-- STATISTIQUES -->
        <div class="row q-mt-md q-gutter-md">
          <div class="col">
            <div class="text-center">
              <q-icon name="people" size="sm" class="q-mr-xs" />
              <span class="text-body1">{{ book.readers }} Lecteurs</span>
            </div>
          </div>
          <div class="col">
            <div class="text-center">
              <q-icon name="thumb_up" size="sm" class="q-mr-xs" />
              <span class="text-body1">{{ book.likes }} Likes</span>
            </div>
          </div>
          <div class="col">
            <div class="text-center">
              <q-icon name="list" size="sm" class="q-mr-xs" />
              <span class="text-body1">{{ book.chapters }} Chapitres</span>
            </div>
          </div>
        </div>

        <q-separator class="q-my-md" />

        <!-- RÉSUMÉ -->
        <div class="q-mt-md">
          <h3 class="text-h5 text-weight-bold">Résumé</h3>
          <p class="text-body1">{{ book.summary }}</p>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const book = ref({
  title: "Un amour éternel",
  author: "Sophie Laurent",
  imageUrl: "/img/love2.jpg",
  summary:
    "Ce livre raconte l'histoire d'un amour qui traverse les époques, défiant les obstacles et les épreuves pour rester éternel. Une romance captivante qui vous fera croire en la puissance de l'amour véritable.",
  readers: "12.3K",
  likes: "8.7K",
  chapters: "24",
});
</script>

<style scoped>
.book-preview {
  max-width: 800px;
  width: 100%;
  background: white;
  border-radius: 12px;
}

.book-cover {
  max-width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  margin-top: 20px;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(
    100vh - 100px
  ); /* Pour centrer verticalement avec espace par rapport au header */
}

.text-grey-8 {
  color: #616161;
}

.shadow-5 {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.rounded-borders {
  border-radius: 12px;
}
</style>
