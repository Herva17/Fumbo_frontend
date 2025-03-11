<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-white text-black shadow-sm">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold text-h5">
          Fumbo
        </q-toolbar-title>
        <q-space />
        <!-- <q-input
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
        </q-input> -->
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

    <!-- BANNIÈRE -->
    <div class="banner-container">
      <q-img src="/img/book3.jpg" class="banner-image">
        <div class="banner-overlay">
          <div class="text-h4 text-white text-center text-weight-bold">
            Bienvenue sur Fumbo
          </div>
          <div class="text-subtitle1 text-white text-center q-mt-md">
            Là où les histoires prennent vie et trouvent leur public.
          </div>
        </div>
      </q-img>
    </div>

    <!-- CONTENU -->
    <div class="q-pa-md">
      <q-card class="content-card">
        <q-card-section>
          <h4 class="text-weight-bold text-primary">Qu'est-ce que Fumbo ?</h4>
          <p class="text-body1">
            <strong>Fumbo</strong> est une plateforme dédiée aux passionnés
            d’écriture et de lecture. Ici, vous pouvez découvrir des récits
            captivants, partager vos propres histoires et interagir avec une
            communauté de lecteurs et d’auteurs.
          </p>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <h4 class="text-weight-bold text-primary">Comment ça fonctionne ?</h4>
          <ul class="text-body1">
            <li>
              <strong>📖 Lire :</strong> Explorez une vaste bibliothèque de
              récits, du roman d’aventure au thriller palpitant.
            </li>
            <li>
              <strong>✍️ Écrire :</strong> Publiez vos propres histoires et
              laissez libre cours à votre imagination.
            </li>
            <li>
              <strong>⭐ Partager :</strong> Recevez des commentaires et
              partagez vos écrits avec le monde entier.
            </li>
          </ul>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <h4 class="text-weight-bold text-primary">
            Pourquoi rejoindre Fumbo ?
          </h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-card flat bordered class="feature-card">
                <q-icon name="favorite" color="red" size="lg" />
                <q-card-section>
                  <div class="text-subtitle1 text-weight-bold">
                    Une communauté passionnée
                  </div>
                  <p class="text-caption text-grey">
                    Rejoignez une communauté d’écrivains et de lecteurs engagés
                    qui partagent votre amour des histoires.
                  </p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat bordered class="feature-card">
                <q-icon name="lightbulb" color="yellow" size="lg" />
                <q-card-section>
                  <div class="text-subtitle1 text-weight-bold">
                    Exprimez votre créativité
                  </div>
                  <p class="text-caption text-grey">
                    Donnez vie à vos idées, expérimentez de nouveaux genres et
                    affinez votre style d’écriture.
                  </p>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat bordered class="feature-card">
                <q-icon name="people" color="blue" size="lg" />
                <q-card-section>
                  <div class="text-subtitle1 text-weight-bold">
                    Des échanges enrichissants
                  </div>
                  <p class="text-caption text-grey">
                    Recevez des retours constructifs, interagissez avec d'autres
                    écrivains et bâtissez votre audience.
                  </p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-layout>
</template>

<style scoped>
/* --- BANNIÈRE --- */
.banner-container {
  width: 100%;
  height: 300px;
  position: relative;
}
.banner-image {
  height: 100%;
  object-fit: cover;
}
.banner-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
}

/* --- CONTENU --- */
.content-card {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

/* --- LISTE --- */
ul {
  padding-left: 20px;
}
ul li {
  margin-bottom: 10px;
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
</style>
