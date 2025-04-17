<template>
  <q-page class="login-page flex flex-center">
    <q-card class="q-pa-md q-card-shadow animated-card">
      <!-- Titre -->
      <q-card-section>
        <div class="text-h5 text-center text-primary q-mb-xs">Bienvenue</div>
        <div class="text-subtitle2 text-center text-grey-7">
          Connectez-vous pour commencer à écrire
        </div>
      </q-card-section>

      <!-- Boutons d'inscription -->
      <q-card-section>
        <q-btn
          class="full-width q-mb-sm google-btn"
          icon="fab fa-google"
          label="Se connecter avec Google"
          color="red"
          unelevated
          @click="signInWithGoogle"
        />

        <q-btn
          class="full-width phone-btn"
          icon="fas fa-phone"
          label="Se connecter avec un numéro"
          color="green"
          unelevated
          @click="signInWithPhone"
        />
        <q-separator spaced />
        <q-btn
          class="full-width phone-btn"
          icon="fas fa-envelope"
          label="Se connecter avec votre e-mail"
          color="black"
          unelevated
          @click="openEmailLoginModal"
        />

        <!-- Nouveau bouton S'inscrire -->
        <div class="text-center q-mt-md">
          <span class="text-grey-7">Vous n'avez pas un compte ?</span>
          <q-btn
            flat
            label="S'inscrire"
            color="primary"
            to="/Enregistrer"
            @click="redirectToSignup"
          />
        </div>
      </q-card-section>

      <q-separator spaced />

      <!-- Conditions d'utilisation -->
      <q-card-section class="text-center text-grey-7">
        <div class="text-caption">
          Cliquez sur « Se connecter » pour accepter les conditions d’utilisation de Fumbo et
          reconnaître que la politique de confidentialité de Medium s’applique à vous.
        </div>
      </q-card-section>
    </q-card>

    <!-- Modal pour la connexion avec e-mail -->
    <q-dialog v-model="isEmailLoginModalOpen" persistent>
      <q-card class="q-pa-md" style="width: 400px">
        <q-card-section>
          <div class="text-h6 text-center">Connexion avec e-mail</div>
        </q-card-section>

        <!-- Message d'erreur -->
        <q-card-section v-if="loginStore.error" class="text-negative text-center q-mb-md">
          {{ loginStore.error }}
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="handleLogin">
            <q-input
              v-model="loginStore.email"
              type="email"
              label="Adresse e-mail"
              filled
              dense
              clearable
              outlined
              class="q-mb-md"
              :rules="[(val) => !!val || 'Ce champ est requis']"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="loginStore.password"
              type="password"
              label="Mot de passe"
              filled
              dense
              clearable
              outlined
              class="q-mb-md"
              :rules="[(val) => !!val || 'Le mot de passe est requis']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <q-btn
              label="Se connecter"
              type="submit"
              color="primary"
              unelevated
              class="full-width q-mt-md"
              icon="login"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Annuler" color="negative" @click="closeEmailLoginModal" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useLoginStore } from '../stores/login'
import { ref } from 'vue'

const loginStore = useLoginStore();

const isEmailLoginModalOpen = ref(false); // Variable pour contrôler l'état du modal

const openEmailLoginModal = () => {
  console.log('Bouton cliqué, ouverture du modal');
  isEmailLoginModalOpen.value = true; // Ouvre le modal
};

const closeEmailLoginModal = () => {
  console.log('Fermeture du modal');
  isEmailLoginModalOpen.value = false; // Ferme le modal
};

const handleLogin = async () => {
  await loginStore.loginUser();
  if (!loginStore.error) {
    console.log('Connexion réussie !');
    closeEmailLoginModal(); // Ferme le modal après une connexion réussie
  } else {
    console.error('Erreur de connexion :', loginStore.error);
  }
};

const redirectToSignup = () => {
  console.log('Redirection vers la page d\'inscription');
};

// Assurez-vous que les méthodes signInWithGoogle et signInWithPhone sont définies si elles sont utilisées
const signInWithGoogle = () => {
  console.log('Connexion avec Google');
};

const signInWithPhone = () => {
  console.log('Connexion avec un numéro de téléphone');
};
</script>

<style scoped>
/* Style général pour la page */
.login-page {
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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

/* Animation au survol */
.animated-card:hover {
  transform: scale(1.02);
}

/* Bouton pleine largeur */
.full-width {
  width: 100%;
}
</style>
