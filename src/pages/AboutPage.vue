<template>
  <q-layout view="hHh lpR fFf">
    <!-- Inclure la barre de navigation -->
    <MainNavbar />

    <!-- SECTION 1 : Introduction -->
    <div
      class="section bg-primary text-white text-center q-pa-xl"
      
    >
      <h1 class="text-h3 text-weight-bold animate__animated animate__fadeInDown">
        Bienvenue sur Fumbo
      </h1>
      <p class="text-subtitle1 q-mt-md animate__animated animate__fadeInUp">
        Là où les histoires prennent vie et trouvent leur public.
      </p>
    </div>

    <!-- SECTION 2 : Qu'est-ce que Fumbo ? -->
    <div class="section bg-light q-pa-xl">
      <q-card class="content-card">
        <q-card-section>
          <h4 class="text-weight-bold text-black animate__animated animate__fadeInLeft">
            Qu'est-ce que Fumbo ?
          </h4>
          <p class="text-body1 animate__animated animate__fadeInRight">
            <strong>Fumbo</strong> est une plateforme dédiée aux passionnés d’écriture et de
            lecture. Ici, vous pouvez découvrir des récits captivants, partager vos propres
            histoires et interagir avec une communauté de lecteurs et d’auteurs.
          </p>
        </q-card-section>
      </q-card>
    </div>

    <!-- SECTION 3 : Fonctionnalités -->
    <div class="section bg-white q-pa-xl">
      <q-card class="content-card">
        <q-card-section>
          <h4 class="text-weight-bold text-black animate__animated animate__fadeInLeft">
            Comment ça fonctionne ?
          </h4>
          <ul class="text-body1 q-mt-md animate__animated animate__fadeInRight">
            <li>
              <strong>📖 Lire :</strong> Explorez une vaste bibliothèque de récits, du roman
              d’aventure au thriller palpitant.
            </li>
            <li>
              <strong>✍️ Écrire :</strong> Publiez vos propres histoires et laissez libre cours à
              votre imagination.
            </li>
            <li>
              <strong>⭐ Partager :</strong> Recevez des commentaires et partagez vos écrits avec le
              monde entier.
            </li>
          </ul>
        </q-card-section>
      </q-card>
    </div>

    <!-- SECTION 4 : Pourquoi rejoindre Fumbo ? -->
    <div class="section bg-secondary text-white q-pa-xl">
      <h4 class="text-weight-bold text-center animate__animated animate__fadeIn">
        Pourquoi rejoindre Fumbo ?
      </h4>
      <div class="row q-col-gutter-md q-mt-lg">
        <div class="col-12 col-md-4">
          <q-card flat bordered class="feature-card animate__animated animate__zoomIn">
            <q-icon name="favorite" color="red" size="lg" />
            <q-card-section>
              <div class="text-subtitle1 text-weight-bold text-black">Une communauté passionnée</div>
              <p class="text-caption text-black">
                Rejoignez une communauté d’écrivains et de lecteurs engagés qui partagent votre
                amour des histoires.
              </p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card flat bordered class="feature-card animate__animated animate__zoomIn">
            <q-icon name="lightbulb" color="yellow" size="lg" />
            <q-card-section>
              <div class="text-subtitle1 text-weight-bold text-black">Exprimez votre créativité</div>
              <p class="text-caption text-black">
                Donnez vie à vos idées, expérimentez de nouveaux genres et affinez votre style
                d’écriture.
              </p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card flat bordered class="feature-card animate__animated animate__zoomIn">
            <q-icon name="people" color="blue" size="lg" />
            <q-card-section>
              <div class="text-subtitle1 text-weight-bold text-black">Des échanges enrichissants</div>
              <p class="text-caption text-black">
                Recevez des retours constructifs, interagissez avec d'autres écrivains et bâtissez
                votre audience.
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
     <InfoSection />
  </q-layout>
</template>

<script setup>
import MainNavbar from 'src/components/MainNavbar.vue'
import InfoSection from 'src/components/InfoSection.vue'
</script>

<style scoped>
/* --- SECTIONS --- */
.section {
  width: 100%;
}

.bg-primary {
       background-color: #007bff;

        background-attachment: fixed;
}

.bg-light {
  background-color: #f8f9fa;
}

.bg-secondary {
  background-color: #6c757d;
}

/* --- CONTENU --- */
.content-card {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

/* --- CARTES DE FONCTIONNALITÉS --- */
.feature-card {
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
}
.feature-card:hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

/* --- ANIMATIONS --- */
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>
