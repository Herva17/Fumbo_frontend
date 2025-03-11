<template>
  <q-page class="register-page flex flex-center">
    <q-card class="q-pa-md q-card-shadow animated-card">
      <q-card-section>
        <div class="text-h4 text-center text-primary q-mb-sm">
          Créez un compte
        </div>
      </q-card-section>

      <!-- Formulaire d'inscription -->
      <q-card-section>
        <q-form @submit="register">
          <q-input
            v-model="form.nom"
            label="Nom"
            outlined
            dense
            class="q-mb-md"
          />
          <q-input
            v-model="form.prenom"
            label="Prénom"
            outlined
            dense
            class="q-mb-md"
          />
          <q-input
            v-model="form.email"
            label="Email"
            type="email"
            outlined
            dense
            class="q-mb-md"
          />
          <q-input
            v-model="form.password"
            label="Mot de passe"
            type="password"
            outlined
            dense
            class="q-mb-md"
          />
          <q-input
            v-model="form.biographie"
            label="Biographie"
            outlined
            dense
            class="q-mb-md"
          />
          <q-select
            v-model="form.nationalite"
            label="Nationalité"
            outlined
            dense
            :options="nationalites"
            option-label="nom_nationalite"
            option-value="id_nationalite"
            emit-value
            map-options
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-img
                    :src="scope.opt.image"
                    style="width: 24px; height: 16px"
                  />
                </q-item-section>
                <q-item-section>
                  {{ scope.opt.nom_nationalite }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-btn
            label="S'inscrire"
            type="submit"
            color="primary"
            unelevated
            class="full-width q-mt-md"
            :loading="isLoading"
          />
        </q-form>
        
        <!-- Affichage des messages d'erreur ou de succès -->
        <div v-if="error" class="text-negative q-mt-md">{{ error }}</div>
        <div v-if="successMessage" class="text-positive q-mt-md">{{ successMessage }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useInscriptionStore } from '../stores/inscriptionStore.js';
import { useNationalitesStore } from '../stores/nationalitesStore.js';

// Initialisation du store
const inscriptionStore = useInscriptionStore();
const nationalitesStore = useNationalitesStore();

// Formulaire réactif
const form = ref({
  nom: '',
  prenom: '',
  email: '',
  password: '',
  biographie: '',
  nationalite: null,
});

// Chargement des nationalités au montage du composant
onMounted(() => {
  nationalitesStore.fetchNationalites();
});

// Computed properties pour les nationalités et les états de chargement
const nationalites = computed(() => nationalitesStore.getNationalites);
const isLoading = computed(() => inscriptionStore.getIsLoading);
const error = computed(() => inscriptionStore.getError);
const successMessage = computed(() => inscriptionStore.getSuccessMessage);

// Méthodes
const register = () => {
  // Envoi des données du formulaire au store pour inscription
  inscriptionStore.registerUser(form.value);
};
</script>

<style scoped>
/* Style général */
.register-page {
  background: linear-gradient(135deg, #2575fc, #cbcbcb);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style de la carte */
.q-card-shadow {
  width: 400px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* Animation au survol */
.animated-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
}

/* Bouton pleine largeur */
.full-width {
  width: 100%;
}
</style>
