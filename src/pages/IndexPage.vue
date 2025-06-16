<template>
<<<<<<< HEAD
  <q-layout view="hHh lpR fFf">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    />

    <Navbar />
    <q-separator spaced />
=======
  <!-- <q-layout view="hHh lpR fFf">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    /> -->
 <div class="cairn-style">
    <app-header2 />
    
    <q-page class="home-page">
>>>>>>> 65c46fb (commit suite)

    <!-- HERO SECTION IMMERSIVE -->
    <section class="hero-section">
      <q-parallax :height="10" :speed="0.5" class="hero-parallax">
        <template v-slot:media
          ><br /><br />
          <q-img src="/img/hero-about.jpg" class="hero-image" />
        </template>

        <div class="hero-content text-center">
          <br /><br />
          <h1 class="hero-title animate__animated animate__fadeInDown text-white">
            Fumbo - L'Âme des Histoires Africaines
          </h1>
          <p class="hero-subtitle animate__animated animate__fadeIn animate__delay-1s">
            La plateforme où la tradition orale rencontre l'innovation numérique
          </p>
          <q-btn
            color="primary"
            label="Explorer"
            size="lg"
            class="q-mx-sm hero-btn"
            to="/explorer"
          />
          <q-btn outline color="black" label="Voir la démo" size="lg" class="q-mx-sm hero-btn" />
        </div>
      </q-parallax>
    </section>

    <!-- SECTION VALEURS AVEC ICÔNES ANIMÉES -->
    <section class="values-section q-py-xl">
      <div class="container">
        <div class="section-header text-center">
          <q-icon name="star" color="primary" size="md" class="section-icon" />
          <h2 class="section-title">Nos Valeurs</h2>
          <p class="section-subtitle">Ce qui fait de Fumbo une plateforme unique</p>
        </div>

        <div class="row q-col-gutter-xl q-mt-lg">
          <div class="col-12 col-md-4">
            <div class="value-card">
              <div class="value-icon animate__animated animate__pulse animate__infinite">
                <q-icon name="public" color="primary" size="xl" />
              </div>
              <h3 class="value-title">Patrimoine Culturel</h3>
              <p class="value-description">
                Nous préservons et célébrons la richesse des traditions narratives africaines à
                travers les générations.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="value-card">
              <div
                class="value-icon animate__animated animate__pulse animate__infinite animate__delay-1s"
              >
                <q-icon name="mic" color="primary" size="xl" />
              </div>
              <h3 class="value-title">Voix Diversifiées</h3>
              <p class="value-description">
                Une plateforme pour toutes les voix africaines, des conteurs traditionnels aux
                auteurs contemporains.
              </p>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="value-card">
              <div
                class="value-icon animate__animated animate__pulse animate__infinite animate__delay-2s"
              >
                <q-icon name="monetization_on" color="primary" size="xl" />
              </div>
              <h3 class="value-title">Autonomisation</h3>
              <p class="value-description">
                Nous permettons aux créateurs de monétiser leur talent tout en partageant leur
                culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION FONCTIONNALITÉS AVEC EFFET DE SURVOL -->
    <section class="features-section q-py-xl bg-grey-1">
      <div class="container">
        <div class="section-header text-center">
          <q-icon name="widgets" color="primary" size="md" class="section-icon" />
          <h2 class="section-title">Nos Fonctionnalités</h2>
          <p class="section-subtitle">Découvrez ce que Fumbo vous offre</p>
        </div>

        <div class="row q-col-gutter-lg q-mt-md">
          <div class="col-12 col-md-6">
            <q-card class="feature-card hover-zoom">
              <q-img src="/img/feature-library.jpg" ratio="6" />
              <q-card-section>
                <h3 class="feature-title">Bibliothèque Africaine</h3>
                <p>
                  Explorez des milliers d'ouvrages, des classiques aux nouvelles publications, tous
                  centrés sur les cultures africaines.
                </p>
                <q-btn
                  flat
                  color="primary"
                  label="Explorer"
                  icon-right="arrow_forward"
                  class="q-mt-sm"
                  to="/ouvrage"
                />
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="feature-card hover-zoom">
              <q-img src="/img/feature-podcast.jpg" ratio="6" />
              <q-card-section>
                <h3 class="feature-title">Podcasts Narratifs</h3>
                <p>
                  Écoutez des histoires contées par des voix captivantes, disponibles dans plusieurs
                  langues africaines.
                </p>
                <q-btn
                  flat
                  color="primary"
                  label="Écouter"
                  icon-right="arrow_forward"
                  class="q-mt-sm"
                  to="/ecouter"
                />
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="feature-card hover-zoom">
              <q-img src="/img/feature-write.jpg" ratio="6" />
              <q-card-section>
                <h3 class="feature-title">Plateforme d'Écriture</h3>
                <p>
                  Écrivez et publiez vos œuvres avec notre éditeur intuitif et bénéficiez de retours
                  de la communauté.
                </p>
                <q-btn
                  flat
                  color="primary"
                  label="Commencer"
                  icon-right="arrow_forward"
                  class="q-mt-sm"
                  to="/connection"
                />
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="feature-card hover-zoom">
              <q-img src="/img/feature-monetize.jpg" class="col-2" ratio="6" />
              <q-card-section>
                <h3 class="feature-title">Publier</h3>
                <p>
                  Publier vos ouvrages et gagnez de l'argent via notre système intégré de
                  micro-paiements et abonnements.
                </p>
                <q-btn
                  flat
                  color="primary"
                  label="En savoir plus"
                  icon-right="arrow_forward"
                  class="q-mt-sm"
                  to="connection"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION TÉMOIGNAGES ÉLÉGANTS - Version corrigée -->
    <section class="testimonials-section q-py-xl">
      <div class="container">
        <div class="section-header text-center">
          <q-icon name="format_quote" color="primary" size="md" class="section-icon" />
          <h2 class="section-title">Ils parlent de nous</h2>
          <p class="section-subtitle">Découvrez ce que notre communauté pense de Fumbo</p>
        </div>

        <q-carousel
          v-model="currentSlide"
          swipeable
          animated
          arrows
          infinite
          control-color="primary"
          class="testimonial-carousel q-mt-lg"
          height="400px"
        >
          <!-- Témoignage 1 -->
          <q-carousel-slide :name="1" class="column no-wrap flex-center">
            <div class="testimonial-item text-center">
              <q-avatar size="100px" class="testimonial-avatar q-mb-md">
                <img src="/img/testimonial1.jpg" />
              </q-avatar>
              <div class="testimonial-content q-px-md">
                <q-icon name="format_quote" color="grey-4" size="md" class="quote-icon q-mb-sm" />
                <p class="testimonial-text">
                  "Fumbo a révolutionné ma façon de partager mes histoires. En tant que conteur
                  traditionnel, pouvoir enregistrer mes récits et les monétiser tout en préservant
                  notre culture est un rêve devenu réalité."
                </p>
                <div class="testimonial-author text-primary q-mt-md">Thierry Nirere, Goma</div>
              </div>
            </div>
          </q-carousel-slide>

          <!-- Témoignage 2 -->
          <q-carousel-slide :name="2" class="column no-wrap flex-center">
            <div class="testimonial-item text-center">
              <q-avatar size="100px" class="testimonial-avatar q-mb-md">
                <img src="/img/testimonial2.jpg" />
              </q-avatar>
              <div class="testimonial-content q-px-md">
                <q-icon name="format_quote" color="grey-4" size="md" class="quote-icon q-mb-sm" />
                <p class="testimonial-text">
                  "J'ai publié mon premier roman sur Fumbo et j'ai été impressionnée par la qualité
                  des retours et l'engagement de la communauté. La plateforme de monétisation m'a
                  permis de gagner mes premiers revenus en tant qu'auteure."
                </p>
                <div class="testimonial-author text-primary q-mt-md">Hervé Bamba, Bukavu</div>
              </div>
            </div>
          </q-carousel-slide>

          <!-- Témoignage 3 -->
          <q-carousel-slide :name="3" class="column no-wrap flex-center">
            <div class="testimonial-item text-center">
              <q-avatar size="100px" class="testimonial-avatar q-mb-md">
                <img src="/img/testimonial3.jpg" />
              </q-avatar>
              <div class="testimonial-content q-px-md">
                <q-icon name="format_quote" color="grey-4" size="md" class="quote-icon q-mb-sm" />
                <p class="testimonial-text">
                  "En tant qu'éditeur, Fumbo nous offre une vitrine exceptionnelle pour découvrir de
                  nouveaux talents africains. La qualité des œuvres et la diversité des voix sont
                  remarquables."
                </p>
                <div class="testimonial-author text-primary q-mt-md">Josue Sapala, Butembo</div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </section>

    <!-- SECTION CTA FINALE -->
    <section class="final-cta q-py-xl text-center text-black">
      <div class="container">
        <h2 class="cta-title">Prêt à rejoindre l'aventure Fumbo ?</h2>
        <p class="cta-subtitle q-mt-md">
          Que vous soyez lecteur, auditeur ou créateur, Fumbo a quelque chose pour vous.
        </p>
        <div class="cta-actions q-mt-xl">
          <q-btn
            color="white"
            text-color="primary"
            label="S'inscrire gratuitement"
            size="lg"
            class="q-mx-sm"
            to="/connection"
          />
          <q-btn
            outline
            color="white"
            label="Voir les tarifs"
            size="lg"
            class="q-mx-sm"
            to="/tarifs"
          />
        </div>
      </div>
    </section>
   
    </q-page>
     <app-footer2/>
  </div>
  <!-- </q-layout> -->
</template>

<script setup>
import { ref } from 'vue'
import AppHeader2 from '../components/AppHeader2.vue'
import AppFooter2 from '../components/AppFooter2.vue'


// Gestion du carousel
const currentSlide = ref(1)
</script>

<style scoped>
.cairn-style {
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}
.home-background {
  min-height: 100vh;
  background: rgb(185, 208, 239); /* ou le même background que HomePage.vue */
}
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
/* HERO SECTION */
.hero-section {
  position: relative;
}

.hero-parallax {
  height: 100vh;
  min-height: 600px;
}

.hero-image {
  filter: brightness(0.7);
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 900px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 40px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-btn {
  border-radius: 50px;
  padding: 12px;
  font-weight: 600;
}

/* VALUES SECTION */
.values-section {
  background: rgb(185, 208, 239);
}

.section-header {
  margin-bottom: 60px;
}

.section-icon {
  margin-bottom: 20px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--q-dark);
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--q-secondary);
}

.value-card {
  text-align: center;
  padding: 40px 30px;
  border-radius: 16px;
  transition: all 0.3s ease;
  height: 100%;
  background: white;
  box-shadow: 0 5px 15px rgba(189, 218, 242, 0.05);
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.value-icon {
  margin-bottom: 20px;
}

.value-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--q-dark);
}

.value-description {
  font-size: 1rem;
  color: var(--q-secondary);
}

/* FEATURES SECTION */
.feature-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background: rgb(185, 208, 239);
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--q-dark);
}

.hover-zoom:hover {
  transform: scale(1.03);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

/* Styles corrigés pour la section témoignages */
.testimonials-section {
  background-color: #f8f9fa;
}

.testimonial-carousel {
  max-width: 800px;
  margin: 0 auto;
}

.testimonial-item {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.testimonial-avatar {
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.testimonial-content {
  position: relative;
}

.quote-icon {
  opacity: 0.2;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  font-style: italic;
  color: #555;
  margin-bottom: 20px;
}

.testimonial-author {
  font-weight: 600;
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonial-carousel {
    height: 450px;
  }

  .testimonial-text {
    font-size: 1rem;
  }
}

/* FINAL CTA */
.final-cta {
  padding: 100px 0;
  background: rgb(185, 208, 239);
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.cta-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
}


/* RESPONSIVE */
@media (max-width: 992px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .testimonial-item {
    padding: 0 10%;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .testimonial-item {
    padding: 0 5%;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .testimonial-carousel {
    height: 400px;
  }
}
@media (max-width: 1023px) {
  .home-page {
    padding: 15px;
  }

  .section-title {
    font-size: 1.3rem !important;
  }
}

@media (max-width: 599px) {
  .home-page {
    padding: 10px;
  }

  .article-item {
    padding: 12px !important;

    .article-title {
      font-size: 1rem !important;
    }
  }

  .view-btn {
    display: none !important;
  }
}
</style>
