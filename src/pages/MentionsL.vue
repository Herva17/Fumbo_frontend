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
    <div class="content">
      <!-- Contenu des mentions légales -->
      <div class="w-full max-w-[21cm] bg-white rounded-lg shadow-lg p-8">
        <!-- Titre principal -->
        <h1 class="text-3xl font-semibold text-center text-blue-900 mb-8">
          <q-icon name="balance" class="mr-2" />
          Mentions Légales
        </h1>

        <!-- Section 1 : Informations générales -->
        <section class="mb-8">
          <h2 class="text-xl font-medium text-blue-900 mb-4">
            <q-icon name="info" class="mr-2" />
            Informations Générales
          </h2>
          <p class="text-gray-700 mb-4">
            Ce site est édité par la société Éditions Pro, spécialisée dans la publication
            d'ouvrages et de contenus professionnels.
          </p>
          <ul>
            <li><strong>Raison sociale :</strong> Éditions Pro</li>
            <li><strong>Forme juridique :</strong> Société par actions simplifiée (SAS)</li>
            <li><strong>Adresse :</strong> 123 Rue de l'Édition, 75001 Paris, France</li>
            <li><strong>Numéro SIRET :</strong> 123 456 789 00010</li>
            <li><strong>Directeur de la publication :</strong> Jean Dupont</li>
            <li>
              <strong>Contact :</strong>
              <a href="mailto:contact@editionspro.com" class="text-blue-600 hover:text-blue-800">
                contact@editionspro.com
              </a>
            </li>
          </ul>
        </section>

        <!-- Section 2 : Hébergement -->
        <section class="mb-8">
          <h2>
            <q-icon
              name="fas fa-server"
              class="mr-2"
            />
            Hébergement
          </h2>
          <ul>
            <li><strong>Hébergeur :</strong> ProHosting Solutions</li>
            <li>
              <strong>Site de l'hébergeur :</strong>
              <a
                href="https://www.prohosting.com"
                target="_blank"
                class="text-green-600 hover:text-green-800"
              >
                www.prohosting.com
              </a>
            </li>
          </ul>
        </section>

        <!-- Section 3 : Droits d'auteur -->
        <section class="mb-8">
          <h2>
            <q-icon name="copyright" class="mr-2" />
            Droits d'Auteur
          </h2>
          <p class="text-gray-700">
            Tous les contenus présents sur ce site (textes, images, logos, etc.) sont la propriété
            exclusive d'Éditions Pro ou de ses partenaires. Toute reproduction, distribution, ou
            utilisation sans autorisation écrite est strictement interdite.
          </p>
        </section>

        <!-- Section 4 : Responsabilité -->
        <section class="mb-8">
          <h2>
            <q-icon name="gavel" class="mr-2" />
            Responsabilité
          </h2>
          <p>
            Éditions Pro décline toute responsabilité concernant les informations fournies par des
            tiers ou les liens externes présents sur ce site.
          </p>
        </section>

        <!-- Section 5 : Protection des données -->
        <section>
          <h2>
            <q-icon name="shield" class="mr-2" />
            Protection des Données
          </h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
            d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour
            exercer ce droit, contactez-nous à l'adresse suivante :
            <a href="mailto:contact@editionspro.com" class="text-blue-600 hover:text-blue-800">
              contact@editionspro.com </a
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
  align-items: center; /* Centre verticalement */
  min-height: 10vh; /* Remplit la hauteur de l'écran */
  background-color: #f4f4f4; /* Couleur de fond (facultatif) */
}

/* Contenu principal */
.content {
  width: 100%; /* Largeur flexible */
  max-width: 900px; /* Limite la largeur maximale */
  padding: 40px; /* Espacement autour du contenu */
  background-color: white; /* Fond blanc pour la "feuille" */
  border-radius: 8px; /* Coins arrondis pour un effet plus moderne */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Ombre douce autour de la "feuille" */
}

/* Style du bouton retour en haut à gauche */
.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
}

/* Titre principal */
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

@media (max-width: 640px) {
  .p-8 {
    padding: 1.5rem;
  }
  .text-2xl {
    font-size: 1.5rem;
  }
  .text-3xl {
    font-size: 2rem;
  }
}
</style>
