<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <!-- Bouton Retour en haut à gauche -->
    <div class="w-full max-w-[21cm] mb-6">
      <router-link to="/">
        <div
          class="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          <span class="back-button">
            <q-btn flat icon="arrow_back" class="q-ma-md" />
          </span>
        </div>
      </router-link>
    </div>

    <!-- Contenu de la politique de confidentialité -->
    <div class="page_wrapper">
      <div class="content">
        <!-- Titre principal -->
        <h1 class="text-3xl font-semibold text-center text-blue-900 mb-8">
          <q-icon name="shield" class="mr-2" />
          {{ $t('pol.title1') }}
        </h1>

        <!-- Section 1 : Collecte des informations -->
        <section class="mb-8">
          <h2 class="text-xl font-medium text-blue-900 mb-4">
            <q-icon name="database" class="mr-2" />
            {{ $t('pol.title2') }}
          </h2>
          <p class="text-gray-700 mb-4">
            {{ $t('pol.De1') }}
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li><i class="fas fa-id-card mr-2"></i> {{ $t('pol.de1') }}</li>
            <li><i class="fas fa-envelope mr-2"></i> {{ $t('pol.de2') }}</li>
            <li><i class="fas fa-phone mr-2"></i> {{ $t('pol.de3') }}</li>
            <li><i class="fas fa-map-marker-alt mr-2"></i> {{ $t('pol.de4') }}</li>
          </ul>
        </section>

        <!-- Section 2 : Utilisation des données -->
        <section class="mb-8">
          <h2 class="text-xl font-medium text-green-700 mb-4">
            <q-icon name="storage" class="mr-2" />
            {{ $t('pol.title3') }}
          </h2>
          <p class="text-gray-700">
            {{ $t('pol.De2') }}
          </p>
        </section>

        <!-- Section 3 : Partage des données -->
        <section class="mb-8">
          <h2 class="text-xl font-medium text-purple-700 mb-4">
            <q-icon name="share" class="mr-2" />
            {{ $t('pol.title4') }}
          </h2>
          <p class="text-gray-700">
            {{ $t('pol.De3') }}
          </p>
        </section>

        <!-- Section 4 : Sécurité des données -->
        <section class="mb-8">
          <h2 class="text-xl font-medium text-red-700 mb-4">
            <q-icon name="lock" class="mr-2" />
            {{ $t('pol.title5') }}
          </h2>
          <p class="text-gray-700">
            {{ $t('pol.De4') }}
          </p>
        </section>

        <!-- Section 5 : Droits des utilisateurs -->
        <section>
          <h2 class="text-xl font-medium text-blue-900 mb-4">
            <q-icon name="balance" class="mr-2" />
            {{ $t('pol.title6') }}
          </h2>
          <p class="text-gray-700">
            {{ $t('pol.De5') }}
            <a href="mailto:contact@entreprise.com" class="text-blue-600 hover:text-blue-800">
              {{ $t('pol.De6') }}</a
            >.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Utilisation de Flexbox pour centrer la page */
.page-wrapper {
  display: flex;
  justify-content: center; /* Centre horizontalement */
  align-items: flex-start; /* Aligne en haut de la page */
  min-height: 100vh; /* Remplit la hauteur de l'écran */
  background-color: #f4f4f4; /* Fond gris clair */
}

.content {
  width: 100%; /* Largeur flexible */
  max-width: 900px; /* Limite la largeur maximale */
  background-color: white; /* Fond blanc pour la "feuille" */
  border-radius: 8px; /* Coins arrondis pour un effet plus moderne */
  padding: 40px; /* Espacement autour du contenu */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Ombre douce autour de la "feuille" */
}

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

/* Réduction de la taille des titres pour une approche plus professionnelle */
h1 {
  font-size: 2.25rem; /* Taille plus petite pour le titre principal */
  font-weight: 600; /* Poids modéré */
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.5rem; /* Taille plus petite pour les sous-titres */
  font-weight: 500; /* Poids modéré */
  color: #1e3a8a; /* Couleur bleue professionnelle */
  margin-bottom: 20px;
}

/* Amélioration de la lisibilité du texte */
p,
ul {
  font-size: 1rem; /* Taille plus petite du texte */
  line-height: 1.6; /* Meilleure lisibilité */
  color: #4b5563; /* Gris foncé */
}

a {
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
