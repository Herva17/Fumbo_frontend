<template>
  <div class="cairn-style">
    <app-header />
    <q-page class="home-page">
      <!-- Bannière d'accueil -->
      <div class="welcome-banner q-mb-lg">
        <q-banner inline-actions class="bg-blue-grey-1 text-blue-grey-10">
          <template v-slot:avatar>
            <q-icon name="school" color="blue-grey-8" size="md" />
          </template>
          Bienvenue sur notre portail scientifique. Accédez à des milliers de revues, ouvrages, histoires et articles scientifiques africains.

          <template v-slot:action>
            <q-btn flat to="/Home" color="primary" label="En savoir plus" />
          </template>
        </q-banner>
      </div>

      <!-- Section Revues à la une -->
      <section class="featured-journals q-mb-xl">
        <div class="section-header q-mb-md">
          <h2 class="section-title text-blue-grey-9">
            <q-icon name="collections_bookmark" class="q-mr-sm" />
            Revues à la une
          </h2>
          <q-separator color="blue-grey-3" />
        </div>

        <div class="row q-col-gutter-lg">
          <div class="col-md-3 col-sm-6 col-xs-12" v-for="journal in featuredJournals" :key="journal.id">
            <journal-card :journal="journal" />
          </div>
        </div>
         <div class="text-center q-mt-md">
          <q-btn
            label="Voir toutes les revues"
            color="primary"
            outline
            to="/journals"
            class="view-all-btn"
          />
        </div>
      </section>

      <!-- Section Derniers articles -->
      <section class="recent-articles">
        <div class="section-header q-mb-md">
          <h2 class="section-title text-blue-grey-9">
            <q-icon name="article" class="q-mr-sm" />
            Derniers articles
          </h2>
          <q-separator color="blue-grey-3" />
        </div>

        <q-list bordered separator class="article-list">
          <q-item
            v-for="article in recentArticles"
            :key="article.id"
            clickable
            v-ripple
            class="article-item"
          >
            <q-item-section>
              <q-item-label class="article-title text-primary">{{ article.title }}</q-item-label>
              <q-item-label class="article-authors text-blue-grey-7">{{ article.authors.join(', ') }}</q-item-label>
              <q-item-label caption class="article-meta">
                <span class="journal-name">{{ article.journal }}</span> •
                <span class="article-date">{{ formatDate(article.date) }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                icon="visibility"
                flat
                round
                dense
                color="primary"
                class="view-btn"
              />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="text-center q-mt-md">
          <q-btn
            label="Voir tous les articles"
            color="primary"
            outline
            to="/articles"
            class="view-all-btn"
          />
        </div>
      </section>
       <!-- Section Collections -->
      <section class="collections-section q-mt-xl">
        <div class="section-header q-mb-md">
          <h2 class="section-title text-blue-grey-9">
            <q-icon name="collections" class="q-mr-sm" />
            Collections
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
              <q-img :src="collection.cover" :alt="collection.title" class="collection-img" />
              <q-card-section>
                <div class="collection-title text-primary">{{ collection.title }}</div>
                <div class="collection-desc text-blue-grey-7">{{ collection.description }}</div>
                <div class="collection-meta">
                  <span class="meta-label">Nombre d’ouvrages :</span>
                  <span class="meta-value">{{ collection.issuesCount }}</span>
                </div>
                <div class="collection-meta">
                  <span class="meta-label">Responsable :</span>
                  <span class="meta-value">{{ collection.publisher }}</span>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="primary" label="Voir la collection" />
              </q-card-actions>
            </q-card>
          </div>
          
        </div>
        <div class="text-center q-mt-md">
          <q-btn
            label="Voir toutes les collections"
            color="primary"
            outline
            to="/collection"
            class="view-all-btn"
          />
        </div>
      </section>
    </q-page>
    <app-footer />
  </div>
</template>

<script>
import JournalCard from '../components/JournalCardPage.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  components: {
    JournalCard,
    AppHeader,
    AppFooter
  },
  data() {
    return {
      featuredJournals: [
        {
          id: 1,
          title: 'Revue de Sociologie',
          cover: 'https://th.bing.com/th/id/OIP.G48Pq4zJQ6oWRxQVypGtCQAAAA?rs=1&pid=ImgDetMain',
          description: 'Revue trimestrielle de sociologie contemporaine',
          issuesCount: 124,
          publisher: 'Presses Universitaires'
        },
        {
          id: 2,
          title: 'Anthropologie et Sociétés',
          cover: 'https://th.bing.com/th/id/OIP.TaX6OkKwI5BNi7eipsQriAHaK3?rs=1&pid=ImgDetMain',
          description: 'Études en anthropologie sociale et culturelle',
          issuesCount: 87,
          publisher: 'Éditions de l\'EHESS'
        },
        {
          id: 3,
          title: 'Économie Politique',
          cover: 'https://th.bing.com/th/id/R.e570ecb08b3a5025e0a4117f7741f165?rik=UU4RRQdztGCu9Q&pid=ImgRaw&r=0',
          description: 'Analyses économiques et politiques contemporaines',
          issuesCount: 156,
          publisher: 'La Découverte'
        },
        {
          id: 4,
          title: 'Histoire et Civilisations',
          cover: 'https://th.bing.com/th/id/OIP.grf7TWnpxqSVjbAKKOUCKQAAAA?rs=1&pid=ImgDetMain',
          description: 'Études historiques et civilisationnelles africaines',
          issuesCount: 92,
          publisher: 'Armand Colin'
        },
        {
          id: 5,
          title: 'Droit de justice',
          cover: 'https://th.bing.com/th/id/OIP.zX3msId1-leMTqfUtT-yvQHaHa?rs=1&pid=ImgDetMain',
          description: 'Études du droit africain',
          issuesCount: 92,
          publisher: 'Richard DREUFUS'
        },
         {
          id: 6,
          title: 'Culture africaine en nous',
          cover: 'https://th.bing.com/th/id/R.97d0210cdf27d8174447074d3aad6b5f?rik=JLAaw0AcEH%2bKQg&pid=ImgRaw&r=0',
          description: 'Études du droit africain',
          issuesCount: 92,
          publisher: 'Richard DREUFUS'
        },
         {
          id: 5,
          title: 'Droit humain',
          cover: 'https://th.bing.com/th/id/OIP.MSOEjWESL8dVlQ3Sbp5M4AHaHa?rs=1&pid=ImgDetMain',
          description: 'Études du droit humain',
          issuesCount: 92,
          publisher: 'Guy DE MOPASSANT'
        },
         {
          id: 5,
          title: 'La race noire africaine',
          cover: 'https://th.bing.com/th/id/OIP.1IEvXfXwZq_WyMSQd_XSkAHaHa?rs=1&pid=ImgDetMain',
          description: 'Études de la race africaine',
          issuesCount: 92,
          publisher: 'Alfred DE MUSSET'
        }
      ],
      recentArticles: [
        {
          id: 1,
          title: 'Les nouvelles formes de sociabilité urbaine',
          authors: ['Dupont, Jean', 'Martin, Sophie'],
          journal: 'Revue de Sociologie',
          date: '2023-01-15'
        },
        {
          id: 2,
          title: 'Rituels contemporains en milieu urbain',
          authors: ['Leblanc, Marie'],
          journal: 'Anthropologie et Sociétés',
          date: '2022-12-10'
        },
        {
          id: 3,
          title: 'Crises économiques et résilience des systèmes',
          authors: ['Bernard, Pierre', 'Dubois, Alain'],
          journal: 'Économie Politique',
          date: '2022-11-25'
        }
      ],
       collections: [
        {
          id: 1,
          title: 'Histoire et Civilisations',
          cover: 'https://th.bing.com/th/id/OIP.grf7TWnpxqSVjbAKKOUCKQAAAA?rs=1&pid=ImgDetMain',
          description: 'Études historiques et civilisationnelles africaines',
          issuesCount: 92,
          publisher: 'Armand Colin'
        },
        {
          id: 2,
          title: 'Droit de justice',
          cover: 'https://th.bing.com/th/id/OIP.zX3msId1-leMTqfUtT-yvQHaHa?rs=1&pid=ImgDetMain',
          description: 'Études du droit africain',
          issuesCount: 92,
          publisher: 'Richard DREUFUS'
        },
        {
          id: 3,
          title: 'Culture africaine en nous',
          cover: 'https://th.bing.com/th/id/R.97d0210cdf27d8174447074d3aad6b5f?rik=JLAaw0AcEH%2bKQg&pid=ImgRaw&r=0',
          description: 'Études du droit africain',
          issuesCount: 92,
          publisher: 'Richard DREUFUS'
        },
        {
          id: 4,
          title: 'Droit humain',
          cover: 'https://th.bing.com/th/id/OIP.MSOEjWESL8dVlQ3Sbp5M4AHaHa?rs=1&pid=ImgDetMain',
          description: 'Études du droit humain',
          issuesCount: 92,
          publisher: 'Guy DE MOPASSANT'
        },
        {
          id: 5,
          title: 'La race noire africaine',
          cover: 'https://th.bing.com/th/id/OIP.1IEvXfXwZq_WyMSQd_XSkAHaHa?rs=1&pid=ImgDetMain',
          description: 'Études de la race africaine',
          issuesCount: 92,
          publisher: 'Alfred DE MUSSET'
        }
      ]
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('fr-FR', options)
    }
  },
}
</script>

<style lang="scss" scoped>
.cairn-style {
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  color: #333;
}

.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.welcome-banner {
  .q-banner {
    border-radius: 4px;
    padding: 20px;
    font-size: 1.1rem;


    &__avatar {
      margin-right: 15px;

    }

    &__actions {
      align-items: center;
    }
  }
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

.article-list {
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #e0e0e0;

  .article-item {
    padding: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f5f5f5;
    }

    .article-title {
      font-size: 1.1rem;
      font-weight: 500;
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .article-authors {
      font-size: 0.95rem;
      margin-bottom: 4px;
    }

    .article-meta {
      font-size: 0.85rem;
      color: #666;

      .journal-name {
        font-style: italic;
      }

      .article-date {
        color: #444;
      }
    }

    .view-btn {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover .view-btn {
      opacity: 1;
    }
  }
}

.view-all-btn {
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 8px 24px;

  &:hover {
    background-color: rgba(33, 150, 243, 0.1);
  }
}
.collections-section {
  margin-top: 40px;
  margin-bottom: 40px;
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
