<template>
  <div class="cairn-style">
    <app-header />
    <q-page class="collections-page">
      <section class="collections-section">
        <div class="section-header q-mb-md">
          <h2 class="section-title text-blue-grey-9">
            <q-icon name="collections" class="q-mr-sm" />
            Différentes collections
          </h2>
          <q-separator color="blue-grey-3" />
        </div>
        <div class="row q-col-gutter-lg">
          <div
            class="col-md-4 col-sm-6 col-xs-12"
            v-for="collection in collections"
            :key="collection.id"
          >
            <q-card class="collection-card">
              <q-img :src="collection.image" :alt="collection.title" class="collection-img" />
              <q-card-section>
                <div class="collection-title text-primary">{{ collection.title }}</div>
                <div class="collection-desc text-blue-grey-7">{{ collection.description }}</div>
                <div class="collection-meta">
                  <span class="meta-label">Nombre d’ouvrages :</span>
                  <span class="meta-value">{{ collection.itemsCount }}</span>
                </div>
                <div class="collection-meta">
                  <span class="meta-label">Responsable :</span>
                  <span class="meta-value">{{ collection.manager }}</span>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="primary" label="Voir la collection" :to="`/collections/${collection.id}`" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </section>
    </q-page>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      collections: [
        {
          id: 1,
          title: 'Contes et Légendes',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
          description: 'Une collection dédiée aux contes, légendes et récits traditionnels africains.',
          itemsCount: 42,
          manager: 'Marie KABORE'
        },
        {
          id: 2,
          title: 'Sciences et Savoirs',
          image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
          description: 'Ouvrages et articles scientifiques issus de la recherche africaine.',
          itemsCount: 58,
          manager: 'Dr. Jean MABIALA'
        },
        {
          id: 3,
          title: 'Histoire et Civilisations',
          image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
          description: 'Découverte des grandes civilisations et figures historiques du continent.',
          itemsCount: 36,
          manager: 'Fatou DIENG'
        },
        {
          id: 4,
          title: 'Littérature Moderne',
          image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
          description: 'Romans, nouvelles et poésie contemporaine africaine.',
          itemsCount: 27,
          manager: 'Benoît N\'GUESSAN'
        },
        {
          id: 5,
          title: 'Arts et Cultures',
          image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
          description: 'Collections sur les arts visuels, la musique, la danse et la culture populaire.',
          itemsCount: 33,
          manager: 'Awa SOW'
        },
        {
          id: 6,
          title: 'Droit et Société',
          image: 'https://th.bing.com/th/id/OIP.H2VSAEOvqv5lTFUERD9nXgHaJ4?rs=1&pid=ImgDetMain',
          description: 'Études sur le droit, la justice et les évolutions sociales africaines.',
          itemsCount: 19,
          manager: 'Richard DREUFUS'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.cairn-style {
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

.collections-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.collections-section {
  margin-top: 40px;
  margin-bottom: 40px;
}

.section-header {
  .section-title {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    .q-icon {
      font-size: 1.8rem;
    }
  }

  .q-separator {
    height: 2px;
  }
}

.collection-card {
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(33, 150, 243, 0.07);
  transition: box-shadow 0.3s;
  margin-bottom: 24px;
  background: #fff;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 24px rgba(33, 150, 243, 0.13);
    transform: translateY(-2px) scale(1.01);
  }
}

.collection-img {
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.collection-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.collection-desc {
  font-size: 0.98rem;
  color: #607d8b;
  margin-bottom: 10px;
}

.collection-meta {
  font-size: 0.93rem;
  color: #888;
  margin-bottom: 2px;

  .meta-label {
    font-weight: 500;
    color: #1976d2;
  }
  .meta-value {
    margin-left: 4px;
  }
}

@media (max-width: 1023px) {
  .collections-page {
    padding: 15px;
  }
  .section-title {
    font-size: 1.3rem !important;
  }
}

@media (max-width: 599px) {
  .collections-page {
    padding: 10px;
  }
  .collection-img {
    height: 120px;
  }
}
</style>