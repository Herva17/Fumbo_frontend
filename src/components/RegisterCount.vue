<template>
  <q-page class="register-page flex flex-center">
    <q-card class="q-pa-md q-card-shadow animated-card">
      <!-- Titre -->
      <q-card-section>
        <div class="text-h4 text-center text-primary q-mb-sm">
          Créez un compte
        </div>
        <div class="text-subtitle1 text-center text-grey-7">
          Inscrivez-vous pour commencer à écrire
        </div>
      </q-card-section>

      <!-- Boutons d'inscription -->
      <q-card-section>
        <q-btn
          class="full-width q-mb-sm google-btn"
          icon="fab fa-google"
          label="S'inscrire avec Google"
          color="red"
          unelevated
          @click="signUpWithGoogle"
        />

        <q-btn
          class="full-width q-mb-sm facebook-btn"
          icon="fab fa-facebook"
          label="S'inscrire avec Facebook"
          color="blue"
          unelevated
          @click="signUpWithFacebook"
        />

        <q-btn
          class="full-width q-mb-sm gmail-btn"
          icon="fas fa-envelope"
          label="S'inscrire avec Gmail"
          color="primary"
          unelevated
          @click="signUpWithGmail"
        />
      </q-card-section>

      <!-- Séparateur -->
      <q-separator spaced />

      <!-- Lien de connexion -->
      <q-card-actions align="center" class="q-mt-sm">
        <q-btn
          flat
          label="Vous avez déjà un compte ? Se connecter"
          color="primary"
          @click="redirectToLogin"
        />
      </q-card-actions>

      <!-- Conditions d'utilisation -->
      <q-card-section class="text-center text-grey-7">
        <div class="text-caption">
          Cliquez sur « S’inscrire » pour accepter les conditions d’utilisation
          de Fumbo et reconnaître que la politique de confidentialité de Medium
          s’applique à vous.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "RegisterPage",
  setup() {
    const router = useRouter();

    const signUpWithGoogle = () => {
      alert("Inscription avec Google en cours...");
      // Implémentation avec Firebase ou OAuth
    };

    const signUpWithFacebook = () => {
      alert("Inscription avec Facebook en cours...");
      // Implémentation avec Firebase ou OAuth
    };

    const signUpWithGmail = () => {
      alert("Inscription avec Gmail en cours...");
      // Implémentation avec Firebase ou OAuth
    };

    const redirectToLogin = () => {
      router.push("/connection");
    };

    return {
      signUpWithGoogle,
      signUpWithFacebook,
      signUpWithGmail,
      redirectToLogin,
    };
  },
};
</script>

<style scoped>
/* Style général pour la page */
.register-page {
  background: linear-gradient(135deg, #cbcbcb, #2575fc);
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

/* Styles pour les boutons */
.google-btn {
  background-color: rgb(137, 135, 135) !important;
  color: rgb(255, 255, 255) !important;
  transition: transform 0.2s ease-in-out;
}

.google-btn:hover {
  transform: scale(1.05);
}

.facebook-btn {
  background-color: #868686 !important;
  color: rgb(255, 255, 255) !important;
  transition: transform 0.2s ease-in-out;
}

.facebook-btn:hover {
  transform: scale(1.05);
}

.gmail-btn {
  background-color: #838383 !important;
  color: rgb(255, 255, 255) !important;
  transition: transform 0.2s ease-in-out;
}

.gmail-btn:hover {
  transform: scale(1.05);
}

/* Séparateur */
.text-grey {
  color: #7a8fa6;
}

/* Animation d'apparition */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-card {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
