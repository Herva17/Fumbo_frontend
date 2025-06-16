<template>
  <BackButton />
  <q-page class="q-pa-md container">
    <!-- En-tête -->
    <div class="header-section section-bg-header">
      <h2 class="section-title">
        <q-icon name="library_books" color="primary" class="q-mr-sm" />
        Éditeurs partenaires
      </h2>
      <p class="section-description">
        H-FUMBO collabore avec des maisons d’édition académique qui soutiennent la diffusion du savoir scientifique africain. Découvrez nos partenaires et accédez à leurs ressources.
      </p>
    </div>

    <!-- Liste des éditeurs -->
    <div class="editeurs-list row q-col-gutter-xl section-bg-list">
      <div
        v-for="ed in editeurs"
        :key="ed.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <q-card class="editeur-card">
          <q-card-section horizontal>
            <q-avatar size="64px" color="primary" text-color="white" class="q-mr-md editeur-avatar">
              <q-icon name="business" size="36px" />
            </q-avatar>
            <div>
              <div class="editeur-name text-h6">{{ ed.name }}</div>
              <div class="editeur-desc">{{ ed.description }}</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn
              v-if="ed.website"
              flat
              color="primary"
              icon="open_in_new"
              label="Site web"
              :href="ed.website"
              target="_blank"
              class="editeur-link"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Compteur d'éditeurs -->
    <div class="editeurs-count-section flex flex-center section-bg-count">
      <div class="editeurs-count-card">
        <div class="count-number">{{ editeurs.length }}</div>
        <div class="count-label">éditeurs partenaires</div>
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
  name: 'EditeurPage',
  data () {
    return {
      editeurs: [
        {
          id: 1,
          name: 'Éditions Sciences Afrique',
          description: 'Maison d’édition dédiée aux publications en SHS africaines.',
          website: 'https://sciencesafrique.example.com'
        },
        {
          id: 2,
          name: 'Presses Universitaires de Yaoundé',
          description: 'Diffuse des travaux académiques en sciences humaines.',
          website: 'https://puy.example.com'
        },
        {
          id: 3,
          name: 'Éditions Harmattan RDC',
          description: 'Publie des ouvrages et revues scientifiques africains.',
          website: 'https://harmattanrdc.example.com'
        },
        {
          id: 4,
          name: "Presses de l'Université de Kinshasa",
          description: 'Maison d’édition universitaire de référence en RDC.',
          website: 'https://unikinpress.example.com'
        },
        {
          id: 5,
          name: 'Éditions Karthala',
          description: 'Spécialisée dans les sciences sociales et l’Afrique.',
          website: 'https://karthala.com'
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
  background: linear-gradient(90deg, #e0f2f1 0%, #e3f2fd 100%);
  border-radius: 18px;
  padding: 36px 0 48px 0;
  margin-top: 48px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.04);
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
.editeurs-list {
  margin-bottom: 0;
}
.editeur-card {
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.09);
  background: #fff;
  min-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1px solid #e3e8ee;
}
.editeur-card:hover {
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.13);
  transform: translateY(-3px) scale(1.015);
  border-color: #1976d2;
}
.editeur-avatar {
  background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}
.editeur-name {
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 4px;
  letter-spacing: 0.2px;
}
.editeur-desc {
  color: #374151;
  font-size: 1.04rem;
  margin-bottom: 2px;
}
.editeur-link {
  font-weight: 500;
  letter-spacing: 0.2px;
}
.editeurs-count-section {
  margin-top: 0;
}
.editeurs-count-card {
  background: linear-gradient(135deg, #1976d2 0%, #00bcd4 100%);
  color: #fff;
  border-radius: 20px;
  padding: 38px 70px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  text-align: center;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.count-number {
  font-size: 3.7rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 8px;
  line-height: 1;
}
.count-label {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.93;
}
@media (max-width: 900px) {
  .editeurs-count-card {
    padding: 24px 18px;
    min-width: 160px;
  }
  .section-title {
    font-size: 1.3rem;
  }
  .section-bg-header,
  .section-bg-list,
  .section-bg-count {
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>
