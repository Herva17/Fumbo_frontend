<template>
  <!-- Section raconter une histoire -->
  <div class="story-section">
    <img :src="backgroundImage" alt="Illustration" class="background-image" />
    <q-btn
      class="hover-grow"
      label="Raconter une histoire"
      color="black"
      unelevated
      to="/raconter"
    />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
/* Conteneur principal */
.story-section {
  position: relative;
  width: 100%;
  height: 300px; /* Ajustez la hauteur selon vos besoins */
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  overflow: hidden;
}
</style>
