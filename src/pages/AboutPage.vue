<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER ÉLÉGANT -->
    <q-header elevated class="bg-white text-black shadow-sm header-transparent">
      <q-toolbar>
        <q-toolbar-title class="text-weight-bold">
          <q-img src="/img/logo.png" style="height: 40px" />
        </q-toolbar-title>
        <q-space />
        <div class="nav-links">
          <q-btn flat label="Accueil" to="/" class="nav-link" />
          <q-btn flat label="Ouvrages" to="/ouvrages" class="nav-link" />
          <q-btn flat label="Podcasts" to="/podcasts" class="nav-link" />
          <q-btn flat label="Écrire" to="/ecrire" class="nav-link" />
          <q-btn flat label="Publier" to="/publier" class="nav-link" />
          <q-btn
            unelevated
            color="primary"
            label="S'inscrire"
            class="q-ml-md signup-btn"
            to="/inscription"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- HERO SECTION IMMERSIVE -->
    <section class="hero-section">
      <q-parallax :height="10" :speed="0.5" class="hero-parallax">
        <template v-slot:media>
          <q-img src="/img/hero-about.jpg" class="hero-image" />
        </template>

        <div class="hero-content text-center">
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
                />
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card class="feature-card hover-zoom">
              <q-img src="/img/feature-monetize.jpg" class="col-2" ratio="6" />
              <q-card-section>
                <h3 class="feature-title">Monétisation</h3>
                <p>
                  Gagnez de l'argent grâce à vos créations via notre système intégré de
                  micro-paiements et abonnements.
                </p>
                <q-btn
                  flat
                  color="primary"
                  label="En savoir plus"
                  icon-right="arrow_forward"
                  class="q-mt-sm"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION TÉMOIGNAGES ÉLÉGANTS -->
    <section class="testimonials-section q-py-xl">
      <div class="container">
        <div class="section-header text-center">
          <q-icon name="format_quote" color="primary" size="md" class="section-icon" />
          <h2 class="section-title">Ils parlent de nous</h2>
          <p class="section-subtitle">Découvrez ce que notre communauté pense de Fumbo</p>
        </div>

        <q-carousel
          v-model="slide"
          swipeable
          animated
          arrows
          infinite
          control-color="primary"
          class="testimonial-carousel q-mt-lg"
        >
          <q-carousel-slide :name="1" class="column no-wrap">
            <div class="testimonial-item">
              <q-avatar size="80px" class="testimonial-avatar">
                <img src="/img/testimonial1.jpg" />
              </q-avatar>
              <div class="testimonial-content">
                <q-icon name="format_quote" color="grey-4" size="md" class="quote-icon" />
                <p class="testimonial-text">
                  Fumbo a révolutionné ma façon de partager mes histoires. En tant que conteur
                  traditionnel, pouvoir enregistrer mes récits et les monétiser tout en préservant
                  notre culture est un rêve devenu réalité.
                </p>
                <div class="testimonial-author">Thierry Nirere, Goma</div>
              </div>
            </div>
          </q-carousel-slide>

          <q-carousel-slide :name="2" class="column no-wrap">
            <div class="testimonial-item">
              <q-avatar size="80px" class="testimonial-avatar">
                <img src="/img/testimonial2.jpg" />
              </q-avatar>
              <div class="testimonial-content">
                <q-icon name="format_quote" color="grey-4" size="md" class="quote-icon" />
                <p class="testimonial-text">
                  J'ai publié mon premier roman sur Fumbo et j'ai été impressionnée par la qualité
                  des retours et l'engagement de la communauté. La plateforme de monétisation m'a
                  permis de gagner mes premiers revenus en tant qu'auteure.
                </p>
                <div class="testimonial-author">Hervé Bamba, Bukavu</div>
              </div>
            </div>
          </q-carousel-slide>

          <q-carousel-slide :name="3" class="column no-wrap">
            <div class="testimonial-item">
              <q-avatar size="80px" class="testimonial-avatar">
                <img src="/img/testimonial3.jpg" />
              </q-avatar>
              <div class="testimonial-content">
                <q-icon name="format_quote" color="grey-4" size="md" class="quote-icon" />
                <p class="testimonial-text">
                  En tant qu'éditeur, Fumbo nous offre une vitrine exceptionnelle pour découvrir de
                  nouveaux talents africains. La qualité des œuvres et la diversité des voix sont
                  remarquables.
                </p>
                <div class="testimonial-author">Josue Sapala, Butembo</div>
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
            to="/inscription"
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
    <section class="info-section">
      <div class="column">
        <h3 class="section-title">À PROPOS DE <span class="highlight">FUMBO</span></h3>
        <ul>
          <li><q-icon name="person" class="icon" /> Personnel</li>
          <span>
            <router-link to="/Po" class="flex items-center space-x-2 mt-4">
              <li><q-icon name="shield" class="icon" /> Politique de confidentialité</li>
            </router-link>
          </span>
          <span>
            <router-link to="Ml" class="flex items-center space-x-2 mt-4">
              <li><q-icon name="gavel" class="icon" /> Code d’éthique et de conduite</li>
            </router-link>
          </span>
        </ul>
      </div>
      <div class="column">
        <h3 class="section-title">PARTAGEZ VOTRE <span class="highlight">HISTOIRE</span></h3>
        <ul>
          <li>
            <q-icon name="lightbulb" class="icon" /> Conseils et astuces pour partager une histoire
          </li>
          <li><q-icon name="send" class="icon" /> Soumettre vos données personnelles</li>
        </ul>
      </div>
      <div class="column contact">
        <h3 class="section-title">FUMBO</h3>
        <p class="address">
          103, av Carmel, Q. Katindo <br />
          Goma, RDC
        </p>
        <div class="social-icons">
          <q-btn flat round icon="fab fa-facebook" class="social-btn facebook" />
          <q-btn flat round icon="fab fa-instagram" class="social-btn instagram" />
          <q-btn flat round icon="fab fa-youtube" class="social-btn youtube" />
          <q-btn flat round icon="fab fa-linkedin" class="social-btn linkedin" />
        </div>
      </div>
    </section>
  </q-layout>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      slide: 1,
      email: '',
      exploreLinks: [
        { text: 'Ouvrages', to: '/ouvrages' },
        { text: 'Podcasts', to: '/podcasts' },
        { text: 'Auteurs', to: '/auteurs' },
        { text: 'Genres', to: '/genres' },
        { text: 'Nouveautés', to: '/nouveautes' },
      ],
      creatorLinks: [
        { text: 'Devenir créateur', to: '/devenir-createur' },
        { text: 'Monétisation', to: '/monetisation' },
        { text: 'Ressources', to: '/ressources' },
        { text: 'Communauté', to: '/communaute' },
        { text: 'FAQ', to: '/faq' },
      ],
    }
  },
}
</script>

<style scoped>
/* HEADER TRANSPARENT */
.header-transparent {
  background-color: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.header-transparent .nav-link {
  position: relative;
  margin: 0 8px;
}

.header-transparent .nav-link:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--q-primary);
  transition: width 0.3s ease;
}

.header-transparent .nav-link:hover:after {
  width: 100%;
}

.signup-btn {
  border-radius: 50px;
  padding: 8px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

/* TESTIMONIALS SECTION */
.testimonial-carousel {
  height: 350px;
}

.testimonial-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 20%;
}

.testimonial-avatar {
  margin-bottom: 20px;
  border: 4px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.testimonial-content {
  position: relative;
  text-align: center;
}

.quote-icon {
  opacity: 0.2;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
}

.testimonial-text {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
  font-style: italic;
}

.testimonial-author {
  font-weight: 600;
  color: var(--q-primary);
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
/* footer */
.info-section {
  display: flex;
  justify-content: space-around;
  background: #1a1a1a;
  color: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  margin-top: 50px;
}
.section-title {
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: bold;
}
.highlight {
  color: #ffcc00;
}
ul {
  list-style: none;
  padding: 0;
}
ul li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.9rem;
}
.icon {
  margin-right: 8px;
  color: #ffcc00;
}
.contact .address {
  font-size: 0.9rem;
  margin-bottom: 15px;
}
.social-icons {
  display: flex;
  gap: 10px;
}
.social-btn {
  font-size: 1.2rem;
  background: transparent;
  color: #fff;
  transition: 0.3s;
}
.social-btn:hover {
  transform: scale(1.2);
}
.facebook:hover {
  color: #3b5998;
}
.instagram:hover {
  color: #e4405f;
}
.youtube:hover {
  color: #ff0000;
}
.linkedin:hover {
  color: #0077b5;
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
</style>
