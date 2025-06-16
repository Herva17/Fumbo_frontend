<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-breadcrumbs class="q-mb-md">
          <q-breadcrumbs-el label="Accueil" to="/" />
          <q-breadcrumbs-el label="Collections" />
        </q-breadcrumbs>
        
        <h1 class="text-h4">Collections thématiques</h1>
        <p class="text-body1">
          Découvrez nos sélections d'articles et de revues organisées par thèmes de recherche.
        </p>
      </div>

      <div class="col-12">
        <q-tabs
          v-model="activeCollection"
          inline-label
          outside-arrows
          mobile-arrows
          class="text-primary"
        >
          <q-tab 
            v-for="collection in collections" 
            :key="collection.id" 
            :name="collection.id" 
            :label="collection.name"
          />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeCollection" animated>
          <q-tab-panel 
            v-for="collection in collections" 
            :key="collection.id" 
            :name="collection.id"
          >
            <div class="row q-col-gutter-md">
              <div class="col-md-8">
                <h2 class="text-h5">{{ collection.name }}</h2>
                <p>{{ collection.description }}</p>
                
                <div class="q-mt-lg">
                  <h3 class="text-h6">Articles récents</h3>
                  <q-list bordered separator>
                    <q-item v-for="article in collection.articles" :key="article.id" clickable v-ripple>
                      <q-item-section>
                        <q-item-label>{{ article.title }}</q-item-label>
                        <q-item-label caption>{{ article.authors.join(', ') }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
              
              <div class="col-md-4">
                <q-card class="q-pa-md">
                  <q-card-section>
                    <h3 class="text-h6">Responsable de collection</h3>
                    <div class="row items-center q-mt-md">
                      <q-avatar size="80px">
                        <img :src="collection.editor.avatar">
                      </q-avatar>
                      <div class="q-ml-md">
                        <div class="text-h6">{{ collection.editor.name }}</div>
                        <div class="text-caption">{{ collection.editor.institution }}</div>
                        <q-btn 
                          label="Contacter" 
                          color="primary" 
                          size="sm" 
                          outline 
                          class="q-mt-sm"
                        />
                      </div>
                    </div>
                  </q-card-section>
                  
                  <q-card-section>
                    <h3 class="text-h6">Revues associées</h3>
                    <q-list dense>
                      <q-item v-for="journal in collection.journals" :key="journal" clickable>
                        <q-item-section>{{ journal }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      activeCollection: 'sociology',
      collections: [
        {
          id: 'sociology',
          name: 'Sociologie contemporaine',
          description: 'Cette collection rassemble les travaux les plus récents en sociologie, couvrant des thèmes comme les transformations sociales, les inégalités, les mouvements sociaux et les nouvelles formes de sociabilité.',
          editor: {
            name: 'Prof. Émilie Durand',
            institution: 'EHESS, Paris',
            avatar: '/img/avatar1.png'
          },
          journals: [
            'Revue française de sociologie',
            'Sociologie du travail',
            'Actes de la recherche en sciences sociales'
          ],
          articles: [
            {
              id: 1,
              title: 'Les nouvelles formes de précarité en milieu urbain',
              authors: ['Durand, Émilie', 'Lefebvre, Marc']
            },
            {
              id: 2,
              title: 'Mobilité sociale et capital culturel',
              authors: ['Martin, Sophie']
            },
            {
              id: 3,
              title: 'Les effets sociaux de la crise sanitaire',
              authors: ['Dubois, Alain', 'Petit, Claude']
            }
          ]
        },
        {
          id: 'history',
          name: 'Histoire et mémoire',
          description: 'Cette collection explore les questions d\'histoire sociale, culturelle et politique, avec un accent particulier sur les études mémorielles et les usages publics de l\'histoire.',
          editor: {
            name: 'Prof. Jean-Claude Bernard',
            institution: 'Université Paris 1 Panthéon-Sorbonne',
            avatar: '/img/avatar3.jpeg'
          },
          journals: [
            'Annales. Histoire, Sciences Sociales',
            'Revue d\'histoire moderne et contemporaine',
            'Vingtième Siècle. Revue d\'histoire'
          ],
          articles: [
            {
              id: 4,
              title: 'Les mémoires de la guerre d\'Algérie',
              authors: ['Bernard, Jean-Claude']
            },
            {
              id: 5,
              title: 'Histoire globale et circulations culturelles',
              authors: ['Moreau, Isabelle']
            }
          ]
        },
        {
          id: 'economics',
          name: 'Économie politique',
          description: 'Cette collection présente des analyses économiques ancrées dans les sciences sociales, avec une attention particulière aux approches institutionnalistes et aux économies politiques comparées.',
          editor: {
            name: 'Prof. Thomas Weber',
            institution: 'Sciences Po Paris',
            avatar: '/img/profil.jpg'
          },
          journals: [
            'Revue économique',
            'Économie et société',
            'Critique internationale'
          ],
          articles: [
            {
              id: 6,
              title: 'Les politiques économiques face aux crises',
              authors: ['Weber, Thomas']
            },
            {
              id: 7,
              title: 'Inégalités et croissance économique',
              authors: ['Rousseau, Marie', 'Simon, Paul']
            }
          ]
        }
      ]
    }
  }
}
</script>