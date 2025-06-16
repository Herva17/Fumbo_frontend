<template>
  <BackButton />
  <q-page class="q-pa-md container">
    <!-- En-tête -->
    <div class="header-section">
      <h2 class="section-title">
        <q-icon name="apartment" color="primary" class="q-mr-sm" />
        Institutions 
      </h2>
      <p class="section-description">
        Collaboration active avec des universités, centres de recherche et bibliothèques francophones à travers le continent africain.
      </p>
    </div>

    <!-- Détail institutionnel -->
    <div class="institution-detail q-mb-xl">
      <q-card class="institution-detail-card">
        <q-card-section>
          <div class="text-h6 text-primary q-mb-xs">
            Pourquoi collaborer avec H-FUMBO&nbsp;?
          </div>
          <div class="text-body1">
            H-FUMBO accompagne les institutions dans la valorisation et la diffusion de la production scientifique locale. 
            Grâce à notre plateforme, les universités et centres de recherche bénéficient d’une visibilité accrue, d’un accès facilité aux ressources et d’un accompagnement personnalisé pour la numérisation et la gestion de leurs archives.
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Services proposés -->
    <div class="services-section q-mb-xl">
      <h3 class="services-title text-primary q-mb-md">
        <q-icon name="handshake" class="q-mr-sm" /> Services proposés aux institutions
      </h3>
      <div class="row q-col-gutter-lg">
        <div v-for="service in services" :key="service.title" class="col-12 col-md-6 col-lg-4">
          <q-card class="service-card">
            <q-card-section>
              <div class="service-icon q-mb-sm">
                <q-icon :name="service.icon" size="36px" color="primary" />
              </div>
              <div class="service-title text-h6 q-mb-xs">{{ service.title }}</div>
              <div class="service-desc">{{ service.desc }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Liste des institutions -->
    <div class="institutions-list-section q-mb-xl">
      <h3 class="institutions-title text-primary q-mb-md">
        <q-icon name="groups" class="q-mr-sm" /> Nos institutions partenaires
      </h3>
      <div class="row q-col-gutter-lg">
        <div
          v-for="inst in institutions"
          :key="inst.id"
          class="col-12 col-md-6"
        >
          <q-card class="institution-card">
            <q-card-section>
              <div class="institution-name text-h6">{{ inst.name }}</div>
              <div class="institution-desc">{{ inst.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Compteur d'institutions -->
    <div class="institutions-count-section flex flex-center">
      <div class="institutions-count-card">
        <div class="count-number">{{ institutions.length }}</div>
        <div class="count-label">institutions partenaires</div>
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
  name: 'InstitutionPage',
  data () {
    return {
      institutions: [
        { id: 1, name: 'Université de Kinshasa', description: 'Partenaire historique de la plateforme dans la mise à disposition d’archives scientifiques.' },
        { id: 2, name: 'Bibliothèque nationale du Bénin', description: 'Collaboratrice pour la numérisation des ressources locales.' },
        { id: 3, name: 'Université Cheikh Anta Diop', description: 'Partenaire pour la diffusion des travaux de recherche sénégalais.' },
        { id: 4, name: 'Université de Yaoundé I', description: 'Soutient la valorisation des publications camerounaises.' }
      ],
      services: [
        {
          title: 'Numérisation des archives',
          icon: 'cloud_upload',
          desc: 'Accompagnement dans la numérisation et la mise en ligne des archives scientifiques institutionnelles.'
        },
        {
          title: 'Gestion des publications',
          icon: 'library_books',
          desc: 'Outils pour gérer, organiser et diffuser les revues et articles produits par l’institution.'
        },
        {
          title: 'Accès privilégié aux ressources',
          icon: 'vpn_key',
          desc: 'Accès facilité à l’ensemble des ressources de la plateforme pour les membres de l’institution.'
        },
        {
          title: 'Formation et accompagnement',
          icon: 'school',
          desc: 'Sessions de formation et support technique pour les équipes documentaires et chercheurs.'
        },
        {
          title: 'Visibilité internationale',
          icon: 'public',
          desc: 'Valorisation des productions scientifiques auprès d’un large public francophone et international.'
        },
        {
          title: 'Statistiques avancées',
          icon: 'bar_chart',
          desc: 'Suivi détaillé de la consultation et de l’impact des publications institutionnelles.'
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
.header-section {
  text-align: center;
  margin-bottom: 32px;
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
.institution-detail-card {
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  background: #f9fafb;
}
.services-title,
.institutions-title {
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.service-card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  background: #fff;
  min-height: 180px;
  transition: box-shadow 0.2s;
}
.service-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.13);
}
.service-icon {
  text-align: center;
}
.service-title {
  font-weight: 600;
  color: #1976d2;
}
.service-desc {
  color: #444;
  font-size: 1rem;
}
.institution-card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  background: #f8fafc;
  min-height: 120px;
  margin-bottom: 12px;
}
.institution-name {
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 4px;
}
.institution-desc {
  color: #444;
  font-size: 1rem;
}
.institutions-count-section {
  margin-top: 48px;
}
.institutions-count-card {
  background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
  color: #fff;
  border-radius: 18px;
  padding: 36px 60px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  text-align: center;
  min-width: 260px;
}
.count-number {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 8px;
}
.count-label {
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
@media (max-width: 900px) {
  .institutions-count-card {
    padding: 24px 18px;
    min-width: 160px;
  }
  .section-title {
    font-size: 1.3rem;
  }
}
</style>