<template>
 <!-- Bouton Retour -->
    <div class="w-full max-w-[21cm] mb-6">
      <router-link to="/">
        <div class="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300">
          <span class="back-button">
            <q-btn flat icon="arrow_back" class="q-ma-md" />
          </span>
        </div>
      </router-link>
    </div>

</template>

<script setup>

</script>
lang="scss" scoped
<style >
/* Style du bouton retour en haut à gauche */
.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  /* Bleu clair */
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}
</style>