<template>
  <BackButton/>
  <q-page class="q-pa-md container">
    <!-- Présentation -->
    <div class="header-section section-bg-header">
      <h2 class="section-title">
        <q-icon name="campaign" color="primary" class="q-mr-sm" />
        Actualités
      </h2>
      <p class="section-description">
        Suivez l’actualité de la plateforme H-FUMBO : nouveautés, événements, partenariats et plus encore.
      </p>
    </div>

    <!-- Catégories d'actualités -->
    <div v-for="cat in categories" :key="cat.name" class="category-section q-mb-xl section-bg-list">
      <div class="category-title text-primary text-h6 q-mb-md">
        <q-icon :name="cat.icon" class="q-mr-sm" /> {{ cat.label }}
      </div>
      <div class="row q-col-gutter-xl">
        <div
          v-for="news in filteredActualites(cat.name)"
          :key="news.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <q-card class="news-card">
            <q-img
              :src="news.image"
              :alt="news.title"
              class="news-img-large"
              style="height: 180px; border-radius: 14px 14px 0 0;"
              ratio="16/9"
            />
            <q-card-section>
              <div class="news-title text-h6">{{ news.title }}</div>
              <div class="news-date text-caption text-grey-7 q-mb-xs">{{ news.date }}</div>
              <div class="news-content q-mb-sm">{{ news.content }}</div>
              <q-btn
                flat
                color="primary"
                label="En savoir plus"
                :to="`/actualites/${news.id}`"
                class="en-savoir-plus-btn"
              />
            </q-card-section>
          </q-card>
        </div>
        <div v-if="filteredActualites(cat.name).length === 0" class="col-12 text-grey-6 q-mt-md">
          <em>Aucune actualité dans cette catégorie pour le moment.</em>
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
  name: 'ActualitePage',
  data () {
    return {
      categories: [
        { name: 'plateforme', label: 'Plateforme', icon: 'dashboard_customize' },
        { name: 'partenariats', label: 'Partenariats', icon: 'handshake' },
        { name: 'evenements', label: 'Événements', icon: 'event' }
      ],
      actualites: [
        {
          id: 1,
          title: 'Lancement d’une nouvelle interface',
          date: '05 juin 2025',
          content: 'H-FUMBO dévoile une interface repensée pour améliorer la lecture des ouvrages.',
          image: 'https://th.bing.com/th/id/OIP.xpq33Wx-gk3BKbsFjzDQmgHaEJ?rs=1&pid=ImgDetMain',
          category: 'plateforme'
        },
        {
          id: 2,
          title: 'Lancement d’une nouvelle interface',
          date: '05 juin 2025',
          content: 'H-FUMBO dévoile une interface repensée pour améliorer la lecture des ouvrages.',
          image: 'https://th.bing.com/th/id/OIP.xpq33Wx-gk3BKbsFjzDQmgHaEJ?rs=1&pid=ImgDetMain',
          category: 'plateforme'
        },
        {
          id: 3,
          title: 'Partenariat avec l’Université de Dakar',
          date: '22 mai 2025',
          content: 'Nouvelle convention pour enrichir le fonds documentaire.',
          image: 'https://th.bing.com/th/id/R.789c8eb4c8d089606a599c13f001cd4c?rik=NmvEp1OgoPnN9w&pid=ImgRaw&r=0',
          category: 'partenariats'
        },
        {
          id: 4,
          title: 'Partenariat avec l’Université de Dakar',
          date: '22 mai 2025',
          content: 'Nouvelle convention pour enrichir le fonds documentaire.',
          image: 'https://th.bing.com/th/id/R.789c8eb4c8d089606a599c13f001cd4c?rik=NmvEp1OgoPnN9w&pid=ImgRaw&r=0',
          category: 'partenariats'
        },
        {
          id: 5,
          title: 'Webinaire sur la publication scientifique',
          date: '10 mai 2025',
          content: 'Un événement en ligne pour accompagner les jeunes chercheurs africains.',
          image: 'https://th.bing.com/th/id/R.da946b898319a78f973baa579e12884d?rik=IqCXoRr4lX6zRA&riu=http%3a%2f%2funivercitedusoin.eu%2fwp-content%2fuploads%2f2023%2f03%2fphoto_theme_Webinaire_scientifique4_Cn2r.jpg&ehk=ZVGhkrCZwOPpMC%2b7GuHIwbnzJx2FjJ7AUfRXYDgZJuM%3d&risl=&pid=ImgRaw&r=0',
          category: 'evenements'
        },
        {
          id: 6,
          title: 'Webinaire sur la publication scientifique',
          date: '10 mai 2025',
          content: 'Un événement en ligne pour accompagner les jeunes chercheurs africains.',
          image: 'https://th.bing.com/th/id/R.da946b898319a78f973baa579e12884d?rik=IqCXoRr4lX6zRA&riu=http%3a%2f%2funivercitedusoin.eu%2fwp-content%2fuploads%2f2023%2f03%2fphoto_theme_Webinaire_scientifique4_Cn2r.jpg&ehk=ZVGhkrCZwOPpMC%2b7GuHIwbnzJx2FjJ7AUfRXYDgZJuM%3d&risl=&pid=ImgRaw&r=0',
          category: 'evenements'
        }
      ]
    }
  },
  methods: {
    filteredActualites(cat) {
      return this.actualites.filter(news => news.category === cat)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
}
.section-bg-header {
  background: linear-gradient(90deg, #e3f2fd 0%, #f8fafc 100%);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.06);
  padding: 32px 18px 24px 18px;
  margin-bottom: 32px;
}
.section-bg-list {
  background: linear-gradient(120deg, #f8fafc 60%, #e0f7fa 100%);
  border-radius: 18px;
  padding: 32px 18px;
  margin-bottom: 48px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.section-title {
  font-size: 2.1rem;
  font-weight: 700;
  color: #003e70;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
}
.section-description {
  font-size: 1.13rem;
  color: #4b5563;
  margin-bottom: 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.category-title {
  font-size: 1.15rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.news-card {
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  background: #fff;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
  border: 1px solid #e3e8ee;
}
.news-card:hover {
  box-shadow: 0 6px 24px rgba(0,0,0,0.13);
  border-color: #1976d2;
}
.news-img-large {
  object-fit: cover;
  border-radius: 14px 14px 0 0;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}
.news-title {
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 2px;
}
.news-date {
  font-size: 0.95rem;
}
.news-content {
  color: #444;
  font-size: 0.98rem;
}
.en-savoir-plus-btn {
  font-size: 0.98rem;
  font-weight: 500;
  padding-left: 0;
}
@media (max-width: 900px) {
  .section-bg-header,
  .section-bg-list {
    padding-left: 6px;
    padding-right: 6px;
  }
  .section-title {
    font-size: 1.3rem;
  }
}
</style>
