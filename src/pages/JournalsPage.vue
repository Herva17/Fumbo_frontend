<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-breadcrumbs class="q-mb-md">
          <q-breadcrumbs-el label="Accueil" to="/" />
          <q-breadcrumbs-el label="Revues" />
        </q-breadcrumbs>
        
        <div class="row items-center">
          <div class="col">
            <h1 class="text-h4 q-my-none">Revues scientifiques</h1>
          </div>
          <div class="col-auto">
            <q-input
              v-model="searchTerm"
              outlined
              dense
              placeholder="Rechercher une revue..."
              class="search-input"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-4 col-12">
        <q-card class="q-pa-md sticky-card">
          <q-card-section>
            <h2 class="text-h6">Filtrer par discipline</h2>
            <q-tree
              :nodes="disciplinesTree"
              node-key="label"
              selected-color="primary"
              v-model:selected="selectedDiscipline"
              default-expand-all
            />
            
            <q-separator class="q-my-md" />
            
            <h2 class="text-h6">Filtrer par éditeur</h2>
            <q-select
              v-model="selectedPublisher"
              :options="publishers"
              label="Tous les éditeurs"
              outlined
              dense
              options-dense
              emit-value
              map-options
              clearable
            />
            
            <q-separator class="q-my-md" />
            
            <h2 class="text-h6">Accès</h2>
            <q-option-group
              v-model="accessFilter"
              :options="accessOptions"
              color="primary"
              type="checkbox"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-9 col-sm-8 col-12">
        <div class="row q-col-gutter-md">
          <div 
            class="col-12"
            v-for="journal in filteredJournals"
            :key="journal.id"
          >
            <q-card class="my-card">
              <q-card-section horizontal>
                <q-img
                  class="col-3"
                  :src="journal.cover"
                  style="height: 180px"
                />

                <q-card-section class="col">
                  <div class="text-h5 q-mt-sm q-mb-xs">
                    <router-link :to="`/journal/${journal.id}`" class="text-primary">
                      {{ journal.title }}
                    </router-link>
                  </div>
                  <div class="text-caption text-grey-7">
                    {{ journal.publisher }} • ISSN: {{ journal.issn }}
                  </div>
                  <div class="text-body2 q-mt-sm">
                    {{ journal.description.substring(0, 200) }}...
                  </div>
                  
                  <div class="q-mt-md">
                    <q-chip
                      v-for="discipline in journal.disciplines"
                      :key="discipline"
                      color="blue"
                      text-color="white"
                      size="sm"
                    >
                      {{ discipline }}
                    </q-chip>
                  </div>
                </q-card-section>
                
                <q-card-actions vertical class="justify-around q-px-md">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="info"
                    :to="`/journal/${journal.id}`"
                  >
                    <q-tooltip>Détails</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="list"
                    :to="`/journal/${journal.id}/issues`"
                  >
                    <q-tooltip>Numéros</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="rss_feed"
                  >
                    <q-tooltip>Flux RSS</q-tooltip>
                  </q-btn>
                </q-card-actions>
              </q-card-section>
            </q-card>
          </div>
        </div>
        
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
      searchTerm: '',
      selectedDiscipline: null,
      selectedPublisher: null,
      accessFilter: ['openAccess'],
      currentPage: 1,
      itemsPerPage: 5,
      disciplinesTree: [
        {
          label: 'Sciences sociales',
          children: [
            {
              label: 'Sociologie',
              children: [
                { label: 'Sociologie générale' },
                { label: 'Sociologie urbaine' },
                { label: 'Sociologie du travail' }
              ]
            },
            {
              label: 'Anthropologie',
              children: [
                { label: 'Anthropologie sociale' },
                { label: 'Anthropologie culturelle' }
              ]
            },
            {
              label: 'Science politique'
            }
          ]
        },
        {
          label: 'Humanités',
          children: [
            { label: 'Histoire' },
            { label: 'Philosophie' },
            { label: 'Littérature' }
          ]
        },
        {
          label: 'Économie et gestion'
        }
      ],
      publishers: [
        { label: 'Presses Universitaires de France', value: 'puf' },
        { label: 'Éditions de l\'EHESS', value: 'ehess' },
        { label: 'CNRS Éditions', value: 'cnrs' },
        { label: 'La Découverte', value: 'decouverte' }
      ],
      accessOptions: [
        { label: 'Accès ouvert', value: 'openAccess' },
        { label: 'Accès abonné', value: 'subscription' },
        { label: 'Accès partiel', value: 'partial' }
      ],
      journals: [
        {
          id: 1,
          title: 'Revue française de sociologie',
          publisher: 'Presses Universitaires de France',
          issn: '0035-2969',
          description: 'Fondée en 1960, la Revue française de sociologie publie des travaux originaux dans tous les domaines de la sociologie. Elle accueille également des contributions d\'autres disciplines des sciences sociales dès lors qu\'elles éclairent des phénomènes sociaux.',
          cover: 'https://th.bing.com/th/id/OIP.yJSJuAxAMBU7sZ9OEhkE8wAAAA?rs=1&pid=ImgDetMain',
          disciplines: ['Sociologie', 'Sciences sociales'],
          access: 'openAccess'
        },
        {
          id: 2,
          title: 'Annales. Histoire, Sciences Sociales',
          publisher: 'Éditions de l\'EHESS',
          issn: '0395-2649',
          description: 'Créée en 1929, la revue Annales. Histoire, Sciences Sociales est une des principales revues françaises d\'histoire. Elle publie des articles en français et en anglais relevant de toutes les périodes historiques et de toutes les approches méthodologiques.',
          cover: 'https://th.bing.com/th/id/OIP.aIILUSTay48JCOjro8-g1gHaEK?rs=1&pid=ImgDetMain',
          disciplines: ['Histoire', 'Sciences sociales'],
          access: 'subscription'
        },
        {
          id: 3,
          title: 'Revue économique',
          publisher: 'Presses de Sciences Po',
          issn: '0035-2764',
          description: 'La Revue économique publie des articles originaux dans tous les domaines de l\'économie, avec une attention particulière aux travaux qui articulent théorie et analyse empirique.',
          cover: 'https://via.placeholder.com/150x200?text=Revue+Économique',
          disciplines: ['Économie'],
          access: 'partial'
        },
        {
          id: 4,
          title: 'Actes de la recherche en sciences sociales',
          publisher: 'Éditions du Seuil',
          issn: '0335-5322',
          description: 'Fondée par Pierre Bourdieu en 1975, la revue Actes de la recherche en sciences sociales se distingue par son approche interdisciplinaire et son souci de rendre compte des recherches en train de se faire.',
          cover: 'https://via.placeholder.com/150x200?text=Actes+de+la+Recherche',
          disciplines: ['Sociologie', 'Anthropologie', 'Science politique'],
          access: 'openAccess'
        },
        {
          id: 5,
          title: 'Critique internationale',
          publisher: 'Presses de Sciences Po',
          issn: '1290-7839',
          description: 'Critique internationale est une revue pluridisciplinaire qui publie des travaux originaux en science politique, sociologie politique, économie politique et histoire contemporaine, avec une attention particulière aux approches comparatives.',
          cover: 'https://via.placeholder.com/150x200?text=Critique+Internationale',
          disciplines: ['Science politique', 'Sociologie'],
          access: 'subscription'
        }
      ]
    }
  },
  computed: {
    filteredJournals() {
      let filtered = this.journals.filter(journal => {
        // Search filter
        const matchesSearch = !this.searchTerm || 
          journal.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          journal.publisher.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          journal.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        
        // Discipline filter
        const matchesDiscipline = !this.selectedDiscipline || 
          journal.disciplines.some(d => d.toLowerCase().includes(this.selectedDiscipline.toLowerCase()))
        
        // Publisher filter
        const matchesPublisher = !this.selectedPublisher || 
          journal.publisher.toLowerCase().includes(this.selectedPublisher.toLowerCase())
        
        // Access filter
        const matchesAccess = this.accessFilter.length === 0 || 
          this.accessFilter.includes(journal.access)
        
        return matchesSearch && matchesDiscipline && matchesPublisher && matchesAccess
      })
      
      // Pagination
      const start = (this.currentPage - 1) * this.itemsPerPage
      return filtered.slice(start, start + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.journals.length / this.itemsPerPage)
    }
  }
}
</script>

<style scoped>
.sticky-card {
  position: sticky;
  top: 20px;
}

.search-input {
  min-width: 250px;
}

.my-card {
  transition: box-shadow 0.3s;
}

.my-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>