<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-breadcrumbs class="q-mb-md">
          <q-breadcrumbs-el label="Accueil" to="/" />
          <q-breadcrumbs-el label="Articles" />
        </q-breadcrumbs>
        
        <div class="row items-center">
          <div class="col">
            <h1 class="text-h4 q-my-none">Articles scientifiques</h1>
          </div>
          <div class="col-auto">
            <q-select
              v-model="sortBy"
              :options="sortOptions"
              label="Trier par"
              dense
              outlined
              style="min-width: 200px"
            />
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-4 col-12">
        <q-card class="q-pa-md sticky-card">
          <q-card-section>
            <h2 class="text-h6">Filtrer les résultats</h2>
            
            <q-select
              v-model="selectedDisciplines"
              multiple
              :options="disciplines"
              label="Disciplines"
              use-chips
              outlined
              class="q-mb-md"
            />
            
            <q-select
              v-model="selectedYears"
              multiple
              :options="years"
              label="Années"
              use-chips
              outlined
              class="q-mb-md"
            />
            
            <q-select
              v-model="selectedLanguages"
              multiple
              :options="languages"
              label="Langues"
              use-chips
              outlined
              class="q-mb-md"
            />
            
            <q-btn
              color="primary"
              label="Appliquer les filtres"
              class="full-width"
              @click="applyFilters"
            />
            
            <q-btn
              flat
              color="primary"
              label="Réinitialiser"
              class="full-width q-mt-sm"
              @click="resetFilters"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-9 col-sm-8 col-12">
        <q-list bordered separator>
          <q-item v-for="article in filteredArticles" :key="article.id" class="q-pa-md">
            <q-item-section>
              <q-item-label class="text-h6">
                <router-link :to="`/article/${article.id}`" class="text-primary">
                  {{ article.title }}
                </router-link>
              </q-item-label>
              <q-item-label caption>
                Par {{ article.authors.join(', ') }}
              </q-item-label>
              <q-item-label class="q-mt-sm">
                {{ article.abstract.substring(0, 200) }}...
              </q-item-label>
              <div class="q-mt-sm">
                <q-badge v-for="discipline in article.disciplines" :key="discipline" color="blue" class="q-mr-sm">
                  {{ discipline }}
                </q-badge>
                <q-badge color="grey">
                  {{ article.year }}
                </q-badge>
                <q-badge color="grey" class="q-ml-sm">
                  {{ article.language }}
                </q-badge>
              </div>
            </q-item-section>
            
            <q-item-section side top>
              <q-btn
                icon="description"
                color="primary"
                flat
                round
                :href="article.pdfUrl"
                target="_blank"
              >
                <q-tooltip>PDF complet</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
        
        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="currentPage"
            :max="totalPages"
            :max-pages="6"
            direction-links
            boundary-links
            color="primary"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      sortBy: 'dateDesc',
      sortOptions: [
        { label: 'Date (récent)', value: 'dateDesc' },
        { label: 'Date (ancien)', value: 'dateAsc' },
        { label: 'Titre (A-Z)', value: 'titleAsc' },
        { label: 'Titre (Z-A)', value: 'titleDesc' }
      ],
      selectedDisciplines: [],
      selectedYears: [],
      selectedLanguages: [],
      disciplines: [
        'Sociologie', 'Anthropologie', 'Histoire', 'Économie', 
        'Science politique', 'Psychologie', 'Géographie', 'Philosophie'
      ],
      years: Array.from({length: 20}, (_, i) => (new Date().getFullYear() - i).toString()),
      languages: ['Français', 'Anglais', 'Espagnol', 'Allemand'],
      currentPage: 1,
      itemsPerPage: 10,
      articles: [
        {
          id: 1,
          title: 'Les nouvelles formes de sociabilité urbaine',
          authors: ['Dupont, Jean', 'Martin, Sophie'],
          abstract: 'Cette étude explore les transformations des relations sociales en milieu urbain à l\'ère numérique...',
          disciplines: ['Sociologie', 'Anthropologie'],
          year: '2023',
          language: 'Français',
          pdfUrl: '#'
        },
        {
          id: 2,
          title: 'Rituels contemporains en milieu urbain',
          authors: ['Leblanc, Marie'],
          abstract: 'Analyse des pratiques rituelles dans les espaces urbains contemporains...',
          disciplines: ['Anthropologie'],
          year: '2022',
          language: 'Français',
          pdfUrl: '#'
        },
        {
          id: 3,
          title: 'Crises économiques et résilience des systèmes',
          authors: ['Bernard, Pierre', 'Dubois, Alain'],
          abstract: 'Examen des mécanismes de résilience économique face aux chocs systémiques...',
          disciplines: ['Économie', 'Science politique'],
          year: '2022',
          language: 'Français',
          pdfUrl: '#'
        },
        {
          id: 4,
          title: 'Mémoire collective et identité nationale',
          authors: ['Petit, Claude'],
          abstract: 'Comment la mémoire collective contribue à la construction des identités nationales...',
          disciplines: ['Histoire', 'Sociologie'],
          year: '2021',
          language: 'Français',
          pdfUrl: '#'
        },
        {
          id: 5,
          title: 'Digital humanities: new perspectives',
          authors: ['Smith, John', 'Johnson, Emily'],
          abstract: 'Exploring the impact of digital technologies on humanities research...',
          disciplines: ['Histoire', 'Philosophie'],
          year: '2021',
          language: 'Anglais',
          pdfUrl: '#'
        }
      ]
    }
  },
  computed: {
    filteredArticles() {
      let filtered = [...this.articles]
      
      // Apply filters
      if (this.selectedDisciplines.length > 0) {
        filtered = filtered.filter(article => 
          article.disciplines.some(d => this.selectedDisciplines.includes(d))
        )
      }
      
      if (this.selectedYears.length > 0) {
        filtered = filtered.filter(article => 
          this.selectedYears.includes(article.year)
        )
      }
      
      if (this.selectedLanguages.length > 0) {
        filtered = filtered.filter(article => 
          this.selectedLanguages.includes(article.language)
        )
      }
      
      // Apply sorting
      switch (this.sortBy) {
        case 'dateDesc':
          filtered.sort((a, b) => b.year - a.year)
          break
        case 'dateAsc':
          filtered.sort((a, b) => a.year - b.year)
          break
        case 'titleAsc':
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'titleDesc':
          filtered.sort((a, b) => b.title.localeCompare(a.title))
          break
      }
      
      // Pagination
      const start = (this.currentPage - 1) * this.itemsPerPage
      return filtered.slice(start, start + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.itemsPerPage)
    }
  },
  methods: {
    applyFilters() {
      this.currentPage = 1
    },
    resetFilters() {
      this.selectedDisciplines = []
      this.selectedYears = []
      this.selectedLanguages = []
      this.sortBy = 'dateDesc'
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.sticky-card {
  position: sticky;
  top: 20px;
}
</style>