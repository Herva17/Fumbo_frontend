<template>
  <q-card class="my-card">
    <q-img :src="journal.cover" :ratio="3/4" basic>
      <div class="absolute-bottom text-h6">
        {{ journal.title }}
      </div>
    </q-img>

    <q-card-section>
      <div class="text-caption text-grey-7">
        {{ journal.description }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-caption">
        {{ journal.issuesCount }} numéros disponibles
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-caption">
      Publier par  {{ journal.publisher }} 
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat round color="primary" icon="visibility" />
      <q-btn flat color="primary" label="Consulter" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  props: {
    journal: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.my-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>