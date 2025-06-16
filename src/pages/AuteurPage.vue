<template>
  <BackButton />
  <q-page class="q-pa-md container">
    <!-- Présentation générale -->
    <div class="header-section section-bg-header">
      <h2 class="section-title">
        <q-icon name="person" color="primary" class="q-mr-sm" />
        Auteurs
      </h2>
      <p class="section-description">
        La plateforme H-FUMBO accompagne les auteurs dans la valorisation de leurs travaux scientifiques, la diffusion de leurs publications et le développement de leur réseau professionnel.
      </p>
    </div>

    <!-- Services pour les auteurs & Responsables -->
    <div class="row q-col-gutter-xl q-mb-xl section-bg-list">
      <!-- Services offerts -->
      <div class="col-12 col-md-7">
        <q-card class="services-card">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="star" class="q-mr-sm" /> Services offerts aux auteurs
            </div>
            <div class="row q-col-gutter-md">
              <div v-for="service in services" :key="service.title" class="col-12 col-sm-6">
                <div class="service-item">
                  <q-icon :name="service.icon" color="primary" size="md" class="q-mr-sm" />
                  <div>
                    <div class="service-title">{{ service.title }}</div>
                    <div class="service-desc">{{ service.desc }}</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- Responsables -->
      <div class="col-12 col-md-5">
        <q-card class="contact-card">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="support_agent" class="q-mr-sm" /> Responsables auteurs
            </div>
            <div v-for="resp in responsables" :key="resp.name" class="responsable-item row no-wrap q-mb-md">
              <div class="col-auto">
                <div class="contact-label">Votre contact</div>
                <q-avatar size="70px" class="contact-avatar">
                  <img :src="resp.avatar" />
                </q-avatar>
              </div>
              <div class="col q-ml-md">
                <div class="resp-name">{{ resp.name }}</div>
                <div class="resp-poste">{{ resp.poste }}</div>
                <div class="resp-links q-mt-xs">
                  <q-btn
                    v-if="resp.linkedin"
                    flat
                    dense
                    round
                    icon="fab fa-linkedin"
                    :href="resp.linkedin"
                    target="_blank"
                    color="primary"
                    aria-label="LinkedIn"
                  />
                  <q-btn
                    v-if="resp.mail"
                    flat
                    dense
                    round
                    icon="mail"
                    :href="`mailto:${resp.mail}`"
                    color="deep-orange"
                    aria-label="Mail"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Liste des auteurs -->
    <div class="authors-section section-bg-list q-mb-xl">
      <div class="row items-center q-mb-lg">
        <div class="col">
          <div class="text-h6 text-primary">
            <q-icon name="group" class="q-mr-sm" /> Nos auteurs
          </div>
        </div>
        <div class="col-auto">
          <div class="authors-count-card section-bg-count">
            <span class="count-number">{{ authors.length }}</span>
            <span class="count-label">AUTEURS</span>
          </div>
        </div>
      </div>
      <div class="row q-col-gutter-lg">
        <div
          v-for="author in authors"
          :key="author.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <q-card class="author-card">
            <q-img
              :src="author.avatar"
              :alt="author.name"
              class="author-img"

              ratio="16/9"
            />
            <q-card-section>
              <div class="author-name text-h6">{{ author.name }}</div>
              <div class="author-meta text-caption text-grey-7 q-mb-xs">
                <span v-if="author.age">Âge : {{ author.age }} ans</span>
                <span v-if="author.nationalite"> | {{ author.nationalite }}</span>
                <span v-if="author.langue"> | {{ author.langue }}</span>
              </div>
              <div class="author-domain text-primary q-mb-xs">
                {{ author.domain }}
              </div>
              <div class="author-desc">{{ author.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import BackButton from '../components/BackButton.vue'
export default {
  components: {
    BackButton
  },
  name: 'AuteurPage',
  data () {
    return {
      services: [
        {
          title: 'Diffusion internationale',
          icon: 'public',
          desc: 'Vos travaux sont accessibles à un large public scientifique et institutionnel.'
        },
        {
          title: 'Gestion de profil',
          icon: 'person',
          desc: 'Un espace personnel pour gérer vos publications et votre visibilité.'
        },
        {
          title: 'Accompagnement éditorial',
          icon: 'school',
          desc: 'Support pour la préparation, la relecture et la valorisation de vos articles.'
        },
        {
          title: 'Statistiques avancées',
          icon: 'bar_chart',
          desc: 'Suivi détaillé de l’impact et des consultations de vos publications.'
        }
      ],
      responsables: [
        {
          name: 'Josue SAPALA',
          poste: 'Responsable auteurs',
          avatar: '/img/avatar2.jpeg',
          linkedin: 'https://www.linkedin.com/in/josuesapala',
          mail: 'josue.sapala@email.com'
        },
        {
          name: 'Hervey BAMBA',
          poste: 'Support éditorial',
          avatar: '/img/avatar3.jpeg',
          linkedin: 'https://www.linkedin.com/in/herveybamba',
          mail: 'hervey.bamba@email.com'
        }
      ],
      authors: [
        {
          id: 1,
          name: 'Dr. Aïcha Koné',
          age: 42,
          nationalite: 'Ivoirienne',
          langue: 'Français',
          domain: 'Sociologie des migrations africaines',
          avatar: '/img/author2.jpeg',
          description: 'Sociologue spécialiste des migrations africaines, auteure de plusieurs ouvrages de référence.'
        },
        {
          id: 2,
          name: 'Prof. Jean-Marc Bemba',
          age: 55,
          nationalite: 'Congolais',
          langue: 'Français, Lingala',
          domain: 'Histoire des mouvements culturels panafricains',
          avatar: '/img/author3.jpeg',
          description: 'Historien reconnu pour ses travaux sur les dynamiques culturelles en Afrique centrale.'
        },
        {
          id: 3,
          name: 'Dr. Fatou Ndiaye',
          age: 39,
          nationalite: 'Sénégalaise',
          langue: 'Français, Wolof',
          domain: 'Anthropologie urbaine',
          avatar: '/img/profil.jpg',
          description: 'Anthropologue urbaine, spécialiste des transformations sociales en Afrique de l’Ouest.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
}

/* Header section background */
.section-bg-header {
  background: linear-gradient(90deg, #e3f2fd 0%, #f8fafc 100%);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.06);
  padding: 32px 18px 24px 18px;
  margin-bottom: 32px;
}

/* List section background */
.section-bg-list {
  background: linear-gradient(120deg, #f8fafc 60%, #e0f7fa 100%);
  border-radius: 18px;
  padding: 32px 18px;
  margin-bottom: 48px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}

/* Count section background */
.section-bg-count {
  background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
  color: #fff;
  border-radius: 14px;
  padding: 18px 36px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  text-align: center;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #003e70;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 0;
}
.services-card {
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  background: #f9fafb;
}
.service-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 18px;
}
.service-title {
  font-weight: 600;
  color: #1976d2;
}
.service-desc {
  color: #444;
  font-size: 0.98rem;
}
.contact-card {
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  background: #fff;
}
.contact-label {
  font-size: 0.85rem;
  color: #0284c7;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}
.contact-avatar {
  border: 2px solid #1976d2;
}
.resp-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #003e70;
}
.resp-poste {
  font-size: 0.98rem;
  color: #1976d2;
  margin-bottom: 2px;
}
.resp-links .q-btn {
  margin-right: 6px;
}
.authors-section {
  margin-top: 40px;
}

.count-number {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 2px;
}
.count-label {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.author-card {
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.09);
  background: #fff;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1px solid #e3e8ee;
  overflow: hidden; /* <-- Ajouté pour empêcher l'image de dépasser */
   max-width: 400px; /* largeur max réduite */
  margin-left: auto;
  margin-right: auto;
}
.author-card:hover {
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.13);
  transform: translateY(-3px) scale(1.015);
  border-color: #1976d2;
}
.author-img {
  object-fit: cover;
  border-radius: 0; /* <-- Pour éviter un double arrondi avec overflow:hidden */
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
  width: 100%;
  height: 140px;
  min-height: 450px;
  max-height: 140px;
  display: block;
}
.author-avatar {
  border: 2px solid #1976d2;
}
.author-name {
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 2px;
}
.author-meta {
  font-size: 0.95rem;
}
.author-domain {
  font-size: 1rem;
  font-weight: 500;
}
.author-desc {
  color: #444;
  font-size: 0.98rem;
}
@media (max-width: 900px) {
  .section-title {
    font-size: 1.3rem;
  }
  .authors-count-card {
    padding: 12px 10px;
    min-width: 80px;
  }
  .section-bg-header,
  .section-bg-list {
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>
