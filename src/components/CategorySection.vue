<template>
  <div class="section-container animate__animated animate__fadeInUp">
    <h4 class="text-center text-weight-bold q-mb-md section-title">
      {{ title }}
    </h4>
    <div class="row q-col-gutter-md justify-center">
      <q-card
        v-for="(book, index) in books"
        :key="index"
        class="col-12 col-md-3 col-sm-5 col-xs-10 animate__animated animate__zoomIn book-card"
      >
        <q-img :src="book.imageUrl" class="book-image" />
        <q-card-section>
          <div class="text-h6 text-weight-bold">{{ book.title }}</div>
          <div class="text-caption text-grey">{{ book.author }}</div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Voir le livre" color="black" class="hover-pop" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  books: Array,
});
</script>

<style scoped>
/* Titre des sections */
.section-title {
  font-size: 1.8rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Espace entre les sections */
.section-container {
  margin-bottom: 30px;
}

/* Style des cartes */
.book-card {
  transition: all 0.3s ease-in-out;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  background: white;
}
.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}

/* Style des images */
.book-image {
  border-radius: 10px 10px 0 0;
  height: 200px;
  object-fit: cover;
}

/* Bouton au survol */
.hover-pop {
  transition: all 0.3s ease-in-out;
}
.hover-pop:hover {
  transform: translateY(-2px);
}
</style>
