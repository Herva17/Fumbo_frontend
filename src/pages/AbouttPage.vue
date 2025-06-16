<template>
  <HeaderPrincipal/>
  <q-page class="q-pa-md about-page">
    <div class="row justify-center">
      <div class="col-12 col-md-9">
        <q-card class="q-pa-md about-card">
          <q-card-section>
            <h1 class="text-h4 q-mb-md text-primary">À propos de notre plateforme</h1>

            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="left"
              narrow-indicator
            >
              <q-tab name="histoire" label="Notre histoire" />

              <q-tab name="team" label="Notre équipe" />
              <q-tab name="team2" label="Rejoindre notre équipe" />
              <q-tab name="partners" label="Partenaires" />
            </q-tabs>

            <q-separator class="q-my-md" />

            <q-tab-panels v-model="tab" animated>
              <!-- Notre histoire -->
              <q-tab-panel name="histoire">
                <div class="q-pa-md">
                  <h2 class="text-h5 q-mt-none text-primary">
                    <q-icon name="history" class="q-mr-sm" /> Notre histoire
                  </h2>

                  <!-- Origines -->
                  <div class="q-mt-md">
                    <h3 class="text-subtitle1 text-bold text-secondary">
                      <q-icon name="flag" class="q-mr-sm" /> Les débuts
                    </h3>
                    <p>
                      Fondée en 2005 par un collectif de chercheurs passionnés, la plateforme
                      <strong>H-FUMBO</strong> est née de la volonté de rendre la recherche en
                      sciences humaines et sociales accessible à tous. L’objectif initial était
                      clair : combler le fossé entre la recherche académique et le grand public, en
                      particulier sur le continent africain.
                    </p>
                  </div>

                  <!-- Mission et engagement -->
                  <div class="q-mt-md">
                    <h3 class="text-subtitle1 text-bold text-secondary">
                      <q-icon name="emoji_objects" class="q-mr-sm" /> Notre mission
                    </h3>
                    <p>Nous nous engageons à :</p>
                    <ul class="q-pl-md">
                      <li>
                        <q-icon name="check_circle" color="primary" class="q-mr-sm" /> Favoriser
                        l’accès libre à la connaissance scientifique.
                      </li>
                      <li>
                        <q-icon name="check_circle" color="primary" class="q-mr-sm" /> Soutenir les
                        publications de chercheurs africains.
                      </li>
                      <li>
                        <q-icon name="check_circle" color="primary" class="q-mr-sm" /> Encourager
                        les collaborations entre universités, éditeurs et institutions.
                      </li>
                    </ul>
                  </div>

                  <!-- Évolution de la plateforme -->
                  <div class="q-mt-md">
                    <h3 class="text-subtitle1 text-bold text-secondary">
                      <q-icon name="timeline" class="q-mr-sm" /> Évolution technologique
                    </h3>
                    <p>
                      Grâce à une équipe pluridisciplinaire et des partenariats solides, nous avons
                      su développer :
                    </p>
                    <ul class="q-pl-md">
                      <li>
                        <q-icon name="book" color="primary" class="q-mr-sm" /> Une base de données
                        d’ouvrages, revues et articles multilingues.
                      </li>
                      <li>
                        <q-icon name="search" color="primary" class="q-mr-sm" /> Un moteur de
                        recherche avancé pour accéder rapidement aux contenus.
                      </li>
                      <li>
                        <q-icon name="cloud_download" color="primary" class="q-mr-sm" /> Des options
                        de téléchargement et de consultation en ligne.
                      </li>
                    </ul>
                  </div>

                  <!-- Impact et communauté -->
                  <div class="q-mt-md">
                    <h3 class="text-subtitle1 text-bold text-secondary">
                      <q-icon name="public" class="q-mr-sm" /> Un impact croissant
                    </h3>
                    <p>
                      Aujourd’hui, <strong>H-FUMBO</strong> est un acteur incontournable de la
                      diffusion scientifique francophone en Afrique :
                    </p>
                    <ul class="q-pl-md">
                      <li>
                        <q-icon name="group" color="primary" class="q-mr-sm" /> Une communauté
                        active de chercheurs, étudiants et bibliothécaires.
                      </li>
                      <li>
                        <q-icon name="sync_alt" color="primary" class="q-mr-sm" /> Des échanges
                        constants avec des universités et centres de recherche.
                      </li>
                      <li>
                        <q-icon name="lightbulb" color="primary" class="q-mr-sm" /> Une plateforme
                        qui évolue en continu pour s’adapter aux besoins des utilisateurs.
                      </li>
                    </ul>
                  </div>

                  <!-- Vision future -->
                  <div class="q-mt-md">
                    <h3 class="text-subtitle1 text-bold text-secondary">
                      <q-icon name="visibility" class="q-mr-sm" /> Notre vision
                    </h3>
                    <p>
                      Nous aspirons à devenir la principale référence numérique pour la gestion et
                      la diffusion des connaissances scientifiques africaines à l’échelle mondiale.
                      À travers l’innovation, la collaboration et l’inclusion, H-FUMBO continuera à
                      grandir pour répondre aux défis de demain.
                    </p>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Notre équipe -->
              <q-tab-panel name="team">
                <h2 class="text-h5 q-mt-none text-primary">
                  Les personnes talentueuses qui contribuent à notre réussite
                </h2>
                <div class="row q-col-gutter-md q-mt-md">
                  <div class="col-12 col-sm-6 col-md-4" v-for="member in team" :key="member.name">
                    <q-card class="team-card">
                      <q-card-section horizontal>
                        <q-avatar size="90px" class="q-mr-md">
                          <img :src="member.avatar" />
                        </q-avatar>
                        <q-card-section>
                          <div class="text-h6 q-mb-xs">{{ member.name }}</div>
                          <div class="text-subtitle2 text-primary q-mb-xs">
                            {{ member.position }}
                          </div>
                          <div class="text-caption q-mb-sm">{{ member.bio }}</div>
                          <div class="team-links">
                            <q-btn
                              v-if="member.linkedin"
                              flat
                              dense
                              round
                              icon="fab fa-linkedin"
                              :href="member.linkedin"
                              target="_blank"
                              color="blue-10"
                              class="q-mr-xs"
                              aria-label="LinkedIn"
                            />
                            <q-btn
                              v-if="member.github"
                              flat
                              dense
                              round
                              icon="fab fa-github"
                              :href="member.github"
                              target="_blank"
                              class="q-mr-xs"
                              aria-label="GitHub"
                            />
                            <q-btn
                              v-if="member.twitter"
                              flat
                              dense
                              round
                              icon="fab fa-x-twitter"
                              :href="member.twitter"
                              target="_blank"
                              aria-label="Twitter"
                            />
                          </div>
                        </q-card-section>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Rejoindre notre équipe -->
              <q-tab-panel name="team2">
                <h2 class="text-h5 q-mt-none text-primary">Rejoindre notre équipe</h2>
                <div class="form-section">
                  <div class="form-container">
                    <h3 class="form-title">Candidature spontanée</h3>
                    <form @submit.prevent="submitForm">
                      <div class="form-group">
                        <label for="nom">Nom complet</label>
                        <input
                          type="text"
                          id="nom"
                          v-model="nom"
                          required
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div class="form-group">
                        <label for="email">Adresse email</label>
                        <input
                          type="email"
                          id="email"
                          v-model="email"
                          required
                          placeholder="exemple@email.com"
                        />
                      </div>
                      <div class="form-group">
                        <label for="poste">Poste souhaité</label>
                        <select id="poste" v-model="poste" required>
                          <option disabled value="">-- Sélectionnez un poste --</option>
                          <option value="developpement">Développement</option>
                          <option value="design">Design</option>
                          <option value="marketing">Marketing</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                      <div class="form-group" v-if="poste === 'autre'">
                        <label for="autrePoste">Précisez le poste</label>
                        <input
                          type="text"
                          id="autrePoste"
                          v-model="autrePoste"
                          required
                          placeholder="Votre poste"
                        />
                      </div>
                      <div class="form-group">
                        <label for="message">Message</label>
                        <textarea
                          id="message"
                          v-model="message"
                          rows="4"
                          placeholder="Présentez-vous et expliquez pourquoi vous souhaitez rejoindre l'équipe..."
                          required
                        ></textarea>
                      </div>
                      <button type="submit" class="submit-btn">Envoyer ma candidature</button>
                    </form>
                  </div>
                </div>
              </q-tab-panel>

              <!-- Partenaires -->
              <q-tab-panel name="partners">
                <h2 class="text-h5 q-mt-none text-primary">Nos partenaires</h2>
                <div class="row q-col-gutter-md justify-center q-mt-md">
                  <div
                    class="col-6 col-sm-4 col-md-3"
                    v-for="partner in partners"
                    :key="partner.name"
                  >
                    <q-img :src="partner.logo" :ratio="16 / 9" contain />
                    <div class="text-center q-mt-sm">{{ partner.name }}</div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <AppFooter />
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import HeaderPrincipal from '../components/HeaderPrincipal.vue'
export default {
  components:{
AppFooter,
HeaderPrincipal
  },
  data() {
    return {
      tab: 'mission',
      nom: '',
      email: '',
      poste: '',
      autrePoste: '',
      message: '',
      team: [
        {
          name: 'Josue SAPALA',
          position: 'Directeur éditorial',
          bio: 'Docteur en sociologie, ancien rédacteur en chef de plusieurs revues scientifiques.',
          avatar: '/img/avatar2.jpeg',
          linkedin: 'https://www.linkedin.com/in/josuesapala',
          github: 'https://github.com/josuesapala',
          twitter: 'https://twitter.com/josuesapala',
        },
        {
          name: 'Thierry NIRERE',
          position: 'Responsable technique',
          bio: 'Ingénieur en informatique, spécialisé dans les plateformes de diffusion scientifique.',
          avatar: '/img/avatar1.png',
          linkedin: 'https://www.linkedin.com/in/thierrynirere',
          github: 'https://github.com/thierrynirere',
          twitter: '#',
        },
        {
          name: 'Hervey BAMBA',
          position: 'Éditeur scientifique',
          bio: 'Docteur en histoire, chargé des relations avec les éditeurs partenaires.',
          avatar: '/img/avatar3.jpeg',
          linkedin: '#',
          github: '#',
          twitter: '#',
        },
        {
          name: 'Hervey IRAGI',
          position: 'Chargé de communication',
          bio: 'Spécialiste en communication scientifique et gestion des réseaux sociaux.',
          avatar: '/img/profil0.jpg',
          linkedin: 'https://www.linkedin.com/in/herveyiragi',
          github: 'https://github.com/herveyiragi',
          twitter: 'https://twitter.com/herveyiragi',
        },
      ],
      partners: [
        {
          name: 'France Services',
          logo: 'https://th.bing.com/th/id/R.04c9f21878e7a812a28eaed96dd67174?rik=pqQfOnI2CHReZw&pid=ImgRaw&r=0',
        },
        {
          name: 'Presses Gouvernement',
          logo: 'https://th.bing.com/th/id/OIP.ZJPwRWGqvw8mbQQ_UvUIcAHaEK?rs=1&pid=ImgDetMain',
        },
        {
          name: 'UNICEF',
          logo: 'https://th.bing.com/th/id/OIP.J2t3NYAP3p5-UjFTp5BjMgHaEK?w=1920&h=1080&rs=1&pid=ImgDetMain',
        },
        {
          name: 'Ministère de la Recherche',
          logo: 'https://th.bing.com/th/id/R.5d4927e15fd1c6b9e24e63116c039766?rik=hz50Y9u%2f8Ufcdg&pid=ImgRaw&r=0',
        },
      ],
    }
  },
  methods: {
    submitForm() {
      // Ici on pourra ajouter la logique d'envoi (API, email, etc.)
      this.$q.notify({
        color: 'positive',
        message: 'Votre candidature a bien été envoyée !',
        icon: 'check_circle',
      })
      this.nom = ''
      this.email = ''
      this.poste = ''
      this.autrePoste = ''
      this.message = ''
    },
  },
}
</script>

<style scoped>
.about-page {
  background: #f5f7fa;
  min-height: 100vh;
}
.about-card {
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  background: #fff;
}

.team-card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  background: #f9fafb;
  min-height: 180px;
}
.team-links {
  margin-top: 8px;
}

.form-section {
  padding: 40px 0 0 0;
  background-color: #f9fafb;
}
.form-container {
  background: white;
  padding: 30px 24px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
  max-width: 500px;
  margin: 0 auto;
}
.form-title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #0c4a6e;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 18px;
}
.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #334155;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 15px;
  background: #f8fafc;
  resize: none;
}
.form-group textarea {
  min-height: 80px;
}
.submit-btn {
  display: block;
  background-color: #0284c7;
  color: white;
  font-weight: bold;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}
.submit-btn:hover {
  background-color: #0369a1;
}
@media (max-width: 1023px) {
  .about-card {
    padding: 0 !important;
  }
  .form-container {
    padding: 18px 8px;
  }
}
@media (max-width: 599px) {
  .about-card {
    padding: 0 !important;
  }
  .form-container {
    padding: 10px 2px;
  }
}
</style>
